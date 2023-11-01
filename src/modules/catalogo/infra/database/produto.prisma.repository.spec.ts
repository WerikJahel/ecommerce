import { faker } from "@faker-js/faker";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ProdutoMap } from "../mappers/produto.map";
import { PrismaClient } from "@prisma/client";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import { CategoriaPrismaRepository } from "./categoria.prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let produtoRepositorio: ProdutoPrismaRepository;
let UUID: string;
let nome: string;
let descricao: string;
let valor: number;
let categorias: Array<Categoria>;
let dataCriacao: Date;
let dataAtualizacao: Date;
let dataExclusao: Date;
let status: StatusProduto;

describe('Repositório Prisma: Produto', () => {

    beforeAll(async () => {
        produtoRepositorio = new ProdutoPrismaRepository(prismaMock);

        UUID = faker.string.uuid();
        nome = faker.string.alpha({ length: { min: Produto.TAMANHO_MINIMO_NOME, max: Produto.TAMANHO_MAXIMO_NOME } })
        descricao = faker.string.alpha({ length: { min: Produto.TAMANHO_MINIMO_DESCRICAO, max: Produto.TAMANHO_MAXIMO_DESCRICAO } });
        valor = faker.number.int({ min: Produto.VALOR_MINIMO });

        const categoria01 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
        const categoria02 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
        const categoria03 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
        categorias = faker.helpers.arrayElements<Categoria>([categoria01, categoria02, categoria03], { min: Produto.QTD_MINIMA_CATEGORIAS, max: Produto.QTD_MAXIMA_CATEGORIAS });
        dataCriacao = faker.date.anytime();
        dataAtualizacao = faker.date.anytime();
        dataExclusao = faker.date.anytime();

        status = faker.helpers.enumValue(StatusProduto);
        //status = faker.helpers.arrayElement([StatusProduto.ATIVO, StatusProduto.DESATIVO]);
        //enum Status { ATIVO, DESATIVADO };
        //status = faker.helpers.enumValue(StatusProduto.Status);
    });

    afterEach(() => {
        vi.resetAllMocks();
        mockReset(prismaMock);
    });

    describe('Deve Recuperar Produto por ID', () => {

        test('Deve Recuperar Produto por UUID', async () => {

            const produtoPrisma = {

                id: UUID,
                nome: nome,
                descricao: descricao,
                valor: valor,
                categorias: [{
                    categoria: {
                        id: UUID,
                        nome: nome,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    },
                    produtoId: UUID,
                    categoriaId: UUID,
                    dataCriacao: dataCriacao,
                    dataAtualizacao: dataAtualizacao
                }],
                dataCriacao: dataCriacao,
                dataAtualizacao: dataAtualizacao,
                dataExclusao: dataExclusao,
                status: status
            };

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma);

            const produto: Produto = ProdutoMap.fromPrismaModelToDomain(produtoPrisma);

            const produtoRecuperado = await produtoRepositorio.recuperarPorUuid(produto.id);

            expect(produtoRecuperado).toEqual(produto);
            expect(prismaMock.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findUnique).toBeCalledWith({
                where: {
                    id: produto.id
                },
                include: produtoIncludeCategoriaPrisma
            });
        });

    });


    describe('Recuperar Todos os Produtos', () => {

        test('Deve Recuperar Todos os Produtos', async () => {
            const listaProdutoPrisma = [{
                id: UUID,
                nome: nome,
                descricao: descricao,
                valor: valor,
                categorias: [{
                    produtoId: UUID,
                    categoriaId: UUID,
                    dataCriacao: dataCriacao,
                    dataAtualizacao: dataAtualizacao,
                    categoria: {
                        id: UUID,
                        nome: nome,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                }],
                dataCriacao: dataCriacao,
                dataAtualizacao: dataAtualizacao,
                dataExclusao: null,
                status: StatusProduto.ATIVO
            }, {
                id: UUID,
                nome: nome,
                descricao: descricao,
                valor: valor,
                categorias: [{
                    produtoId: UUID,
                    categoriaId: UUID,
                    dataCriacao: dataCriacao,
                    dataAtualizacao: dataAtualizacao,
                    categoria: {
                        id: UUID,
                        nome: nome,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                }],
                dataCriacao: dataCriacao,
                dataAtualizacao: dataAtualizacao,
                dataExclusao: null,
                status: StatusProduto.ATIVO
            }];

            prismaMock.produto.findMany.mockResolvedValue(listaProdutoPrisma);

            const produtos: Array<Produto> = listaProdutoPrisma.map(
                (produto) => ProdutoMap.fromPrismaModelToDomain(produto)
            )

            const todosProdutosRecuperados = await produtoRepositorio.recuperarTodos();

            expect(todosProdutosRecuperados).toStrictEqual(produtos);
            expect(prismaMock.produto.findMany).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findMany).toHaveBeenCalledWith({
                where: {
                    dataExclusao: null,
                    status: StatusProduto.ATIVO
                },
                include: produtoIncludeCategoriaPrisma
            })
        });
    })

    describe('Existe Produtos', () => {

        test('Deve Verificar se Existe Uma Determinada Produto por UUID', async () => {

            /////// Ganbiarra ///////
            {
                let UUIDValido: string;
                let nomeCategoriaValido: string;
                let dataCriacaoCategoria: Date;
                let dataAtualizacaoCategoria: Date;


                //Preencendo as variáveis com dados em conformidade com as restrições da regra de negócio
                UUIDValido = faker.string.uuid(); // Retorna um UUID v4
                nomeCategoriaValido = faker.string.alpha({ length: { min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME } });
                dataCriacaoCategoria = faker.date.anytime();
                dataAtualizacaoCategoria = faker.date.anytime();

                const categoriass = {
                    id: UUIDValido,
                    nome: nomeCategoriaValido,
                    dataCriacao: dataCriacaoCategoria,
                    dataAtualizacao: dataAtualizacaoCategoria
                }
            }

            const produtoPrisma = {
                id: UUID,
                nome: nome,
                descricao: descricao,
                valor: valor,
                categorias: categorias,
                dataCriacao: dataCriacao,
                dataAtualizacao: dataAtualizacao,
                dataExclusao: dataExclusao,
                status: status
            };

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma);

            const existeProduto = await produtoRepositorio.existe(produtoPrisma.id);

            expect(existeProduto).toBeTruthy();

        });

    });

    // describe('Inserir Produto', () => {

    //     test('Deve Inserir Um Produto', async () => {

    //         const produtoPrisma = {
    //             id: UUID,
    //             nome: nome,
    //             descricao: descricao,
    //             valor: valor,
    //             categorias: categorias,
    //             dataCriacao: dataCriacao,
    //             dataAtualizacao: dataAtualizacao,
    //             dataExclusao: dataExclusao,
    //             status: status
    //         };

    //         prismaMock.produto.create.mockResolvedValue(produtoPrisma);

    //         const produto: Produto = ProdutoMap.toDomain(produtoPrisma);

    //         const produtoInserido = await produtoRepositorio.inserir(produto);

    //         expect(produtoInserido).toStrictEqual(produto)
    //         expect(prismaMock.produto.create).toHaveBeenCalledTimes(1);
    //         expect(prismaMock.produto.create).toBeCalledWith({
    //             data: {
    //                 id: produto.id,
    //                 nome: produto.nome
    //             }
    //         });

    //     });

    // });

    // describe('Atualizar Produto', () => {

    //     test('Deve Atualizar Um Produto', async () => {

    //         const produtoPrisma = {
    //             id: UUID,
    //             nome: nome,
    //             descricao: descricao,
    //             valor: valor,
    //             categorias: categorias,
    //             dataCriacao: dataCriacao,
    //             dataAtualizacao: dataAtualizacao,
    //             dataExclusao: dataExclusao,
    //             status: status
    //         };

    //         prismaMock.produto.update.mockResolvedValue(produtoPrisma);

    //         const produto: Produto = ProdutoMap.toDomain(produtoPrisma);

    //         const produtoAtualizado = await produtoRepositorio.atualizar(produto.id, produto);

    //         expect(produtoAtualizado).toBeTruthy()
    //         expect(prismaMock.produto.update).toHaveBeenCalledTimes(1);
    //         expect(prismaMock.produto.update).toBeCalledWith({
    //             where: { id: produto.id },
    //             data: produtoPrisma
    //         });


    //     });

    // });


})

//recuperarPorUuid-
//recuperarTodos-
//existe-
//inserir-
//atualizar-
//deletar
//adicionarCategoria
//removerCategoria
//alterarStatus
//recuperarPorCategoria

/*
TAMANHO_MINIMO_NOME = 5;
public static readonly TAMANHO_MAXIMO_NOME = 50;
public static readonly TAMANHO_MINIMO_DESCRICAO = 10;
public static readonly TAMANHO_MAXIMO_DESCRICAO = 200;
public static readonly VALOR_MINIMO = 0;
public static readonly QTD_MINIMA_CATEGORIAS = 1;
public static readonly QTD_MAXIMA_CATEGORIAS = 3;
*/

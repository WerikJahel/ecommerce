import { faker } from "@faker-js/faker";
import { beforeAll, describe, expect, test } from "vitest";
import { IDEntityUUIDInvalid } from "../../../../shared/domain/domain.exception";
import { Categoria } from "../categoria/categoria.entity";
import { Produto } from "./Produto.entity";
import {
  CategoriaProdutoQuantidadeMaximaInvalida,
  CategoriaProdutoQuantidadeMinimaInvalida,
  DescricaoProdutoTamanhoMaximoInvalido,
  DescricaoProdutoTamanhoMinimoInvalido,
  NomeProdutoTamanhoMaximoInvalido,
  NomeProdutoTamanhoMinimoInvalido,
  ValorProdutoMinimoInvalido,
} from "./produto.exception";
import {
  ProdutoProps,
  RecuperarProdutoProps
} from "./produto.types";

let nomeProdutoValido: string;
let nomeProdutoTamanhoMinimoInvalido: string;
let nomeProdutoTamanhoMaximoInvalido: string;
let descricaoValido: string;
let descricaoTamanhoMinimoInvalido: string;
let descricaoTamanhoMaximoInvalido: string;
let valorValido: number;
let valorMinimoInvalido: number;
let categoriasValidas: Array<Categoria>;
let categoriasQtdMinInvalidas: Array<Categoria>;
let categoriasQtdMaxInvalidas: Array<Categoria>;
let uuidValido: string;
let uuidInvalido: string;

beforeAll(async () => {

  nomeProdutoValido = faker.string.alpha({ length: { min: 5, max: 50 } });
  nomeProdutoTamanhoMinimoInvalido = faker.string.alpha({ length: { min: 0, max: 4 } });
  nomeProdutoTamanhoMaximoInvalido = faker.string.alpha({ length: { min: 51, max: 53 } });
  descricaoValido = faker.string.alpha({ length: { min: 10, max: 200 } });
  descricaoTamanhoMinimoInvalido = faker.string.alpha({ length: { min: 0, max: 9 } });
  descricaoTamanhoMaximoInvalido = faker.string.alpha({ length: { min: 201, max: 203 } });
  valorValido = faker.number.int({ min: 1, max: 3 });
  valorMinimoInvalido = faker.number.int({ min: -10, max: 0 });
  const categoriaValida01 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
  const categoriaValida02 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
  const categoriaValida03 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
  const categoriaValida04 = Categoria.criar({ nome: faker.string.alpha({ length: { min: 3, max: 50 } }) });
  categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], { min: 1, max: 3 });
  categoriasQtdMinInvalidas = [];
  categoriasQtdMaxInvalidas = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03, categoriaValida04], { min: 4, max: 4 });
  uuidValido = faker.string.uuid()
  uuidInvalido = faker.string.alpha({ length: { min: 3, max: 5 } })

})

/////////////////////
///////Produto///////
/////////////////////
describe("Entidade de Dominio: Criar Produto", () => {
  test("Deve criar um Produto válido", async () => {

    const produtoValido: ProdutoProps = {
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    expect(Produto.criar(produtoValido)).to.be.instanceOf(Produto);
  });

  ///Produto inválido: Nome Mínimo///
  ///////////////////////////////////
  test("Não deve criar Produto inválido com nome menor que 5 caracteres", () => {

    const produtoInvalido: ProdutoProps = {
      nome: nomeProdutoTamanhoMinimoInvalido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasValidas
    };

    expect(() => Produto.criar(produtoInvalido)).toThrowError(
      NomeProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Nome Máximo///
  ///////////////////////////////////
  test("Não deve criar Produto inválido com nome maior que 50 caracteres", () => {

    const produtoInvalido: ProdutoProps = {
      nome: nomeProdutoTamanhoMaximoInvalido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoInvalido)).toThrowError(
      NomeProdutoTamanhoMaximoInvalido
    );
  });



  ///Produto Inválido: Descrição mínima///
  ////////////////////////////////////////
  test("Não deve criar Produto inválido com descrição menor que 10 caracteres", () => {

    const produtoInvalido: ProdutoProps = {
      nome: nomeProdutoValido,
      descricao: descricaoTamanhoMinimoInvalido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoInvalido)).toThrowError(
      DescricaoProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Descrição Máxima///
  ////////////////////////////////////////
  test("Não deve criar Produto válido com descrição máximo de 200 caracteres", () => {

    const produtoValido: ProdutoProps = {
      nome: nomeProdutoValido,
      descricao: descricaoTamanhoMaximoInvalido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      DescricaoProdutoTamanhoMaximoInvalido
    );
  });

  ///Produto Inválido: Valor Mínimo///
  ////////////////////////////////////
  test("Não deve criar Produto inválido com valor menor que 0", () => {

    const produtoValido: ProdutoProps = {
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorMinimoInvalido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      ValorProdutoMinimoInvalido
    );
  });

  ///Produto Inválido: Categoria Mínima///
  ////////////////////////////////////////
  test("Não deve criar Produto sem categoria", () => {
    const produtoValido: ProdutoProps = {
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasQtdMinInvalidas,
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      CategoriaProdutoQuantidadeMinimaInvalida
    );
  });

  ///Produto Inválido: Categoria Máxima///
  ////////////////////////////////////////
  test("Não deve criar Produto com mais do que 3 categorias", () => {

    const produtoValido: ProdutoProps = {
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasQtdMaxInvalidas,
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      CategoriaProdutoQuantidadeMaximaInvalida
    );
  });

});

///////////////////////////////
////////RecuperarProduto///////
///////////////////////////////
describe("Entidade de Domínio: Produto (Recuperar)", () => {
  test("Deve Recuperar Uma Produto Válida", async () => {
    //Dado (Given)

    const ProdutoValido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    //Quando (When) e Então (Then)
    expect(Produto.recuperar(ProdutoValido)).to.be.instanceof(Produto);
  });


  ///Produto Inválido: ID Inválido///
  ///////////////////////////////////
  test("Não Deve Recuperar Produto Com ID Inválido (UUID Inválido)", async () => {

    //Dado (Given)
    //Nome menor que três caracteres
    const produtoIdInvalido: RecuperarProdutoProps = {
      id: uuidInvalido,
      nome: nomeProdutoValido,
      descricao: descricaoTamanhoMinimoInvalido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(produtoIdInvalido)).toThrowError(
      IDEntityUUIDInvalid
    );
  });

  ///Produto Inválido: Nome Mínimo///
  ///////////////////////////////////
  test("Não Deve Recuperar Produto Com Nome Inválido (Tamanho Mínimo)", async () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });

    //Dado (Given)
    //Nome menor que três caracteres
    const produtoNomeInvalido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoTamanhoMinimoInvalido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(produtoNomeInvalido)).toThrowError(
      NomeProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Nome Máximo///
  ///////////////////////////////////
  test("Não Deve Recuperar Produto Com Nome Inválido (Tamanho Máximo)", async () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });

    //Dado (Given)
    //Nome maior que 50 caracteres
    const produtoNomeInvalido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoTamanhoMaximoInvalido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(produtoNomeInvalido)).toThrowError(
      NomeProdutoTamanhoMaximoInvalido
    );
  });


  ///Produto Inválido: Descrição mínima///
  ////////////////////////////////////////
  test("Não deve recuperar Produto válido com descrição mínimo de 10 caracteres", () => {

    const produtoDescricaoValido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoValido,
      descricao: descricaoTamanhoMinimoInvalido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoDescricaoValido)).toThrowError(
      DescricaoProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Descrição Máxima///
  ////////////////////////////////////////
  test("Não deve recuperar Produto válido com descrição máximo de 200 caracteres", () => {

    const produtoDescricaoValido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoValido,
      descricao: descricaoTamanhoMaximoInvalido,
      valor: valorValido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoDescricaoValido)).toThrowError(
      DescricaoProdutoTamanhoMaximoInvalido
    );
  });

  ///Produto Inválido: Valor Mínimo///
  ////////////////////////////////////
  test("Não deve recuperar Produto inválido com valor menor que 0", () => {

    const produtoValorValido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorMinimoInvalido,
      categoria: categoriasValidas,
    };

    expect(() => Produto.criar(produtoValorValido)).toThrowError(
      ValorProdutoMinimoInvalido
    );
  });

  ///Produto Inválido: Categoria Mínima///
  ////////////////////////////////////////
  test("Não deve recuperar Produto sem categoria", () => {

    const produtoCategoriaValido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasQtdMinInvalidas,
    };

    expect(() => Produto.criar(produtoCategoriaValido)).toThrowError(
      CategoriaProdutoQuantidadeMinimaInvalida
    );
  });

  ///Produto Inválido: Categoria Máxima///
  ////////////////////////////////////////
  test("Não deve recuperar Produto com mais do que 3 categorias", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoCategoriaValido: RecuperarProdutoProps = {
      id: uuidValido,
      nome: nomeProdutoValido,
      descricao: descricaoValido,
      valor: valorValido,
      categoria: categoriasQtdMaxInvalidas,
    };

    expect(() => Produto.criar(produtoCategoriaValido)).toThrowError(
      CategoriaProdutoQuantidadeMaximaInvalida
    );
  });

});
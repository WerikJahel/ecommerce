"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
const produto_exception_1 = require("../../../../shared/domain/produto.exception");
const categoria_entity_1 = require("../categoria/categoria.entity");
const Produto_entity_1 = require("./Produto.entity");
/////////////////////
///////Produto///////
/////////////////////
(0, vitest_1.describe)("Entidade de Dominio de Produto", () => {
    (0, vitest_1.test)("Deve criar um Produto válido", async () => {
        const produtoValido = {
            nome: "Travesseiro",
            descricao: "Muito grande para ficar escrevendo",
            valor: 20,
            categoria: [],
        };
        (0, vitest_1.expect)(Produto_entity_1.Produto.criar(produtoValido)).to.be.instanceOf(Produto_entity_1.Produto);
    });
    ///Produto inválido: Nome Mínimo///
    ///////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto válido com nome mínimo de 5 caracteres", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoValido = {
            nome: "ca",
            descricao: "qwertyuiopasdfghjklç",
            valor: 12,
            categoria: [categoria, categoria]
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValido)).toThrowError(produto_exception_1.NomeProdutoTamanhoMinimoInvalido);
    });
    ///Produto Inválido: Nome Máximo///
    ///////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto válida com nome máximo de 50 caracteres", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const ProdutoValido = {
            nome: "camaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            descricao: "qwertyuiopasdfghjklç",
            valor: 12,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(ProdutoValido)).toThrowError(produto_exception_1.NomeProdutoTamanhoMaximoInvalido);
    });
    ///Produto Inválido: Descrição mínima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto válido com descrição mínimo de 10 caracteres", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoValido = {
            nome: "cama",
            descricao: "12345",
            valor: 12,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValido)).toThrowError(produto_exception_1.DescricaoProdutoTamanhoMinimoInvalido);
    });
    ///Produto Inválido: Descrição Máxima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto válido com descrição máximo de 200 caracteres", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoValido = {
            nome: "cama",
            descricao: "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            valor: 12,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValido)).toThrowError(produto_exception_1.DescricaoProdutoTamanhoMaximoInvalido);
    });
    ///Produto Inválido: Valor Mínimo///
    ////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto inválido com valor menor que 0", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoValido = {
            nome: "cama",
            descricao: "1234567890",
            valor: -1,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValido)).toThrowError(produto_exception_1.ValorProdutoMinimoInvalido);
    });
    ///Produto Inválido: Categoria Mínima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto sem categoria", () => {
        const produtoValido = {
            nome: "cama",
            descricao: "1234567890",
            valor: 0,
            categoria: [],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValido)).toThrowError(produto_exception_1.CategoriaProdutoQuantidadeMinimaInvalida);
    });
    ///Produto Inválido: Categoria Máxima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto com mais do que 3 categorias", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoValido = {
            nome: "cama",
            descricao: "1234567890",
            valor: 0,
            categoria: [categoria, categoria, categoria, categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValido)).toThrowError(produto_exception_1.CategoriaProdutoQuantidadeMaximaInvalida);
    });
});
///////////////////////////////
////////RecuperarProduto///////
///////////////////////////////
(0, vitest_1.describe)("Entidade de Domínio: Produto (Recuperar)", () => {
    (0, vitest_1.test)("Deve Recuperar Uma Produto Válida", async () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        //Dado (Given)
        const ProdutoValido = {
            id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
            nome: "cama",
            descricao: "qwertyuiopasdfghjklç",
            valor: 12,
            categoria: [categoria],
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(Produto_entity_1.Produto.recuperar(ProdutoValido)).to.be.instanceof(Produto_entity_1.Produto);
    });
    ///Produto Inválido: ID Inválido///
    ///////////////////////////////////
    (0, vitest_1.test)("Não Deve Recuperar Produto Com ID Inválido (UUID Inválido)", async () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        //Dado (Given)
        //Nome menor que três caracteres
        const produtoIdInvalido = {
            id: "1234",
            nome: "cama",
            descricao: "",
            valor: 12,
            categoria: [categoria],
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.recuperar(produtoIdInvalido)).toThrowError(domain_exception_1.IDEntityUUIDInvalid);
    });
    ///Produto Inválido: Nome Mínimo///
    ///////////////////////////////////
    (0, vitest_1.test)("Não Deve Recuperar Produto Com Nome Inválido (Tamanho Mínimo)", async () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        //Dado (Given)
        //Nome menor que três caracteres
        const produtoNomeInvalido = {
            id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
            nome: "ma",
            descricao: "qwertyuiopasdfghjklç",
            valor: 12,
            categoria: [categoria],
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.recuperar(produtoNomeInvalido)).toThrowError(produto_exception_1.NomeProdutoTamanhoMinimoInvalido);
    });
    ///Produto Inválido: Nome Máximo///
    ///////////////////////////////////
    (0, vitest_1.test)("Não Deve Recuperar Produto Com Nome Inválido (Tamanho Máximo)", async () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        //Dado (Given)
        //Nome maior que 50 caracteres
        const produtoNomeInvalido = {
            id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
            nome: "1234567891234567891234567891234567891234567891234561234567890",
            descricao: "qwertyuiopasdfghjklç",
            valor: 12,
            categoria: [categoria],
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.recuperar(produtoNomeInvalido)).toThrowError(produto_exception_1.NomeProdutoTamanhoMaximoInvalido);
    });
    ///Produto Inválido: Descrição mínima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto válido com descrição mínimo de 10 caracteres", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoDescricaoValido = {
            id: "1234567890qwertyuiop",
            nome: "cama",
            descricao: "12345",
            valor: 12,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoDescricaoValido)).toThrowError(produto_exception_1.DescricaoProdutoTamanhoMinimoInvalido);
    });
    ///Produto Inválido: Descrição Máxima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto válido com descrição máximo de 200 caracteres", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoDescricaoValido = {
            id: "1234567890qwertyuiop",
            nome: "cama",
            descricao: "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
            valor: 12,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoDescricaoValido)).toThrowError(produto_exception_1.DescricaoProdutoTamanhoMaximoInvalido);
    });
    ///Produto Inválido: Valor Mínimo///
    ////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto inválido com valor menor que 0", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoValorValido = {
            id: "1234567890qwertyuiop",
            nome: "cama",
            descricao: "1234567890",
            valor: -1,
            categoria: [categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoValorValido)).toThrowError(produto_exception_1.ValorProdutoMinimoInvalido);
    });
    ///Produto Inválido: Categoria Mínima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto sem categoria", () => {
        const produtoCategoriaValido = {
            id: "1234567890qwertyuiop",
            nome: "cama",
            descricao: "1234567890",
            valor: 0,
            categoria: [],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoCategoriaValido)).toThrowError(produto_exception_1.CategoriaProdutoQuantidadeMinimaInvalida);
    });
    ///Produto Inválido: Categoria Máxima///
    ////////////////////////////////////////
    (0, vitest_1.test)("Não deve criar Produto com mais do que 3 categorias", () => {
        let categoria = categoria_entity_1.Categoria.criar({ nome: "ahgdasgdha" });
        const produtoCategoriaValido = {
            id: "1234567890qwertyuiop",
            nome: "cama",
            descricao: "1234567890",
            valor: 0,
            categoria: [categoria, categoria, categoria, categoria],
        };
        (0, vitest_1.expect)(() => Produto_entity_1.Produto.criar(produtoCategoriaValido)).toThrowError(produto_exception_1.CategoriaProdutoQuantidadeMaximaInvalida);
    });
});
//# sourceMappingURL=produto.spec.js.map
import { describe, expect, test } from "vitest";
import { Produto } from "./Produto.entity";
import {
  ProdutoProps,
  RecuperarProdutoProps
} from "./produto.types";
import {
  CategoriaProdutoQuantidadeMaximaInvalida,
  CategoriaProdutoQuantidadeMinimaInvalida,
  DescricaoProdutoTamanhoMaximoInvalido,
  DescricaoProdutoTamanhoMinimoInvalido,
  NomeProdutoTamanhoMaximoInvalido,
  NomeProdutoTamanhoMinimoInvalido,
  ValorProdutoMinimoInvalido,
} from "../../../shared/domain/produto.exception";
import { IDEntityUUIDInvalid } from "../../../shared/domain/domain.exception";
import { Categoria } from "./categoria.entity";

/////////////////////
///////Produto///////
/////////////////////
describe("Entidade de Dominio de Produto", () => {
  test("Deve criar um Produto válido", async () => {
    const produtoValido: ProdutoProps = {
      nome: "Travesseiro",
      descricao: "Muito grande para ficar escrevendo",
      valor: 20,
      categoria: [],
    };

    expect(Produto.criar(produtoValido)).to.be.instanceOf(Produto);
  });

  ///Produto inválido: Nome Mínimo///
  ///////////////////////////////////
  test("Não deve criar Produto válido com nome mínimo de 5 caracteres", () => {

    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });

    const produtoValido: ProdutoProps = {
      nome: "ca",
      descricao: "qwertyuiopasdfghjklç",
      valor: 12,
      categoria: [categoria, categoria]
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      NomeProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Nome Máximo///
  ///////////////////////////////////
  test("Não deve criar Produto válida com nome máximo de 50 caracteres", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const ProdutoValido: ProdutoProps = {
      nome: "camaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      descricao: "qwertyuiopasdfghjklç",
      valor: 12,
      categoria: [categoria],
    };

    expect(() => Produto.criar(ProdutoValido)).toThrowError(
      NomeProdutoTamanhoMaximoInvalido
    );
  });



  ///Produto Inválido: Descrição mínima///
  ////////////////////////////////////////
  test("Não deve criar Produto válido com descrição mínimo de 10 caracteres", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoValido: ProdutoProps = {
      nome: "cama",
      descricao: "12345",
      valor: 12,
      categoria: [categoria],
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      DescricaoProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Descrição Máxima///
  ////////////////////////////////////////
  test("Não deve criar Produto válido com descrição máximo de 200 caracteres", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoValido: ProdutoProps = {
      nome: "cama",
      descricao: "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      valor: 12,
      categoria: [categoria],
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      DescricaoProdutoTamanhoMaximoInvalido
    );
  });

  ///Produto Inválido: Valor Mínimo///
  ////////////////////////////////////
  test("Não deve criar Produto inválido com valor menor que 0", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoValido: ProdutoProps = {
      nome: "cama",
      descricao: "1234567890",
      valor: -1,
      categoria: [categoria],
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      ValorProdutoMinimoInvalido
    );
  });

  ///Produto Inválido: Categoria Mínima///
  ////////////////////////////////////////
  test("Não deve criar Produto sem categoria", () => {
    const produtoValido: ProdutoProps = {
      nome: "cama",
      descricao: "1234567890",
      valor: 0,
      categoria: [],
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      CategoriaProdutoQuantidadeMinimaInvalida
    );
  });

  ///Produto Inválido: Categoria Máxima///
  ////////////////////////////////////////
  test("Não deve criar Produto com mais do que 3 categorias", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoValido: ProdutoProps = {
      nome: "cama",
      descricao: "1234567890",
      valor: 0,
      categoria: [categoria, categoria, categoria, categoria],
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
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });

    //Dado (Given)
    const ProdutoValido: RecuperarProdutoProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "cama",
      descricao: "qwertyuiopasdfghjklç",
      valor: 12,
      categoria: [categoria],
    };

    //Quando (When) e Então (Then)
    expect(Produto.recuperar(ProdutoValido)).to.be.instanceof(Produto);
  });


  ///Produto Inválido: ID Inválido///
  ///////////////////////////////////
  test("Não Deve Recuperar Produto Com ID Inválido (UUID Inválido)", async () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });

    //Dado (Given)
    //Nome menor que três caracteres
    const produtoIdInvalido: RecuperarProdutoProps = {
      id: "1234",
      nome: "cama",
      descricao: "",
      valor: 12,
      categoria: [categoria],
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
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "ma",
      descricao: "qwertyuiopasdfghjklç",
      valor: 12,
      categoria: [categoria],
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
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "1234567891234567891234567891234567891234567891234561234567890",
      descricao: "qwertyuiopasdfghjklç",
      valor: 12,
      categoria: [categoria],
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(produtoNomeInvalido)).toThrowError(
      NomeProdutoTamanhoMaximoInvalido
    );
  });


  ///Produto Inválido: Descrição mínima///
  ////////////////////////////////////////
  test("Não deve criar Produto válido com descrição mínimo de 10 caracteres", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });

    const produtoDescricaoValido: RecuperarProdutoProps = {
      id: "1234567890qwertyuiop",
      nome: "cama",
      descricao: "12345",
      valor: 12,
      categoria: [categoria],
    };

    expect(() => Produto.criar(produtoDescricaoValido)).toThrowError(
      DescricaoProdutoTamanhoMinimoInvalido
    );
  });

  ///Produto Inválido: Descrição Máxima///
  ////////////////////////////////////////
  test("Não deve criar Produto válido com descrição máximo de 200 caracteres", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoDescricaoValido: RecuperarProdutoProps = {
      id: "1234567890qwertyuiop",
      nome: "cama",
      descricao: "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
      valor: 12,
      categoria: [categoria],
    };

    expect(() => Produto.criar(produtoDescricaoValido)).toThrowError(
      DescricaoProdutoTamanhoMaximoInvalido
    );
  });

  ///Produto Inválido: Valor Mínimo///
  ////////////////////////////////////
  test("Não deve criar Produto inválido com valor menor que 0", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoValorValido: RecuperarProdutoProps = {
      id: "1234567890qwertyuiop",
      nome: "cama",
      descricao: "1234567890",
      valor: -1,
      categoria: [categoria],
    };

    expect(() => Produto.criar(produtoValorValido)).toThrowError(
      ValorProdutoMinimoInvalido
    );
  });

  ///Produto Inválido: Categoria Mínima///
  ////////////////////////////////////////
  test("Não deve criar Produto sem categoria", () => {
    const produtoCategoriaValido: RecuperarProdutoProps = {
      id: "1234567890qwertyuiop",
      nome: "cama",
      descricao: "1234567890",
      valor: 0,
      categoria: [],
    };

    expect(() => Produto.criar(produtoCategoriaValido)).toThrowError(
      CategoriaProdutoQuantidadeMinimaInvalida
    );
  });

  ///Produto Inválido: Categoria Máxima///
  ////////////////////////////////////////
  test("Não deve criar Produto com mais do que 3 categorias", () => {
    let categoria: Categoria = Categoria.criar({ nome: "ahgdasgdha" });


    const produtoCategoriaValido: RecuperarProdutoProps = {
      id: "1234567890qwertyuiop",
      nome: "cama",
      descricao: "1234567890",
      valor: 0,
      categoria: [categoria, categoria, categoria, categoria],
    };

    expect(() => Produto.criar(produtoCategoriaValido)).toThrowError(
      CategoriaProdutoQuantidadeMaximaInvalida
    );
  });

});
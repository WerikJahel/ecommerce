import { describe, expect, test } from "vitest";
import { Produto } from "./Produto.entity";
import {
  ProdutoProps,
  RecuperarProdutoProps
} from "./Produto.types";
import {
  NomeCategoriaTamanhoMaximoInvalido,
  NomeCategoriaTamanhoMinimoInvalido,
} from "../../../shared/domain/categoria.exception";
import { IDEntityUUIDInvalid } from "../../../shared/domain/domain.exception";

describe("Entidade de Dominio de Produto", () => {
  test("Deve criar um Produto válida", async () => {
    const produtoValido: ProdutoProps = {
      nome: "Travesseiro",
      descricao: "Muito grande para ficar escrevendo",
      valor: 20,
      categoria: Categoria[["cama"]];
    };

    expect(Produto.criar(categoriaValido)).to.be.instanceOf(Produto);
  });

  test("Não deve criar Categoria válida com nome mínimo", () => {
    const produtoValido: ProdutoProps = {
      nome: "ca",
    };

    expect(() => Produto.criar(produtoValido)).toThrowError(
      NomeProdutoTamanhoMinimoInvalido
    );
  });

  test("Não deve criar Categoria válida com nome máximo", () => {
    const ProdutoValido: ProdutoProps = {
      nome: "camaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    };

    expect(() => Produto.criar(ProdutoValido)).toThrowError(
      NomeProdutoTamanhoMaximoInvalido
    );
  });
});

describe("Entidade de Domínio: Categoria (Recuperar)", () => {
  test("Deve Recuperar Uma Categoria Válida", async () => {
    //Dado (Given)
    const ProdutoValido: RecuperarProdutoProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "cama",
    };

    //Quando (When) e Então (Then)
    expect(Produto.recuperar(ProdutoValido)).to.be.instanceof(Produto);
  });

  test("Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)", async () => {
    //Dado (Given)
    //Nome menor que três caracteres
    const categoriaIdInvalido: RecuperarProdutoProps = {
      id: "1234",
      nome: "cama",
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(categoriaIdInvalido)).toThrowError(
      IDEntityUUIDInvalid
    );
  });

  test("Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)", async () => {
    //Dado (Given)
    //Nome menor que três caracteres
    const categoriaNomeInvalido: RecuperarProdutoProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "ma",
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(categoriaNomeInvalido)).toThrowError(
      NomeCategoriaTamanhoMinimoInvalido
    );
  });

  test("Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)", async () => {
    //Dado (Given)
    //Nome maior que 50 caracteres
    const categoriaNomeInvalido: RecuperarProdutoProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "123456789123456789123456789123456789123456789123456",
    };

    //Quando (When) e Então (Then)
    expect(() => Produto.recuperar(categoriaNomeInvalido)).toThrowError(
      NomeCategoriaTamanhoMaximoInvalido
    );
  });
});

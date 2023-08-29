import { describe, expect, test } from "vitest";
import { Categoria } from "./categoria.entity";
import {
  CreateCategoryProps,
  RecuperarCategoriaProps,
} from "./categoria.types";
import {
  NomeCategoriaTamanhoMaximoInvalido,
  NomeCategoriaTamanhoMinimoInvalido,
} from "./categoria.exception";
import { IDEntityUUIDInvalid } from "../../../../shared/domain/domain.exception";

describe("Entidade de Dominio de Categoria", () => {
  test("Deve criar um Categoria válida", async () => {
    const categoriaValida: CreateCategoryProps = {
      nome: "cama",
    };

    expect(Categoria.criar(categoriaValida)).to.be.instanceOf(Categoria);
  });

  test("Não deve criar Categoria válida com nome mínimo", () => {
    const categoriaValida: CreateCategoryProps = {
      nome: "ca",
    };

    expect(() => Categoria.criar(categoriaValida)).toThrowError(
      NomeCategoriaTamanhoMinimoInvalido
    );
  });

  test("Não deve criar Categoria válida com nome máximo", () => {
    const categoriaValida: CreateCategoryProps = {
      nome: "camaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    };

    expect(() => Categoria.criar(categoriaValida)).toThrowError(
      NomeCategoriaTamanhoMaximoInvalido
    );
  });
});

describe("Entidade de Domínio: Categoria (Recuperar)", () => {
  test("Deve Recuperar Uma Categoria Válida", async () => {
    //Dado (Given)
    const categoriaValida: RecuperarCategoriaProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "cama",
    };

    //Quando (When) e Então (Then)
    expect(Categoria.recuperar(categoriaValida)).to.be.instanceof(Categoria);
  });

  test("Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)", async () => {
    //Dado (Given)
    //Nome menor que três caracteres
    const categoriaIdInvalido: RecuperarCategoriaProps = {
      id: "1234",
      nome: "cama",
    };

    //Quando (When) e Então (Then)
    expect(() => Categoria.recuperar(categoriaIdInvalido)).toThrowError(
      IDEntityUUIDInvalid
    );
  });

  test("Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)", async () => {
    //Dado (Given)
    //Nome menor que três caracteres
    const categoriaNomeInvalido: RecuperarCategoriaProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "ma",
    };

    //Quando (When) e Então (Then)
    expect(() => Categoria.recuperar(categoriaNomeInvalido)).toThrowError(
      NomeCategoriaTamanhoMinimoInvalido
    );
  });

  test("Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)", async () => {
    //Dado (Given)
    //Nome maior que 50 caracteres
    const categoriaNomeInvalido: RecuperarCategoriaProps = {
      id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
      nome: "123456789123456789123456789123456789123456789123456",
    };

    //Quando (When) e Então (Then)
    expect(() => Categoria.recuperar(categoriaNomeInvalido)).toThrowError(
      NomeCategoriaTamanhoMaximoInvalido
    );
  });
});

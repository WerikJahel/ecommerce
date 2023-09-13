import { faker } from "@faker-js/faker";
import { beforeAll, describe, expect, test } from "vitest";
import { IDEntityUUIDInvalid } from "../../../../shared/domain/domain.exception";
import { Categoria } from "./categoria.entity";
import {
  NomeCategoriaTamanhoMaximoInvalido,
  NomeCategoriaTamanhoMinimoInvalido,
} from "./categoria.exception";
import {
  CreateCategoryProps,
  RecuperarCategoriaProps,
} from "./categoria.types";

let nomeCategoriaValido: string;
let nomeCategoriaTamanhoMinimoInvalido: string;
let nomeCategoriaTamanhoMaximoInvalido: string;
let uuidValido: string;
let uuidInvalido: string;

beforeAll(async () => {

  nomeCategoriaValido = faker.string.alpha({ length: { min: 3, max: 50 } });
  nomeCategoriaTamanhoMinimoInvalido = faker.string.alpha({ length: { min: 0, max: 4 } })
  nomeCategoriaTamanhoMaximoInvalido = faker.string.alpha({ length: { min: 50, max: 52 } })
  uuidValido = faker.string.uuid()
  uuidInvalido = faker.string.alpha({ length: { min: 3, max: 5 } })

})

describe("Entidade de Dominio de Categoria", () => {
  test("Deve criar um Categoria válida", async () => {
    const categoriaValida: CreateCategoryProps = {
      nome: nomeCategoriaValido
    };

    expect(Categoria.criar(categoriaValida)).to.be.instanceOf(Categoria);
  });

  test("Não deve criar Categoria válida com nome mínimo", () => {
    const categoriaValida: CreateCategoryProps = {
      nome: nomeCategoriaTamanhoMinimoInvalido,
    };

    expect(() => Categoria.criar(categoriaValida)).toThrowError(
      NomeCategoriaTamanhoMinimoInvalido
    );
  });

  test("Não deve criar Categoria válida com nome máximo", () => {
    const categoriaValida: CreateCategoryProps = {
      nome: nomeCategoriaTamanhoMaximoInvalido,
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
      id: uuidValido,
      nome: nomeCategoriaValido,
    };

    //Quando (When) e Então (Then)
    expect(Categoria.recuperar(categoriaValida)).to.be.instanceof(Categoria);
  });

  test("Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)", async () => {
    //Dado (Given)
    //Nome menor que três caracteres
    const categoriaIdInvalido: RecuperarCategoriaProps = {
      id: uuidInvalido,
      nome: nomeCategoriaValido,
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
      id: uuidValido,
      nome: nomeCategoriaTamanhoMinimoInvalido,
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
      id: uuidValido,
      nome: nomeCategoriaTamanhoMaximoInvalido,
    };

    //Quando (When) e Então (Then)
    expect(() => Categoria.recuperar(categoriaNomeInvalido)).toThrowError(
      NomeCategoriaTamanhoMaximoInvalido
    );
  });
});

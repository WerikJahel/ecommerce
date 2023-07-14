import { describe, expect, test } from "vitest";
import { Categoria } from "./categoria.entity";
import { CreateCategoryProps } from "./categoria.types";
import {
  NomeCategoriaTamanhoMaximoInvalido,
  NomeCategoriaTamanhoMinimoInvalido,
} from "../../../shared/domain/categoria.exception";

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

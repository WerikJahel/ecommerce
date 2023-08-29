"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const categoria_entity_1 = require("./categoria.entity");
const categoria_exception_1 = require("../../../../shared/domain/categoria.exception");
const domain_exception_1 = require("../../../../shared/domain/domain.exception");
(0, vitest_1.describe)("Entidade de Dominio de Categoria", () => {
    (0, vitest_1.test)("Deve criar um Categoria válida", async () => {
        const categoriaValida = {
            nome: "cama",
        };
        (0, vitest_1.expect)(categoria_entity_1.Categoria.criar(categoriaValida)).to.be.instanceOf(categoria_entity_1.Categoria);
    });
    (0, vitest_1.test)("Não deve criar Categoria válida com nome mínimo", () => {
        const categoriaValida = {
            nome: "ca",
        };
        (0, vitest_1.expect)(() => categoria_entity_1.Categoria.criar(categoriaValida)).toThrowError(categoria_exception_1.NomeCategoriaTamanhoMinimoInvalido);
    });
    (0, vitest_1.test)("Não deve criar Categoria válida com nome máximo", () => {
        const categoriaValida = {
            nome: "camaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        };
        (0, vitest_1.expect)(() => categoria_entity_1.Categoria.criar(categoriaValida)).toThrowError(categoria_exception_1.NomeCategoriaTamanhoMaximoInvalido);
    });
});
(0, vitest_1.describe)("Entidade de Domínio: Categoria (Recuperar)", () => {
    (0, vitest_1.test)("Deve Recuperar Uma Categoria Válida", async () => {
        //Dado (Given)
        const categoriaValida = {
            id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
            nome: "cama",
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(categoria_entity_1.Categoria.recuperar(categoriaValida)).to.be.instanceof(categoria_entity_1.Categoria);
    });
    (0, vitest_1.test)("Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)", async () => {
        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaIdInvalido = {
            id: "1234",
            nome: "cama",
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(() => categoria_entity_1.Categoria.recuperar(categoriaIdInvalido)).toThrowError(domain_exception_1.IDEntityUUIDInvalid);
    });
    (0, vitest_1.test)("Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)", async () => {
        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaNomeInvalido = {
            id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
            nome: "ma",
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(() => categoria_entity_1.Categoria.recuperar(categoriaNomeInvalido)).toThrowError(categoria_exception_1.NomeCategoriaTamanhoMinimoInvalido);
    });
    (0, vitest_1.test)("Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)", async () => {
        //Dado (Given)
        //Nome maior que 50 caracteres
        const categoriaNomeInvalido = {
            id: "5edbc79d-b724-4a39-a29b-0bfb2386920a",
            nome: "123456789123456789123456789123456789123456789123456",
        };
        //Quando (When) e Então (Then)
        (0, vitest_1.expect)(() => categoria_entity_1.Categoria.recuperar(categoriaNomeInvalido)).toThrowError(categoria_exception_1.NomeCategoriaTamanhoMaximoInvalido);
    });
});
//# sourceMappingURL=categoria.spec.js.map
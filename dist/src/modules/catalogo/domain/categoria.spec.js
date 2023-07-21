"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const categoria_entity_1 = require("./categoria.entity");
const categoria_exception_1 = require("../../../shared/domain/categoria.exception");
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
//# sourceMappingURL=categoria.spec.js.map
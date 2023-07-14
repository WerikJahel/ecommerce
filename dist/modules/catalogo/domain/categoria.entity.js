"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categoria = void 0;
class Categoria {
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get nome() {
        return this._nome;
    }
    set nome(value) {
        if (value === null || value === undefined) {
            throw new Error(`${value} é nulo ou indefinido.`);
        }
        if (value.trim().length < 3) {
            throw new Error(`O nome da categoria não possuí um tamanho mínimo válido.`);
        }
        if (value.trim().length > 50) {
            throw new Error(`O nome da categoria não possuí um tamanho máximo válido.`);
        }
        else {
            this._nome = value;
            console.log(`"${value}" inserido com sucesso.`);
        }
    }
    constructor(props) {
        this.id = props.id;
        this.nome = props.nome;
    }
    static create(props) {
        let id = "123456";
        let { nome } = props;
        return new Categoria({ id, nome });
    }
}
exports.Categoria = Categoria;
//# sourceMappingURL=categoria.entity.js.map
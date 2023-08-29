//Desafio

import { Categoria } from "../categoria/categoria.entity";

interface IProduto {
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categoria: Array<Categoria>;
}

type ProdutoProps = Omit<IProduto, "id">;

type RecuperarProdutoProps = Required<IProduto>;

export { IProduto, ProdutoProps, RecuperarProdutoProps };

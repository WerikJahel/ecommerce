//Desafio

import { Categoria } from "./categoria.entity";

interface IProduto {
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categoria: Categoria[];
}

type ProdutoProps = Omit<IProduto, "id">;

type RecuperarProdutoProps = Required<IProduto>;

export { IProduto, ProdutoProps, RecuperarProdutoProps };

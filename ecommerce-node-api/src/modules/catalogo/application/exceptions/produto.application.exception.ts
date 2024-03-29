import { ApplicationException } from "@shared/application/application.exception";

class ProdutoApplicationException extends ApplicationException {
    constructor(message: string = '⚠️ Exceção de Aplicação Genérica da Entidade Produto') {
        super(message);
        this.name = 'ProdutoApplicationException'
        this.message = message;
    }
}

class ProdutoNaoEncontrada extends ProdutoApplicationException {
    public constructor(message: string = '⚠️ A produto não foi encontrada na base de dados.') {
        super(message);
        this.name = 'ProdutoNaoEncontrada'
        this.message = message;
    }
}

const ProdutoApplicationExceptions = {
    ProdutoNaoEncontrada: ProdutoNaoEncontrada
}

export {
    ProdutoApplicationExceptions
}
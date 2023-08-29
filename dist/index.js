"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categoria_entity_1 = require("./modules/catalogo/domain/categoria/categoria.entity");
const categoria_map_1 = require("./modules/catalogo/mapper/categoria.map");
const domain_exception_1 = require("./shared/domain/domain.exception");
const fs_1 = require("fs");
try {
    /////////////////////////
    //Criando uma Categoria//
    /////////////////////////
    let categoria;
    categoria = categoria_entity_1.Categoria.criar({ nome: "cama" });
    console.log(categoria);
    /////////////////////////////
    //Recuperando uma Categoria//
    /////////////////////////////
    let propsCategoria = {
        id: "5fac700e-2783-4682-99cf-0c9c1d9675b0",
        nome: "mesáa",
    };
    let categoria2 = categoria_entity_1.Categoria.recuperar(propsCategoria);
    console.log(categoria2);
    console.log(categoria.equals(categoria2));
    //////////////////////////////////////////////////////
    //Persistinto e Recuperando em Arquivo - File System//
    //////////////////////////////////////////////////////
    let arrayCategorias = [];
    arrayCategorias.push(categoria.toDTO());
    arrayCategorias.push(categoria2.toDTO());
    (0, fs_1.writeFile)("categorias.json", JSON.stringify(arrayCategorias), function (error) {
        if (error)
            throw error;
        console.log("Arquivo Salvo com Sucesso!");
        (0, fs_1.readFile)("categorias.json", (error, dadoGravadoArquivo) => {
            if (error)
                throw error;
            console.log("Leitura de Arquivo!");
            let categoriasSalvas = JSON.parse(dadoGravadoArquivo.toString());
            categoriasSalvas.forEach((categoriaJSON) => {
                // console.log(categoriaJSON);
                console.log(categoria_map_1.CategoriaMap.toDomain(categoriaJSON));
            });
        });
    });
}
catch (error) {
    if (error instanceof domain_exception_1.DomainException) {
        console.log("Exceção de Domínio---------------------");
        console.log(error.message);
    }
    else {
        console.log("Outras Exceções ----------------------");
        console.log(error.message);
    }
}
finally {
    console.log("Ação que deve ser executada em caso de sucesso e em caso de exceção");
}
//# sourceMappingURL=index.js.map
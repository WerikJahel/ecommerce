import { Categoria } from "./modules/catalogo/domain/categoria.entity";
import { DomainException } from "./shared/domain/domain.exception";

try {
  let categoria: Categoria;
  categoria = Categoria.criar({ nome: "cama" });
  console.log(categoria);

  let propsCategoria = {
    id: "1234",
    nome: "Mesa",
  };
  let categoria2: Categoria = Categoria.recuperar(propsCategoria);
  console.log(categoria2);
} catch (error: any) {
  if (error instanceof DomainException) {
    console.log(error.message);
  }
} finally {
  console.log(
    "Ação que deve ser executada em caso de sucesso e em caso de exceção"
  );
}

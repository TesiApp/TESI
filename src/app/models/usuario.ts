//classe para criar modelos de objetos
export class Model {
  constructor(objeto?) {
    Object.assign(this, objeto);
  }
}
//classe usuario extendendo a classe Model
export class Usuario extends Model {
  codigo: number;
  nome: string;
  email: string;
  login: string;
  senha: string;
  favoritos: number[];
}

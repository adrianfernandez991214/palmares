import { ICategoria } from "./categoria.interface";
import { IPlatillo } from "./platillo.interface";

export interface IServicio {
  nombre: string;
  categorias: ICategoria[];
}

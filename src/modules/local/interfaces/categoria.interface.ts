import { IPlatillo } from "./platillo.interface";

export interface ICategoria {
    nombre: string;
    platillos: IPlatillo[];
}

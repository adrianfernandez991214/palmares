import { IPregunta } from "./pregunta.interface";

export interface IEncuesta {
    nombre?: string;
    descripcion?: string;
    preguntas?: IPregunta[];
    deletedAt?: Date;
}

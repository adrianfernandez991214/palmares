import { IServicio } from "./servicio.interface";

export interface ILocal {
    nombre?: string;
    descripcion?: string;
    direccion?: string;
    numero_contacto?: string;
    correo?: string;
    imagenes?: string[];
    servicios?: IServicio[];
    encuestaId?: string;
    deletedAt?: Date;
}

import { IsNotEmpty, IsString } from 'class-validator';
import { servicioDTO } from './servicio.dto';

export class localDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  numero_contacto: string;

  @IsString()
  @IsNotEmpty()
  correo: string;

  @IsNotEmpty()
  servicios: servicioDTO[];

  @IsString()
  @IsNotEmpty()
  encuestaId: string;
}

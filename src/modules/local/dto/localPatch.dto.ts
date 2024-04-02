import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { servicioDTO } from './servicio.dto';

export class localPatchDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  numero_contacto: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  correo: string;

  @IsNotEmpty()
  @IsOptional()
  servicios: servicioDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  encuestaId: string;
}

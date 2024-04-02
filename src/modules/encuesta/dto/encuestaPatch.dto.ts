import { IsNotEmpty, IsString, ArrayNotEmpty, IsOptional } from 'class-validator';
import { preguntaDTO } from './pregunta.dto';

export class encuestaPatchDTO {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descripcion?: string;

  @ArrayNotEmpty()
  @IsOptional()
  preguntas?: preguntaDTO[];
}

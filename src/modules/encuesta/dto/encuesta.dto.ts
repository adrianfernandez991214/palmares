import { IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';
import { preguntaDTO } from './pregunta.dto';

export class encuestaDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ArrayNotEmpty()
  preguntas: preguntaDTO[];
}

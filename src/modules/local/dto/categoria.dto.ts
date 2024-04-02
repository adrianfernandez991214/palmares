import { IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';
import { platilloDTO } from './platillo.dto';

export class categoriaDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ArrayNotEmpty()
  platillos: platilloDTO[];
}

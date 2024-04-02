import { IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';
import { categoriaDTO } from './categoria.dto';

export class servicioDTO {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ArrayNotEmpty()
  categorias: categoriaDTO[];
}

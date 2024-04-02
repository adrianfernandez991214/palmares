import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  ArrayNotEmpty,
} from 'class-validator';

export class platilloDTO {
  @IsString()
  @IsNotEmpty()
  nombre_es: string;

  @IsString()
  @IsNotEmpty()
  nombre_en: string;

  @IsBoolean()
  disponible: boolean;

  @IsNumber()
  precio: number;

  @IsString({ each: true })
  @ArrayNotEmpty()
  ingredientes_es: string[];

  @IsString({ each: true })
  @ArrayNotEmpty()
  ingredientes_en: string[];
}

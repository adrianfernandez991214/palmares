import { IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';

export class preguntaDTO {
  @IsString()
  @IsNotEmpty()
  pregunta_es: string;

  @IsString()
  @IsNotEmpty()
  pregunta_en: string;

  @IsString({ each: true })
  @ArrayNotEmpty()
  opciones: string[];
}

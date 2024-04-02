import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { isObjectId } from 'src/common/functions/validators';
import { EncuestaService } from '../services/encuesta.service';
import { encuestaDTO } from '../dto/encuesta.dto';
import { encuestaPatchDTO } from '../dto/encuestaPatch.dto';

@Controller('palmares_api/encuesta')
export class EncuestaController {
  constructor(private readonly encuestaService: EncuestaService) {}

  @Post()
  async create(@Body() encuesta: encuestaDTO) {
    const response = await this.encuestaService.create(encuesta);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Encuesta creado con éxito.',
    };
  }

  @Get()
  async findAll(@Query('limit') limit = 10, @Query('page') page = 0) {
    const response = await this.encuestaService.findAll(limit, page);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Encuestas obtenido correctamente.',
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const response = await this.encuestaService.find(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Encuesta obtenido correctamente.',
    };
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() encuesta: encuestaPatchDTO) {
    const response = await this.encuestaService.patch(isObjectId(id), encuesta);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Local actualizado con éxito.',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.encuestaService.delete(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Local eliminado con éxito.',
    };
  }
}

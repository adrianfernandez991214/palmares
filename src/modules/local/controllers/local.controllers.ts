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
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Response } from 'express';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { localDTO } from '../dto/local.dto';
import { LocalService } from '../services/local.services';
import { isObjectId } from 'src/common/functions/validators';
import { localPatchDTO } from '../dto/localPatch.dto';

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ['.avi', '.mp4', '.jpg', '.png'];
  const ext = extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new BadRequestException('Tipo de archivo no admitido'));
  }
};

@Controller('palmares_api/local')
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  async create(@Body() local: localDTO) {
    const response = await this.localService.create(local);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Local creado con éxito.',
    };
  }

  @Get()
  async findAll(@Query('limit') limit = 10, @Query('page') page = 0) {
    const response = await this.localService.findAll(limit, page);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Locales obtenido correctamente.',
    };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const response = await this.localService.find(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Local obtenido correctamente.',
    };
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, `${uuidv4()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: fileFilter,
    }),
  )
  @Post('file/:id')
  async uploadFile(
    @UploadedFile() file: uploadedFile,
    @Param('id') id: string,
  ) {
    const allowedExtensions = ['.jpg', '.png'];
    const ext = extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(ext)) {
      const { imagenes } = await this.localService.find(isObjectId(id));

      const response = await this.localService.patch(isObjectId(id), {
        imagenes: [...imagenes, file.filename],
      });

      return {
        statusCode: HttpStatus.OK,
        data: response,
        message: 'Terminal updated successfully.',
      };
    } else {
      throw new BadRequestException('Extension no permitida(.jpg, .png)');
    }
  }

  @Get('file/:nombreArchivo')
  downloadFile(
    @Param('nombreArchivo') nombreArchivo: string,
    @Res() res: Response,
  ) {
    return of(res.sendFile(join(process.cwd(), 'uploads/' + nombreArchivo)));
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() local: localPatchDTO) {
    const response = await this.localService.patch(isObjectId(id), local);
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Local actualizado con éxito.',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const response = await this.localService.delete(isObjectId(id));
    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: 'Local eliminado con éxito.',
    };
  }
}

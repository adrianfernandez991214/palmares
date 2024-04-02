import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Encuesta } from 'src/schema';
import { IEncuesta } from '../interfaces/encuesta.interface';

export class EncuestaRepository {
  private readonly logger = new Logger('EncuestaRepository');

  constructor(
    @InjectModel(Encuesta.name)
    public encuestaModel: Model<Encuesta>,
  ) {}

  async create(encuesta: IEncuesta): Promise<IEncuesta> {
    try {
      return (await this.encuestaModel.create(encuesta)).toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.encuestaModel
        .find({ deletedAt: null })
        .skip(Number(page))
        .limit(Number(limit));
    } catch (error) {
      this.handleError(error);
    }
  }

  async find(id: Types.ObjectId): Promise<IEncuesta> {
    try {
      const encuesta = await this.findEncuesta(id);

      return encuesta.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(id: Types.ObjectId, encuesta: IEncuesta): Promise<IEncuesta> {
    try {
      return await this.updateEncuesta(id, encuesta);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      const term = await this.findEncuesta(id);
      term.deletedAt = new Date();
      await term.save();

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async findEncuesta(id: Types.ObjectId) {
    const encuesta = await this.encuestaModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!encuesta) {
      throw new BadRequestException('Encuesta no existe');
    }
    return encuesta;
  }

  private async updateEncuesta(id: Types.ObjectId, encuesta: IEncuesta) {

    console.log(encuesta);
    
    const encuestaUpdated = await this.encuestaModel.findByIdAndUpdate(
      id,
      encuesta,
      { new: true },
    );

    return encuestaUpdated.toJSON();
  }

  private handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}

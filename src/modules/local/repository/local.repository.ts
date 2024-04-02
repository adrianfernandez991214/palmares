import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { Encuesta, Local } from 'src/schema';
import { ILocal } from '../interfaces/local.interface';
import { isObjectId } from '../../../common/functions/validators';

export class LocalRepository {
  private readonly logger = new Logger('LocalRepository');

  constructor(
    @InjectModel(Local.name)
    public localModel: Model<Local>,
    @InjectModel(Encuesta.name)
    public encuestaModel: Model<Encuesta>,
  ) {}

  async create(local: ILocal): Promise<ILocal> {
    try {
      await this.findEncuesta(isObjectId(local.encuestaId))
      return (await this.localModel.create(local)).toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.localModel
        .find({ deletedAt: null })
        .skip(Number(page))
        .limit(Number(limit));
    } catch (error) {
      this.handleError(error);
    }
  }

  async find(id: Types.ObjectId): Promise<ILocal> {
    try {
      const term = await this.findLocal(id);

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  async patch(id: Types.ObjectId, local: ILocal): Promise<ILocal> {
    try {
      if (local.encuestaId) {
        await this.findEncuesta(isObjectId(local.encuestaId))
      }
      return await this.updateLocal(id, local);
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      const term = await this.findLocal(id);
      // We update the deletedAt field with the current date and time
      term.deletedAt = new Date();
      await term.save();

      return term.toJSON();
    } catch (error) {
      this.handleError(error);
    }
  }

  private async findLocal(id: Types.ObjectId) {
    const personalidad = await this.localModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!personalidad) {
      throw new BadRequestException('Local not exist');
    }
    return personalidad;
  }

  private async updateLocal(id: Types.ObjectId, local: ILocal) {
    const personalidadUpdated = await this.localModel.findByIdAndUpdate(
      id,
      local,
      { new: true },
    );

    return personalidadUpdated.toJSON();
  }

  private async findEncuesta(id: Types.ObjectId) {
    const platillo = await this.encuestaModel.findOne({
      _id: id,
      deletedAt: null,
    });
    if (!platillo) {
      throw new BadRequestException('La encuesta no existe');
    }
    return platillo;
  }

  private handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}

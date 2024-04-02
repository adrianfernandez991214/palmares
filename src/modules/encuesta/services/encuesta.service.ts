import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { EncuestaRepository } from '../repository/encuesta.repository';
import { IEncuesta } from '../interfaces/encuesta.interface';

@Injectable()
export class EncuestaService {
  private readonly logger = new Logger('EncuestaService');

  constructor(private encuestaRepository: EncuestaRepository) {}

  async create(encuesta: IEncuesta) {
    try {
      return await this.encuestaRepository.create(encuesta);
    } catch (e) {
      this.handleError(e);
    }
  }

  async findAll(limit: number, page: number) {
    try {
      return await this.encuestaRepository.findAll(limit, page);
    } catch (e) {
      this.handleError(e);
    }
  }

  async find(id: Types.ObjectId) {
    try {
      return await this.encuestaRepository.find(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  async patch(id: Types.ObjectId, encuesta: IEncuesta) {
    try {
      return await this.encuestaRepository.patch(id, encuesta);
    } catch (e) {
      this.handleError(e);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      return await this.encuestaRepository.delete(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}

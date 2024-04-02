import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ILocal } from '../interfaces/local.interface';
import { LocalRepository } from '../repository/local.repository';

@Injectable()
export class LocalService {
  private readonly logger = new Logger('LocalService');

  constructor(private localRepository: LocalRepository) {}

  async create(local: ILocal) {
    try {
      return await this.localRepository.create(local);
    } catch (e) {
      this.handleError(e);
    }
  }

  async findAll(limit: number, page: number) {
    try {
       return await this.localRepository.findAll(limit, page);
    } catch (e) {
      this.handleError(e);
    }
  }

  async find(id: Types.ObjectId) {
    try {
      return await this.localRepository.find(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  async patch(id: Types.ObjectId, local: ILocal) {
    try {
      return await this.localRepository.patch(id, local);
    } catch (e) {
      this.handleError(e);
    }
  }

  async delete(id: Types.ObjectId) {
    try {
      return await this.localRepository.delete(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  handleError(e: Error): never {
    this.logger.error(e.message);
    throw new InternalServerErrorException(e.message);
  }
}

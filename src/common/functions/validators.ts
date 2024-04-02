import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export const isObjectId = (terminalId: string): Types.ObjectId => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  if (!objectIdRegex.test(terminalId)) {
    throw new BadRequestException('El id debe ser un id de mongodb.');
  }
  return Types.ObjectId.createFromHexString(terminalId);
};

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Encuesta, EncuestaSchema } from 'src/schema/encuesta.schema';
import { EncuestaController } from './controllers/encuesta.controller';
import { EncuestaService } from './services/encuesta.service';
import { EncuestaRepository } from './repository/encuesta.repository';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forFeature([
      { name: Encuesta.name, schema: EncuestaSchema },
    ]),
  ],
  controllers: [EncuestaController],
  providers: [EncuestaService, EncuestaRepository],
  exports: [EncuestaService],
})
export class encuestaModule {}

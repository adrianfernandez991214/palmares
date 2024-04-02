import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Local, LocalSchema, Encuesta, EncuestaSchema } from 'src/schema';
import { LocalController } from './controllers/local.controllers';
import { LocalService } from './services/local.services';
import { LocalRepository } from './repository/local.repository';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  imports: [
    ConfigurationModule,
    MongooseModule.forFeature([
      { name: Local.name, schema: LocalSchema },
    ]),
    MongooseModule.forFeature([
      { name: Encuesta.name, schema: EncuestaSchema },
    ]),
  ],
  controllers: [LocalController],
  providers: [LocalService, LocalRepository],
  exports: [],
})
export class LocalModule {}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Servicio, ServicioSchema  } from './servicio.schema';


export type LocalDocument = HydratedDocument<Local>;

@Schema({ timestamps: true })
export class Local {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;

  @Prop({ type: String, required: true })
  direccion: string;

  @Prop({ type: String, required: true })
  numero_contacto: string;

  @Prop({ type: String })
  correo: string;

  @Prop({ type: [String] })
  imagenes: string[];

  @Prop({ type: [ ServicioSchema ], schemaName: 'Servicio', ref: 'Servicio', required: true })
  servicios: Servicio[];

  @Prop({ type: 'ObjectId', ref: 'Encuesta', required: true })
  encuestaId: string;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const LocalSchema = SchemaFactory.createForClass(Local);

LocalSchema.set('toJSON', {
    transform(_doc, result) {
      const { _id, __v, ...rest } = result;
      return { id: _id, ...rest };
    },
  });
  
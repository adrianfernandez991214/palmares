import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Pregunta, PreguntaSchema } from './pregunta.schema';

export type EncuestaDocument = HydratedDocument<Encuesta>;

@Schema({ timestamps: true })
export class Encuesta {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: String, required: true })
  descripcion: string;
  
  @Prop({ type: [PreguntaSchema], required: true })
  preguntas: Pregunta[];

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const EncuestaSchema = SchemaFactory.createForClass(Encuesta);

EncuestaSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, __v, ...rest } = result;
    return { id: _id, ...rest };
  },
});

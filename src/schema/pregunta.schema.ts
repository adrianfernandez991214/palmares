import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PreguntaDocument = HydratedDocument<Pregunta>;

@Schema({ timestamps: true })
export class Pregunta {
  @Prop({ type: String, required: true })
  pregunta_es: string;

  @Prop({ type: String, required: true })
  pregunta_en: string;

  @Prop({ type: [String], required: true })
  opciones: string[];
}

export const PreguntaSchema = SchemaFactory.createForClass(Pregunta);

PreguntaSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, __v, ...rest } = result;
    return { id: _id, ...rest };
  },
});

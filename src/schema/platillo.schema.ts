import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type PlatilloDocument = HydratedDocument<Platillo>;

@Schema({ timestamps: true })
export class Platillo {
  @Prop({ type: String, required: true })
  nombre_es: string;

  @Prop({ type: String, required: true })
  nombre_en: string;

  @Prop({ type: Boolean, required: true })
  disponible: boolean;

  @Prop({ type: Number, required: true })
  precio: number;

  @Prop({ type: [String], required: true })
  ingredientes_es: string[];

  @Prop({ type: [String], required: true })
  ingredientes_en: string[];
}

export const PlatilloSchema = SchemaFactory.createForClass(Platillo);

PlatilloSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, __v, ...rest } = result;
    return { id: _id, ...rest };
  },
});

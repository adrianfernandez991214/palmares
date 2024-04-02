import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Platillo, PlatilloSchema } from './platillo.schema';

export type CategoriaDocument = HydratedDocument<Categoria>;

@Schema({ timestamps: true })
export class Categoria {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: [PlatilloSchema], required: true })
  platillos: Platillo[];
}

export const CategoriaSchema = SchemaFactory.createForClass(Categoria);

CategoriaSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, __v, ...rest } = result;
    return { id: _id, ...rest };
  },
});

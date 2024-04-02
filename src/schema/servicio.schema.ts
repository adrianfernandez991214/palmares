import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Categoria, CategoriaSchema } from './categoria.schema';

export type ServicioDocument = HydratedDocument<Servicio>;

@Schema({ timestamps: true })
export class Servicio {
  @Prop({ type: String, required: true })
  nombre: string;

  @Prop({ type: [CategoriaSchema], required: true })
  categorias: Categoria[];
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);

ServicioSchema.set('toJSON', {
  transform(_doc, result) {
    const { _id, __v, ...rest } = result;
    return { id: _id, ...rest };
  },
});

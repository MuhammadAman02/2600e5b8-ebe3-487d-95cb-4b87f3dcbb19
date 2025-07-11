import { FastifyInstance } from 'fastify';
import { getFruitsHandler, createFruitHandler } from '../controllers/fruit.controller';
import { getFruitsSchema, createFruitSchema } from '../schemas/fruit.schema';

export async function fruitRoutes(app: FastifyInstance) {
  app.get('/api/fruits', {
    schema: getFruitsSchema,
    handler: getFruitsHandler,
  });

  app.post('/api/fruits', {
    schema: createFruitSchema,
    handler: createFruitHandler,
  });
}
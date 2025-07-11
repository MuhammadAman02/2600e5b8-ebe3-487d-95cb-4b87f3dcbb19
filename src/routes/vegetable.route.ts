import { FastifyInstance } from 'fastify';
import { getVegetablesHandler, createVegetableHandler } from '../controllers/vegetable.controller';
import { getVegetablesSchema, createVegetableSchema } from '../schemas/vegetable.schema';

export async function vegetableRoutes(app: FastifyInstance) {
  app.get('/api/vegetables', {
    schema: getVegetablesSchema,
    handler: getVegetablesHandler,
  });

  app.post('/api/vegetables', {
    schema: createVegetableSchema,
    handler: createVegetableHandler,
  });
}
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const FruitZod = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable(),
  season: z.string().nullable(),
  createdAt: z.string(),
});

const CreateFruitZod = z.object({
  name: z.string().min(1, 'Fruit name is required'),
  color: z.string().optional(),
  season: z.string().optional(),
});

const GetFruitsResponseZod = z.array(FruitZod);

// Fastify-compatible JSON schemas
export const getFruitsSchema = {
  tags: ["Fruits"],
  response: {
    200: zodToJsonSchema(GetFruitsResponseZod),
  },
};

export const createFruitSchema = {
  tags: ["Fruits"],
  body: zodToJsonSchema(CreateFruitZod),
  response: {
    201: zodToJsonSchema(FruitZod),
  },
};
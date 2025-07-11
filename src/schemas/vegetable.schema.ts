import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Zod schemas
const VegetableZod = z.object({
  id: z.string().uuid(),
  name: z.string(),
  color: z.string().nullable(),
  season: z.string().nullable(),
  createdAt: z.string(),
});

const CreateVegetableZod = z.object({
  name: z.string().min(1, 'Vegetable name is required'),
  color: z.string().optional(),
  season: z.string().optional(),
});

const GetVegetablesResponseZod = z.array(VegetableZod);

// Fastify-compatible JSON schemas
export const getVegetablesSchema = {
  tags: ["Vegetables"],
  response: {
    200: zodToJsonSchema(GetVegetablesResponseZod),
  },
};

export const createVegetableSchema = {
  tags: ["Vegetables"],
  body: zodToJsonSchema(CreateVegetableZod),
  response: {
    201: zodToJsonSchema(VegetableZod),
  },
};
import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllFruits, createFruit } from '../services/fruit.service';
import { AppError } from '../utils/AppError';

export async function getFruitsHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const fruits = await getAllFruits();
    res.status(200).send(fruits);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function createFruitHandler(
  req: FastifyRequest<{ Body: { name: string; color?: string; season?: string } }>,
  res: FastifyReply
) {
  try {
    const fruit = await createFruit(req.body);
    res.status(201).send(fruit);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}
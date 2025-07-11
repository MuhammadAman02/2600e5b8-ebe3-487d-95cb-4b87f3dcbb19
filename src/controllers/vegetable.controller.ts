import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllVegetables, createVegetable } from '../services/vegetable.service';
import { AppError } from '../utils/AppError';

export async function getVegetablesHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const vegetables = await getAllVegetables();
    res.status(200).send(vegetables);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function createVegetableHandler(
  req: FastifyRequest<{ Body: { name: string; color?: string; season?: string } }>,
  res: FastifyReply
) {
  try {
    const vegetable = await createVegetable(req.body);
    res.status(201).send(vegetable);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}
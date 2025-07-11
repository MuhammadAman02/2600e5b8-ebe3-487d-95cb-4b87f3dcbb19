import { db } from '../db/client';
import { vegetables } from '../db/schema';
import { AppError } from '../utils/AppError';

export async function getAllVegetables() {
  try {
    const result = await db
      .select({
        id: vegetables.id,
        name: vegetables.name,
        color: vegetables.color,
        season: vegetables.season,
        createdAt: vegetables.createdAt,
      })
      .from(vegetables)
      .orderBy(vegetables.name);

    return result;
  } catch (error) {
    console.error('Error fetching vegetables:', error);
    throw new AppError('Failed to fetch vegetables');
  }
}

export async function createVegetable({
  name,
  color,
  season,
}: {
  name: string;
  color?: string;
  season?: string;
}) {
  try {
    const result = await db
      .insert(vegetables)
      .values({ 
        name, 
        color: color || null, 
        season: season || null 
      })
      .returning({
        id: vegetables.id,
        name: vegetables.name,
        color: vegetables.color,
        season: vegetables.season,
        createdAt: vegetables.createdAt,
      });

    return result[0];
  } catch (error: any) {
    console.error('Error creating vegetable:', error);
    if (error?.code === '23505') {
      throw new AppError('Vegetable name already exists', 409);
    }
    throw new AppError('Failed to create vegetable');
  }
}
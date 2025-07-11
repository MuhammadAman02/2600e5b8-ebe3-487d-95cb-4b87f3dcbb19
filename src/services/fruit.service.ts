import { db } from '../db/client';
import { fruits } from '../db/schema';
import { AppError } from '../utils/AppError';

export async function getAllFruits() {
  try {
    const result = await db
      .select({
        id: fruits.id,
        name: fruits.name,
        color: fruits.color,
        season: fruits.season,
        createdAt: fruits.createdAt,
      })
      .from(fruits)
      .orderBy(fruits.name);

    return result;
  } catch (error) {
    console.error('Error fetching fruits:', error);
    throw new AppError('Failed to fetch fruits');
  }
}

export async function createFruit({
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
      .insert(fruits)
      .values({ 
        name, 
        color: color || null, 
        season: season || null 
      })
      .returning({
        id: fruits.id,
        name: fruits.name,
        color: fruits.color,
        season: fruits.season,
        createdAt: fruits.createdAt,
      });

    return result[0];
  } catch (error: any) {
    console.error('Error creating fruit:', error);
    if (error?.code === '23505') {
      throw new AppError('Fruit name already exists', 409);
    }
    throw new AppError('Failed to create fruit');
  }
}
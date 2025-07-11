import { db } from '../db/client';
import { vegetables } from '../db/schema';

const initialVegetables = [
  { name: 'Carrot', color: 'Orange', season: 'Fall' },
  { name: 'Broccoli', color: 'Green', season: 'Fall' },
  { name: 'Spinach', color: 'Green', season: 'Spring' },
  { name: 'Tomato', color: 'Red', season: 'Summer' },
  { name: 'Cucumber', color: 'Green', season: 'Summer' },
  { name: 'Bell Pepper', color: 'Red', season: 'Summer' },
  { name: 'Lettuce', color: 'Green', season: 'Spring' },
  { name: 'Onion', color: 'White', season: 'Year-round' },
];

export async function seedVegetables() {
  try {
    console.log('Seeding vegetables...');
    
    for (const vegetable of initialVegetables) {
      await db.insert(vegetables).values(vegetable).onConflictDoNothing();
    }
    
    console.log('Vegetables seeded successfully!');
  } catch (error) {
    console.error('Error seeding vegetables:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedVegetables().then(() => process.exit(0));
}
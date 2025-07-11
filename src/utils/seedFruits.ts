import { db } from '../db/client';
import { fruits } from '../db/schema';

const initialFruits = [
  { name: 'Apple', color: 'Red', season: 'Fall' },
  { name: 'Banana', color: 'Yellow', season: 'Year-round' },
  { name: 'Orange', color: 'Orange', season: 'Winter' },
  { name: 'Strawberry', color: 'Red', season: 'Spring' },
  { name: 'Blueberry', color: 'Blue', season: 'Summer' },
  { name: 'Mango', color: 'Yellow', season: 'Summer' },
  { name: 'Grape', color: 'Purple', season: 'Fall' },
  { name: 'Pineapple', color: 'Yellow', season: 'Year-round' },
];

export async function seedFruits() {
  try {
    console.log('Seeding fruits...');
    
    for (const fruit of initialFruits) {
      await db.insert(fruits).values(fruit).onConflictDoNothing();
    }
    
    console.log('Fruits seeded successfully!');
  } catch (error) {
    console.error('Error seeding fruits:', error);
  }
}

// Run if called directly
if (require.main === module) {
  seedFruits().then(() => process.exit(0));
}
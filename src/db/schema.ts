import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const fruits = pgTable('fruits', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  color: text('color'),
  season: text('season'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
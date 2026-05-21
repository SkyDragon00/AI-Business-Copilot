import {
  pgTable,
  uuid,
  text,
  timestamp,
  jsonb,
  integer,
  numeric,
  date,
  pgEnum,
} from 'drizzle-orm/pg-core';

export const appointmentStatusEnum = pgEnum('appointment_status', [
  'scheduled',
  'confirmed',
  'cancelled',
  'completed',
  'no_show',
]);

export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);
export const transactionSourceEnum = pgEnum('transaction_source', ['voice', 'text', 'auto']);

export const businesses = pgTable('businesses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  timezone: text('timezone').notNull(),
  workingHours: jsonb('working_hours').notNull(), // structure: { monday: { start, end }, etc. }
});

export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  name: text('name').notNull(),
  durationMinutes: integer('duration_minutes').notNull(),
  price: numeric('price').notNull(),
});

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  phone: text('phone').notNull(),
  name: text('name').notNull(),
});

export const appointments = pgTable('appointments', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: appointmentStatusEnum('status').notNull().default('scheduled'),
});

export const waitlist = pgTable('waitlist', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  clientId: uuid('client_id').references(() => clients.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id).notNull(),
  requestedDate: date('requested_date').notNull(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  type: transactionTypeEnum('type').notNull(),
  amount: numeric('amount').notNull(),
  category: text('category').notNull(),
  description: text('description'),
  source: transactionSourceEnum('source').notNull(),
  sriCategory: text('sri_category'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const dailySummaries = pgTable('daily_summaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessId: uuid('business_id').references(() => businesses.id).notNull(),
  date: date('date').notNull(),
  totalIncome: numeric('total_income').notNull(),
  totalExpenses: numeric('total_expenses').notNull(),
  net: numeric('net').notNull(),
  appointmentsCount: integer('appointments_count').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

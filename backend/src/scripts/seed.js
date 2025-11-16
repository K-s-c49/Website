import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { logger } from '../config/logger.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

const users = [
  {
    firstName: 'Jordan',
    lastName: 'Lee',
    email: 'admin@customize23.com',
    password: 'AdminPass123!',
    role: 'admin',
  },
  {
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@example.com',
    password: 'Customer123!',
    role: 'customer',
  },
];

const products = [
  {
    name: 'Noise Cancelling Headphones',
    slug: 'noise-cancelling-headphones',
    description: 'Immersive sound experience with adaptive noise cancellation.',
    price: 299,
    salePrice: 249,
    stock: 32,
    category: 'electronics',
    brand: 'SoundWave',
    images: ['/uploads/iphone2.jpg'],
    isFeatured: true,
  },
  {
    name: 'Smart Home Speaker',
    slug: 'smart-home-speaker',
    description: 'Voice assistant with room-filling sound and smart home integrations.',
    price: 149,
    stock: 58,
    category: 'electronics',
    brand: 'Pulse',
    images: ['/uploads/iphone2.jpg'],
  },
  {
    name: 'Ergonomic Office Chair',
    slug: 'ergonomic-office-chair',
    description: 'Breathable mesh office chair with lumbar support.',
    price: 259,
    salePrice: 219,
    stock: 22,
    category: 'home',
    brand: 'ComfortLab',
    images: ['/uploads/seed-chair.jpg'],
    isFeatured: true,
  },
];

async function seed() {
  await connectDatabase();
  await mongoose.connection.db.dropDatabase();

  await Promise.all(users.map((user) => User.create(user)));
  await Product.insertMany(products);

  logger.info('✅ Seed data inserted');
}

seed()
  .then(() => disconnectDatabase())
  .catch((error) => {
    logger.error('Seed script failed', { error });
    disconnectDatabase().finally(() => process.exit(1));
  });


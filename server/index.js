import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();

// Vercel Serverless ke liye Prisma connection limit fix
// Isse Supabase ka connection pool full nahi hota
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "?connection_limit=1",
    },
  },
});

// CORS setup taake frontend connect ho sake
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check route
app.get('/api', (req, res) => {
  res.send('Backend is running on Vercel! 🚀');
});

// Order creation route
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, email, phone, service, amount } = req.body;

    const newOrder = await prisma.order.create({
      data: {
        customerName,
        email,
        phone,
        service,
        amount: Number(amount) || 0,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: newOrder,
    });
  } catch (error) {
    // Agar error aaye toh terminal mein poora error print hoga
    console.error('❌ Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while placing the order.',
      error: error.message 
    });
  }
});

export default app;
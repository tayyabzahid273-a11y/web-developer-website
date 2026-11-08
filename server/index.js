import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Test Route (Browser mein check karne ke liye)
app.get('/', (req, res) => {
  res.send('Backend server is running perfectly! 🚀');
});

// Order Place Karne Ka Route
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, email, phone, service, amount } = req.body;

    // Database mein order save karna
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
    console.error('Error placing order:', error);
    res.status(500).json({
      success: false,
      message: 'Something went wrong while placing the order.',
    });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
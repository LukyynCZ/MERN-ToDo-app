require('dotenv').config();
const express = require('express');
const todoRouter = require('./routes/todoRoute');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
connectDB();

app.use('/api', todoRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

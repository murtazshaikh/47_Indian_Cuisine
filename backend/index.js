const express = require('express');
const cors = require('cors');
const dishesRouter = require('./routes/dishes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount the dishes routes at /api/dishes
app.use('/api/dishes', dishesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

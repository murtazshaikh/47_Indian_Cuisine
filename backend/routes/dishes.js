const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Load the JSON data once at startup
const dataPath = path.join(__dirname, '../data/indian_food.json');
const dishes = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// GET /api/dishes - list all dishes with optional pagination
router.get('/', (req, res) => {
  let filteredDishes = [...dishes]; // Start with all dishes

  // Filtering
  if (req.query.diet) {
    filteredDishes = filteredDishes.filter(dish =>
      dish.diet.toLowerCase() === req.query.diet.toLowerCase()
    );
  }

  if (req.query.flavor_profile) {
    filteredDishes = filteredDishes.filter(dish =>
      dish.flavor_profile.toLowerCase() === req.query.flavor_profile.toLowerCase()
    );
  }

  if (req.query.state) {
    filteredDishes = filteredDishes.filter(dish =>
      dish.state.toLowerCase() === req.query.state.toLowerCase()
    );
  }

  // Sorting
  if (req.query.sort) {
    const [sortField, sortOrder] = req.query.sort.split(',');
    filteredDishes.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle numeric sorting for prep_time, cook_time
      if (['prep_time', 'cook_time'].includes(sortField)) {
        valA = parseInt(valA);
        valB = parseInt(valB);
      }

      if (valA < valB) return sortOrder === 'desc' ? 1 : -1;
      if (valA > valB) return sortOrder === 'desc' ? -1 : 1;
      return 0;
    });
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedDishes = filteredDishes.slice(startIndex, endIndex);

  res.json({
    total: filteredDishes.length,
    page,
    limit,
    dishes: paginatedDishes.map(formatDish),
  });
});

// GET /api/dishes/:name - Get details of a specific dish by name
router.get('/:name', (req, res) => {
  const dishName = decodeURIComponent(req.params.name).toLowerCase();

  const dish = dishes.find(d =>
    d.name.toLowerCase() === dishName
  );

  if (!dish) {
    return res.status(404).json({ error: 'Dish not found' });
  }

  res.json(formatDish(dish));
});

// POST /api/suggestions - Suggest dishes based on available ingredients
router.post('/suggestions', (req, res) => {
  const userIngredients = req.body.available_ingredients;

  if (!Array.isArray(userIngredients) || userIngredients.length === 0) {
    return res.status(400).json({ error: 'Please provide a non-empty array of available_ingredients' });
  }

  // Convert user ingredients to lowercase for case-insensitive match
  const normalizedUserIngredients = userIngredients.map(i => i.toLowerCase());

  // Find dishes that can be made with all their ingredients in user's list
  const possibleDishes = dishes.filter(dish => {
    const dishIngredients = dish.ingredients.split(',').map(i => i.trim().toLowerCase());
    return dishIngredients.every(ingredient => normalizedUserIngredients.includes(ingredient));
  });

  res.json({
    possible_dishes: possibleDishes.map(formatDish),
  });
});

// GET /api/suggestions?q=search_text - Auto-suggest for search box
router.get('/search/suggestions', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  if (!q) return res.json({ suggestions: [] });

  const matches = dishes.filter((dish) => 
    dish.name.toLowerCase().includes(q) ||
    dish.ingredients.toLowerCase().includes(q) ||
    dish.state.toLowerCase().includes(q) ||
    dish.region.toLowerCase().includes(q)
  );

  const uniqueNames = [...new Set(matches.map(d => d.name))];

  res.json({ suggestions: uniqueNames.slice(0, 10) }); // Limit to 10 suggestions
});


// Helper function to format a dish's ingredients into an array
function formatDish(dish) {
  return {
    name: dish.name,
    ingredients: dish.ingredients.split(',').map(i => i.trim()),
    diet: dish.diet,
    prep_time: parseInt(dish.prep_time),
    cook_time: parseInt(dish.cook_time),
    flavor_profile: dish.flavor_profile,
    course: dish.course,
    state: dish.state,
    region: dish.region,
  };
}

module.exports = router;

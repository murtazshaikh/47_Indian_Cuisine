const fs = require('fs');
const csv = require('csvtojson');

csv()
  .fromFile('indian_food.csv')
  .then((jsonObj) => {
    fs.writeFileSync('data/indian_food.json', JSON.stringify(jsonObj, null, 2));
    console.log('CSV converted to data/indian_food.json');
  });
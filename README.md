# 🇮🇳 Indian Cuisine Explorer

A full-stack web application to explore, search, and discover Indian dishes based on the dataset provided in `indian_food.csv`.

---

## 🚀 Problem Statement

Design and implement web systems to assist users interested in exploring Indian cuisine using unsanitized CSV data about dishes, their ingredients, cooking times, origins, etc.

---

## 🔥 Features Implemented

✅ Find all dishes with pagination, sorting, and filtering.  
✅ Detailed view for each dish.  
✅ Dish suggestion engine based on selected available ingredients.  
✅ Search box with real-time autosuggest by dish name, ingredients, or state.  
✅ Persistent suggestions using browser localStorage.  
✅ Fully responsive UI using Next.js and CSS3.  
✅ Backend REST API built with Express and CSV-based data source.

---

## ⚙️ Technologies Used

**Frontend:**  
- Next.js 15  
- React 19  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  
- CSV-to-JSON conversion  

---

## 🖥️ Functional Requirements Covered

- **All Dishes:** `/api/dishes` endpoint + frontend page with list, pagination, sorting, filtering by diet.
- **Dish Details:** `/api/dishes/:name` endpoint + frontend page showing details.
- **Dish Suggestions:** `/api/dishes/suggestions` POST endpoint + DishSuggester component in frontend.
- **Search Suggestions:** `/api/dishes/search/suggestions` endpoint + Header search with auto-suggest.

---

## 📝 Installation & Running Locally

### 1️⃣ Backend

```bash
cd indian-cuisine-api
npm install
npm start
```

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Bonus Requirements Addressed

- ✅ **Used browser localStorage** to persist dish suggestions  
- ✅ **Designed scalable code** to easily add CRUD operations or authentication later  
- ✅ **Used functional React components** with hooks everywhere  

---

## 🚀 Future Enhancements

- 🔒 Implement user authentication and saved favorite dishes  
- 📝 Add create/update/delete functionality for dish entries  
- 🗺️ Add region-wise dish explorer map  
- ⭐ Add ratings & reviews for dishes  
- 🛠️ Add admin dashboard to upload CSV or manage dishes  

---

## 🙌 What I Learned

- 🗂️ Handling unsanitized CSV data and converting it to JSON  
- 🔧 Designing scalable REST APIs anticipating future DB migrations  
- ⏳ Debouncing API calls for a smooth search experience  
- ⚛️ Using Next.js’s file-based routing and dynamic routes for detail pages  
- 🛠️ Managing state with React hooks and persisting it with localStorage  

---

Made with love ❤️

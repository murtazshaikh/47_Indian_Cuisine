import styles from "./DishDetails.module.css";

export default async function DishDetailsPage({ params }) {
  const dishName = decodeURIComponent(params.name);

  // Fetch dish data from your backend API
  const res = await fetch(
    `https://four7-indian-cuisine.onrender.com/api/dishes/${encodeURIComponent(dishName)}`
  );

  if (res.status === 404) {
    return (
      <main className={styles.container}>
        <h2>Dish not found</h2>
      </main>
    );
  }

  const dish = await res.json();

  console.log(dish, "dish")

  return (
    <main className={styles.dishCard}>
      <h1 className={styles.dishTitle}>{dish.name}</h1>

      <section className={styles.dishInfo}>
        <p>
          <strong>Diet:</strong> {dish.diet}
        </p>
        <p>
          <strong>Preparation Time:</strong>{" "}
          {dish.prep_time === -1 ? "Instant" : `${dish.prep_time} min`}
        </p>
        <p>
          <strong>Cooking Time:</strong>{" "}
          {dish.cook_time === -1 ? "Instant" : `${dish.cook_time} min`}
        </p>
        <p>
          <strong>Flavor:</strong> {dish.flavor_profile}
        </p>
        <p>
          <strong>Course:</strong> {dish.course}
        </p>
        <p>
          <strong>State:</strong>{" "}
          {dish.state === "-1" ? "Pan-Indian" : dish.state}
        </p>
        <p>
          <strong>Region:</strong> {dish.region}
        </p>
      </section>

      <div className={styles.dishIngredients}>
        <h4>Ingredients:</h4>
        <ul>
          {dish.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}

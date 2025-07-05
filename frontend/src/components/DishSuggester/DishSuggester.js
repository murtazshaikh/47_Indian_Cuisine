"use client";
import { useState, useEffect } from "react";
import styles from "./DishSuggester.module.css";
import useApiFetch from "@/hooks/useApiFetch";

const commonIngredients = [
  "Rice flour",
  "coconut",
  "jaggery",
  "banana",
  "ghee",
  "milk",
  "potato",
  "gram flour",
  "sugar",
  "maida flour",
  "yogurt",
  "oil",
  "carrots",
  "cashews",
  "raisins",
];

export default function DishSuggester() {
  const { data, setUrl, setFetchOptions } =
    useApiFetch();
  const [selected, setSelected] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  // Load saved state on mount
  useEffect(() => {
    const savedSelected = localStorage.getItem("selectedIngredients");
    const savedSuggestions = localStorage.getItem("dishSuggestions");

    if (savedSelected) setSelected(JSON.parse(savedSelected));
    if (savedSuggestions) setSuggestions(JSON.parse(savedSuggestions));
  }, []);

  // Persist selected ingredients when they change
  useEffect(() => {
    localStorage.setItem("selectedIngredients", JSON.stringify(selected));
  }, [selected]);

  // Persist suggestions when they change
  useEffect(() => {
    localStorage.setItem("dishSuggestions", JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    if (data?.possible_dishes && Array.isArray(data.possible_dishes)) {
      setSuggestions(data.possible_dishes);
    }
  }, [data]);

  const toggleIngredient = (ingredient) => {
    setErrMsg("");
    setSelected((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSuggest = async () => {
    if (selected.length === 0) {
      setErrMsg("No item selected!");
      setSuggestions([]);
      return;
    }

    setUrl("https://four7-indian-cuisine.onrender.com/api/dishes/suggestions");
    setFetchOptions({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available_ingredients: selected }),
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dish Suggester</h2>
      <p className={styles.subtext}>Select your available ingredients:</p>

      <div className={styles.ingredients}>
        {commonIngredients.map((ingredient) => (
          <button
            key={ingredient}
            className={`${styles.ingredient} ${
              selected.includes(ingredient) ? styles.selected : ""
            }`}
            onClick={() => toggleIngredient(ingredient)}
          >
            {ingredient}
          </button>
        ))}
      </div>
      <button onClick={handleSuggest} className={styles.suggestBtn}>
        Suggest Dishes
      </button>

      {errMsg && <p className={styles.results}>{errMsg}</p>}

      {suggestions.length > 0 && (
        <div className={styles.results}>
          <>
            <h3>Possible Dishes:</h3>
            <ul>
              {suggestions.map((dish) => (
                <li key={dish.name}>{dish.name}</li>
              ))}
            </ul>
          </>
        </div>
      )}
    </div>
  );
}

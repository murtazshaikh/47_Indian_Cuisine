"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";
import Link from "next/link";
import useApiFetch from "@/hooks/useApiFetch";

export default function Header() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const containerRef = useRef(null);

  const { data, setUrl } = useApiFetch();

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const debounce = setTimeout(() => {
      setUrl(
        `http://localhost:3000/api/dishes/search/suggestions?q=${encodeURIComponent(
          query
        )}`
      );
    }, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  useEffect(() => {
    if (data?.suggestions) {
      setSuggestions(data.suggestions);
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setSuggestions([]); // Close suggestions
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (dishName) => {
    router.push(`/dishes/${encodeURIComponent(dishName)}`);
    setQuery(""); // reset input after navigating
    setSuggestions([]);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
          Indian Cuisine Explorer
        </Link>
      </h1>

      <form className={styles.form} autoComplete="off">
        <div ref={containerRef} className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Search dish, ingredient, or region..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          {suggestions.length > 0 && (
            <ul className={styles.suggestions}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={styles.suggestionItem}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </header>
  );
}

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import DishSuggester from "@/components/DishSuggester/DishSuggester";
import FilterGroup from "@/SharedComponents/FilterGroup/FilterGroup";
import { DIET_OPTIONS, SORT_OPTIONS } from "@/constants/filters";
import Pagination from "@/SharedComponents/Pagination/Pagination";
import useApiFetch from "@/hooks/useApiFetch";

export default function Home() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [dietFilter, setDietFilter] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const { data, setUrl } = useApiFetch();

  useEffect(() => {
    setPage(1);
  }, [dietFilter, sortField, sortOrder]);

  useEffect(() => {
    let apiUrl = `http://localhost:3000/api/dishes?page=${page}&limit=${limit}&sort=${sortField},${sortOrder}`;
    if (dietFilter) {
      apiUrl += `&diet=${dietFilter}`;
    }
    setUrl(apiUrl);
  }, [page, dietFilter, sortField, sortOrder]);

  const dishes = data?.dishes || [];
  const total = data?.total || 0;

  const totalPages = Math.ceil(total / limit);

  return (
    <main className={styles.container}>
      <h2 className={styles.title}>All Dishes</h2>

      <DishSuggester />

      <div className={styles.filtersContainer}>
        <FilterGroup
          label="Diet Filter:"
          id="diet-filter"
          value={dietFilter}
          onChange={(e) => setDietFilter(e.target.value)}
          options={DIET_OPTIONS}
        />

        <FilterGroup
          label="Sort By:"
          id="sort-by"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          options={SORT_OPTIONS}
        >
          <button
            className={styles.sortButton}
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            aria-label="Toggle Sort Order"
          >
            {sortOrder === "asc" ? "▲" : "▼"}
          </button>
        </FilterGroup>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Diet</th>
            <th>Prep Time</th>
            <th>Cook Time</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.name}>
              <td>
                <Link href={`/dishes/${encodeURIComponent(dish.name)}`}>
                  {dish.name}
                </Link>
              </td>
              <td>{dish.diet}</td>
              <td>{dish.prep_time === -1 ? "Instant" : dish.prep_time}</td>
              <td>{dish.cook_time === -1 ? "Instant" : dish.cook_time}</td>
              <td>
                {dish.state === "-1" || dish.state === -1
                  ? "Pan-Indian"
                  : dish.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </main>
  );
}

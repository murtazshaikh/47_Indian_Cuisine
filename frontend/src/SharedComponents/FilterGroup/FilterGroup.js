// src/components/FilterGroup/FilterGroup.js
import styles from "./FilterGroup.module.css";

export default function FilterGroup({ label, id, value, onChange, options, children }) {
  return (
    <div className={styles.filterGroup}>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={onChange}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {children}
    </div>
  );
}

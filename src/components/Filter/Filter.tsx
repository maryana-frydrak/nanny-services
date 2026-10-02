import { useState, useRef, useEffect } from "react";
import "./Filter.css";

interface FilterProps {
  selectedFilter: string;
  onSelectFilter: (option: string) => void;
}

export const Filter = ({ selectedFilter, onSelectFilter }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = [
    "A to Z",
    "Z to A",
    "Less than 10$",
    "Greater than 10$",
    "Popular",
    "Not popular",
    "Show all",
  ];

  const handleSelect = (option: string) => {
    onSelectFilter(option);
    setIsOpen(false);
  };

  return (
    <div className="filter-container" ref={dropdownRef}>
      <span className="filter-label">Filters</span>
      <div className="filter-dropdown-wrapper">
        <button
          type="button"
          className="filter-dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedFilter}</span>
          <svg className="filter-dropdown-icon" width="20" height="20">
            <use href="/icons.svg#icon-chevron-down" />
          </svg>
        </button>

        {isOpen && (
          <ul className="filter-dropdown-list">
            {options.map((option) => (
              <li key={option} onClick={() => handleSelect(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

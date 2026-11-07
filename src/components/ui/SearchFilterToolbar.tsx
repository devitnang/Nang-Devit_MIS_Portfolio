"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, LayoutGrid, List, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryOption {
  id: string;
  label: string;
  count?: number;
}

interface SearchFilterToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
  categories: CategoryOption[];
  selectedCategory: string;
  onCategoryChange: (id: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  idPrefix?: string;
  className?: string;
}

export function SearchFilterToolbar({
  searchQuery,
  onSearchChange,
  placeholder = "Search...",
  categories,
  selectedCategory,
  onCategoryChange,
  viewMode,
  onViewModeChange,
  idPrefix = "toolbar",
  className,
}: SearchFilterToolbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  // Keyboard shortcut: '/' focuses the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isFilterActive = selectedCategory !== "all" && selectedCategory !== "All";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* Search Input with Search Icon and '/' shortcut */}
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          id={`${idPrefix}-search`}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full h-10 pl-9 pr-12 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#0B2046] dark:focus:ring-blue-400 transition-colors shadow-2xs"
        />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                inputRef.current?.focus();
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded cursor-pointer"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-2xs">
            /
          </kbd>
        </div>
      </div>

      {/* Filter Button & Popover */}
      <div ref={filterRef} className="relative">
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={cn(
            "h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer relative shadow-2xs",
            isFilterActive &&
              "border-[#0B2046] dark:border-blue-400 text-[#0B2046] dark:text-blue-400 font-semibold",
            isFilterOpen && "ring-1 ring-[#0B2046] dark:ring-blue-400"
          )}
          title="Filter by category"
          aria-label="Filter by category"
          aria-expanded={isFilterOpen}
        >
          <SlidersHorizontal className="w-4 h-4" />
          {isFilterActive && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#0B2046] dark:bg-blue-400 rounded-full" />
          )}
        </button>

        {/* Filter Dropdown Popover */}
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-[#0D182E] border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Filter by Category
            </div>
            <div className="py-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat.id);
                      setIsFilterOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors cursor-pointer",
                      isSelected
                        ? "bg-slate-100 dark:bg-slate-800 text-[#0B2046] dark:text-blue-400 font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                    )}
                  >
                    <span className="truncate">{cat.label}</span>
                    <div className="flex items-center gap-2">
                      {typeof cat.count === "number" && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {cat.count}
                        </span>
                      )}
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-[#0B2046] dark:text-blue-400 shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {isFilterActive && (
              <div className="pt-1.5 px-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    onCategoryChange(categories[0]?.id || "all");
                    setIsFilterOpen(false);
                  }}
                  className="w-full text-center py-1 text-[11px] font-bold text-[#0B2046] dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid / List View Toggle */}
      <div className="h-10 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-0.5 shadow-2xs">
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          className={cn(
            "h-8.5 w-8.5 rounded-md flex items-center justify-center transition-colors cursor-pointer",
            viewMode === "grid"
              ? "bg-slate-100 dark:bg-slate-800 text-[#0B2046] dark:text-blue-400 shadow-2xs"
              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          )}
          title="Grid view"
          aria-label="Grid view"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          className={cn(
            "h-8.5 w-8.5 rounded-md flex items-center justify-center transition-colors cursor-pointer",
            viewMode === "list"
              ? "bg-slate-100 dark:bg-slate-800 text-[#0B2046] dark:text-blue-400 shadow-2xs"
              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          )}
          title="List view"
          aria-label="List view"
        >
          <List className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

import React from "react";

export default function Sidebar({ filters, setFilters }: any) {
  const cropOptions = [
    "All",
    "barley",
    "canola",
    "corn",
    "oats",
    "soybeans",
    "wheat",
  ];

  const yearOptions = Array.from({ length: 2023 - 1987 + 1 }, (_, i) => 1987 + i);

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50 p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <label htmlFor="crop" className="block font-medium mb-1">
          Crop Type
        </label>
        <select
          id="crop"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={filters.crop}
          onChange={(e) => setFilters((prev: any) => ({ ...prev, crop: e.target.value }))}
        >
          {cropOptions.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block font-medium mb-1">
          Year
        </label>
        <select
          id="year"
          className="w-full border border-gray-300 rounded px-2 py-1"
          value={filters.year}
          onChange={(e) => setFilters((prev: any) => ({ ...prev, year: parseInt(e.target.value) }))}
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => setFilters({ crop: "All", year: 2023 })}
      >
        Clear Filters
      </button>
    </div>
  );
}

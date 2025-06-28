import React from 'react';
import { Filters } from '../App';

interface SidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const Sidebar = ({ filters, setFilters }: SidebarProps) => {
  const handleCropChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, crop: e.target.value }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, year: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({ crop: '', year: '' });
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Crop Type</label>
        <select className="w-full border rounded p-2" value={filters.crop} onChange={handleCropChange}>
          <option value="">All Crops</option>
          <option value="Wheat">Wheat</option>
          <option value="Barley">Barley</option>
          <option value="Canola">Canola</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Year</label>
        <select className="w-full border rounded p-2" value={filters.year} onChange={handleYearChange}>
          <option value="">All Years</option>
          <option value="2011">2011</option>
          <option value="2016">2016</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 w-1/2">
          Apply
        </button>
        <button
          className="bg-gray-200 rounded px-4 py-2 hover:bg-gray-300 w-1/2"
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

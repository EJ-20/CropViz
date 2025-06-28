import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-72 bg-white shadow-md p-4 h-full overflow-y-auto border-r">
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      {/* Crop Type Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Crop Type</label>
        <select className="w-full border rounded p-2">
          <option value="">All Crops</option>
          <option value="Wheat">Wheat</option>
          <option value="Barley">Barley</option>
          <option value="Canola">Canola</option>
        </select>
      </div>

      {/* Year Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Year</label>
        <select className="w-full border rounded p-2">
          <option value="">All Years</option>
          <option value="2011">2011</option>
          <option value="2016">2016</option>
        </select>
      </div>

      {/* Yield Range */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Yield (tons/ha)</label>
        <div className="flex gap-2">
          <input type="number" className="w-1/2 border rounded p-1" placeholder="Min" />
          <input type="number" className="w-1/2 border rounded p-1" placeholder="Max" />
        </div>
      </div>

      {/* Region (placeholder) */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Region</label>
        <input type="text" className="w-full border rounded p-2" placeholder="Enter CARUID or region" />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 w-1/2">
          Apply
        </button>
        <button className="bg-gray-200 rounded px-4 py-2 hover:bg-gray-300 w-1/2">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

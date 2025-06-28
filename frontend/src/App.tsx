import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';

export interface Filters {
  crop: string;
  year: string;
}

const App = () => {
  const [filters, setFilters] = useState<Filters>({ crop: '', year: '' });

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-80 shrink-0 bg-white border-r shadow-md z-10">
        <Sidebar filters={filters} setFilters={setFilters} />
      </div>

      <div className="flex-grow relative">
        <MapView filters={filters} />
      </div>
    </div>
  );
};

export default App;

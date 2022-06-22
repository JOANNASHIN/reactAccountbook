import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Property from '../pages/Property';
import Add from '../pages/Add';

export default function Router() {
  return (
    <div className="ac__contents">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/property" element={<Property />} />
        <Route path="/add" element={<Add />} />
      </Routes>
    </div>
  );
}

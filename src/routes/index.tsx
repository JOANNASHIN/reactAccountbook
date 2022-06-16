import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Property from '../pages/Property';

export default function Router() {
  return (
    <div className="account__contents">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/property" element={<Property />} />
      </Routes>
    </div>
  );
}

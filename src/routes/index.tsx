import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Property from '../pages/Property';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/property" element={<Property />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Property from '../pages/Property';
import AddAccount from '../pages/AddAccount';
import Setting from '../pages/Setting';

export default function Router() {
  return (
    <div className="ac__contents">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/property" element={<Property />} />
        <Route path="/addAccount" element={<AddAccount />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

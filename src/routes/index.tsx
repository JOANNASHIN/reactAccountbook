import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Property from '../pages/Property';
import AddAccount from '../pages/AddAccount';
import AddProperty from '../pages/AddProperty';
import Setting from '../pages/Setting';
import Error404 from '../pages/Error/404';

export default function Router() {
  return (
    <div className="ac__contents">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/property" element={<Property />} />
        <Route path="/addAccount" element={<AddAccount />} />
        <Route path="/addProperty" element={<AddProperty />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

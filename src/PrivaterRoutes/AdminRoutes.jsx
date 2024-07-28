import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user !== null && user.role === 'admin') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoutes;

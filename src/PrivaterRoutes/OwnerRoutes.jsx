import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const OwnerRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user !== null && user.isAdmin === false && user.role === 'owner' ) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default OwnerRoutes;

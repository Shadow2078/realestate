import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const AgentRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user !== null && user.isAdmin === false && user.role === 'agent') {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AgentRoutes;

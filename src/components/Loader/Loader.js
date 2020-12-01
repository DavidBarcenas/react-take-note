import React from 'react';
import { useSelector } from 'react-redux';

export const Loader = () => {
  console.log('=== LOADER ===');
  const showLoader = useSelector((state) => state.ui.showLoader);

  if (showLoader) {
    return (
      <div className="loader">
        <div className="circleloader"></div>
      </div>
    );
  }

  return null;
};

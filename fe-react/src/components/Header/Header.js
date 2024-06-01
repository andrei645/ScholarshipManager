import React from 'react';
import './Header.scss';

const Header = () => {
  return (
    <header className="text-white text-center py-5">
      <div className="container">
        <h1 className="display-4">ScholarshipManager</h1>
        <h4 className="lead">Please login to access the platform</h4>
      </div>
    </header>
  );
};

export default Header;

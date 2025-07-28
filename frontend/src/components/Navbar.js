import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          Блог
        </Link>
        <ul className="navbar-nav">
          <li>
            <Link to="/">Статьи</Link>
          </li>
          <li>
            <Link to="/create">Добавить статью</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 
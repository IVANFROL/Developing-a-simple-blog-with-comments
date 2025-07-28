import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import CreateArticle from './pages/CreateArticle';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/create" element={<CreateArticle />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 
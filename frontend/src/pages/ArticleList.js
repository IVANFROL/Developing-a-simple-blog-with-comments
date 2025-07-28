import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../services/api';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await articleService.getAll();
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="container">
        <h2>Загрузка статей...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>Статьи</h1>
      {articles.length === 0 ? (
        <div className="card">
          <p>Статьи не найдены. <Link to="/create">Создайте первую статью</Link></p>
        </div>
      ) : (
        articles.map((article) => (
          <div key={article.id} className="card">
            <h2 className="card-title">
              <Link to={`/articles/${article.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                {article.title}
              </Link>
            </h2>
            <div className="card-meta">
              Опубликовано: {formatDate(article.created_at)}
              {article.comments && article.comments.length > 0 && (
                <span> • {article.comments.length} комментариев</span>
              )}
            </div>
            <p className="card-text">
              {truncateText(article.content)}
            </p>
            <Link to={`/articles/${article.id}`} className="btn">
              Читать далее
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ArticleList; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { articleService, commentService } from '../services/api';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentForm, setCommentForm] = useState({
    author_name: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await articleService.getById(id);
      setArticle(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    
    if (!commentForm.author_name.trim() || !commentForm.content.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      await commentService.create(id, commentForm);
      setCommentForm({ author_name: '', content: '' });
      loadArticle(); // Перезагружаем статью для отображения нового комментария
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm(prev => ({
      ...prev,
      [name]: value
    }));
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

  if (loading) {
    return (
      <div>
        <h2>Загрузка статьи...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="alert alert-error">
          {error}
        </div>
        <button onClick={() => navigate('/')} className="btn">
          Вернуться к списку статей
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div>
        <h2>Статья не найдена</h2>
        <button onClick={() => navigate('/')} className="btn">
          Вернуться к списку статей
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="card">
        <h1 className="card-title">{article.title}</h1>
        <div className="card-meta">
          Опубликовано: {formatDate(article.created_at)}
        </div>
        <div className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
          {article.content}
        </div>
      </div>

      <div className="card">
        <h3>Комментарии ({article.comments ? article.comments.length : 0})</h3>
        
        {article.comments && article.comments.length > 0 ? (
          article.comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-author">{comment.author_name}</div>
              <div className="comment-content">{comment.content}</div>
              <div className="comment-date">{formatDate(comment.created_at)}</div>
            </div>
          ))
        ) : (
          <p>Пока нет комментариев. Будьте первым!</p>
        )}

        <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <h4>Добавить комментарий</h4>
          <div className="form-group">
            <label htmlFor="author_name">Ваше имя:</label>
            <input
              type="text"
              id="author_name"
              name="author_name"
              className="form-control"
              value={commentForm.author_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Комментарий:</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              value={commentForm.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Отправка...' : 'Отправить комментарий'}
          </button>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/')} className="btn btn-secondary">
          Вернуться к списку статей
        </button>
      </div>
    </div>
  );
};

export default ArticleDetail; 
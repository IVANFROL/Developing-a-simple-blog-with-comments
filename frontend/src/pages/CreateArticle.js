import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../services/api';

const CreateArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      const response = await articleService.create(formData);
      alert('Статья успешно создана!');
      navigate(`/articles/${response.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Создать новую статью</h1>
      
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Заголовок статьи:</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Введите заголовок статьи"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">Содержание статьи:</label>
            <textarea
              id="content"
              name="content"
              className="form-control"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Введите содержание статьи"
              rows="10"
              required
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn" disabled={submitting}>
              {submitting ? 'Создание...' : 'Создать статью'}
            </button>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateArticle; 
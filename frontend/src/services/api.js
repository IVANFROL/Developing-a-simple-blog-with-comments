import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const articleService = {
  // Получить список всех статей
  getAll: async () => {
    try {
      const response = await api.get('/articles');
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при загрузке статей');
    }
  },

  // Получить одну статью по ID
  getById: async (id) => {
    try {
      const response = await api.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при загрузке статьи');
    }
  },

  // Создать новую статью
  create: async (articleData) => {
    try {
      const response = await api.post('/articles', articleData);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при создании статьи');
    }
  },

  // Обновить статью
  update: async (id, articleData) => {
    try {
      const response = await api.put(`/articles/${id}`, articleData);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при обновлении статьи');
    }
  },

  // Удалить статью
  delete: async (id) => {
    try {
      const response = await api.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при удалении статьи');
    }
  },
};

export const commentService = {
  // Добавить комментарий к статье
  create: async (articleId, commentData) => {
    try {
      const response = await api.post(`/articles/${articleId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw new Error('Ошибка при добавлении комментария');
    }
  },
};

export default api; 
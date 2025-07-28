# Блог с комментариями на Laravel и React

Полнофункциональное веб-приложение блога с комментариями, построенное на Laravel (backend) и React (frontend) с использованием Docker для контейнеризации.

## 🚀 Технологии

### Backend
- **Laravel 10** - PHP фреймворк
- **MySQL 8.0** - база данных
- **Nginx** - веб-сервер
- **PHP 8.2-FPM** - обработчик PHP

### Frontend
- **React 18** - JavaScript библиотека
- **React Router** - маршрутизация
- **Axios** - HTTP клиент
- **CSS3** - стилизация

### Инфраструктура
- **Docker** - контейнеризация
- **Docker Compose** - оркестрация контейнеров

## 📋 Функциональность

### Backend API
- ✅ **CRUD операции для статей**
  - GET `/api/articles` - список всех статей
  - GET `/api/articles/{id}` - просмотр статьи
  - POST `/api/articles` - создание статьи
  - PUT `/api/articles/{id}` - обновление статьи
  - DELETE `/api/articles/{id}` - удаление статьи
- ✅ **Комментарии к статьям**
  - POST `/api/articles/{id}/comments` - добавление комментария
- ✅ **Модели данных**
  - Article (id, title, content, created_at)
  - Comment (id, article_id, author_name, content, created_at)
- ✅ **Миграции и сидеры**
  - Автоматическое создание таблиц
  - Заполнение тестовыми данными (5 статей с комментариями)

### Frontend
- ✅ **Страница списка статей**
  - Отображение заголовка, даты и краткого содержания
  - Ссылки на детальную страницу
- ✅ **Страница статьи**
  - Полное содержание статьи
  - Список комментариев
  - Форма добавления нового комментария
- ✅ **Страница создания статьи**
  - Форма с полями заголовка и содержания
  - Валидация данных
- ✅ **Навигация**
  - Переходы между страницами
  - Современный UI

## 🛠 Установка и запуск

### Предварительные требования
- Docker
- Docker Compose

### Быстрый старт

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/IVANFROL/Developing-a-simple-blog-with-comments
   cd polis
   ```

2. **Запуск приложения**
   ```bash
   # Автоматическая настройка и запуск
   chmod +x setup.sh
   ./setup.sh
   ```

   Или вручную:
   ```bash
   # Сборка и запуск контейнеров
   docker-compose up --build -d
   
   # Установка зависимостей Laravel
   docker-compose exec app composer install
   
   # Генерация ключа приложения
   docker-compose exec app php artisan key:generate
   
   # Выполнение миграций
   docker-compose exec app php artisan migrate --force
   
   # Заполнение тестовыми данными
   docker-compose exec app php artisan db:seed --force
   
   # Установка зависимостей React
   docker-compose exec frontend npm install
   ```

3. **Доступ к приложению**
   - **Frontend (React)**: http://localhost:3000
   - **Backend API (Laravel)**: http://localhost:8000/api/articles

## 📁 Структура проекта

```
polis/
├── backend/                 # Laravel приложение
│   ├── app/
│   │   ├── Http/Controllers/  # API контроллеры
│   │   ├── Models/           # Eloquent модели
│   │   └── Providers/        # Сервис провайдеры
│   ├── database/
│   │   ├── migrations/       # Миграции БД
│   │   └── seeders/          # Сидеры данных
│   ├── routes/
│   │   └── api.php          # API маршруты
│   └── config/              # Конфигурации
├── frontend/               # React приложение
│   ├── src/
│   │   ├── components/      # React компоненты
│   │   ├── pages/          # Страницы приложения
│   │   └── services/       # API сервисы
│   └── public/             # Статические файлы
├── nginx/                  # Конфигурация Nginx
├── docker-compose.yml      # Docker Compose
└── setup.sh               # Автоматическая настройка
```

## 🔧 API Endpoints

### Статьи
```http
GET    /api/articles           # Получить все статьи
GET    /api/articles/{id}      # Получить статью по ID
POST   /api/articles           # Создать новую статью
PUT    /api/articles/{id}      # Обновить статью
DELETE /api/articles/{id}      # Удалить статью
```

### Комментарии
```http
POST   /api/articles/{id}/comments  # Добавить комментарий к статье
```

### Примеры запросов

**Создание статьи:**
```bash
curl -X POST http://localhost:8000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Новая статья",
    "content": "Содержание статьи..."
  }'
```

**Добавление комментария:**
```bash
curl -X POST http://localhost:8000/api/articles/1/comments \
  -H "Content-Type: application/json" \
  -d '{
    "author_name": "Иван Петров",
    "content": "Отличная статья!"
  }'
```

## 🔧 Устранение неполадок

### CORS ошибки
Если возникают CORS ошибки при создании статей, проверьте:
1. Файл `backend/config/cors.php` существует и настроен
2. CORS middleware зарегистрирован в `backend/app/Http/Kernel.php`
3. Контейнеры перезапущены после изменений

### Проблемы с базой данных
```bash
# Проверка статуса контейнеров
docker-compose ps

# Проверка подключения к БД
docker-compose exec db mysql -u root -proot_password -e "USE blog_db; SHOW TABLES;"
```

### Пересборка приложения
```bash
docker-compose down
docker-compose up --build -d
```

## 🚀 Команды разработки

```bash
# Просмотр логов
docker-compose logs -f app
docker-compose logs -f frontend

# Выполнение команд в контейнерах
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed
docker-compose exec frontend npm start

# Остановка приложения
docker-compose down

# Пересборка контейнеров
docker-compose up --build -d
```

## 📊 Тестовые данные

Приложение автоматически заполняется тестовыми данными:
- **5 статей** на различные темы разработки
- **9 комментариев** к статьям от разных авторов
- **Реалистичный контент** на русском языке

## 🎯 Особенности реализации

### Backend (Laravel)
- **RESTful API** с правильной архитектурой
- **Eloquent ORM** для работы с базой данных
- **Валидация данных** на уровне контроллеров
- **Миграции** для управления схемой БД
- **Сидеры** для тестовых данных
- **CORS** настройки для взаимодействия с фронтендом

### Frontend (React)
- **Компонентная архитектура** с разделением ответственности
- **React Hooks** для управления состоянием
- **React Router** для навигации
- **Axios** для HTTP запросов
- **Responsive дизайн** с современным UI
- **Обработка ошибок** и состояний загрузки

### Docker
- **Многоконтейнерная архитектура** с изоляцией сервисов
- **Nginx** как reverse proxy для Laravel
- **MySQL** в отдельном контейнере
- **Volume mapping** для разработки
- **Network isolation** между сервисами

## 🔒 Безопасность

- **Валидация данных** на backend
- **CORS** настройки для API
- **SQL injection** защита через Eloquent ORM
- **XSS** защита через React

## 📝 Лицензия

Этот проект создан в образовательных целях.

## 👨‍💻 Автор

Проект разработан как демонстрация навыков работы с современным стеком технологий для веб-разработки.

---

**Приложение полностью функционально и готово к использованию!** 🎉 # Developing-a-simple-blog-with-comments

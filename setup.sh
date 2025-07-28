#!/bin/bash

echo "🚀 Настройка блога с комментариями..."
echo "=================================="

# Проверяем наличие Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker не установлен. Пожалуйста, установите Docker."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose не установлен. Пожалуйста, установите Docker Compose."
    exit 1
fi

echo "✅ Docker и Docker Compose найдены"

# Создаем .env файл для Laravel если его нет
if [ ! -f "backend/.env" ]; then
    echo "📝 Создание .env файла для Laravel..."
    cat > backend/.env << EOF
APP_NAME=Blog
APP_ENV=local
APP_KEY=base64:your-app-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=blog_db
DB_USERNAME=blog_user
DB_PASSWORD=password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="\${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_HOST=
PUSHER_PORT=443
PUSHER_SCHEME=https
PUSHER_APP_CLUSTER=mt1

VITE_APP_NAME="\${APP_NAME}"
VITE_PUSHER_APP_KEY="\${PUSHER_APP_KEY}"
VITE_PUSHER_HOST="\${PUSHER_HOST}"
VITE_PUSHER_PORT="\${PUSHER_PORT}"
VITE_PUSHER_SCHEME="\${PUSHER_SCHEME}"
VITE_PUSHER_APP_CLUSTER="\${PUSHER_APP_CLUSTER}"
EOF
    echo "✅ .env файл создан"
else
    echo "✅ .env файл уже существует"
fi

# Запускаем контейнеры
echo "🐳 Запуск Docker контейнеров..."
docker-compose up -d --build

# Ждем немного для запуска контейнеров
echo "⏳ Ожидание запуска контейнеров..."
sleep 10

# Устанавливаем зависимости Laravel
echo "📦 Установка зависимостей Laravel..."
docker-compose exec -T app composer install --no-interaction

# Генерируем ключ приложения
echo "🔑 Генерация ключа приложения..."
docker-compose exec -T app php artisan key:generate

# Выполняем миграции
echo "🗄️ Выполнение миграций..."
docker-compose exec -T app php artisan migrate --force

# Заполняем базу тестовыми данными
echo "🌱 Заполнение базы тестовыми данными..."
docker-compose exec -T app php artisan db:seed --force

# Устанавливаем зависимости React
echo "📦 Установка зависимостей React..."
docker-compose exec -T frontend npm install

echo ""
echo "🎉 Настройка завершена!"
echo "=================================="
echo "🌐 Frontend (React): http://localhost:3000"
echo "🔧 Backend API (Laravel): http://localhost:8000"
echo "📚 API Endpoints: http://localhost:8000/api"
echo ""
echo "📋 Полезные команды:"
echo "  docker-compose logs -f          # Просмотр логов"
echo "  docker-compose down             # Остановка контейнеров"
echo "  docker-compose restart          # Перезапуск контейнеров"
echo ""
echo "🔍 Тестовые данные:"
echo "  - 5 статей с комментариями уже созданы"
echo "  - Можете создавать новые статьи и комментарии"
echo ""
echo "✨ Проект готов к использованию!" 
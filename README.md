# Backline - Блог на Payload CMS и Next.js

Современное блог-приложение, построенное на основе Payload CMS с использованием Next.js App Router, TypeScript и Tailwind CSS.

## Технологический стек

- **Frontend**: Next.js с App Router
- **CMS**: Payload CMS
- **База данных**: PostgreSQL
- **Типизация**: TypeScript
- **Стилизация**: Tailwind CSS v4, shadcn/ui
- **Темы**: Светлая/темная с использованием next-themes

## Функциональность

- Роли пользователей (администратор, пользователь)
- Блог с просмотром списка постов и детальным просмотром
- Responsive интерфейс с поддержкой мобильных устройств
- Система комментариев для постов
- Административная панель для управления контентом (Payload CMS Admin)

## Настройка и запуск

### Предварительные требования

- Node.js (версия 18+)
- PostgreSQL
- pnpm (рекомендуется)

### Установка

1. Клонируйте репозиторий:

   ```bash
   git clone <your-repo-url>
   cd backline
   ```

2. Установите зависимости:
   pnpm install

3. Создайте файл .env на основе .env.example:
   .env.example .env

4. Настройте переменные окружения в .env:
   CopyDATABASE_URI=postgresql://username:password@localhost:5432/database_name
   PAYLOAD_SECRET=your-secret-key

5. Запустите приложение в режиме разработки:
   pnpm dev

### Структура проекта

/src/app - App Router страницы и маршруты
/src/components - React компоненты
/src/collections - Конфигурация коллекций Payload CMS
/src/hooks - Пользовательские React хуки

### Разработка

Управление пользователями
Система включает две роли пользователей:

Администратор: полный доступ к панели администратора и возможность управления контентом
Пользователь: базовые права для просмотра контента и комментирования

### Лицензия

MIT

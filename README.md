# GitHub Profile

Веб-приложение для просмотра профиля GitHub-пользователя, списка его репозиториев и поиска других пользователей. Поддерживается авторизация через GitHub OAuth и редактирование собственного профиля.

## 🚀 Функциональность

- 🔐 Авторизация через GitHub (OAuth)
- 👤 Просмотр собственного профиля и профилей других пользователей
- ✍️ Редактирование данных своего профиля (имя, компания, локация, био)
- 📦 Просмотр списка публичных и приватных репозиториев
- 🔍 Поиск пользователей GitHub по имени
- 🧭 Навигация между страницами (профиль, репозитории, поиск)

## 🧑‍💻 Стек технологий

- **React + TypeScript**
- **Redux Toolkit** для управления состоянием
- **RTK AsyncThunk** для запросов к GitHub API
- **React Router v6**
- **NextUI + Tailwind CSS** для UI
- **GitHub OAuth** для авторизации

## 🔐 Авторизация через GitHub

```bash
# Чтобы запустить приложение:

1. Зарегистрируйте OAuth-приложение в [GitHub Developer Settings](https://github.com/settings/developers)
2. Укажите в `.env` для сервера:

CLIENT_ID=ваш_client_id
CLIENT_SECRET=ваш_client_secret

3. Добавьте в `client/.env`:

VITE_CLIENT_ID=ваш_client_id
```

## 📦 Установка и запуск

```bash
# Клонируем репозиторий
git clone https://github.com/Rummiya/github-profile.git

# Запускаем клиент
cd github-profile/client
npm install
npm run dev

# Запуск сервера
cd ./../server
npm install
npm run start
```

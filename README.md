![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![RTK](https://img.shields.io/badge/Redux%20Toolkit-informational?style=for-the-badge&color=764abc&logo=redux&logoColor=white)
![RTK Query](https://img.shields.io/badge/RTK%20Query-informational?style=for-the-badge&color=764abc&logo=redux&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
# GitHub Profile

Веб-приложение для просмотра профиля GitHub-пользователя, списка его репозиториев и поиска других пользователей. Поддерживается авторизация через GitHub OAuth и редактирование собственного профиля.

## 🚀 Функциональность

- 🔐 Авторизация через GitHub (OAuth)
- 👤 Просмотр собственного профиля и профилей других пользователей
- ✍️ Редактирование данных своего профиля (имя, компания, локация, био)
- 📦 Просмотр списка публичных репозиториев (у всех) и приватных (только у себя)
- 🔍 Поиск пользователей GitHub по имени
- 🧭 Навигация между страницами (профиль, репозитории, поиск)

## 🔐 Авторизация через GitHub

Чтобы запустить приложение:

1. Зарегистрируйте OAuth-приложение в [GitHub Developer Settings](https://github.com/settings/developers) со следующими данными:

 ```bash
# в Homepage URL укажите  
http://localhost:3000

# в Authorization callback URL  
http://localhost:3000/oauth-callback
```

2. Добавьте в `server/.env`:

```javascript
CLIENT_ID=ваш_client_id  
CLIENT_SECRET=ваш_client_secret
```

3. Добавьте в `client/.env`:

```javascript
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

Таблица дел на неделю

Функции приложения:
- Добавление задач по дням недели
- Отметка выполнения задач
- Удаление задач
- REST API для всех операций

### Главная страница
![Главная страница](screenshots/главная.png)

### Добавление задачи
![Добавление задачи](screenshots/Добавление_задач.png)

### Отображение полного расписания с задачами на неделю
![API запросы](screenshots/Полное_расписание.png)

### Возможность удаления задачи или её возобновления в списке
![Консоль сервера](screenshots/Удаление_возобновление_задачи.png)

Все требования реализованы:

1. Базовый Express-сервер
(Реализовано в server.js)

2. Маршруты (GET, POST, PUT, DELETE)
Полный CRUD реализован в routes/tasks.js:
GET /api/tasks - получить все задачи
GET /api/tasks/:day - получить задачи по дню недели
POST /api/tasks - создать новую задачу
PUT /api/tasks/:id - обновить задачу
DELETE /api/tasks/:id - удалить задачу

4. Работа с параметрами запросов
req.params - для получения ID задачи и дня недели

4. Обработка тела запроса
В server.js добавлены:
app.use(express.json());      // для JSON данных
app.use(express.urlencoded({ extended: true })); // для form-data

5. Собственный middleware
Реализован middleware/logger.js и подключен в server.js

6. Раздача статических файлов
В server.js:
app.use(express.static(path.join(__dirname, 'public')));
Все файлы из папки public/ доступны по корневому URL.

7. Логика разнесена по модулям
routes/tasks.js - маршрутизация
controllers/tasksController.js - бизнес-логика
middleware/logger.js - промежуточные обработчики

Завершинская П. С., ЭФБО-01-24, КР5




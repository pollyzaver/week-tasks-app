const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

// Чтение данных из JSON
const readData = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

// Запись данных в JSON
const writeData = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

module.exports = {
  // 1. Получить все задачи
  getAllTasks: async (req, res) => {
    const tasks = await readData();
    res.json(tasks);
  },

  // 2. Получить задачи по дню недели
  getTasksByDay: async (req, res) => {
    const { day } = req.params;
    const tasks = await readData();
    const filtered = tasks.filter(task => task.day.toLowerCase() === day.toLowerCase());
    res.json(filtered);
  },

  // 3. Добавить новую задачу
  addTask: async (req, res) => {
    const { text, day, completed = false } = req.body;
    if (!text || !day) {
      return res.status(400).json({ error: 'Поля text и day обязательны' });
    }

    const tasks = await readData();
    const newTask = {
      id: Date.now(),
      text,
      day,
      completed
    };
    tasks.push(newTask);
    await writeData(tasks);
    res.status(201).json(newTask);
  },

  // 4. Обновить задачу по ID
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { text, day, completed } = req.body;
    const tasks = await readData();
    const taskIndex = tasks.findIndex(t => t.id == id);

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    if (text !== undefined) tasks[taskIndex].text = text;
    if (day !== undefined) tasks[taskIndex].day = day;
    if (completed !== undefined) tasks[taskIndex].completed = completed;

    await writeData(tasks);
    res.json(tasks[taskIndex]);
  },

  // 5. Удалить задачу по ID
  deleteTask: async (req, res) => {
    const { id } = req.params;
    let tasks = await readData();
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id != id);

    if (tasks.length === initialLength) {
      return res.status(404).json({ error: 'Задача не найдена' });
    }

    await writeData(tasks);
    res.json({ message: 'Задача удалена' });
  }
};
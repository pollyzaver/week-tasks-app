const API_URL = '/api/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function renderWeek() {
  const tasks = await fetchTasks();
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = {
    monday: 'Понедельник',
    tuesday: 'Вторник',
    wednesday: 'Среда',
    thursday: 'Четверг',
    friday: 'Пятница',
    saturday: 'Суббота',
    sunday: 'Воскресенье'
  };

  const weekDiv = document.querySelector('.week');
  weekDiv.innerHTML = '';

  days.forEach(day => {
    const dayTasks = tasks.filter(t => t.day === day);
    
    const dayDiv = document.createElement('div');
    dayDiv.className = 'day';
    dayDiv.innerHTML = `
      <h3>${dayNames[day]}</h3>
      <div class="task-list" id="${day}"></div>
    `;
    weekDiv.appendChild(dayDiv);

    const taskList = document.getElementById(day);
    dayTasks.forEach(task => {
      const taskEl = document.createElement('div');
      taskEl.className = `task ${task.completed ? 'completed' : ''}`;
      taskEl.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button onclick="toggleTask(${task.id})">${task.completed ? '↩' : '✓'}</button>
          <button onclick="deleteTask(${task.id})">✕</button>
        </div>
      `;
      taskList.appendChild(taskEl);
    });
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const select = document.getElementById('daySelect');
  const text = input.value.trim();
  const day = select.value;

  if (!text) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, day })
  });

  input.value = '';
  input.focus();
  renderWeek();
}

async function toggleTask(id) {
  const tasks = await fetchTasks();
  const task = tasks.find(t => t.id == id);
  if (!task) return;

  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed: !task.completed })
  });

  renderWeek();
}

async function deleteTask(id) {
  if (confirm('Удалить задачу?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    renderWeek();
  }
}

renderWeek();

document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
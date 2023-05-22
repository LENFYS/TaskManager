// Получаем ссылки на элементы формы и таблицы
const form = document.querySelector('.form');
const task = document.querySelector('#task');
const taskType = document.querySelector('#select1');
const user = document.querySelector('#select2');
const table = document.querySelector('#table');

const tasksArray = []; // Массив для хранения строк задач

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Отменяем отправку формы
});

function add() {
  // Проверяем, заполнены ли поля задачи и типа задачи
  if (task.value === '' || taskType.value === '') {
    alert('Creating an empty record failed. Try entering some data in fields.');
    return;
  } else {
    // Создаем элементы для задачи и кнопки удаления
    const newTask = document.createElement('td');
    const newTaskType = document.createElement('td');
    const newUser = document.createElement('td');
    const newAction = document.createElement('td');
    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Remove'; // Устанавливаем текст на кнопке
    deleteButton.addEventListener('click', () => {
      deleteButton.classList.add('delete-button');
      const rowIndex = tasksArray.indexOf(newTr);
      tasksArray.splice(rowIndex, 1); // Удаляем строку из массива задач
      updateTable(); // Обновляем таблицу
    });

    // Заполняем содержимое элементов
    newTask.textContent = task.value;
    newTaskType.textContent = taskType.value;
    newUser.textContent = user.value;

    const newTr = document.createElement('tr');
    newTr.appendChild(newTask);
    newTr.appendChild(newTaskType);
    newTr.appendChild(newUser);
    newTr.appendChild(newAction);
    newAction.appendChild(deleteButton);

    tasksArray.push(newTr); // Добавляем строку в массив задач
  }

  sortTasks(); // Сортируем задачи
  updateTable(); // Обновляем таблицу
}

function sortTasks() {
  tasksArray.sort((a, b) => {
    const typeA = a.children[1].textContent;
    const typeB = b.children[1].textContent;

    const progressOrder = ['To Do', 'In progress', 'Done'];
    const typeAIndex = progressOrder.indexOf(typeA);
    const typeBIndex = progressOrder.indexOf(typeB);

    return typeAIndex - typeBIndex;
  });
}

function updateTable() {
  // Получаем все строки таблицы, кроме заголовка
  const rows = table.querySelectorAll('tr');

  // Удаляем все строки, кроме заголовка таблицы
  for (let i = 1; i < rows.length; i++) {
    table.removeChild(rows[i]);
  }

  // Добавляем отсортированные строки в таблицу
  for (const task of tasksArray) {
    table.appendChild(task);
  }
}

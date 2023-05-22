const forma = document.querySelector('.forma');
const task = document.querySelector('#task');
const taskType = document.querySelector('#select1');
const table = document.querySelector('#tasks');
const tasksArray = []; // Массив для хранения строк задач
const user = document.querySelector('#select2')

forma.addEventListener('submit', (e) => {
  e.preventDefault();
});

function add() {
    let cell = task.value;
    let cell2 = taskType.value;
    let cell3 = user.value.split('+'); // Разделение выбранных пользователей по символу "+"
  
    if (cell === '' || cell2 === '' || cell3.length === 0) {
      alert('Creating an empty record failed. Try entering some data in fields.');
      return;
    } else {
      for (const userValue of cell3) { // Перебор выбранных пользователей
        const newTask = document.createElement('td');
        const newTaskType = document.createElement('td');
        const newUser = document.createElement('td');
        const newAction = document.createElement('td');
        const deleteButton = document.createElement('button'); // Создание кнопки удаления
        deleteButton.textContent = 'Remove'; // Текст на кнопке
        deleteButton.addEventListener('click', () => { // Обработчик клика на кнопку удаления
        deleteButton.classList.add('delete-button');
        const rowIndex = tasksArray.indexOf(newTr);
        tasksArray.splice(rowIndex, 1); // Удаляем строку из массива задач
        updateTable(); // Обновляем таблицу
        });
        newTask.textContent = cell;
        newTaskType.textContent = cell2;
        newUser.textContent = userValue;
        const newTr = document.createElement('tr');
        newTr.appendChild(newTask);
        newTr.appendChild(newTaskType);
        newTr.appendChild(newUser);
        newTr.appendChild(newAction)
        newAction.appendChild(deleteButton)
        tasksArray.push(newTr); // Добавляем строку в массив задач
      }
      sortTasks(); // Сортируем задачи
      updateTable(); // Обновляем таблицу
    }
  }
  
  

  function sortTasks() {
    tasksArray.sort((a, b) => {
      const typeA = a.children[1].textContent;
      const typeB = b.children[1].textContent;
  
      const progressOrder = ['To Do', 'In progress', 'Done'];
      const typeAIndex = progressOrder.indexOf(typeA);
      const typeBIndex = progressOrder.indexOf(typeB);
  
      if (typeAIndex < typeBIndex) {
        return -1;
      } else if (typeAIndex > typeBIndex) {
        return 1;
      } else {
        return 0;
      }
    });
  }
  


function updateTable() {
  // Remove all rows except the table header
  const rows = table.querySelectorAll('tr');
  for (let i = 1; i < rows.length; i++) {
    table.removeChild(rows[i]);
  }

  // Add the sorted rows to the table
  for (const task of tasksArray) {
    table.appendChild(task);
  }
}

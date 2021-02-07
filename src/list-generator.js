import {formatDistanceStrict} from 'date-fns';


export default function getUserInput(array, count, priority, titleInput, descriptionInput, taskDate, index, checked, condition) {
    if (condition) {
        const newTask = taskFactory(titleInput, descriptionInput, taskDate, priority);
        array.push(newTask);
    }
    tasksAppend(count, priority, index);
    buttonsAppend(count, index);
    taskText(taskDate, count, index, titleInput, descriptionInput, checked);
}

function taskFactory(title, description, date, priority) {
     const task = {
        title: title,
        description: description,
        date: date,
        priority: priority,
        completion: false
    }
    return task;
}

function tasksAppend(count, priority, index) {
    let taskDiv = document.createElement('div');
    if (priority === 'low') {
        taskDiv.classList.add('tasks-low');
    } else if (priority === 'medium') {
        taskDiv.classList.add('tasks-medium');
    } else if (priority === 'high') {
        taskDiv.classList.add('tasks-high');
    }

    taskDiv.setAttribute('id', `task${index}${count}`);
    document.querySelector('.active').appendChild(taskDiv);
}

function taskText(taskDate, count, index, titleInput, descriptionInput, checked) {
    let taskTitle = document.createElement('h3');
    taskTitle.classList.add('task-title');
    taskTitle.setAttribute('id', `task-title${index}${count}`)
    taskTitle.textContent = titleInput;

    let taskDescription = document.createElement('p');
    taskDescription.classList.add('task-description');
    taskDescription.textContent = descriptionInput;
    taskDescription.setAttribute('id', `task-description${index}${count}`)

    let taskCheckbox = document.createElement('input');
    taskCheckbox.setAttribute('type', 'checkbox');
    taskCheckbox.setAttribute('id', `task-check${index}${count}`); 
    checked == true ? taskCheckbox.checked = true : taskCheckbox.checked = false;
    taskCheckbox.classList.add('task-check');

    document.getElementById(`task${index}${count}`).appendChild(taskTitle);
    document.getElementById(`task${index}${count}`).appendChild(taskDescription);
    taskDueDate(taskDate, count, index);
    document.getElementById(`task${index}${count}`).appendChild(taskCheckbox);
}

function taskDueDate(taskDate, count, index) {
    let dueDate = document.createElement('p');
    dueDate.classList.add('due-date');
    dueDate.textContent = `${formatDistanceStrict(new Date(), new Date(taskDate))} left`;

    document.getElementById(`task${index}${count}`).appendChild(dueDate);
}

function buttonsAppend(count, index) {
    let deleteButton = document.createElement('img');
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('id', `delete${index}${count}`)
    deleteButton.src = 'images/trash-solid.svg';
    deleteButton.title = 'Delete task';

    let editButton = document.createElement('img');
    editButton.classList.add('edit-button');
    editButton.setAttribute('id', `edit${index}${count}`);
    editButton.src = 'images/edit-solid.svg';
    editButton.title = 'Edit task';

    document.getElementById(`task${index}${count}`).appendChild(editButton);
    document.getElementById(`task${index}${count}`).appendChild(deleteButton);
}
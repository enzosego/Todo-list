import {datePicker} from './date-picker.js';
import getUserInput from './list-generator.js';
import projectCreation from './project-generator.js';
import checkInputs from './check-input.js';

datePicker();

let count = 0;
let submitBtn = document.getElementById('submit')
let prioritySelect = document.getElementById('priority-select');
let priority = 'low';

const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const taskDate = document.querySelector('#date-calendar');

let actualContainer = 'container0';

let projectsCount = 1;

let lStorageCopy = JSON.parse(localStorage.getItem('projects'));
console.table(lStorageCopy);

if (lStorageCopy) {
    for (let i = 0; i < lStorageCopy.length; i++) {
        if (i !== 0) {
            projectCreation(projectsCount, lStorageCopy[i].projectName);
            projectsCount++;
        }
        if (i > 0) {
            document.getElementById(`container${i}`).classList.add('active');
            document.getElementById(`container${i - 1}`).classList.remove('active');
        }
        
        let count = 0;
        lStorageCopy[i].count = 0;
        
        for (let j = 0; j < lStorageCopy[i].list.length; j++) {
            getUserInput(lStorageCopy[i].list, count, lStorageCopy[i].list[j].priority,
                lStorageCopy[i].list[j].title, lStorageCopy[i].list[j].description, lStorageCopy[i].list[j].date, 
                lStorageCopy[i].projectContainer.slice(-1), lStorageCopy[i].list[j].completion);
                count++;
                lStorageCopy[i].count = lStorageCopy[i].count + 1;
            }
            
            i == lStorageCopy.length - 1 ? document.getElementById(`container${i}`).classList.remove('active') : '';
        }
        document.getElementById('container0').classList.add('active');
        projectSwitch();
    } else {
        lStorageCopy = [];
        lStorageCopy.push(projectFactoryFunction('container0'));
    }
    

const newProjectBtn = document.getElementById('new-project');

newProjectBtn.addEventListener('click', () => {
    if (projectsCount < 6) {
        lStorageCopy.push(projectFactoryFunction(`container${projectsCount}`));
        localStorage.setItem('projects', JSON.stringify(lStorageCopy));
        projectCreation(projectsCount);
    projectSwitch();
    projectsCount++;
    }
});

function projectFactoryFunction(projectContainer) {
    return {
        projectName: 'New Project',
        projectContainer: projectContainer,
        list: [],
        count: 0
    }
}

prioritySelect.addEventListener('change', () => {
    if (prioritySelect.value  == 'medium') {
        priority = 'medium';
    } else if (prioritySelect.value == 'high') {
        priority = 'high';
    } else {
        priority = 'low';
    }
})

submitBtn.addEventListener('click', () => {
    checkInputs(titleInput, descriptionInput, taskDate);
    if (titleInput.value && descriptionInput.value && taskDate.value) {
        if (lStorageCopy[actualContainer.slice(-1)].count < 8) {
            getUserInput(lStorageCopy[actualContainer.slice(-1)].list, 
            lStorageCopy[actualContainer.slice(-1)].count,
             priority, titleInput.value, descriptionInput.value, taskDate.value, actualContainer.slice(-1), false, 1);

            localStorage.setItem('projects', JSON.stringify(lStorageCopy));
            lStorageCopy[actualContainer.slice(-1)].count = lStorageCopy[actualContainer.slice(-1)].count + 1;
	    
	    titleInput.value = '';
	    descriptionInput.value = '';
        }
    }
});

function projectSwitch() {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const projectContent = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(projectTab => {
        projectTab.addEventListener('click', () => {
            const target = document.querySelector(projectTab.dataset.tabTarget);
            actualContainer = target.id;
            projectContent.forEach(pContent => {
                pContent.classList.remove('active');
            });
            tabs.forEach(projectTab => {
                projectTab.classList.remove('active-tab');
            });
            projectTab.classList.add('active-tab');
            target.classList.add('active');
        });
    });
};

window.addEventListener('load', e => {
    const checkBoxes = document.querySelectorAll('input[type=checkbox]');

    checkBoxes.forEach(box => {
        if (box.checked) {
            box.parentElement.classList.add('checked-task')
        }
    })
})

//eventListener for the completion check-box

document.addEventListener('change', e => {
    if (e.target && e.target.classList == 'task-check') {
        let targetId = e.target.id.slice(-2);
        if (e.target.checked) {
            lStorageCopy[targetId.slice(-2, -1)].list[targetId.slice(-1)].completion = true;
            e.target.parentElement.classList.add('checked-task');
        } else {
            lStorageCopy[targetId.slice(-2, -1)].list[targetId.slice(-1)].completion = false;
            e.target.parentElement.classList.remove('checked-task');
        }
        localStorage.setItem('projects', JSON.stringify(lStorageCopy));
        console.log('completion: ' + lStorageCopy[targetId.slice(-2, -1)].list[targetId.slice(-1)].completion);
    }
});

//eventListener for the delete button

window.addEventListener('click', e => {
    if (e.target && e.target.classList == 'delete-button') {
        let idNumber = e.target.id.slice(-2);

        let taskContainer = document.getElementById(`container${idNumber[0]}`).querySelectorAll('div');
        let indivudualTasks = [];
        taskContainer.forEach(container => {
            indivudualTasks.push(container);
        });
        
        for (let i = +idNumber[1] + 1; i < indivudualTasks.length; i++) {
            document.getElementById(`task${idNumber[0]}${i}`).setAttribute('id', `task${idNumber[0]}${i - 1}`);
            document.getElementById(`edit${idNumber[0]}${i}`).setAttribute('id', `edit${idNumber[0]}${i - 1}`);
            document.getElementById(`delete${idNumber[0]}${i}`).setAttribute('id', `delete${idNumber[0]}${i - 1}`);
            document.getElementById(`task-check${idNumber[0]}${i}`).setAttribute('id', `task-check${idNumber[0]}${i - 1}`);
        }
        
        lStorageCopy[idNumber[0]].list.splice(idNumber[1], 1);
        lStorageCopy[idNumber[0]].count = lStorageCopy[idNumber[0]].count - 1;
        localStorage.setItem('projects', JSON.stringify(lStorageCopy));
        
        let task = document.getElementById(e.target.id).parentElement;
        task.parentElement.removeChild(task);
    }
});

//eventListener for the edit button

window.addEventListener('click', e => {
    let idNumber = e.target.id.slice(-2);
    if (e.target && e.target.classList == 'edit-button' && !document.getElementById(`finish-edit${idNumber}`)) {
        let parentDiv = e.target.parentElement;

        let titleBefore = parentDiv.querySelector('.task-title').textContent;
        let descriptionBefore = parentDiv.querySelector('.task-description').textContent;

        let titleEdit = document.createElement('input');
        titleEdit.type = 'text';
        titleEdit.value = titleBefore;
        titleEdit.setAttribute('id', 'title-edit');
        titleEdit.classList.add('input-edit');

        let descriptionEdit = document.createElement('input');
        descriptionEdit.type = 'text';
        descriptionEdit.value = descriptionBefore;
        descriptionEdit.setAttribute('id', 'description-edit');
        descriptionEdit.classList.add('input-edit');

        let finishEditButton = document.createElement('button');
        finishEditButton.classList.add('finish-edit-button');
        finishEditButton.setAttribute('id', `finish-edit${idNumber}`);
        finishEditButton.title = 'Done!';

        parentDiv.appendChild(titleEdit);
        parentDiv.appendChild(descriptionEdit);
        parentDiv.appendChild(finishEditButton);
    }
});

//eventListener for the finish-edit-button

document.addEventListener('click', e => {
    let idNumber = e.target.id.slice(-2);
    if (e.target && e.target.classList == 'finish-edit-button') {
        let newTitle = document.getElementById('title-edit').value;
        let newDescription = document.getElementById('description-edit').value;

        lStorageCopy[idNumber.slice(-2, -1)].list[idNumber.slice(-1)].title = newTitle;
        lStorageCopy[idNumber.slice(-2, -1)].list[idNumber.slice(-1)].description = newDescription;
        localStorage.setItem('projects', JSON.stringify(lStorageCopy))        

        document.getElementById(`task-title${idNumber}`).textContent = newTitle;
        document.getElementById(`task-description${idNumber}`).textContent = newDescription;

        let parentDiv = e.target.parentElement;
        let titleEdit = document.getElementById('title-edit');
        let descriptionEdit = document.getElementById('description-edit');
        let finishEditButton = document.getElementById(`finish-edit${idNumber}`);

        parentDiv.removeChild(titleEdit);
        parentDiv.removeChild(descriptionEdit);
        parentDiv.removeChild(finishEditButton);
    }
});

//eventListener for deleting a project

document.addEventListener('click', e => {
    if (e.target && e.target.classList == 'project-delete') {
        let idNumber = e.target.id.slice(-1);

	actualContainer = 'container0';
        
	lStorageCopy.splice(idNumber, 1);
        
        for (let i = +idNumber + 1; i <= lStorageCopy.length; i++) {
            document.getElementById(`project-delete${i}`).id = `project-delete${i - 1}`;
            document.getElementById(`project${i}`).dataset.tabTarget = `#container${i - 1}`;
            document.getElementById(`project${i}`).id = `project${i - 1}`;
            document.getElementById(`project-edit${i}`).id = `project-edit${i - 1}`;
            document.getElementById(`tab-text${i}`).id = `tab-text${i - 1}`;
            document.getElementById(`container${i}`).id = `container${i - 1}`;
        }
            
        if (lStorageCopy.length >= 2) {
            for (let i = +idNumber; i < lStorageCopy.length; i++) {
                for (let j = 0; j < lStorageCopy[i].list.length; j++) {
                    document.getElementById(`task${i + 1}${j}`).id = `task${i}${j}`;
                    document.getElementById(`edit${i + 1}${j}`).id = `edit${i}${j}`
                    document.getElementById(`delete${i + 1}${j}`).id = `delete${i}${j}`
                    document.getElementById(`task-title${i + 1}${j}`).id = `task-title${i}${j}`
                    document.getElementById(`task-description${i + 1}${j}`).id = `task-description${i}${j}`
                    document.getElementById(`task-check${i + 1}${j}`).id = `task-check${i}${j}`
                }
            }
        }

        for (let i = +idNumber; i < lStorageCopy.length; i++) {
            lStorageCopy[i].projectContainer = `container${i}`;
        }
        localStorage.setItem('projects', JSON.stringify(lStorageCopy));

        let mainContainer = document.getElementById('main-container');
        let containerToRemove = document.getElementById(`container${idNumber}`);
        mainContainer.removeChild(containerToRemove);

        let tabContainer = document.getElementById('existing-projects');
        let tabToRemove = e.target.parentElement;
        tabContainer.removeChild(tabToRemove);
    }
})

//eventListener for editing the project tab

document.addEventListener('click', e => {
    if (e.target && e.target.classList == 'project-edit' && !document.querySelector('.finish-edit-project-button')) {
        let idNumber = e.target.id.slice(-1);

        let projectNameEdit = document.createElement('input');
        projectNameEdit.type= 'text';
        projectNameEdit.classList.add('project-edit-text');
        projectNameEdit.setAttribute('id', `project-edit-text${idNumber}`);
        projectNameEdit.value = lStorageCopy[idNumber].projectName;

        let finishEditButton = document.createElement('img');
        finishEditButton.classList.add('finish-edit-project-button');
        finishEditButton.setAttribute('id', `finish-edit-project-button${idNumber}`);
        finishEditButton.src = 'images/check-square-solid.svg';
        finishEditButton.title = 'Done!';

        document.getElementById(`project${idNumber}`).appendChild(finishEditButton);
        document.getElementById(`project${idNumber}`).appendChild(projectNameEdit);

    }
});

window.addEventListener('click', e => {
    if (e.target && e.target.classList == 'finish-edit-project-button') {
        let idNumber = e.target.id.slice(-1);

        let newName = document.getElementById(`project-edit-text${idNumber}`).value;

        lStorageCopy[idNumber].projectName = newName;
        localStorage.setItem('projects', JSON.stringify(lStorageCopy));

        document.getElementById(`tab-text${idNumber}`).textContent = newName;

        let parentElement = e.target.parentElement;

        parentElement.removeChild(e.target);
        parentElement.removeChild(document.getElementById(`project-edit-text${idNumber}`));
    }
})

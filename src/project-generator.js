export default function projectCreation(projectsCount, projectName = 'New Project') {
    const mainContainer = document.getElementById('main-container');

    
    listAppend(projectsCount, mainContainer);
    projectTabAppend(projectsCount);
    buttonsAppend(projectsCount);
    projectTabText(projectsCount, projectName);
}

function listAppend(projectsCount, mainContainer) {
    let newListContainer = document.createElement('div');
    newListContainer.classList.add(`list`);
    newListContainer.setAttribute('id', `container${projectsCount}`);
    newListContainer.dataset.tabContent = '';
    
    mainContainer.appendChild(newListContainer);
}

function projectTabAppend(projectsCount) {
    let newTab = document.createElement('div');
    newTab.setAttribute('id', `project${projectsCount}`);
    newTab.classList.add('project-tab');
    newTab.dataset.tabTarget = `#container${projectsCount}`;
    
    document.getElementById('existing-projects').appendChild(newTab);
}

function projectTabText(projectsCount, projectName) {
    let tabText = document.createElement('p');
    tabText.classList.add('tab-text');
    tabText.setAttribute('id', `tab-text${projectsCount}`);
    tabText.textContent = projectName;

    document.getElementById(`project${projectsCount}`).appendChild(tabText);
}

export function buttonsAppend(projectsCount) {
    let editNameButton = document.createElement('img');
    editNameButton.src = 'images/edit-solid.svg';
    editNameButton.classList.add('project-edit');
    editNameButton.setAttribute('id', `project-edit${projectsCount}`);
    editNameButton.title = 'Edit this project\'s name';
    
    let deleteProjectButton = document.createElement('img');
    deleteProjectButton.src = 'images/trash-solid.svg';
    deleteProjectButton.classList.add('project-delete');
    deleteProjectButton.setAttribute('id', `project-delete${projectsCount}`);
    deleteProjectButton.title = 'Delete this project';

    document.getElementById(`project${projectsCount}`).appendChild(editNameButton);
    document.getElementById(`project${projectsCount}`).appendChild(deleteProjectButton);
}
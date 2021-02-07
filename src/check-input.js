// input validation form

export default function checkInputs(titleInput, descriptionInput, taskDate) {
    const formTitleValue = titleInput.value;
    const formDescriptionValue = descriptionInput.value;
    const formDateValue = taskDate.value

    if (formTitleValue === '') {
        applyErrorClass(titleInput);
    } else {
        applySuccessClass(titleInput);
    }

    if (formDescriptionValue === '') {
        applyErrorClass(descriptionInput);
    } else {
        applySuccessClass(descriptionInput);
    }
    if (formDateValue === '') {
        applyErrorClass(taskDate);
    } else {
        applySuccessClass(taskDate);
    }
};

function applySuccessClass(input) {
    const inputCont = input.parentElement;

    inputCont.className = 'input-cont success';
}

function applyErrorClass(input) {
    const inputCont = input.parentElement;

    inputCont.className = 'input-cont error';
}
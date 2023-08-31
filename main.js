let input = document.createElement('input');
	input.placeholder = 'Задача';

let btn = document.createElement('button')
	btn.textContent = 'Создать задачу'
	btn.classList.add('btn-create')

let blockWrap = document.createElement('div')
	blockWrap.classList.add('wrapper')


document.body.append(input, btn, blockWrap);


function doneButtonClick (listItem, block, title, btnDelete, btnChange, btnDone, btnBack) {
	block.style.backgroundColor = '#5eab47'
	block.style.height = '220px'
	title.style.color = 'white'
	btnDelete.style.backgroundColor = '#0d4c0d'
	block.style.position = "relative";
	listItem.classList.add('btn-green')
	btnBack.style.backgroundColor = '#0d4c0d'
	removeElement(btnChange);
	removeElement(btnDone);
	listItem.append(btnBack);
	listItem.insertBefore(btnBack, listItem.firstChild);


}
function backButtonClick (block, btnDelete, listItem, title) {
	block.style.backgroundColor = null;
	block.style.removeProperty('height');
	title.style.removeProperty('color');
	btnDelete.style.removeProperty('background-color');
	block.style.removeProperty('position');
	listItem.classList.remove('btn-green');
	let btnDone = createDoneBtn();
	let btnChange = createChangeBtn();
	let btnBack = createBackBtn();
	btnDone.addEventListener('click', () => {
			doneButtonClick(listItem, block, title, btnDelete, btnChange, btnDone, btnBack);
	});

	btnChange.addEventListener('click', () => {
		changeButtonClick(title, listItem, block);
		removeElement(btnChange)
		removeElement(btnDone)
		removeElement(btnDelete)
	});

	btnBack.addEventListener('click', () => {
			backButtonClick(block, btnDelete, listItem, title);
			removeElement(btnBack);
		});
	listItem.append(btnDone, btnChange, btnChange);
	listItem.insertBefore(btnDelete, listItem.nextSibling);
}
function onTaskChangeName(listItem, title, block, changeInput, okBtn) {
		title.textContent = changeInput.value

		block.append(title)
		block.insertBefore(title, block.firstChild)
		removeElement(changeInput);
		removeElement(okBtn);

		let btnDone = createDoneBtn();
		let btnChange = createChangeBtn();
		let btnBack = createBackBtn();
		let changeBtn = createChangeBtn();
		let btnDelete = createDeleteBtn();
		btnBack.addEventListener('click', () => {
			backButtonClick(block, btnDelete, listItem, title);
			removeElement(btnBack);
		});
		listItem.append(btnDone, btnChange, btnDelete);
		listItem.insertBefore(btnDone, listItem.firstChild);

		btnDone.addEventListener('click', () => {
			doneButtonClick(listItem, block, title, btnDelete, btnChange, btnDone, btnBack);
		});
		btnChange.addEventListener('click', () => {
			changeButtonClick(title, listItem, block);
			removeElement(btnChange)
			removeElement(btnDone)
			removeElement(btnDelete)
		});
		btnDelete.addEventListener('click', () => {
		onDeleteButtonClick(block);
		});
}
function changeButtonClick(title, listItem, block) {
	removeElement(title);
	let changeInp = document.createElement('input')
	changeInp.classList.add('changeInp')
	changeInp.value = title.innerText;

	let changeBtn = document.createElement('button')
	changeBtn.textContent = 'Ok'
	changeBtn.classList.add('btn-color')
	
	let btnDelete = createDeleteBtn();

	listItem.append(changeBtn, changeInp, btnDelete)

	btnDelete.addEventListener('click', () => {
		onDeleteButtonClick(block);
	});

	listItem.insertBefore(changeBtn, listItem.firstChild)
	listItem.insertBefore(changeInp, listItem.firstChild)

	changeInp.addEventListener("keypress", function(event) {
	  	if (event.key === "Enter") {
			event.preventDefault();
			onTaskChangeName(listItem, title, block, changeInp, changeBtn);
			removeElement(btnDelete)
  		}
	});

	changeBtn.onclick = () => {
		onTaskChangeName(listItem, title, block, changeInp, changeBtn);
		removeElement(btnDelete)
	}
}


function removeElement(element) {
	element.remove();
}

const onDeleteButtonClick = (block) => {
    removeElement(block);
}

const createDoneBtn = () => {
	let doneBtn = document.createElement('button')
	doneBtn.textContent = 'Выполнено';
	doneBtn.classList.add('btn-done');
	return doneBtn;
}
const createChangeBtn = () => {
	let btnChange = document.createElement('button')
	btnChange.textContent = 'Изменить';
	btnChange.classList.add('btn-color');
	return btnChange;
}
const createDeleteBtn = () => {
	let btnDelete = document.createElement('button')
	btnDelete.textContent = 'Удалить';
	btnDelete.classList.add('btn-color')
	return btnDelete;
}
const createBackBtn = () => {
	let backBtn = document.createElement('button')
	backBtn.textContent = 'Назад'
	backBtn.classList.add('btn-color')
	return backBtn;
}

const onCreateTask = () => {
	let block = document.createElement('div')
	block.classList.add('container')
	blockWrap.append(block);

	let title = document.createElement('h1')
	title.textContent = input.value
	input.value = ''

	let btnDone = createDoneBtn();

	let btnChange = createChangeBtn();

	let btnDelete = createDeleteBtn();

	let btnBack = createBackBtn();

	let list = document.createElement('ul');

	let listItem = document.createElement('li');
	list.append(listItem);

	listItem.append(btnDone, btnChange, btnDelete);

	block.append(title, list);

	btnDone.addEventListener('click', () => {
		doneButtonClick(listItem, block, title, btnDelete, btnChange, btnDone, btnBack);
	});

	btnDelete.addEventListener('click', () => {
		onDeleteButtonClick(block);
	});

	btnChange.addEventListener('click', () => {
		changeButtonClick(title, listItem, block);
		removeElement(btnChange)
		removeElement(btnDone)
		removeElement(btnDelete)
	});

	btnBack.addEventListener('click', () => {
		backButtonClick(block, btnDelete, listItem, title);
		removeElement(btnBack);
	});
}

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
	event.preventDefault();
	if (input.value.trim()) {
        onCreateTask();
    }
  }

});

btn.onclick = () => {
    if (input.value.trim()) {
        onCreateTask();
    }
}


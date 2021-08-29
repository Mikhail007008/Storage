'use strict';

const todoControl = document.querySelector('.todo-control'),
	headerInput = document.querySelector('.header-input'),
	todoList = document.querySelector('.todo-list'),
	todoCompleted = document.querySelector('.todo-completed'),
	headerButton = document.querySelector('.header-button');

let todoData = [];

const checkToDo = function(){
	let info = JSON.parse(localStorage.getItem('toDo'));

	if(info){
		todoData = info;
	}
};

checkToDo();

const render = function() {
	todoList.textContent = '';
	todoCompleted.textContent = '';

	todoData.forEach(function(item, index){
		const li = document.createElement('li');
		li.classList.add('todo-item');

		li.innerHTML = 	'<span class="text-todo">' + item.value + '</span>' +
		'<div class="todo-buttons">' + 
			'<button class="todo-remove"></button>' +
			'<button class="todo-complete"></button>' +
		'</div>';

		if(item.completed){
			todoCompleted.append(li);
		}else{
			todoList.append(li);
		}

		const btnToDoComplete = li.querySelector('.todo-complete');
		const btnToDoRemove = li.querySelector('.todo-remove');

		btnToDoComplete.addEventListener('click', function(){
			item.completed = !item.completed;

			render();
		});

		btnToDoRemove.addEventListener('click', function(){
			todoData.splice(index);
			render();
		});
	});
};

todoControl.addEventListener('submit', function(event){
	event.preventDefault();

	const newTodo = {
		value: headerInput.value,
		completed: false
	};

	if(headerInput.value !== ''){
		todoData.push(newTodo);

		let	json = JSON.stringify(todoData);
		localStorage.toDo = json;
	}
	
	headerInput.value = '';

	render();
});

render();



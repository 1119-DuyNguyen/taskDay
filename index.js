'use strict'
var tasks = JSON.parse(localStorage.getItem('tasks')) || []
var finishTasks = JSON.parse(localStorage.getItem('finishTasks')) || []
var countEvent = document.getElementById('count-event')

var formAdd = document.getElementById('form-add-task')
var addTaskBtn = document.querySelector('.add-task')
function init() {
    countEvent.innerText = `Tổng sự kiện: ${tasks.length}`
    //display task

    let listContent = document.querySelector('.task-list-content')
    listContent.innerHTML = ''
    let ul = document.createElement('ul')
    listContent.append(ul)
    tasks.forEach((task, index) => {
        let content = document.createElement('li')
        content.setAttribute('id', `list-item-${index}`)
        content.innerHTML = `
        <label class="switch">
        <input type="checkbox" name =${index} onchange='finishTask(this)'>
        <span class="slider  round"></span>
        </label>
        <button type="button" 
        data-index="${index}"
        class="btn btn-dark" 
        data-bs-toggle="modal" 
        data-bs-target="#content-task" data-modal-content="${task.content}" 
        onclick='setContentModalTask(this)'>
        ${task.title}
        </button>`

        ul.appendChild(content)
    })

    //localStorage.clear()
}

function setContentModalTask(e) {
    let modal = document.getElementById('content-task')
    let btnDel = modal.querySelector('.btn-delete')
    let modalBody = modal.querySelector('.modal-body')
    modal.setAttribute('data-index', e.dataset.index)
    btnDel.addEventListener('click', destroyTask)
    modalBody.innerHTML = `<p>${e.dataset.modalContent} </p><br/>`
}
function destroyTask() {
    let modal = document.getElementById('content-task')
    let index = modal.getAttribute('data-index')
    tasks.splice(index, 1)
    init()
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
function isEmptyObj(obj) {
    return JSON.stringify(obj) === '{}'
}
addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let obj = { isAssign: false }
    formAdd.querySelectorAll('input[name]').forEach((input) => {
        if (input.value != '') {
            obj[input.name] = input.value
            obj.isAssign = true
            input.value = ''
        }
    })

    if (obj.isAssign) {
        tasks.push(obj)
        init()
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
})
function finishTask(e) {
    console.log('hi')
    setTimeout(destroyTask, 2000)
    //đổi màu btn
    document.getElementById(`list-item-${e.name}`).style.animation =
        'fadeOut 2s ease-in forwards'
    var changeBtnToSuccess = document
        .getElementById(`list-item-${e.name}`)
        .querySelector('button')
    console.log(changeBtnToSuccess)
    changeBtnToSuccess.classList.remove('btn-dark')
    changeBtnToSuccess.classList.add('btn-primary')
}
init()
function chinhSua() {}

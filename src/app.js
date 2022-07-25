import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';
import Api from './api'

function init() {

    var myModal = new Modal(document.getElementById('exampleModal'))

    renderTodos()

    document.getElementById('addForm').addEventListener('submit',
        (e) => {
            const input = document.getElementById('toDoName')
            console.log(myModal)
            Api.addTodo({
                name: input.value
            }).then(() => {
                myModal.hide()
                input.value = ''
                renderTodos()
            })
            e.preventDefault()
        }
    )

    document.getElementById('container').addEventListener('click', (e) => {
        const el = e.target
        if (el.classList.contains('remove-todo')) {
            const liEl = el.closest('li')
            // const allLi = Array.from(document.querySelectorAll('#container li'))
            // const numberToRemove = allLi.indexOf(liEl)
            // Api.removeTodo(numberToRemove);

            Api.removeById(liEl.id)
            renderTodos()
        }
    }, {capture: true})

}

function renderTodos() {

    document.getElementById('container').innerHTML = ''

    Api.getData().then((data) => {
        data.forEach((item) => {
            const li = document.createElement('li')
            li.id = item.id
            li.innerHTML =
                `<div class="input-group mb-3">
                    <div class="input-group-text">
                        <input class="form-check-input mt-0" type="checkbox" value="">
                    </div>
                    <input type="text" value="${item.name}" class="form-control">
                    <div class="input-group-text">
                        <button type="button" class="btn btn-primary remove-todo">Remove</button>
                    </div>
                </div>`;
            document.getElementById('container').appendChild(li)

        })
    }, (e) => console.log(e))


}

init()
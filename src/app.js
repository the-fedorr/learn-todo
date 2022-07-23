import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

import Api from './api'

console.log('im here');

function init() {
  var myModal = new Modal(document.getElementById('exampleModal'))

  renderTodos()

    //Bootstrap validation
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          const input = document.getElementById('toDoName')
          
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            console.log("invalid")
          } else {
            Api.addTodo({
              name: input.value,
              id: new Date().getTime()
            })
            myModal.hide()
            input.value = ''
            renderTodos()
            console.log("valid")
          }
          form.classList.add('was-validated')
        }, false)
      })

  document.getElementById('container').addEventListener('click', (e) => {
    const el = e.target

    if (el.classList.contains('remove-todo')) {
      const liEl = el.closest('li')
      Api.removeById(liEl.id)
      renderTodos()
    }
  },{capture:true})
}

init()

function renderTodos() {
  document.getElementById('container').innerHTML = ''
  const data = Api.getData()

  data.forEach((item) => {
    const li = document.createElement('li')
    li.id = item.id
    li.innerHTML = `<div class="input-group mb-3">
      <div class="input-group-text">
        <input class="form-check-input mt-0" type="radio" value="">
      </div>
      <input type="text" value="${item.name}" class="form-control">
      <div class="input-group-text">
        <button type="button" class="btn btn-primary remove-todo">Remove</button>
      </div>
    </div>`
    document.getElementById('container').appendChild(li)
  });
}
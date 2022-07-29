import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

import Api from './api'

console.log('im here');

function init() {
  var myModal = new Modal(document.getElementById('exampleModal'))

  renderTodos()

  //MODAL CLOSE my custom event to remove valodation
  document.getElementById('modalClose').addEventListener('click', (e) => {
    console.log("close");
    const form = document.querySelector(".needs-validation");
    form.classList.remove("was-validated");
  })
  
  //ADD TODO
  //Bootstrap validation
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        const input = document.getElementById('toDoName')
          
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          Api.addTodo({
            name: input.value,
            id: new Date().getTime()
          }).then(() => {
            myModal.hide()
            input.value = ''
            renderTodos()
          })
          event.preventDefault()
        }
        form.classList.add('was-validated')
      }, false)
    });
  
  //REMOVE TODO
  document.getElementById('container').addEventListener('click', (e) => {
    const el = e.target

    if (el.classList.contains('remove-todo')) {
      const liEl = el.closest('li')
      Api.removeById(liEl.id).then(() => {
        renderTodos()
      })     
    }
  }, { capture: true });

  //UPDATE TODO

  document.getElementById('container').addEventListener('click', (e) => {
    const el = e.target
    if (el.classList.contains('update-todo')) {
      const liEl = el.closest('li')
      const inputEl = document.getElementById(`input${liEl.id}`)
      Api.updateById(liEl.id, inputEl.value).then(() => {
        renderTodos()
      })     
    }
  },{capture:true})
}

init()

//RENDER

function renderTodos() {
  document.getElementById('container').innerHTML = ''
  Api.getData().then((data) => {
    data.forEach((item) => {
    const li = document.createElement('li')
    li.id = item.id
    li.innerHTML = `<div class="input-group mb-3">
      <div class="input-group-text">
        <input class="form-check-input mt-0" type="radio" value="">
      </div>
      <input type="text" value="${item.name}" class="form-control" id="input${item.id}">
      <div class="input-group-text">
        <button type="button" class="btn btn-primary update-todo">Update</button>
        <button type="button" class="btn btn-primary remove-todo">Remove</button>
      </div>
    </div>`
    document.getElementById('container').appendChild(li)
  });
  })

  
}
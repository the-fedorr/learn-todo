import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

import Api from './api'

console.log('im here');

let pageNumber = 0;
let isLoading = false;

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
        reload()
      })     
    }
  }, { capture: true });

  document.getElementById('container').addEventListener('click', (e) => {
    const el = e.target
    if (el.classList.contains('update-todo')) {
      const liEl = el.closest('li')
      const inputEl = document.getElementById(`input${liEl.id}`)
      Api.updateById(liEl.id, inputEl.value).then(() => {
        reload()
      })     
    }
  },{capture:true})


  window.addEventListener('scroll', checkLoadMoreTodos)
  window.addEventListener('resize', checkLoadMoreTodos)
  window.addEventListener('load', checkLoadMoreTodos)

  checkLoadMoreTodos()
  checkLoadMoreTodos()

}

init()

function getPageNumber() {
  return pageNumber++;
}

function checkLoadMoreTodos() {

  const top = document.getElementById('infiniteTrigger').getBoundingClientRect().top

  if (isLoading) {
    console.log('Please wait')
    return;
  }

  if (top > 0 && top <= window.innerHeight) {
      renderTodos()
  }


}

function reload() {
  pageNumber = 0;
  document.getElementById('container').innerHTML = ''
  renderTodos();
  document.getElementById('theEnd').style.display = 'none'
  document.getElementById('infiniteTrigger').style.display = 'block'
  checkLoadMoreTodos()
}

function renderTodos() {
  const pageNumber = getPageNumber()
  isLoading = true
  Api.getData(pageNumber).then(({content, last}) => {
    if (last) {
      document.getElementById('infiniteTrigger').style.display = 'none'
      document.getElementById('theEnd').style.display = 'block'
    }
    content.forEach((item) => {
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
    isLoading = false
    checkLoadMoreTodos()
  })

  
}
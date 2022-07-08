import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

console.log('im here')

function init() {
    const data = [{
        name: 'Hit the gym'
    },
        {name: 'Pay bills'},
        {name: 'Meet George'}
    ]

    data.forEach((item) => {
        console.log(item.name)
        const li = document.createElement('li')
        li.innerHTML =
            `<div class="input-group mb-3">
                <div class="input-group-text">
                    <input class="form-check-input mt-0" type="checkbox" value="">
                </div>
                <input type="text" value="${item.name}" class="form-control">
            </div>`;
        document.getElementById('container').appendChild(li)

    })
}

init()
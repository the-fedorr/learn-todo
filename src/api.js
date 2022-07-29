const Api = {

   async getData(pageNumber) {
    try {
      const response = await fetch(`http://146.190.226.226:8000/api/core/tasks?size=1&page=${pageNumber}`)
      const resData = await response.json()
      return resData
    } catch (e) {
      return {}
    }
  },

  setData(todoItems) {
    localStorage.setItem('items',JSON.stringify(todoItems))
  },

  addTodo(item) {
    return fetch('http://146.190.226.226:8000/api/core/tasks', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: item.name,
      content:'Drew content'})
    }
    )
  },

  removeById(id) {
    return fetch(`http://146.190.226.226:8000/api/core/tasks/${id}`, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json'
      }
    }
    )
  },

  updateById(id, item) {
    return fetch(`http://146.190.226.226:8000/api/core/tasks/${id}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: item,
        content:'Drew content'})
    }
    )
  }
}

export default Api
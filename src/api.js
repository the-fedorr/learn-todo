const Api = {
  getData() {
    try {
      return JSON.parse(localStorage.getItem('items') || [])
    } catch (e) {
      return []
    }
  },

  setData(todoItems) {
    localStorage.setItem('items',JSON.stringify(todoItems))
  },

  addTodo(item) {
    const data = this.getData()
    data.push(item)
    console.log(data)
    this.setData(data)
  },

  removeTodo(index) {
    const data = this.getData()
    console.log(data)
    data.splice(index, 1)
    console.log(data)
    this.setData(data)
  },

  removeById(id) {
    const data = this.getData()
    console.log(data)
    const newData = data.filter((item) => {
      return item.id.toString() !== id.toString()
    })
    console.log(newData)
    this.setData(newData)
  }
}

export default Api
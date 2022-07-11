const Api = {

    getData() {
        try {
            return JSON.parse(localStorage.getItem('items')) || []
        } catch (e) {
            return []
        }
    },

    setData(todoItems) {
        localStorage.setItem('items', JSON.stringify(todoItems))
    },

    addTodo(item) {
        const data = this.getData();
        data.push(item)
        this.setData(data);
    },

    removeTodo(index) {
        const data = this.getData();
        data.splice(index, 1)
        this.setData(data);
    },

    removeById(id) {
        const data = this.getData();
        const newData = data.filter((item) => {
            return item.id.toString() !== id.toString()
        })
        this.setData(newData);
    }

}

export default Api
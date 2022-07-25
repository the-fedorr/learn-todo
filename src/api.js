const Api = {

    async getData() {
        const response = await fetch('http://146.190.226.226:8000/api/core/tasks')
        const data = await response.json()
        return data.content || []
    },

    setData(todoItems) {
        localStorage.setItem('items', JSON.stringify(todoItems))
    },

    async addTodo(item) {
        console.log(item)
        try {
            await fetch('http://146.190.226.226:8000/api/core/tasks', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: item.name,
                    content: 'content'
                })
            })
        } catch (e) {
            console.log(e)
        }
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
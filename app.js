const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 4500

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('./public/style.css'))
app.use(bodyParser.urlencoded({extended:false}))

// creates an array for notes to be stored in
let tasks = []


app.get('/', (req, res) => {
    res.render('index', {tasks})
})

// creates a new task from the input box once the 'add task' button is pressed
app.post('/addTask', (req, res) => {
    const newTask = req.body.task
    tasks.push({ id: Date.now(), text: newTask })
    console.log(tasks)
    res.redirect('/')
})

// gives the edit button its function
app.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const task = tasks.find(task => task.id === taskId)
    res.render('edit', {task})

})
app.post('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    const updateText = req.body.task
    const task = tasks.find(task => task.id === taskId)
    if (task) {task.text = updateText}

    res.redirect('/')
})

// gives the delete button it's function
app.get('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id)
    tasks = tasks.filter(task => task.id !== taskId)
    res.redirect('/')
})

// makes the app listen for the port given & tells you which port it is
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
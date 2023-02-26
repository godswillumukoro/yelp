require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const urlPath = '/api/v1/restaurants/'

// MIDDLEWARES
app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log('Middleware in the air 🛬');
    next()
})

app.use(express.json()) //creates req.body converts json into javascript objects and puts it into req.body

// GET ALL
app.get(urlPath, (req, res) => {
    res.status(200).json({
        status: "Success",
        data: {
            restaurants
        }
})})

// GET ONE
app.get(urlPath+':id', (req, res) => {
    res.status(200).json({
        status: "Success",
        data: restaurants[0]
    })
})

// POST
app.post(urlPath, (req, res) => {
    res.status(201).json({
        status: "Posting form...",
        data: req.body
    })

    console.log(req.body);
})

// PUT
app.put(urlPath+':id', (req, res) => {
    res.status(200).json({
        status: "Updating form...",
        data: {
           id: req.params,
           info: req.body
        }
    })
})

// DELETE
app.delete(urlPath+':id', (req, res) => {
    res.status(204).json({
        status: "Deleting form...",
        data: req.params
    })
})
    


const restaurants = [
    {
    name: '788',
    location: 'Lekki, Lagos',
    rating: 4
    },
    {
    name: 'Chai Tang',
    location: 'Lekki, Lagos',
    rating: 3
    },
    {
    name: 'Mr Biggs',
    location: 'Surulere, Lagos',
    rating: 2
    },
    {
    name: 'Burger King',
    location: 'Yaba, Lagos',
    rating: 5
    },
]



const port = process.env.PORT || 7788
app.listen(port, () => {
    console.log(`Running on port:${port}`)
})
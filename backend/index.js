require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db')
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
app.get(urlPath, async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants;")

        res.status(200).json({
            status: "Success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
        console.log(results)
    } catch (error) {
        res.status(500).json({
            status: "Error",
            data: "There was an error retrieving data from the db"
        });
        console.error(error);
    }
   
    
})

// GET ONE
app.get(urlPath+':id', async (req, res) => {
    try {
        const results = await db.query("SELECT * FROM restaurants WHERE id=$1", [req.params.id]) //using parameterized query to avoid sql injection attacks
        res.status(200).json({
            status: "Success",
            data: {
                restaurants: results.rows[0]
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "Error",
            data: "There was an error retrieving data from the db"
        });
        console.error(error);
        }
    
})

// POST
app.post(urlPath, async (req, res) => {
    try {
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [req.body.name, req.body.location, req.body.price_range])
        res.status(201).json({
            status: "Successful",
            data: {
                restaurant: results.rows[0]
            }
        })
    
        console.log(results);
        
    } catch (error) {
        res.status(500).json({
            status: "Error",
            data: "There was an error retrieving data from the db"
        });
        console.error(error);
        
    }
})

// PUT
app.put(urlPath+':id', async (req, res) => {
    try {
        const results = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3 WHERE id=$4 returning *", [req.body.name, req.body.location, req.body.price_range, req.params.id])
        res.status(200).json({
            status: "Successful",
            data: {
               restaurant: results.rows[0]
            }
        })
        console.log(results);
    } catch (error) {
        res.status(500).json({
            status: "Error",
            data: "There was an error retrieving data from the db"
        });
        console.error(error);
    }
    
})

// DELETE
app.delete(urlPath+':id', async (req, res) => {
    try {
        const results = await db.query("DELETE FROM restaurants WHERE id=$1", [req.params.id])
        res.status(204).json({
            status: "Successful",
            data: results.rows[0]
        })
        
    } catch (error) {
        res.status(500).json({
            status: "Error",
            data: "DB connection error"
        })
    }
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
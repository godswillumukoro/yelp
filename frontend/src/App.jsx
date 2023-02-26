import React from 'react'
// setup routes
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import RestaurantDetailPage from './routes/RestaurantDetailPage'

const App = () => {
    return <div>
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/restaurants/:id/update' element={<UpdatePage />} />
                <Route path='/restaurants/:id' element={<RestaurantDetailPage />} />
            </Routes>
        </Router>
    </div>
}

export default App
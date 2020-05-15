const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Starting point of express application
const app = express()

const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'avinash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'avinash'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'avinash'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        res.send({
            Error: 'You must provide address!'
        })
    } else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    
            if (error) {
                return res.send({error});
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({error});
                    } else {
                        // res.send(forecastData);
                        // res.send(location);  
                        
                        res.send({
                            forecast: forecastData,
                            location,
                            address: req.query.address
                        })
                    }            
                });   
            }
    
        
        });
    }

    // console.log(req.query.address);
    // res.send({
    //     forecast: 'It is raining',
    //     location: 'indore',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);

    res.send({
        products: []
    })
})


// app.get('/help/*', (req, res) =>{
//     res.send('Help article not found')
// })

// app.get('*', (req, res) => {
//     res.send('My 404 Page')
// })

app.get('/help/*', (req, res) => {
    res.render('error-404', {
        title: 'Help article not found !',
        name: 'avinash'
    })
})

app.get('*', (req, res) => {
    res.render('error-404', {
        title: '404 Page not found !',
        name: 'avinash'
    })
})


// app.com
// app.com/about
// app.com/help

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
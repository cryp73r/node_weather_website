const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'CRYP73R',
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'CRYP73R',
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address.'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location}={})=>{
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address,
            })
        })
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'CRYP73R',
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404 Help Page',
        errorMessage: 'Help page not found',
        name: 'CRYP73R',
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'CRYP73R',
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on Port ${port}.`)
})
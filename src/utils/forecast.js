const request = require('request')
const keys = require('./keys')

const forecast = (latitude, longitude, callback)=>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,daily&appid=${keys.openweatherAppId}`
    request({ url, json: true }, (error, {body})=>{
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.message) {
            callback('Unable to find location, try another!', undefined)
        } else {
            callback(undefined, 'It is currently ' + body.current.temp + ' degrees out. There is a ' + body.current.humidity + '% chances of rain.')
        }
    })
}

module.exports = forecast
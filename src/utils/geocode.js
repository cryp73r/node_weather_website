const request = require('request')
const keys = require('./keys')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${keys.geocodeAccessToken}`
    request({ url, json: true }, (error, {body})=>{
        if (error) {
            callback('Unable to connect to Geocode Services!', undefined)
        } else if (body.message) {
            callback('Place name required!', undefined)
        } else if (body.features.length===0) {
            callback('Unidentified place, try another!', undefined)
        } else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: location
            })
        }
    })
}

module.exports = geocode
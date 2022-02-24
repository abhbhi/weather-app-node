const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0bc2c13bf46cd315a0f641b6c8194bdb&query='+address
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('something went wrong', undefined)
        }
        
        else {
            callback(undefined, {
                name : response.body.location.name,
                temp: response.body.current.temperature
            })
        }
        
    })
}
module.exports=geocode
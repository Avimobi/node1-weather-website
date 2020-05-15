const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=2e3235d5464dce719bd1e8b86e86914f&query='+ latitude +','+ longitude;

    request({url: url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to API service!', undefined);
        } else if(body.error){
            callback('Unable to fetch forecast for given city ... Try with another !')
        }else {
            callback(undefined,`It is currently ${body.current.temperature} degrees out but it feels like ${body.current.feelslike} degrees.`);
        }
    })
};

module.exports = forecast;
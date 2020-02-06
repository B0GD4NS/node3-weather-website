const request = require('request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d51ecd1d5b16ef5637c71f499c032614/'
        + encodeURIComponent(latitude)
        + ','
        + encodeURIComponent(longitude)
        + '?units=si&lang=pl';

    request({ url, json: true }, (error, { body }) => {     //we are adding ={} syntax to prevent undefined when deconstructing object
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location in weather service', undefined);
        } else {
            callback(undefined, {
                daily_summary: body.daily.data[0].summary,
                current_temperature: body.currently.temperature,
                current_probability: body.currently.precipProbability
            });
        }
    });
}

module.exports = {
    forecast: forecast
}


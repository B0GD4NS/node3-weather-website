// console.log('Client side javascript file is loaded!');

//-----------------------------------------------------------------
//fetch API (client side Javascript) sample call
// fetch('http://puzzle.mead.io/puzzle').then((response) => {

//     response.json().then((data) => {
//         console.log(data);
//     });
// });
//-----------------------------------------------------------------
// const address = 'boston';



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


// messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //DO NOT reaload full page

    messageOne.textContent = 'Loading data...';
    messageTwo.textContent = '';

    const address = search.value;
    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(address))
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // return console.log('Error: ', data.error);
                    return messageOne.textContent = data.error;
                }

                // console.log('Location: ', data.location);
                // console.log('Forecast: ', data.forecast);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.daily_summary
                    + ', aktualna temperatura: ' + data.forecast.current_temperature
                    + ', opady: ' + data.forecast.current_probability + ' %';
            });
        });

});


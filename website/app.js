/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
let baseUri = "http://api.openweathermap.org/data/2.5/weather?";
let zip = "zip=";
let api_key = "&appid=1df432b7d28fba133d1b340e211a19ee";
let zipCodeValue = '';
let feeling = '';
let fullApiUrl = '';
let postPayload = {};
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',generate_event);
/* Function called by event listener */
function generate_event()
{
    zipCodeValue = document.getElementById('zip').value;
    feeling = document.getElementById('feelings').value;
    fullApiUrl = baseUri+zip+zipCodeValue+api_key;
     get_weather_from_api(fullApiUrl).then(function(data){
         postPayload['temp'] = data.main.temp;
         postPayload['date'] = newDate;
         postPayload['feeling'] = feeling;
         console.log(data);
         add_weather_data("http://127.0.0.1:8080/add-data",postPayload).then(function(data){
            console.log(data);
            get_recent_weather_data("http://127.0.0.1:8080/get-data").then(function(data){
                document.getElementById('date').innerText = "Date: " + data.date;
                document.getElementById('temp').innerText = "Temp: " + data.temp;
                document.getElementById('content').innerText = "Feeling: " + data.feeling;
            });
         });
     });
    // console.log(d);
}
/* Function to GET Web API Data*/
let get_weather_from_api = async(url)=>{
    let response = await fetch(url);
    try{
        let newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error)
    {
        console.error("[!] Error :" + error);
    }
}
/* Function to POST data */
let add_weather_data = async(url,data)=>{
    let response = await fetch(url,{
        method: 'POST',
        credentials:"same-origin",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    });
    try{
        let newData = await response.json();
        console.log(newData);
        return newData;
    }
    catch(error)
    {
        console.error("[!] Error :" + error);
    }
}


/* Function to GET Project Data */
let get_recent_weather_data =async(url)=>{
    let response = await fetch(url);
    try{
        let newData = response.json();
        return newData;
    }
    catch(error)
    {
        console.error("[!] Error :" + error);
    }
}
// value from humid and water level sensor
const backendIPAddress = "127.0.0.1:3000"
let humidity, waterLevel, temperature, stateBtn = false;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// #1: Send ("GET") request to backend server and acquire humidity
const getHumidity = async () => {
    const options = {
        method: "GET",
        credentials: "include"
    };

    humidity = getRandomIntInclusive(0, 100)

    // await fetch(`http://${backendIPAddress}/values/humid`, options)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("Humidtiy: ", data)
    //         humidity = data["humid"];
    //     })
    //     .catch((err) => console.log(err))

};

// #2: Send ("GET") request to backend server and acquire waterLevel
const getwaterLevel = async () => {
    const options = {
        method: "GET",
        credentials: "include"
    };

    waterLevel = getRandomIntInclusive(0, 100)

    // await fetch(`http://${backendIPAddress}/values/water_level`, options)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("Water Level: ", data)
    //         waterLevel = data["water_level"];
    //     })
    //     .catch((err) => console.log(err))

};

// #3: Send ("GET") request to backend server and acquire temperature
const getTemperature = async () => {
    const options = {
        method: "GET",
        credentials: "include"
    };

    temperature = getRandomIntInclusive(0, 100)

    // await fetch(`http://${backendIPAddress}/values/water_level`, options)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("Water Level: ", data)
    //         waterLevel = data["water_level"];
    //     })
    //     .catch((err) => console.log(err))

};

// #3: Show value of humidity sensor
const showWaterLevel = () => {

    let water_num = document.getElementById("water-level-val");
    water_num.textContent = "Current Value: " + waterLevel + "%"

    let water_bar = document.getElementById("water-level-bar")
    console.log("Water level: ", waterLevel)
    water_bar.style.cssText = "width: " + waterLevel + "%"

}

// #4: Show value of water level
const showHumidity = () => {

    let humid_num = document.getElementById("humid-val");
    humid_num.textContent = "Current Humidity: " + humidity + "%"

    let humid_bar = document.getElementById("humid-bar")
    console.log("Humidity: ", humidity)
    humid_bar.style.cssText = "width: " + humidity + "%"
    
}

// #4: Show value of temperature
const showTemperature = () => {

    let temp_num = document.getElementById("temp-val");
    temp_num.textContent = "Current Temperature: " + temperature + " °C"

    let temp_bar = document.getElementById("temp-bar")
    console.log("Temperature: ", temperature)
    temp_bar.style.cssText = "width: " + temperature + "%"    
    
}

// #6: Send command to activate pump
const togglePump = () => {

    console.log("Button pressed")
    let btn = document.getElementById("activate-btn")
    let status = document.getElementById("pump-status")
    let bg_css, btn_msg, status_msg;

    if (stateBtn == false) {
        bg_css = "background-color: #FF6500"
        btn_msg = "Deactivate Pump"
        status_msg = "Active"
        stateBtn = true
    } else {
        bg_css = "background-color: #100076"
        btn_msg = "Activate Pump"
        status_msg = "Inactive"
        stateBtn = false
    }
    
    btn.style.cssText = bg_css
    btn.textContent = btn_msg
    status.textContent = "Pump Status: " + status_msg

}

// #7: Fetch Pump status from Backend
const getPumpStatus = async () => {

}

const updateAllStatus = () => {
    showWaterLevel()
    showHumidity()
    showTemperature()
    
    let cond = document.getElementById("condition")

    if (humidity >= 80 || waterLevel >= 50) {
        cond.textContent = "Conditions Satisfied"
    } else {
        cond.textContent = "Conditions Unsatisfied"
    }
}
  
document.addEventListener("DOMContentLoaded", async function (event) {
    
    async function updateValue() {
        try {
            await getHumidity()
            await getwaterLevel()
            await getPumpStatus()
            await getTemperature()
            updateAllStatus()
            

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    updateValue();

    setInterval(updateValue, 5000);

});
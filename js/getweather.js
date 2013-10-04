$(function() {
    // Hosting on GitHub Pages, so unfortunately, this needs to be public. Please don't abuse this key!
    var key = "f83059a7235dae09";
    var weatherUrl = "http://api.wunderground.com/api/" + key + "/conditions/q/Canada/";
    var autocompleteUrl = "http://autocomplete.wunderground.com/aq?query=";
    
    // Get the weather
    $('#get-weather').click(function(e) {
        e.preventDefault();

        var cityName = $.trim($('#city-input').val());
        if (cityName.length == 0) {
            return;
        }

        $.ajax({
            url: weatherUrl + cityName + ".json",
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
            success: showWeather
        });
    });

    // Callback function to display the weather
    var showWeather = function(jsonpResult) {
        var temperature = jsonpResult['current_observation']['temp_c'];
        var condition = jsonpResult['current_observation']['weather'].toLowerCase();

        // Show temperature
        updateTemperature(temperature);

        // Change background colour based on weather condition
        if ((condition.indexOf("shower") != -1) || (condition.indexOf("rain") != -1)) {
            // Raining
            $('body, footer, a').addClass('raining');
        } else if ((condition.indexOf("hail") != -1) || (condition.indexOf("snow") != -1)) {
            // Snowing
            $('body, footer, a').addClass('snowing');
        } else if ((condition.indexOf("haze") != -1) || (condition.indexOf("fog") != -1)) {
            // Foggy
            $('body, footer, a').addClass('foggy');
        } else if ((condition.indexOf("overcast") != -1) || (condition.indexOf("cloud") != -1)) {
            // Cloudy
            $('body, footer, a').addClass('cloudy');
        } else if ((condition.indexOf("clear") != -1) || (condition.indexOf("sun") != -1)) {
            // Sunny
            $('body, footer, a').addClass('sunny');
        } else if ((condition.indexOf("thunder") != -1) || (condition.indexOf("storm") != -1)) {
            // Thunderstorm
            $('body, footer, a').addClass('thunderstorm');
        }
    };

    // Function to increment or decrement temperature
    var updateTemperature = function(temperature) {
        var timer;
        var currTemp = parseInt($('#temperature').html());
        currTemp = currTemp == 0 ? 1 : currTemp;
        
        var diff = temperature - currTemp;
        // If negative, this means we need to decrement
        // If positive, this means we need to increment
        if (diff > 0) {
            timer = setInterval(function() {
                if (currTemp <= temperature) {
                    $('#temperature').html(currTemp++);
                } else {
                    clearInterval(timer);
                }
            }, 90);
        } else {
            timer = setInterval(function() {
                if (currTemp-- > temperature) {
                    $('#temperature').html(currTemp);
                } else {
                    clearInterval(timer);
                }
            }, 90);
        }
    };
});

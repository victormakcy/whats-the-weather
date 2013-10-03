$(function() {
    var yahooAppId = "v6KlOMPV34Fb0btSZ8gdjGLedOWg_K9aTfR4Xs9Rl8AuzpNP9OTZWOBPlUCMUp.m2joJJ6imp5Zg4TWCcqcqnhkJC5728DQ-";
    var woeidUrl = "http://where.yahooapis.com/v1/places.q('{place}')?appid=" + yahooAppId;
    var weatherUrl = "http://weather.yahooapis.com/forecastrss?w=";

    // Get the weather
    $('#get-weather').click(function(e) {
        e.preventDefault();
        
        var cityName = $.trim($('input').val());
        
        if (cityName.length == 0) {
            return;
        }
        
        // Get the WOEID for the place
        $.ajax({
            url: woeidUrl.replace("{place}", cityName),
            type: 'GET',
            dataType: 'xml',
            cache: false
        }).done(queryWeather);
    });
    
    // Callback function to query Yahoo! API for the weather
    var queryWeather = function(rss) {
        var woeid = $(rss).find('woeid').text();

        // Get the temperature
        $.ajax({
            url: weatherUrl + woeid + "&u=c",
            type: 'GET',
            dataType: 'xml',
            cache: false
        }).done(showWeather);
    };
    
    // Callback function to display the weather
    var showWeather = function(weatherRss) {
        var temperature = $(weatherRss).find('yweather:condition').attr('temp');
        var condition = $(weatherRss).find('yweather:condition').attr('code');

        // Show temperature
        $('#temperature').html(temperature);
        
        // Change background colour based on weather condition
        if (condition  <= 12 || condition == 35 || condition == 40) {
            // Raining
            $('body, footer, a').addClass('raining');
        } else if (condition > 12 && condition <= 17) {
            // Snowing
            $('body, footer, a').addClass('snowing');
        } else if ((condition > 17 && condition <= 23) || ((condition >= 41 && condition <= 43) || condition == 46)) {
            // Foggy
            $('body, footer, a').addClass('foggy');
        } else if (condition > 23 && condition <= 30) {
            // Cloudy
            $('body, footer, a').addClass('cloudy');
        } else if ((condition > 30 && condition <= 34) || (condition == 36 || condition == 44)) {
            // Sunny
            $('body, footer, a').addClass('sunny');
        } else if ((condition >= 37 && condition <= 39) || (condition == 45 || condition == 47)) {
            // Thunderstorm
            $('body, footer, a').addClass('thunderstorm');
        }
    };
});
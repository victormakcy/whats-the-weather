$(function() {
    var key = "f83059a7235dae09";
    var weatherUrl = "http://api.wunderground.com/api/" + key + "/conditions/q/{place}.json";
    var autocompleteUrl = "http://autocomplete.wunderground.com/aq?query=";
    var citiesFilter = [];

    // Enable typeahead for the input
    $('#city-input').typeahead({
        name: 'cities',
        local: citiesFilter,
        limit: 5
    });

    // On keyup, get a list of autocomplete cities
    $('#city-input').keyup(function() {
        $.ajax({
            url: autocompleteUrl + $('#city-input').val(),
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: autocomplete
        });
    });
    
    // Get the weather
    $('#get-weather').click(function(e) {
        e.preventDefault();
        
        var cityName = $.trim($('input').val());
        
        if (cityName.length == 0) {
            return;
        }
        
        // Get the WOEID for the place
        $.ajax({
            url: weatherUrl.replace("{place}", cityName),
            type: 'GET',
            dataType: 'jsonp',
            cache: false,
            success: showWeather
        });
    });

    // Callback function to update the autocomplete field
    var autocomplete = function(result) {
        citiesFilter = [];
        for (place in result) {
            citiesFilter.push(place['name'] + ", " + place['c']);
        }
    };

    // Callback function to display the weather
    var showWeather = function(jsonpResult) {
        var temperature = jsonpResult['current_observation']['temp_c'];
        var condition = jsonpResult['current_observation']['weather'];

        // Show temperature
        $('#temperature').html(temperature);

        // Change background colour based on weather condition
    };
});
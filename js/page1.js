/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

var allControlsAreEnabled = false;
var isZoomControlEnabled = false;
var isMapTypeControlEnabled = false;
var isPanControlEnabled = false;

function toggleZoomControl(map) {
    if (isZoomControlEnabled) {
        map.setOptions({zoomControl: false});
        isZoomControlEnabled = false;
    }
    else {
        map.setOptions({zoomControl: true});
        isZoomControlEnabled = true;
    }
}

function toggleMapTypeControl(map) {
    if (isMapTypeControlEnabled) {
        map.setOptions({mapTypeControl: false});
        isMapTypeControlEnabled = false;
    }
    else {
        map.setOptions({mapTypeControl: true});
        isMapTypeControlEnabled = true;
    }
}

function togglePanControl(map) {
    if (isPanControlEnabled) {
        map.setOptions({panControl: false});
        isPanControlEnabled = false;
    }
    else {
        map.setOptions({panControl: true});
        isPanControlEnabled = true;
    }
}

function toggleAllControl(map) {
    if (allControlsAreEnabled) {
        map.setOptions({
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        });
        allControlsAreEnabled = false;
        isZoomControlEnabled = false;
        isMapTypeControlEnabled = false;
        isPanControlEnabled = false;
    }
    else {
        map.setOptions({
            panControl: true,
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            overviewMapControl: true
        });
        allControlsAreEnabled = true;
        isZoomControlEnabled = true;
        isMapTypeControlEnabled = true;
        isPanControlEnabled = true;
    }
}
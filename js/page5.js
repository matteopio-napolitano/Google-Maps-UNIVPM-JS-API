/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

var isGeocodingSearchFormVisible = false;
var markers_gs = null;
var iws_gs = null;

function toggleGeocodingSearchForm(map){
    if(isGeocodingSearchFormVisible){
        $('#geo-search').eq(0).remove();
        $.each(markers_gs, function(k,v){
            v.setMap(null);
        });
        markers_gs = null;
        $.each(iws_gs, function(k,v){
            v.setMap(null);
        });
        iws_gs = null;
        isGeocodingSearchFormVisible = false;
    }
    else{
        markers_gs = new Array();
        iws_gs = new Array();
        $('body').prepend(getGeocodingSearchForm());
        $('#geo-start-search').click(function(event){
            var geocoder = new google.maps.Geocoder();
            var address = $('#geo-search-pattern').eq(0).val();
            if(address !== null && address.length !== 0){
                geocoder.geocode({'address': address}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if(results[0]){
                            var formatted_address = results[0].formatted_address;
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                            var iw = new google.maps.InfoWindow({
                                content: formatted_address
                            });
                            iw.open(map, marker);
                            markers_gs.push(marker);
                            iws_gs.push(iw);
                        }
                    }
                    else alert("Geocode was not successful for the following reason: " + status);
                });
            }
            else alert('Specificare un indirizzo');
        });
        isGeocodingSearchFormVisible = true;
    }
}

function getGeocodingSearchForm(){
    return '<div id="geo-search">' +
            '<div class="input-group">' +
                '<input id="geo-search-pattern" type="text" class="form-control" placeholder="indirizzo o coordinate..">' +
                '<span class="input-group-btn">' +
                    '<button id="geo-start-search" class="btn btn-default" type="button">Geocode!</button>' +
                '</span>' +
            '</div>' +
        '</div>';
}

var isReverseGeocodingFormVisible = false;
var markers_rgs = null;
var iws_rgs = null;

function toggleReverseGeocodingSearchForm(map){
    if(isReverseGeocodingFormVisible){
        $('#geo-search-latlng').eq(0).remove();
        $.each(markers_rgs, function(k,v){
            v.setMap(null);
        });
        markers_rgs = null;
        $.each(iws_rgs, function(k,v){
            v.setMap(null);
        });
        iws_rgs = null;
        isReverseGeocodingFormVisible = false;
    }
    else{
        markers_rgs = new Array();
        iws_rgs = new Array();
        $('body').prepend(getCoordinateSearchForm());
        $('#geo-start-search-latlng').click(function(event){
            var geocoder = new google.maps.Geocoder();
            var lat = parseFloat($('#geo-search-lat').eq(0).val());
            var lng = parseFloat($('#geo-search-lng').eq(0).val());
            if(lat !== null && !isNaN(lat) && lng !== null && !isNaN(lng)){
                var latlng = new google.maps.LatLng(lat, lng);
                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]){
                            var formatted_address = results[0].formatted_address;
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                            var iw = new google.maps.InfoWindow({
                                content: formatted_address
                            });
                            iw.open(map, marker);
                            markers_rgs.push(marker);
                            iws_rgs.push(iw);
                        }
                    }
                    else alert("Geocode was not successful for the following reason: " + status);
                });
            }
            else alert('Specificare latitudine e longitudine');
        });
        isReverseGeocodingFormVisible = true;
    }
}

function getCoordinateSearchForm(){
    return '<div id="geo-search-latlng">' +
                '<input id="geo-search-lat" type="text" class="form-control" placeholder="latitudine..">' +
                '<input id="geo-search-lng" type="text" class="form-control" placeholder="longitudine..">' +
                '<button id="geo-start-search-latlng" class="btn btn-default pull-right" type="button">Geocode!</button>' +
            '</div>';
}
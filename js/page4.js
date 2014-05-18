/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

var isFilterSelectionModalWindowVisible = false;
var selected_places = null;
var markers_places = null;
var iws = null;
var placesHolder = null;

function selectPlacesNearbyTypes(map){
    if(isFilterSelectionModalWindowVisible){
        selected_places = null;
        $.each(markers_places, function(k,v){
            v.setMap(null);
        });
        $.each(iws, function(k,v){
            v.setMap(null);
        });
        markers_places = null;
        iws = null;
        $('#modal-box').modal('hide');
        isFilterSelectionModalWindowVisible = false;
    }
    else{
        selected_places = new Array();
        markers_places = new Array();
        iws = new Array();
        placesHolder = new Array();
        
        $('body').prepend(getPlacesNearbyFilterFormModalWindow());
        $('#modal-box').modal();
        $('#modal-box').on('hidden.bs.modal', function (e) {
            $(this).remove();
        });
        
        var checkboxes = $('#form').find(':checkbox');
        $.each(checkboxes, function(index, element) {
            $(this).click(function(event) {
                var place = $(this).attr('name');
                var not_selected = selected_places.indexOf(place) === -1 ? true : false;
                if ($(this).is(':checked') && not_selected) {
                    selected_places.push(place);
                }
                else {
                    if (!not_selected)
                        selected_places.splice(selected_places.indexOf(place), 1);
                }
            });
        });
        
        $('#get-places').click(function(event) {
            if (selected_places.length > 0) {
                var request = {
                    location: new google.maps.LatLng(43.6158572, 13.5187567),
                    radius: '5000',
                    types: selected_places //['food', 'hospital', 'police', 'fire_station']
                };

                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch(request, function(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var lat = place.geometry.location.k;
                            var lng = place.geometry.location.A;
                            var name = place.name;
                            var icon = place.icon;

                            var place_marker = new google.maps.Marker({
                                position: new google.maps.LatLng(lat, lng),
                                map: map,
                                title: name,
                                icon: icon
                            });
                            
                            google.maps.event.addListener(place_marker, 'click', (function(place_marker, i) {
                                return function() {
                                    var content = placesHolder[i].name;
                                    var address = placesHolder[i].vicinity;
                                    var iw = new google.maps.InfoWindow({
                                        content: content+'<br>'+address
                                    });
                                    iw.open(map, place_marker);
                                    iws.push(iw);
                                };
                            })(place_marker, i));
                            
                            markers_places.push(place_marker);
                            placesHolder.push(place);
                        }
                    }
                    else alert('No data found!');
                });
            }
            else alert('Selezionare le categorie desiderate');
            $('#modal-box').modal('hide');
        });
        isFilterSelectionModalWindowVisible= true;
    }
}

function getPlacesNearbyFilterFormModalWindow(){
    return '<div id="modal-box" class="modal fade">' +
                '<div class="modal-dialog modal-sm">' +
                    '<div class="modal-content">' +
                        '<div class="modal-header">' +
                            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                            '<h4 class="modal-title">Filtra i luoghi da visualizzare</h4>' +
                        '</div>' +
                        '<div class="modal-body">' +
                            '<div id="form">' +
                                '<input type="checkbox" name="bar"> Bar<br>' +
                                '<input type="checkbox" name="cafe"> Caffetterie<br>' +
                                '<input type="checkbox" name="bank"> Banche<br>' +
                                '<input type="checkbox" name="stadium"> Stadi<br>' +
                                '<input type="checkbox" name="university"> Universit&agrave;<br>' +
                                '<input type="checkbox" name="school"> Scuole<br><br>' +
                            '</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Annulla</button>' +
                            '<button id="get-places" type="button" class="btn btn-primary">Visualizza</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
}


var isPlacesTextSearchFormVisible = false;
var marker_pts = null;
var iws_pts = null;

function togglePlacesTextSearchForm(map){
    if(isPlacesTextSearchFormVisible){
        $('#search').eq(0).remove();
        $.each(marker_pts, function(k,v){
            v.setMap(null);
        });
        marker_pts = null;
        $.each(iws_pts, function(k,v){
            v.setMap(null);
        });
        iws_pts = null;
        isPlacesTextSearchFormVisible = false;
    }
    else{
        marker_pts = new Array();
        iws_pts = new Array();
        $('body').prepend(getTextSearchForm());
        $('#start-search').click(function(event){
            var pattern = $('#search-pattern').eq(0).val();
            if(pattern !== null && pattern.length !== 0){
                var request = {
                    location: map.getCenter(),
                    radius: '5000',
                    query: pattern
                };

                var service = new google.maps.places.PlacesService(map);
                service.textSearch(request, function(results, status){
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            var place = results[i];
                            var name = place.name;
                            var address = place.formatted_address;
                            var icon = place.icon;
                            var open_now = false;
                            var opening_hours = place.opening_hours;
                            if(typeof opening_hours !== 'undefined' && opening_hours.open_now !== null){
                                open_now = opening_hours.open_now;
                            }
                            else open_now = false;
                            var lat = place.geometry.location.k;
                            var lng = place.geometry.location.A;
                            
                            var place_marker = new google.maps.Marker({
                                position: new google.maps.LatLng(lat, lng),
                                map: map,
                                title: name,
                                icon: icon
                            });
                            
                            var iw = new google.maps.InfoWindow({
                                content: name+'<br>'+address+(open_now ? '<br><span class="open_now">Ora aperto</span>' : '')
                            });
                            iw.open(map, place_marker);
                            
                            marker_pts.push(place_marker);
                            iws_pts.push(iw);
                        }
                        
                    }
                    else alert('No data found!');
                });
            }
            else alert('Devi specificare un riferimento per la ricerca');
        });
        
        isPlacesTextSearchFormVisible = true;
    }
}

function getTextSearchForm(){
    return '<div id="search">' +
            '<div class="input-group">' +
                '<input id="search-pattern" type="text" class="form-control" placeholder="cerca.. (es. ristorante)">' +
                '<span class="input-group-btn">' +
                    '<button id="start-search" class="btn btn-default" type="button">Go Places!</button>' +
                '</span>' +
            '</div>' +
        '</div>';
}
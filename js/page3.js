/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

var isTriangoloEconomicoMapOverlayEnabled = false;

var TORINO = new google.maps.LatLng(45.0695934, 7.6886501);
var MILANO = new google.maps.LatLng(45.4642117, 9.18842);
var GENOVA = new google.maps.LatLng(44.406039, 8.946504);

var poligonotriangoloindustriale = null;
var mk_pol_tri = [];
var iw_pol_tri = [];

function toggleTriangoloEconomicoMapOverlay(map) {
    if (isTriangoloEconomicoMapOverlayEnabled) {
        $.each(mk_pol_tri, function(k, v) {
            v.setMap(null);
        });
        $.each(iw_pol_tri, function(k, v) {
            v.setMap(null);
        });
        poligonotriangoloindustriale.setMap(null);
        isTriangoloEconomicoMapOverlayEnabled = false;
    }
    else {
        map.setZoom(6);
        var paths = [TORINO, MILANO, GENOVA];
        poligonotriangoloindustriale = new google.maps.Polygon({
            paths: paths,
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3498DB',
            fillOpacity: 0.8
        });
        poligonotriangoloindustriale.setMap(map);
        $.each(paths, function(k, v) {
            var m = new google.maps.Marker({
                position: v,
                animation: google.maps.Animation.DROP
            });
            m.setMap(map);
            mk_pol_tri.push(m);

            var geocode_service = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + v.lat() + ',' + v.lng() + '&components=administrative_area&sensor=false&key=AIzaSyCuKDvZnsoytfyk-uNYuggMBqdsmcrXP8k';
            $.ajax({
                type: 'GET',
                url: geocode_service,
                dataType: 'json'
            }).done(function(data) {
                var citta = getCityName(data.results);
                var iw = new google.maps.InfoWindow({
                    position: v,
                    content: citta
                });
                iw.open(map, m);
                iw_pol_tri.push(iw);
            }).fail(function() {
                console.log('Geocoding Service Error!');
            });
        });
        isTriangoloEconomicoMapOverlayEnabled = true;
    }
}

function getCityName(results) {
    for (var i = 0; i < results[0].address_components.length; i++) {
        for (var b = 0; b < results[0].address_components[i].types.length; b++) {
            if (results[0].address_components[i].types[b] === "administrative_area_level_2") {
                return results[0].address_components[i].long_name;
            }
        }
    }
}


var isRegionalPopolutaionMapEnabled = false;
var polygons = [];
var infowindows = [];

var COLOR1 = '#D35400';
var COLOR2 = '#F4D03F';
var COLOR3 = '#66CC99';
var COLOR4 = '#1E824C';

function toggleRegionalEarningsMapOverlay(map) {
    if (isRegionalPopolutaionMapEnabled) {
        $.each(polygons, function(k, v) {
            v.setMap(null);
        });
        $.each(infowindows, function(k, v) {
            v.setMap(null);
        });
        $('#legenda1').eq(0).remove();
        isRegionalPopolutaionMapEnabled = false;
    }
    else {
        map.setZoom(6);
        $.ajax({
            type: 'GET',
            url: 'data/reddito_medio_famiglie.json',
            dataType: 'json'
        }).done(function(redditi) {
            if (redditi !== null) {
                $.ajax({
                    type: 'GET',
                    url: 'data/regioni.json',
                    dataType: 'json'
                }).done(function(data) {
                    if (data !== null) {
                        // processo ciascuna regione
                        $.each(data, function(k1, regione) {
                            var reddito_regione = parseInt(redditi[k1].totale);
                            var colore = null;

                            if (reddito_regione > 20000 && reddito_regione < 24000)
                                colore = COLOR1;
                            else if (reddito_regione > 24000 && reddito_regione < 28000)
                                colore = COLOR2;
                            else if (reddito_regione > 28000 && reddito_regione < 32000)
                                colore = COLOR3;
                            else if (reddito_regione > 32000)
                                colore = COLOR4;
                            else
                                colore = COLOR1;

                            // tratto i poligoni di ciascuna regione
                            $.each(regione.poligoni, function(k2, poligono) {
                                var polygon = [];

                                // genero il paths array per ciascun poligono associato ad una regione
                                var bounds = new google.maps.LatLngBounds();
                                var center = null;
                                $.each(poligono, function(k3, vertice) {
                                    var vertex = new google.maps.LatLng(vertice.lat, vertice.lng);
                                    polygon.push(vertex);
                                    bounds.extend(vertex);
                                });
                                center = bounds.getCenter();

                                try {
                                    // costruisco il poligono
                                    var poly = new google.maps.Polygon({
                                        paths: polygon,
                                        strokeColor: '#000000',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: colore,
                                        fillOpacity: 0.8
                                    });
                                    poly.setMap(map);

                                    var iw = new google.maps.InfoWindow({
                                        position: center,
                                        content: reddito_regione.toString()
                                    });

                                    google.maps.event.addListener(poly, 'mouseover', function(e) {
                                        this.setOptions({fillOpacity: 0.5});

                                    });
                                    google.maps.event.addListener(poly, 'mouseout', function() {
                                        this.setOptions({fillOpacity: 0.8});
                                    });

                                    google.maps.event.addListener(poly, 'click', function() {
                                        if (iw.getMap())
                                            iw.setMap(null);
                                        else
                                            iw.open(map);
                                    });

                                    infowindows.push(iw);
                                    polygons.push(poly);
                                }
                                catch (e) {
                                    console.log(e);
                                }
                            });
                        });
                        $('body').append('<div id="legenda1"><span class="fascia_1">20.000&euro; &Tilde; 24.000&euro;</span><span class="fascia_2">24.001&euro; &Tilde; 28.000&euro;</span><span class="fascia_3">28.001&euro; &Tilde; 32.000&euro;</span><span class="fascia_4">&GT; 32.000&euro;</span><span class="info">Fonte: dati Istat anno 2010</span></div>');
                    }
                    else
                        alert('Errore di caricamento della struttura dati della mappa!');
                }).fail(function() {
                    alert('Errore! Non è stato possibile caricare il file della suddivisione regionale!');
                });
            }
            else
                alert('Errore di caricamento della struttura dati economica!');
        }).fail(function() {
            alert('Errore! Non è stato possibile caricare il file dei dati economici!');
        });

        isRegionalPopolutaionMapEnabled = true;
    }
}

var isDrawingManagerEnabled = false;
var drawingManage = null;
var dm_overlays = [];
function toggleDrawingManager(map){
    if(isDrawingManagerEnabled){
        drawingManager.setMap(null);
        $.each(dm_overlays, function(k,v){
            v.setMap(null);
        });
        isDrawingManagerEnabled = false;
    }
    else{
        drawingManager = new google.maps.drawing.DrawingManager();
        drawingManager.setMap(map);
        
        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
            dm_overlays.push(event.overlay);
        });
        
        isDrawingManagerEnabled = true;
    }
}

/*
 * ORDINE DI DISEGNO DEI CONTENUTI - DEFAULT
 * 3: floatPane (infowindow)
 * 2: overlayImage (marker images)
 * 1: overlayLayer (polygons, polylines, ground overlays, tile layer overlays)
 * 0: mapPane
 * 
 * PER OGNUNO DI QUESTI ELEMENTI, TRANNE IL MAPPANE, E' POSSIBILE SETTARE L'ATTRIBUTO zIndex
 * ES:
 * var polygon = new google.maps.Polygon({
            paths : cords,
            strokeColor : '#1122AA',
            strokeOpacity : 1,
            strokeWeight : 2,
            zIndex : 100
        });
 */
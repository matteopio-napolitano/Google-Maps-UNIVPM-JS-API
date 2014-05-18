/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

var isHighwayMapEnabled = false;
var isProvinceMapEnabled = false;
var isShowingMarkers = false;

function toggleHighwayStyledMap(map) {
    if (isHighwayMapEnabled) {
        map.setOptions({styles: [{}]});
        isHighwayMapEnabled = false;
    }
    else {
        map.setZoom(8);
        /*
         * The number of styles that you can apply at once is limited. 
         * If your style array exceeds the maximum number of characters then no style will be applied.
         * 
         * Size of a vector source file	1 GB
         * Number of features	5,000,000 *
         * Number of attributes	550
         * Length of an attribute name	64 characters
         * Length of an attribute value	4000 characters
         * 
         * Read more: https://support.google.com/mapsengine/answer/1272933?hl=en
         * 
         * Styled Map builder: http://gmaps-samples-v3.googlecode.com/svn/trunk/styledmaps/wizard/index.html
         * 
         */
        var styles = [
            {
                "stylers": [
                    {"saturation": -100}
                ]
            }, {
                "elementType": "labels.icon",
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {"weight": 4.9},
                    {"color": "#5cb85c"}
                ]
            },
            {
                "featureType": "road.arterial",
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "road.local",
                "stylers": [
                    {"visibility": "off"}
                ]
            }
        ];
        map.setOptions({styles: styles});
        isHighwayMapEnabled = true;
    }
}

function toggleRegioniStyledMap(map) {
    if (isProvinceMapEnabled) {
        map.setOptions({styles: [{}]});
        isProvinceMapEnabled = false;
    }
    else {
        map.setZoom(8);
        var styles = [
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "poi",
                "elementType": "labels",
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "transit", // collegamenti terrestri e marittimi (ferrovie, rotte da crociera, ..)
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "stylers": [
                    {"saturation": -37},
                    {"gamma": 0.52},
                    {"hue": "#0019ff"}
                ]
            }, {
                "featureType": "road",  // strade - tutte le categorie
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "administrative.locality",   // città
                "elementType": "labels",
                "stylers": [
                    {"visibility": "off"}
                ]
            }, {
                "featureType": "administrative.province",   // regioni
                "stylers": [
                    {"saturation": 100},
                    {"color": "#ffffff"},
                    {"lightness": -100}
                ]
            }
        ];
        map.setOptions({styles: styles});
        isProvinceMapEnabled = true;
    }
}

var markers = [];
var overlays = [];
var infoboxes = [];

var pos1 = new google.maps.LatLng(43.6258, 13.5087567);
var pos2 = new google.maps.LatLng(43.610530996192495, 13.516203237017862);
var pos3 = new google.maps.LatLng(43.58648373208422, 13.515366387805216);
var pos4 = new google.maps.LatLng(43.61502, 13.53394);

function toggleSampleMarkers(map) {
    if (isShowingMarkers) {
        map.setZoom(14);
        $.each(markers, function(k, v) {
            v.setMap(null);
        });
        $.each(overlays, function(k, v) {
            v.setMap(null);
        });
        $.each(infoboxes, function(k, v) {
            v.setMap(null);
        });
        isShowingMarkers = false;
    }
    else {
        map.setZoom(13);
        // Marker non modificabile
        var m1 = new google.maps.Marker({
            position: pos1,
            animation: google.maps.Animation.DROP,
            title: "La mia posizione non è modificabile!"
        });
        m1.setMap(map);
        var iw1 = new google.maps.InfoWindow({
            content: "<b>La mia posizione non è modificabile!</b>"
        });
        iw1.open(map, m1);
        google.maps.event.addListener(m1, 'click', function() {
            iw1.open(map, m1);
        });


        // Draggable Marker con modifica dinamica del contenuto della InfoWindow
        var m2 = new google.maps.Marker({
            position: pos2,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: "Drag me around!"
        });
        m2.setMap(map);
        var iw2 = new google.maps.InfoWindow({
            content: "<b>Drag me around!</b>"
        });
        iw2.open(map, m2);
        google.maps.event.addListener(m2, 'click', function() {
            iw2.open(map, m2);
        });
        google.maps.event.addListener(m2, 'dragend', function() {
            var lat = m2.getPosition().lat();
            var lng = m2.getPosition().lng();
            iw2.setContent("<b>Drag me around!</b><p style='color:red;'>Nuova posizione:</p><p>Latitudine: " + lat + "</p><p>Longitudine: " + lng + "</p>");
        });


        // Marker con icona e InfoWindow personalizzate (utilizzo di InfoBox) + Circle Overlay
        var m3 = new google.maps.Marker({
            position: pos3,
            icon: 'images/university.png',
            animation: google.maps.Animation.DROP,
            title: "Marker con icona personalizzata"
        });
        m3.setMap(map);
        var circularRangeOptions = {
            center: pos3,
            clickable: false,
            fillColor: "blue",
            fillOpacity: 0.15,
            map: map,
            radius: 300,
            strokeColor: "blue",
            strokeOpacity: 0.3,
            strokeWeight: 2
        };
        var circle = new google.maps.Circle(circularRangeOptions);
        overlays.push(circle);
        var ibContent = '<div class="triangle-obtuse"><img src="images/univpm.gif" height="70"><p style="margin-top: 5px; font-size: 12px; font-weight: bold; text-align: center;">UNIVPM</p></div>';
        var ibOptions = {
            content: ibContent,
            disableAutoPan: false,
            pixelOffset: new google.maps.Size(-100, -200), // Size(<x>, <y>)
            boxStyle: {
                width: "100px"
            },
            closeBoxURL: "" // specifica l'url dell'icona di chiusura; se vuoto, non viene mostrata
        };
        var ib1 = new InfoBox(ibOptions);
        ib1.open(map, m3);
        infoboxes.push(ib1);


        // Marker con InfoWindow dal contenuto personalizzato
        var m4 = new google.maps.Marker({
            position: pos4,
            icon: 'images/video.png',
            animation: google.maps.Animation.DROP,
            title: "InfoWindow con visualizzazione video"
        });
        m4.setMap(map);
        var iw3 = new google.maps.InfoWindow({
            content: '<p style="font-size:18px;">Happy Ancona!</p><p style="font-size:12px;">Questo video è stato girato a: <a href="http://it.wikipedia.org/wiki/Passetto_(Ancona)" target="_blank" title="Pagina Wikipedia">Passetto di Ancona</a> e dintorni..</p><iframe width="560" height="315" src="//www.youtube.com/embed/KMjUM69Vis0?rel=0" frameborder="0" allowfullscreen></iframe>',
            zIndex: 8000
                    /*
                     *  By default, InfoWindows are displayed according to their latitude,
                     *  with InfoWindows of lower latitudes appearing in front of InfoWindows at higher latitudes.
                     *  InfoWindows are always displayed in front of markers.
                     */
        });
        google.maps.event.addListener(m4, 'click', function() {
            iw3.open(map, m4);
        });

        markers.push(m1, m2, m3, m4);
        isShowingMarkers = true;
    }
}

var directionsDisplay = new google.maps.DirectionsRenderer({draggable: true});
var directionsService = new google.maps.DirectionsService();
var isRouteVisible = false;

function calcRoute(map) {
    if (isRouteVisible) {
        directionsDisplay.setMap(null);
        isRouteVisible = false;
    }
    else {
        var waypoints = [];
        waypoints.push({
            location: pos4,
            stopover: true
        });

        waypoints.push({
            location: pos2,
            stopover: true
        });

        var request = {
            origin: pos1,
            destination: pos3,
            waypoints: waypoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsDisplay.setMap(map);
        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
        isRouteVisible = true;
    }
}
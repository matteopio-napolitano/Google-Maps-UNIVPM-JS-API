/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

var map = null;

function initialize() {
    // specifichiamo le opzioni di configurazione e personalizzazione della mappa;
    // mapOption è un oggetto letterale
    var mapOptions = {
        // specifichiamo ove centrare la mappa
        center: new google.maps.LatLng(43.6158572, 13.5187567), // ci posizioniamo su ANCONA

        // è anche possibile utilizzare un oggetto LatLng letterale
        // center: {lat: 43.6158572, lng: 13.5187567}

        // definiamo il livello di zoom della mappa
        // 0 = vista della Terra, > 0 dettaglio dell'area centrata sulle coordinate specificate
        zoom: 14,
        
        // disabilitiamo tutti i controlli di default della mappa
        disableDefaultUI: true
    };

    // costruiamo l'oggetto mappa ed assegnamolo ad una variabile in modo da poterlo riutilizzare
    // anche in seguito;
    // il costruttore dell'oggetto Map: Map(mapDiv:Node, opts?:MapOptions)
    //      mapDiv:Node - il 'nodo' HTML all'interno del quale creare una nuova mappa
    //      opts?:MapOptions - l'oggetto letterale MapOptions; fornisce i parametri di configurazione
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    // inizializza il top menu
    var nav = new navigator();
    nav.init(map);
}

// utilizziamo l'Event Listener fornito dalle API GMaps per eseguire il metodo di inizializzazione
// della mappa SOLO a caricamento della pagina completato;
// ci consente di avere maggiore controllo sul comportamento della mappa stessa
google.maps.event.addDomListener(window, 'load', initialize);

/*
 * Alternativa: caricamento asincrono
 * 
 // questo metodo si occupa di inizializzare la mappa
 function initialize() {
    var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
 };
 
 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
 }
 
 // questo metodo si occupa di iniettare nel DOM gli script delle API GMaps;
 // è il metodo che esegue concretamente il caricamento asincrono
 function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize';
    document.body.appendChild(script);
 }
 
 // aggancio l'esecuzione del metodo loadScript all'evento che intercetta il termine
 // del caricamento del DOM..
 
 // ..tramite l'oggetto window..
 // window.onload = loadScript;
 
 // ..oppure tramite jQuery
 $(function(){
    loadScript();
 });
 */
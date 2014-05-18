/*
 * Google Maps JavaScript API v3 - Esempi di utilizzo
 * 
 * Matteo Pio Napolitano
 * matteopio.napolitano@gmail.com
 */

function navigator() {
    var _navContainer = $('#topmenu').eq(0);
    var _actionButtonContainer = $('#action-button-container').eq(0);

    var _mapHolder = null;

    var _links = [
        {
            text: 'Getting Started',
            title: 'Nozioni di base su Google Maps JavaScript API v3',
            defaultclass: 'active'
        },
        {
            text: 'Personalizzazione',
            title: 'Personalizzare una mappa',
            defaultclass: ''
        },
        {
            text: 'Drawing on Maps',
            title: 'Nozioni di disegno e selezione su Google Maps',
            defaultclass: ''
        },
        {
            text: 'Places',
            title: 'Nozioni di base su Google Places',
            defaultclass: ''
        },
        {
            text: 'Geocoding',
            title: 'Nozioni di base su Geocoding Web Services',
            defaultclass: ''
        }
    ];

    var _actionButtons = [
        [
            {
                text: 'Zoom Control',
                link: function() {
                    toggleZoomControl(_mapHolder);
                },
                title: 'Abilita / Disabilita Zoom Control',
                class: 'btn-primary'
            },
            {
                text: 'MapType Control',
                link: function() {
                    toggleMapTypeControl(_mapHolder);
                },
                title: 'Abilita / Disabilita MapType Control',
                class: 'btn-primary'
            },
            {
                text: 'Pan Control',
                link: function() {
                    togglePanControl(_mapHolder);
                },
                title: 'Abilita / Disabilita Pan Control',
                class: 'btn-primary'
            },
            {
                text: 'All Control',
                link: function() {
                    toggleAllControl(_mapHolder);
                },
                title: 'Abilita / Disabilita tutti i Control',
                class: 'btn-primary'
            }
        ],
        [
            {
                text: 'StyledMap: Regioni Italiane',
                link: function() {
                    toggleRegioniStyledMap(_mapHolder);
                },
                title: 'Abilita / Disabilita la mappa delle Regioni Italiane',
                class: 'btn-primary'
            },
            {
                text: 'StyledMap: Rete Autostradale',
                link: function() {
                    toggleHighwayStyledMap(_mapHolder);
                },
                title: 'Abilita / Disabilita la mappa della Rete Autostradale',
                class: 'btn-success'
            },
            {
                text: 'Markers',
                link: function() {
                    toggleSampleMarkers(_mapHolder);
                },
                title: 'Abilita / Disabilita i marker',
                class: 'btn-info'
            },
            {
                text: 'Directions Service',
                link: function() {
                    calcRoute(_mapHolder);
                },
                title: 'Calcola percorso tra i marker',
                class: 'btn-warning'
            }
        ],
        [
            {
                text: 'Poligono: il Triangolo Industriale',
                link: function() {
                    toggleTriangoloEconomicoMapOverlay(_mapHolder);
                },
                title: 'Abilita / Disabilita overlay Triangolo Industriale',
                class: 'btn-primary'
            },
            {
                text: 'Reddito medio familiare per Regione',
                link: function() {
                    toggleRegionalEarningsMapOverlay(_mapHolder);
                },
                title: 'Abilita / Disabilita overlay reddito medio familiare per Regione',
                class: 'btn-primary'
            },
            {
                text: 'Drawing Tools',
                link: function() {
                    toggleDrawingManager(_mapHolder);
                },
                title: 'Abilita / Disabilita Drawing Tools Manager',
                class: 'btn-danger'
            }
        ],
        [
            {
                text: 'Places Nearby',
                link: function() {
                    selectPlacesNearbyTypes(_mapHolder);
                },
                title: 'Google Places: ricerca di luoghi per categoria',
                class: 'btn-primary'
            },
            {
                text: 'Places Search',
                link: function() {
                    togglePlacesTextSearchForm(_mapHolder);
                },
                title: 'Google Places: ricerca di luoghi tramite pattern',
                class: 'btn-primary'
            }
        ],
        [
            {
                text: 'Geocoding for Address',
                link: function() {
                    toggleGeocodingSearchForm(_mapHolder);
                },
                title: 'Geocoding Service: trasformare un indirizzo in coordinate',
                class: 'btn-success'
            },
            {
                text: 'Geocoding for Coordinates',
                link: function() {
                    toggleReverseGeocodingSearchForm(_mapHolder);
                },
                title: 'Geocoding Service: trasformare coordinate in un indirizzo',
                class: 'btn-primary'
            }
        ]
    ];

    var _refreshActionButtonContainerWithCategory = function(category) {
        $(_actionButtonContainer).children('button').remove();
        $.each(_actionButtons[category], function(key, value) {
            $(_actionButtonContainer).append('<button id="ab_' + category + '_' + key + '" type="button" class="btn ' + value.class + ' visible-md visible-lg" title="' + value.title + '">' + value.text + '</button>');
            $('#ab_' + category + '_' + key).click(function(event) {
                event.preventDefault();
                event.stopPropagation();
                value.link();
                return false;
            });
        });
    };

    this.init = function(mapObj) {
        _mapHolder = mapObj;

        // init action buttons
        _refreshActionButtonContainerWithCategory(0);

        $.each(_links, function(key, value) {
            $(_navContainer).append('<li class="' + value.defaultclass + '"><a id="nav_' + key + '" href="#" title="' + value.title + '">' + value.text + '</a></li>');
            $('#nav_' + key).eq(0).click(function(event) {
                event.preventDefault();
                event.stopPropagation();

                // modifica stato link nav bar
                $('li.active').removeClass('active');
                $(this).parent('li').addClass('active');

                // sostituizione action buttons
                _refreshActionButtonContainerWithCategory(key);

                return false;
            });
        });
    };
}
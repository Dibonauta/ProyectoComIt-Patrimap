  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var map, platform;
var pos, latitud, longitud; 
latitud= -32.84
longitud= -61.25
var behavior 
var ui
var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/about/',
        url: 'about.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!"); 
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e); 
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="index" attribute loaded and initialized
 
    //Mapa
    platform = new H.service.Platform({
      'apikey': 'jxHbNasTU-AJ9dPFrehNs5dC7JtDW7hz-KjaiKcSb-0'
    });

    var defaultLayers = platform.createDefaultLayers();
	    // Instantiate (and display) a map object:
	    map = new H.Map(
          document.getElementById('mapContainer'),
    	  defaultLayers.raster.satellite.xbase,
    	  {
      	  zoom: 10,
      	  center: { lat: latitud, lng: longitud }
          });

    	  coords = {lat: latitud, lng: longitud};
    	  marker = new H.map.Marker(coords);
 
    	  // Add the marker to the map and center the map at the location of the marker:
    	  map.addObject(marker);
      	map.setCenter(coords); 

        //Movimiento del mapa
        var mapEvents = new H.mapevents.MapEvents(map);
        var behavior = new H.mapevents.Behavior(mapEvents); 
        
        //UI del mapa
        var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES');

        var mapSettings = ui.getControl('mapsettings');
        var zoom = ui.getControl('zoom');
        var scalebar = ui.getControl('scalebar'); 

        mapSettings.setAlignment('top-right');
        zoom.setAlignment('right-middle'); 
        
        
        //iconos del mapa
        var icon = new H.map.Icon('img/icono1.png')
          
        var marker = new H.map.Marker({ lat: -32.845811, lng: -61.248997 }, {icon: icon});
        
        map.addObject(marker);
        
        
        
})
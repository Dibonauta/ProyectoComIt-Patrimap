  
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
    	  defaultLayers.raster.satellite.base,
    	  {
      	  zoom: 5,
      	  center: { lat: latitud, lng: longitud }
          });

    	  coords = {lat: latitud, lng: longitud};
    	  marker = new H.map.Marker(coords);
 
    	  // Add the marker to the map and center the map at the location of the marker:
    	  //map.addObject(marker);
      	//map.setCenter(coords);  

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
        var iconoMuseo = new H.map.Icon('img/iconomuseo.png')
          
        //var marker = new H.map.Marker({ lat: -32.845811, lng: -61.248997 }, {icon: icon});
        
        map.addObject(marker); 


        //A ver que sale
        function marcadores(map){

          var grupo = new H.map.Group(); 

          map.addObject(grupo);  

          grupo.addEventListener('tap', function (evt) {
            // event target is the marker itself, group is a parent event target
            // for all objects that it contains
            var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
              // read custom data
              content: evt.target.getData()
            });
            // show info bubble
            ui.addBubble(bubble);
          }, true);        
          
          //Museos
          agregarmarcadoralgrupo(grupo, {lat:-32.845811, lng:-61.248997}, {icon: iconoMuseo},
            '<div><a href="https://www.facebook.com/museo.correa/">Museo Correa "Villa Angela"</a></div>' +
            '<div>Correa, Santa Fe</div>'); 
          
          agregarmarcadoralgrupo(grupo, {lat:-32.954380, lng:-60.656858}, {icon: iconoMuseo},
            '<div><a href="https://www.liverpoolfc.tv">Liverpool</a></div>' +
            '<div>Rosario, Santa Fe</div>');
          
          agregarmarcadoralgrupo(grupo, {lat:-32.956231, lng:-60.659858}, {icon: iconoMuseo});
        } 

        function agregarmarcadoralgrupo(grupo, coordinate, html){
          var marcadorG = new H.map.Marker(coordinate, {icon: iconoMuseo}); 
          grupo.addObject(marcadorG); 
          marcadorG.setData(html);
        }  
        marcadores(map);
        
        
        
})
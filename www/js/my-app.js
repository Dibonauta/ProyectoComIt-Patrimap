  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var map, platform;
var pos, latitud, longitud; 
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
    var onSuccess = function(position) {
      /*/console.log('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');/*/
            
            latitud = position.coords.latitude
            longitud = position.coords.longitude 
            fnPuntosMapa()
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);  
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
    // Do something here when page with data-name="index" attribute loaded and initialized
           
}) 

function fnPuntosMapa(){
//---------------------------------------------------------Mapa---------------------------------------------------------------------------
    platform = new H.service.Platform({
      'apikey': 'jxHbNasTU-AJ9dPFrehNs5dC7JtDW7hz-KjaiKcSb-0'
    });

    var defaultLayers = platform.createDefaultLayers();
	    // Instantiate (and display) a map object:
      
      map = new H.Map(
          document.getElementById('mapContainer'),
    	  defaultLayers.raster.satellite.base,
    	  { 
      	  zoom: 14,
      	  center: { lat: latitud, lng: longitud }
          });

    	  coords = {lat: latitud, lng: longitud};
    	  marker = new H.map.Marker(coords);
 
    	  // Add the marker to the map and center the map at the location of the marker:
    	  //map.addObject(marker);
      	//map.setCenter(coords);  

//---------------------------------------------------Movimiento del mapa-----------------------------------------------------------
        var mapEvents = new H.mapevents.MapEvents(map);
        var behavior = new H.mapevents.Behavior(mapEvents); 
        
        //UI del mapa
        var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES');

        var mapSettings = ui.getControl('mapsettings');
        var zoom = ui.getControl('zoom');
        var scalebar = ui.getControl('scalebar'); 

        mapSettings.setAlignment('top-right');
        zoom.setAlignment('right-middle'); 
        
        
//---------------------------------------------------iconos del mapa---------------------------------------------------------
        /*var icon = new H.map.Icon('img/icono1.png')*/ 
        var iconoMuseo = new H.map.Icon('img/iconomuseo.png')
        var iconoPn = new H.map.Icon('img/iconopn.png')
        //var marker = new H.map.Marker({ lat: -32.845811, lng: -61.248997 }, {icon: icon});
        
        //map.addObject(marker); 
        
        //content: "--" + evt.target.getData()


 
//--------------------------------------------------------PUNTOS--------------------------------------------------------------------------          
        
        //Museos
        function marcadores(map){

          var grupo = new H.map.Group(); 

          map.addObject(grupo);  

          grupo.addEventListener('tap', function (evt) {
            // event target is the marker itself, group is a parent event target
            console.log(evt.target.getData())
            // for all objects that it contains
            var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
              // read custom data 

              content: evt.target.getData() 
            });
            // show info bubble
            ui.addBubble(bubble);
          }, false);        

          //Museos
          
          /*/agregarmarcadoralgrupo(grupo, {lat:-32.845811, lng:-61.248997},
            '<div><a class="external" target="_blank" href="https://www.facebook.com/museo.correa/">Museo Correa "Villa Angela"</a></div>' +
            '<div>Correa, Santa Fe</div>');
          
          agregarmarcadoralgrupo(grupo, {lat:-32.954380, lng:-60.656858},
            '<div><a href="https://www.liverpoolfc.tv">Liverpool</a></div>' +
            '<div>Rosario, Santa Fe</div>');/*/
            var db = firebase.firestore();
            var perRef = db.collection("Museos");
            perRef.get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                console.log("Enlace:" + doc.data().Link);
                console.log("Latitud:" + doc.data().Latitud); 
                console.log("Longitud:" + doc.data().Longitud); 
                console.log("Nombre:" + doc.data().Nombre);
                console.log("Ubicacion:" + doc.data().Ubicacion); 
                
                
                
                enlace = doc.data().Link;
                ns = doc.data().Latitud; 
                eo = doc.data().Longitud; 
                nom = doc.data().Nombre;   
                ubi = doc.data().Ubicacion; 
                

                agregarmuseo(grupo, {lat: ns, lng: eo},
                  '<div><a class="external" target="_blank" href="'+ enlace +'">'+ nom +'</a></div>' +
                  '<div>'+ ubi +'</div>'+ '<h3 onclick="abrirpopup(\''+doc.id+'\')" style="cursor: pointer;">Mas Info</h3>'); 
               }); 
            
              })
              .catch(function(error) {

               console.log("Error: " , error); 
              }); 
         
        } 

        function agregarmuseo(grupo, coordinate, html){
          var marcadorM = new H.map.Marker(coordinate, {icon: iconoMuseo}); 
          grupo.addObject(marcadorM); 
          marcadorM.setData(html);
        }  
        marcadores(map); 

       

        //Parques Nacionales
        function marcadores1(map){

          var grupopn = new H.map.Group(); 

          map.addObject(grupopn);  

          grupopn.addEventListener('tap', function (evt) {
            // event target is the marker itself, group is a parent event target
            console.log(evt.target.getData())
            // for all objects that it contains
            var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
              // read custom data 

              content: evt.target.getData() 
            });
            // show info bubble
            ui.addBubble(bubble);
          }, false);        
          
          //Parques Nacionales
            var db = firebase.firestore();
            var perRef = db.collection("Parques Nacionales");
            perRef.get()
              .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                console.log("Enlace:" + doc.data().Link);
                console.log("Latitud:" + doc.data().Latitud); 
                console.log("Longitud:" + doc.data().Longitud); 
                console.log("Nombre:" + doc.data().Nombre);
                console.log("Ubicacion:" + doc.data().Ubicacion); 

                enlace = doc.data().Link;
                ns = doc.data().Latitud; 
                eo = doc.data().Longitud; 
                nom = doc.data().Nombre;   
                ubi = doc.data().Ubicacion; 

                agregarpn(grupopn, {lat: ns, lng: eo},
                  '<div><a class="external" target="_blank" href="'+ enlace +'">'+ nom +'</a></div>' +
                  '<div>'+ ubi +'</div>' + '<h3 onclick="abrirpopupn(\''+doc.id+'\')" style="cursor: pointer;">Mas Info</h3>'); 
               }); 
            
              })
              .catch(function(error) {

               console.log("Error: " , error); 
              });
         
        } 

        function agregarpn(grupopn, coordinate, html){
          var marcadorPN = new H.map.Marker(coordinate, {icon: iconoPn}); 
          grupopn.addObject(marcadorPN); 
          marcadorPN.setData(html);
        }  
        marcadores1(map);
       




}












//-----------------------------------------------------------POPUPS----------------------------------------------------------------------//

//Museos
function abrirpopup(id){
  console.log(id) 

  var pic1 = ""
  var pic2 = ""
  var pic3 = ""
  var pic4 = ""
  var desc = ""



  var db = firebase.firestore();
  var docRef = db.collection("Museos").doc(id);    
  
        docRef.get().then((doc) => {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        
        
        console.log("Fotos:" + doc.data().Foto1);
        console.log("Fotos:" + doc.data().Foto2);
        console.log("Fotos:" + doc.data().Foto3);
        console.log("Fotos:" + doc.data().Foto4);
        console.log("Fotos:" + doc.data().Foto5);
        
        
        console.log("Descripcion:" + doc.data().Descripcion);
    
          
                  pic1 = doc.data().Foto1;
                  pic2 = doc.data().Foto2;
                  pic3 = doc.data().Foto3;
                  pic4 = doc.data().Foto4;
                  pic5 = doc.data().Foto5;   
                  
                  desc = doc.data().Descripcion; 
                  
                  imagen1 = '<center><img src="'+pic1+'"  height="250" alt=""></center>'
                  imagen2 = '<center><img src="'+pic2+'"  height="250" alt=""></center>'
                  imagen3 = '<center><img src="'+pic3+'"  height="250" alt=""></center>'
                  imagen4 = '<center><img src="'+pic4+'"  height="250" alt=""></center>'
                  imagen5 = '<center><img src="'+pic5+'"  height="250" alt=""></center>'

                  $$('#popuptitulo').html(id); 
                  $$('#foto1').html(imagen1); 
                  $$('#foto2').html(imagen2);
                  $$('#foto3').html(imagen3);
                  $$('#foto4').html(imagen4);
                  $$('#foto5').html(imagen5);
                  $$('#descripcion').html(desc)
                  $$('#popupinvisible').click();
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
          });





      
    

    
        
      
} 



//Parques Nacionales
function abrirpopupn(id){
  console.log(id) 

  var pic = ""
  var desc = ""



  var db = firebase.firestore();
  var docRef = db.collection("Parques Nacionales").doc(id);    
  
        docRef.get().then((doc) => {
        if (doc.exists) {
        console.log("Document data:", doc.data());
        
        console.log("Fotos:" + doc.data().Foto1);
        console.log("Fotos:" + doc.data().Foto2);
        console.log("Fotos:" + doc.data().Foto3);
        console.log("Fotos:" + doc.data().Foto4);
        console.log("Fotos:" + doc.data().Foto5);
        
        
        console.log("Descripcion:" + doc.data().Descripcion);
    
          
                  pic1 = doc.data().Foto1;
                  pic2 = doc.data().Foto2;
                  pic3 = doc.data().Foto3;
                  pic4 = doc.data().Foto4;
                  pic5 = doc.data().Foto5; 
                  desc = doc.data().Descripcion; 
                    
                  imagen1 = '<img src="'+pic1+'" height="250" alt="">'
                  imagen2 = '<img src="'+pic2+'" height="250" alt="">'
                  imagen3 = '<img src="'+pic3+'" height="250" alt="">'
                  imagen4 = '<img src="'+pic4+'" height="250" alt="">'
                  imagen5 = '<img src="'+pic5+'" height="250" alt="">'

                  $$('#popuptitulo').html(id); 
                  $$('#foto1').html(imagen); 
                  $$('#foto2').html(imagen);
                  $$('#foto3').html(imagen);
                  $$('#foto4').html(imagen);
                  $$('#foto5').html(imagen);
                  $$('#descripcion').html(desc)
                  $$('#popupinvisible').click();
        } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
          });

}


var map = L.map('my_map').setView([2.925, 23.497], 3); 
//Utilisation d'OSM (d'autres sources peuvent être utilisées) 
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
 })
.addTo(map);

/*var legend = L.control({position: 'bottomright'});
       legend.onAdd = function (map) {

       var div = L.DomUtil.create('div', 'info legend');
       div.innerHTML += "<h4>Légende : </h4>";
       div.innerHTML += '<span class="dot" style="background: #0131B4"></span><span>Centrales Hydrauliques</span><br>';
       div.innerHTML += '<span class="dot" style="background: #FE1B00"></span><span>Centrales Thermales</span><br>';
       div.innerHTML += '<span class="dot" style="background: #22780F"></span><span>Autres types de centrale</span><br>';
       return div;
       };
       legend.addTo(map);
*/


function listLink3() {
    console.log(data)
    if(document.maCarte.carteselect.value != "Rien"){ 
    //updateDiv();
    pointCarte(document.maCarte.carteselect.value);
  }}

  function updateDiv()
{ 
    $('#my_map').load(window.location.href + "#my_map");
}

var projection = d3.geoEquirectangular();

function pointCarte(type){
for (let i=0 ; i <data.length; i++){
    let col=""
    if(data[i].type=="THERMAL"){
        col='red'
    }
    else if (data[i].type=="HYDRO"){
        col='blue'
    }
    else{col='green'}
    if(data[i].type==type){
var bus = L.circle([data[i].latitude, data[i].longitude], {    
    color: col,
    fillColor: '#f88',
    fillOpacity: 0.5,
    radius: 10 // en mètres
  }).addTo(map);}  
}
}
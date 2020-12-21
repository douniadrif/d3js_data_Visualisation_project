
const xhr = new XMLHttpRequest()

xhr.responseType = 'json';

xhr.open('GET' , `https://development-data-hub-s3-public.s3.amazonaws.com/ddhfiles/145754/aicdpowerplants.geojson`)

let data = []
let lesPays=[]
let nbreGraph=0


//fonction chercher(){
//alert(document.getElementById('prenom'.value))
//}

// chargement page remplir resultat
xhr.onload = function() {
let resultat = xhr.response.features;

//console.log("resultaaaaas" ,resultat  );

for(let i=0 ; i <resultat.length; i++)
{
  //let tempo = resultat[i].fields
  let resultatProperties = resultat[i].properties;


  //console.log("prooooo" ,resultatProperties );

  // coordinates: (2) [30.8166667, 27.9]
  let resultatGeometry = resultat[i].geometry;

  //console.log("geoooooo" ,resultatGeometry);


  //console.log(`${tempo.annee} : ${tempo.nombre}`);

  data.push({"pays" : `${resultatProperties.COUNTRY}`, "latitude" : resultatProperties.LAT, "longitude" : resultatProperties.LON, "type" : resultatProperties.GEN_TYPE})
  
  // flag et remplir la liste des payes non double et non vide 

  if(lesPays.indexOf(resultatProperties.COUNTRY) == -1)
  {
    lesPays.push(resultatProperties.COUNTRY)
  }
//console.log("lesPaysssss" ,lesPays);

}

//por remplir les valeur des pays automatiquement de select
document.monFormulaire.myselect.options.length = lesPays.length+1; //nombre de payes ==nombre des valeurs a repmlir
document.monFormulaire.myselect.options[0].value= "Pays"; 
  document.monFormulaire.myselect.options[0].text= "Pays";
for (var j = 0; j <lesPays.length; j++) {
  document.monFormulaire.myselect.options[j+1].value= lesPays[j]; 
  document.monFormulaire.myselect.options[j+1].text= lesPays[j];
}
//console.log(data)
//console.log(lesPays)
//graph("NIGERIA")

// Initialize the plot with the first dataset


}

const div2 = d3.select("body").append("div")
    .attr("class", "tooltip")         
    .style("opacity", 1);

xhr.send();//si on veut faire de post pour nos données

var graph=function(etat){
  nbreGraph++
  //console.log("etatt : "+etat)
var truc = data.filter(function(countri){
  return countri.pays == etat; 
})
let hydr = 0
let therm = 0
let oth = 0
console.log(truc)
for(let i=0; i<truc.length;i++)
{
  if (truc[i].type=="HYDRO"){hydr++}
  else if (truc[i].type=="THERMAL"){therm++}
  else  oth++
}

var data1 = {Hydraulique: hydr, Thermale: therm, Others: oth}
console.log(data1)

var width = 450
    height = 450
    margin = 40
        
        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        var radius = Math.min(width, height) / 2 - margin
        // append the svg object to the div called 'my_dataviz'
        var svg = d3.select("#my_dataviz")          
          .append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height-20) / 2 + ")");
        
        // set the color scale
        var color = d3.scaleOrdinal()
          .domain(data1)
          .range(d3.schemeSet2);
        
        // Compute the position of each group on the pie:
        var pie = d3.pie()
          .value(function(d) {return d.value; })
        var data_ready = pie(d3.entries(data1))
        // Now I know that group A goes from 0 degrees to x degrees and so on.
        
        // shape helper to build arcs:
        var arcGenerator = d3.arc()
          .innerRadius(0)
          .outerRadius(radius)
        
        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function(d){ return(color(d.data.key)) })
            .attr("stroke", "black")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)
            .on("mouseover", function(d) {
              div2.transition()        
                  .duration(200)      
                  .style("opacity", .9);
              div2.html(d.data.key + ":" + d.data.value)
                  .style("left", (d3.event.pageX + 10) + "px")     
                  .style("top", (d3.event.pageY - 50) + "px");
          })
          .on("mouseout", function(d) {
              div2.transition()
                  .duration(500)
                  .style("opacity", 0);
  })
  svg.append('text')
  .attr("x",0)
  .attr("y",-195)
  .attr("text-anchor", "middle")
  .text(etat) 
  
  
        /*
        // Now add the annotation. Use the centroid method to get the best coordinates
        svg
          .selectAll('mySlices')
          .data(data_ready)
          .enter()
          .append('text')
          .text(function(d){ return  d.data.key})
          .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
          .style("text-anchor", "middle")
          .style("font-size", 17)
 //console.log(xhr.response)
        svg.append('text')
           .attr("x",0)
           .attr("y",-195)
           .attr("text-anchor", "middle")
           .text(etat)*/
          //.attr("text-anchor", "middle");


}

function listLink() {
if(document.monFormulaire.myselect.value != "Pays"){
  graph(document.monFormulaire.myselect.value);
}}


function refreshPage(){
  window.location.reload();
}


function Delete() {

 // d3.select('#my_dataviz').selectAll('mySlices').exit().remove();


console.log("DELETE???");
}

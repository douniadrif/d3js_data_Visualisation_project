function listLink2() {
  
    if(document.monBarchart.barselect.value != "Rien"){
    BarData(document.monBarchart.barselect.value);
    barchart(document.monBarchart.barselect.value);
  }}



  function myFunction() {

    
d3.select("#my_chart").remove();
    console.log(d3.select("#my_chart"))

  }


function BarData(t){
    dataBar=new Map()
    valeur=[]
for(let i=0; i<lesPays.length; i++){
    elPais=lesPays[i]
    compteur=0
    for(let k=0; k<data.length; k++){
        if(data[k].pays==lesPays[i] && data[k].type==t){
            compteur++
        }
    }
    dataBar.set(elPais, compteur)
    valeur.push({"pays" : elPais, "nombre" : compteur})
}
//console.log(dataBar)
console.log(valeur)
}

function barchart(choix){
// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 1500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    let larg=width/54;

    valeur.sort(function(b, a) {
        return a.nombre - b.nombre;
      });



// append the svg object to the body of the page
//var 
var svg = d3.select("#my_chart")
.attr("id","my_chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
const div = d3.select("body").append("div")
    .attr("class", "tooltip")         
    .style("opacity", 0);
// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(valeur.map(function(d) { return d.pays; }))
  //console.log("plot 1" +lesPays.map(function(d) { return d; }))
  .padding(0.2);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

var type = "not";
    if(document.monBarchart.barselect.value == 'HYDRO'){
      type="Hydraulique";
    }
    else if(document.monBarchart.barselect.value == 'OTHER')
    {
      type="Other";

    }
    else
    {
      type="Thermal";
    }
    svg.append('text')
  .attr("x",80)
  .attr("text-anchor", "middle")
  .text("Type : "+ type  ); 

// Add Y axis
if(choix=="THERMAL"){
var y = d3.scaleLinear()
  .domain([0, 100])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));}
else{
    var y = d3.scaleLinear()
  .domain([0, 30])
  .range([ height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));}


// Bars    
    svg.selectAll("mybar")
    .data(valeur)
    .enter()
    .append("rect")
      .attr("x", function(d) { return x(d.pays); })
      .attr("y", function(d) { return y(d.nombre); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.nombre); })
      .attr("fill", "#69b3a2")
      .on("mouseover", function(d) {
            div.transition()        
                .duration(200)      
                .style("opacity", .9);
            div.html(d.nombre)
                .style("left", (d3.event.pageX + 10) + "px")     
                .style("top", (d3.event.pageY - 50) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
})
}
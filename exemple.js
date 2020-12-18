const xhr = new XMLHttpRequest();

xhr.responseType = 'json';

xhr.open('GET','https://l.facebook.com/l.php?u=https%3A%2F%2Fdevelopment-data-hub-s3-public.s3.amazonaws.com%2Fddhfiles%2F145754%2Faicdpowerplants.geojson%3Ffbclid%3DIwAR1QYt9N3GKLerDULBDbI_QRb2kyEViwWmbNcu7fBJd_MUka4uZFDHhs7WI&h=AT3MRpIiLeoRkOAdvS0G26DyQpD0bhuUT-mYWEZouCb-i_Dc7oOXtqxGGJUQlpQdwohHHWJ_K3M1qOOu1r7jF7wr5nluTyi83c9JoZJ2CVdVzAbtYJ2SFWnOCcPrGnIt8igdpA');


let tab = [];


xhr.onload = function(){
    let res = xhr.response.records;

  console.log(res);
  tab.push(res);
  /*
    for(let i=0; i<res.length; i++){

        tab.push({annee:res[i].fields.annee,nombre:res[i].fields.nombre})    
        let a = res[i].fields.annee;
        let n = res[i].fields.nombre

    }
  */


}
xhr.send();


am4core.ready(function() {
    
    console.log(tab);


    // Themes begin
    am4core.useTheme(am4themes_moonrisekingdom);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    
    // Add data
    chart.data = tab;
    
    // Create axes
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "annee";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    
    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "nombre";
    series.dataFields.categoryX = "annee";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    
    }); // end am4core.ready()
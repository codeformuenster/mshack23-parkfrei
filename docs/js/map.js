// import * from "http://codeformuenster.org/open-data-karte-muenster/maps/Ebene_2_Stadtteil.geojson.js";


const coordiates = [51.96, 7.62];
const scale = 11;

const map = L.map('map').setView(coordiates, scale);


const tiles = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function style() {

    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3,
        //fillColor: dataSet.getDataItemColor( feature.properties.Nr )
        // fillColor: 'orange'

    };
}

function onEachQuater(quater, layer){
    layer.on('click', function(e){
        const imageUrl = '../assets/img/car-side.svg'
        // if there is an old icon remove it
        if (quater.properties.icon){
            map.removeLayer(quater.properties.icon);
        }
        // increase counter
        if (quater.properties.count == undefined){
            quater.properties.count = 0
        }
        quater.properties.count++
        // scale image with counter
        var imageBounds = this.getBounds().getCenter().toBounds(1000+100*quater.properties.count)
        // create image
        quater.properties.icon = L.imageOverlay(imageUrl, imageBounds)
        // and draw it
        quater.properties.icon.addTo(map);
    })
}

var quater = L.geoJson(stadtteileMuenster2, {
    style: style,
    onEachFeature: onEachQuater
}).addTo(map);


// function onRegionClick(e) {
//     console.log(e)
//     console.log(e.layer.feature.properties.Name)
//     // get clicks or define it
//     if (e.layer.feature.properties.counts == undefined){
//         e.layer.feature.properties.counts = 0
//     }
//     e.layer.feature.properties.counts++
//     quater.setStyle(style(e.layer.feature.properties.counts))
//     console.log(e)
//     console.log(e.layer.feature.properties.counts)
// }

// quater.on('click', onRegionClick);
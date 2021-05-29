// MAP INITIALIZATION

// var map = L.map('map').setView([28.3973623, 84.12576], 7);
var map = L.map("map", { minZoom: 7 });

$.getJSON("./nepal_province.geojson").then(function (geoJSON) {
    var osm = new L.TileLayer.BoundaryCanvas("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        boundary: geoJSON,
        attribution: '&copy; kaditya97'
    });
    map.addLayer(osm);
    var nepal = L.geoJSON(geoJSON);
    var bounds = nepal.getBounds();
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);
    map.on('drag', function () {
        map.panInsideBounds(bounds, { animate: false });
    });
});

// MAP LAYERS

// 1. OSM LAYERS 
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';

var OSM = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Map data &copy; " + mapLink,
    maxZoom: 18,
});


// 2. TOPO LAYER 

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});


// 3. GOOGLE STREET

var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Base maps 

var baseMaps = {
    "OpenStreetMap": OSM,
    "OpenTopoMap": OpenTopoMap,
    "GoogleStreets": googleStreets
};

L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);




// GEOJSON




// Add scale in map
L.control.scale({
    position: 'topleft',
    maxWidth: 200,
}).addTo(map);


// Search bar 
var osmGeocoder = new L.Control.OSMGeocoder();

map.addControl(osmGeocoder);


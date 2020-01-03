var map = L.map('mainmap').setView([39.29, -76.61], 11);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

const boundaryStyle = {
    'color': 'black',
    'weight': 2,
    'fillOpacity': 0, 
    'opacity': 0.7
}

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://opendata.arcgis.com/datasets/369b982f1da842aebc04c685776d26c1_0.geojson');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.onload = function() {
    if (xhr.status !== 200) return
    L.geoJSON(xhr.response, {
        style: boundaryStyle
    }).addTo(map);
};
xhr.send();

map.locate({
    setView: true, maxZoom: 16
});

function onLocationFound(e) {
    var radius = e.accuracy;
    console.log(e);

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius, {
        color:'black'
    }).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
    console.log(e);
}

map.on('locationerror', onLocationError);
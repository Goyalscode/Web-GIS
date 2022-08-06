// views, layers, targets

// view layer
var view = new ol.View({
    center: [8681074.58514053, 2593650.265329959],
    zoom: 4.2
})



// Base Map Layer

var basemapLayerOSM = 
new ol.layer.Tile({
source: new ol.source.OSM() // open street map layer
})  //  useful for accessing layers


var basemapLayerTerrain = 
new ol.layer.Tile({
    source : new ol.source.Stamen({
        layer : 'terrain'
    })
})

var basemapLayerWatercolor = 
new ol.layer.Tile({
    source : new ol.source.Stamen({
        layer : 'watercolor'
    })
})

var basemapLayerToner = 
new ol.layer.Tile({
    source : new ol.source.Stamen({
        layer : 'toner'
    })
})

// var basemapLayerGm = 
// new ol.TileLayer({
//     source : new XYZ({
//         url : 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'
//     })
// })

// layers array
var layerArray = [basemapLayerOSM]

// map Initiating
var map = new ol.Map({
    target : 'mymap', // set target
    view : view,     // set view
    layers : layerArray // set layer array
});


var styleStates = [
    new ol.style.Style({
        stroke : new ol.style.Stroke({
            color: 'red',
            width:2
        })
})
];


var styleRoutes = [
    new ol.style.Style({
        stroke : new ol.style.Stroke({
            color: 'darkgreen',
            width:2
        })
})
];

// add draw layer Routes
var drawSourceRoutes = new ol.source.Vector({
    format : new ol.format.GeoJSON(),
    url : 'routes.geojson'
})

var drawLayerRoutes = new ol.layer.Vector({
    source : drawSourceRoutes,
    style : styleRoutes
})


// add draw layer States
var drawSourceStates = new ol.source.Vector({
    format : new ol.format.GeoJSON(),
    url : 'states.geojson'
})

var drawLayerStates = new ol.layer.Vector({
    source : drawSourceStates,
    style : styleStates
})




// add draw layer Routes
var drawSourceCities = new ol.source.Vector({
    format : new ol.format.GeoJSON(),
    url : 'cities.geojson'
})


//var drawLayerCities = new ol.layer.Vector({
//     var drawLayerCities = new ol.layer.Heatmap({
//     source : drawSourceCities
// })

var drawLayerCities = new ol.layer.Vector({
    source: drawSourceCities,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            fill: new ol.style.Fill({
                color: 'blue'
            }),
            radius: 6
        })
    })
})

map.addLayer(basemapLayerTerrain);
map.addLayer(basemapLayerToner);
map.addLayer(basemapLayerWatercolor);
map.addLayer(drawLayerStates);
map.addLayer(drawLayerRoutes);
map.addLayer(drawLayerCities);

var current = basemapLayerTerrain;

basemapLayerOSM.setVisible(false);
basemapLayerToner.setVisible(false);
basemapLayerWatercolor.setVisible(false);

function selectMap(mapsel){
    if(mapsel.value == 'OSM'){
        current.setVisible(false);
        current = basemapLayerOSM;
        current.setVisible(true);
    }
    else if(mapsel.value == 'Terrain'){
        current.setVisible(false);
        current = basemapLayerTerrain;
        current.setVisible(true);
    }
    else if(mapsel.value == 'Toner'){
        current.setVisible(false);
        current = basemapLayerToner;
        current.setVisible(true);
    }
    else if(mapsel.value == 'Watercolor'){
        current.setVisible(false);
        current = basemapLayerWatercolor;
        current.setVisible(true);
    }
}

function checklayer(layersel){
    if(layersel.id == "citiesch")
    {
        if(layersel.checked == true)
        {
             drawLayerCities.setVisible(true);
        }
        else
        {
            drawLayerCities.setVisible(false);
        }
    }
    
    if(layersel.id == "statesch")
    {
        if(layersel.checked == true)
        {
            drawLayerStates.setVisible(true);
        }
        else
        {
            drawLayerStates.setVisible(false);
        }
    }
    
    if(layersel.id == "routesch")
    {
        if(layersel.checked == true)
        {
            drawLayerRoutes.setVisible(true);
        }
        else
        {
            drawLayerRoutes.setVisible(false);
        }
    }
}
// console.log(map.getLayers());
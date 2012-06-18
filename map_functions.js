var map;
var myOptions;
function initialize() {
    myOptions = {
	center: new google.maps.LatLng(0,0),
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	preserveViewport: true
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
				  myOptions);
    var kml=new google.maps.KmlLayer("http://ouyangdev.cs.csusm.edu/earthquakeplots/earthquake.kml?c=35", myOptions);
    kml.setMap(map);
    map.setZoom(3);
    google.maps.event.addListener(map, 'click', onMapClick);
    getEarthquakeInfo(list);
	for(var i=-180; i<180; i=i+20){
		for(var j=-80; j<80; j=j+20){
			 var Options = {
					 content: "(" + i +"&deg;, " + j +"&deg;)"
					,boxStyle: {
					   border: "0px solid black"
					  ,textAlign: "center"
					  ,fontSize: "8pt"
					  ,width: "70px"
					 }
					,disableAutoPan: true
					,pixelOffset: new google.maps.Size(-25, 0)
					,position: new google.maps.LatLng(j, i)
					,closeBoxURL: ""
					,isHidden: false
					,pane: "mapPane"
					,enableEventPropagation: true
				};

				var ibLabel = new InfoBox(Options);
				ibLabel.open(map);
				}
		}
	}


function onMapClick(event){
	alert(event.latLng.lat().toString() + " " + event.latLng.lng().toString());
	if (compareLatLng(event.latLng.lat(), event.latLng.lng())) alert("Correct.");
	else alert("Incorrect");
}

function showLatLng(){
var label = new ELabel(new GLatLng(44.3,-78.8), "Utopia", "style1");
}

function center(lat, lng){
	map.panTo(new google.maps.LatLng(lat, lng));
}
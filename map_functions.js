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
	 var Options = {
			 content: "0&deg;"
			,boxStyle: {
			   border: "0px solid black"
			  ,textAlign: "center"
			  ,fontSize: "8pt"
			  ,width: "50px"
			 }
			,disableAutoPan: true
			,pixelOffset: new google.maps.Size(-25, 0)
			,position: new google.maps.LatLng(0, 0)
			,closeBoxURL: ""
			,isHidden: false
			,pane: "mapPane"
			,enableEventPropagation: true
		};

		var ibLabel = new InfoBox(Options);
		ibLabel.open(map);
		map.panTo(new google.maps.LatLng(49.47216, -123.76307));
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
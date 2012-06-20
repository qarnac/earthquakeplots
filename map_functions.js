var map;
var myOptions;

// Initializes the google map object.
function initialize() {
    myOptions = {
	center: new google.maps.LatLng(0,0),
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.SATELLITE,
	preserveViewport: true,
	minZoom:2
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
				  myOptions);
    var kml=new google.maps.KmlLayer("http://ouyangdev.cs.csusm.edu/earthquakeplots/earthquake.kml?c=36", myOptions);
    kml.setMap(map);
    map.setZoom(3);
    google.maps.event.addListener(map, 'click', onMapClick);
    getEarthquakeInfo(list);
	for(var i=-80; i<80; i=i+20){
		for(var j=-180; j<180; j=j+20){
			var lng=(j<0)? "W":"E";
			var lat=(i<0)?"S":"N"
			 var Options = {
					 content: "(" + Math.abs(i) +"&deg; " + lat + "," + Math.abs(j) +"&deg;" + lng +")"
					,boxStyle: {
					   border: "0px solid black"
					  ,textAlign: "center"
					  ,fontSize: "8pt"
					  ,width: "75px"
					  ,color: "#000000"
					 }
					,disableAutoPan: true
					,pixelOffset: new google.maps.Size(-25, 0)
					,position: new google.maps.LatLng(i, j)
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
//	alert(event.latLng.lat().toString() + " " + event.latLng.lng().toString());
	if (compareLatLng(event.latLng.lat(), event.latLng.lng())) correctClick();
	else incorrectClick();
}


// Adds a placemark to indicate an earthquake given the
// earthquakes location in earthquakeList.
function plotEarthquake(slot, color){
	if(color==undefined) color="blue";
	var text=earthquakeList[slot][11] + " Magnitude: " + earthquakeList[slot][8];
	//Temporary quote fix.
	text=text.replace('&quot;', "");
	text=text.replace('&quot;', "");
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(earthquakeList[slot][6], earthquakeList[slot][7]),
		title:text,
		icon: parseColorToIcon(color)
	});
	marker.setMap(map);
	placemarkList.push(marker);
}

// Is called when the plot button is clicked.
// goes through all of the earthquakes not shown on the table, and plots them.
function plotAllEarthquakes(){
	for(var i=shownEarthquakes+1; i<earthquakeList.length; i++){
		plotEarthquake(i, changeMagToColor(earthquakeList[i][8]));
	}
}

function changeMagToColor(mag){
	if(mag<=5) return "green"
	if(mag>5 && mag<7) return "orange"
	if(mag>=7) return "red"
}

function parseColorToIcon(color){
	if(color=="green") return "http://gmaps-samples.googlecode.com/svn/trunk/markers/green/blank.png";
	if(color=="blue") return "http://gmaps-samples.googlecode.com/svn/trunk/markers/blue/blank.png";
	if(color=="orange") return "http://gmaps-samples.googlecode.com/svn/trunk/markers/orange/blank.png";
	if(color=="red") return "http://gmaps-samples.googlecode.com/svn/trunk/markers/red/blank.png";
	}

function center(lat, lng){
	map.panTo(new google.maps.LatLng(lat, lng));
}
// We are no longer going to use a list, but instead are going to be using a table isntead.

// This is the Earthquake currently being plotted on the map.
// The value is it's slot in the earthquake array.
// 0 indicates that no earthquake has been selected yet.
var selectedEarthquake=0;
var earthquakeList;
// The number of earthquakes being shown in the table.
var SHOWN_EARTHQUAKES=10;
// isSelectable has a 0 in slot 0 so the Title isn't selectable.
// Then adds a 1 for evey row, indicating that the rows are selectable.
var isSelectable=[0];
for(var i=0; i<SHOWN_EARTHQUAKES; i++) isSelectable.push(1);
// If 0, Placemarks are shown.  If 1, they are hidden.
var hidePlacemarks=true;
var placemarkList=[];
// The amount of degrees off a student is allowed to be when placing earthquakes.
var ACCEPT_RANGE=5;

function changeSelectedEarthquake(value){
	// If the earthquake has been deemed not selectable, just exit the function.
	if(!isSelectable[value] || value==selectedEarthquake) return;
	selectedEarthquake=value
	
	if(!tutorial.isHidden && tutorial.currentInstruction==1)
	
	table=document.getElementById("earthquakeTable");
	earthquakes=table.getElementsByTagName("tr");
	earthquakes[value].className="highlight";
	earthquakes[selectedEarthquake].className="";
}


// Is called when a user clicks on the map, and does not click on the correct earthquake location.
function incorrectClick(){
// If the Title row is selected, we don't want to mark it incorrect.
	if(selectedEarthquake){
	table=document.getElementById("earthquakeTable");
	earthquakes=table.getElementsByTagName("tr");
	earthquakes[selectedEarthquake].className="incorrect";
	}
}

// The front end will display all of the lat/lng values differently than they are being used
// on the back end, so I'm making this function with the assumption it'll be used often.
function displayLatLng(lat, isLat){
	var suffix;
	if(isLat) suffix=(lat>0)? 'N' : 'S';
	else suffix=(lat>0)?'E':'W';
	lat=Math.abs(lat);
	lat*=10;
	lat=Math.floor(lat);
	lat/=10;
	return lat + suffix;
}

// Is called when a user correctly places an earthquake on the map.
function correctClick(){
	// First, we want to make sure that the earthquake isn't selected again.
	isSelectable[selectedEarthquake]=0;

	// Highlight the <tr> green to indicate to the user that they correctly placed the earthquake.
	table=document.getElementById("earthquakeTable");
	earthquakes=table.getElementsByTagName("tr");
	earthquakes[selectedEarthquake].className="correct";

	plotEarthquake(selectedEarthquake);
	selectedEarthquake=0;
}



// Is called once the csv has been retrieved, parsed, and sorted.  Simply takes the top 5 earthquakes, and displays them in a table.
function updateList(newList){
    var table=document.getElementById("earthquakeTable");
    for (var i=1; i<=SHOWN_EARTHQUAKES; i++){
		var parent=document.createElement("tr");
		childA=document.createElement("td");
		childB=document.createElement("td");
		childC=document.createElement("td");
		childD=document.createElement("td");

		// Temporary quotation mark fix.
		newList[i][11]=newList[i][11].replace('&quot;', "");
		newList[i][11]=newList[i][11].replace('&quot;', "");

		// Title
		childA.textContent=newList[i][11];
		//Magnitude
		childB.textContent=newList[i][MAGNITUDE];
		// Latitude
		childC.textContent=displayLatLng(newList[i][LATITUDE], true);
		// Longitude
		childD.textContent=displayLatLng(newList[i][LONGITUDE], false);
		parent.appendChild(childA);
		parent.appendChild(childB);
		parent.appendChild(childC);
		parent.appendChild(childD);
		parent.setAttribute("onclick", "changeSelectedEarthquake(" + i + ")");
		table.appendChild(parent);
	}
	earthquakeList=newList;
	tutorial=new instructionBox();
}

// Is called when the Hide/Show visibility button is clicked.
function invertPlacemarkVisibility(){
	if(hidePlacemarks){
		document.getElementById("Hide").textContent="Show Placemarks";
		for(var i=0; i<placemarkList.length; i++){
			placemarkList[i].setMap(null);
		}
	} else{
	document.getElementById("Hide").textContent="Hide Placemarks";
	for(var i=0; i<placemarkList.length; i++){
			placemarkList[i].setMap(map);
		}
	}
	hidePlacemarks=!hidePlacemarks;
}

// Checks that the latitude and longitude are within the correct ranges.
// if isLat==false, it's checking latitude.
// if isLat==true, it's checking Longitude.
function checkLatitude(lat, isLat){
	var earthquakeLat=(isLat)? (Math.floor(earthquakeList[selectedEarthquake][LATITUDE])) : (Math.floor(earthquakeList[selectedEarthquake][LONGITUDE]));
	// Compares that the latitude is within the correct range.
	if(lat>=earthquakeLat-ACCEPT_RANGE && lat<=earthquakeLat+ACCEPT_RANGE){
		// Makes sure that the point plotted is on the right side of the lat/lng lines.
		if(earthquakeLat>=0){
			var bot=earthquakeLat-(earthquakeLat%10);
			if(lat>=bot && lat<=bot+ACCEPT_RANGE*2) return true;
			// Negative numbers have to subtract 10 rather than add.
			if(earthquakeLat%10==0 && lat>=bot-ACCEPT_RANGE*2) return true;
		} else{
			var bot=earthquakeLat-(earthquakeLat%10)
			if(lat<=bot  && lat>=bot-ACCEPT_RANGE*2) return true;
			if(earthquakeLat%10==0 && lat<=bot+ACCEPT_RANGE*2) return true;
		}
	}
	return false;
}

function flashFirstEarthquake(){
	var table=document.getElementById("earthquakeTable");
	var earthquake=table.getElementsByTagName("tr")[1];
	var interval=setInterval(function(){ console.log("highlight");
								if(earthquake.className=="highlight") earthquake.className="";
								else earthquake.className="highlight";
								if(selectedEarthquake==1){
									earthquake.className="highlight";
									tutorial.eventFinished();
									window.clearInterval(interval);
								}}, 500);
}

// Is called when the map is clicked.  Compares the lat/lng of the click with the currently selected earthquake.
function compareLatLng(lat, lng){
	if(earthquakeList!=undefined){
	// Makes sure that the earthquake is in the range
		if(checkLatitude(lat, true) && checkLatitude(lng,false)) return true;
	}
	return false;
}

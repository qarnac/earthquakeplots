// We are no longer going to use a list, but instead are going to be using a table isntead.

// This is the Earthquake currently being plotted on the map.
// The value is it's slot in the earthquake array.
// 0 indicates that no earthquake has been selected yet.
var selectedEarthquake=0;
var earthquakeList;
var isSelectable=[0,1,1,1,1,1];

function changeSelectedEarthquake(value){
	// If the earthquake has been deemed not selectable, just exit the function.
	if(!isSelectable[value]) return; 

	table=document.getElementById("earthquakeTable");
	earthquakes=table.getElementsByTagName("tr");
	earthquakes[value].className="highlight";
	earthquakes[selectedEarthquake].className="";
    selectedEarthquake=value
}
// Adds a placemark to indicate an earthquake given the
// earthquakes location in earthquakeList.
function plotEarthquake(slot){
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(earthquakeList[slot][6], earthquakeList[slot][7]),
		title:earthquakeList[slot][11]
	});
	marker.setMap(map);
}

// Is called when the plot button is clicked.
// goes through all of the earthquakes not shown on the table, and plots them.
function plotAllEarthquakes(){
	for(var i=6; i<earthquakeList.length; i++){
		plotEarthquake(i);
	}
}

// Is called when a user correctly places an earthquake on the map.
// TODO:  Add a placemark on the correct location.
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



// Is called once the csv has been retrieved and parsed.  Simply takes the top 5 earthquakes, and displays them in a table.
function updateList(newList){
    var table=document.getElementById("earthquakeTable");
    for (var i=1; i<6; i++){
		var parent=document.createElement("tr");
		childA=document.createElement("td");
		childB=document.createElement("td");
		childC=document.createElement("td");
		childD=document.createElement("td");

		// Temporary quotation mark fix.
		newList[i][11]=newList[i][11].replace('&quot;', "");
		newList[i][11]=newList[i][11].replace('&quot;', "");

		childA.textContent=newList[i][11];
		childB.textContent=newList[i][8];
		childC.textContent=newList[i][6];
		childD.textContent=newList[i][7];
		parent.appendChild(childA);
		parent.appendChild(childB);
		parent.appendChild(childC);
		parent.appendChild(childD);
		parent.setAttribute("onclick", "changeSelectedEarthquake(" + i + ")");
		table.appendChild(parent);
	}
	earthquakeList=newList;
}

function compareLatLng(lat, lng){
	if(earthquakeList!=undefined &&
	lat<=earthquakeList[selectedEarthquake][6]+5 && lat>=earthquakeList[selectedEarthquake][6]-5 &&
	lng<=earthquakeList[selectedEarthquake][7]+5 && lng>=earthquakeList[selectedEarthquake][7]-5) return true;

	// For debugging purposes.
	// Just centers the map on the Latitude/longitude of the selected earthquake.
	//center(earthquakeList[selectedEarthquake][6], earthquakeList[selectedEarthquake][7]);
	return false;
}


// No longer needed for debugging purposes now that highlighting works.
function showSelectedEarthquake(){
	parent=document.createElement("p");
	parent.textContent=selectedEarthquake;
	document.getElementById("list").appendChild(parent);
}
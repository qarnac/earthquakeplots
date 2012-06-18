// We are no longer going to use a list, but instead are going to be using a table isntead.

// This is the Earthquake currently being plotted on the map.
// The value is it's slot in the earthquake array.
var selectedEarthquake=0;
var earthquakeList;

function changeSelectedEarthquake(value){
	table=document.getElementById("earthquakeTable");
	earthquakes=table.getElementsByTagName("tr");
	earthquakes[value].className="highlight";
	earthquakes[selectedEarthquake].className="";
    selectedEarthquake=value
}

// Is called once the csv has been retrieved and parsed.  Simply takes the top 5 earthquakes, and displays them in a table.
function updateList(newList){
    var table=document.getElementById("earthquakeTable");
    for (var i=1; i<6; i++){
		var parent=document.createElement("tr");
		childA=document.createElement("td");
		childB=document.createElement("td");
		// Temporary quotation mark fix.
		newList[i][11]=newList[i][11].replace('&quot;', "");
		newList[i][11]=newList[i][11].replace('&quot;', "");
	
		childA.textContent=newList[i][11];
		childB.textContent=newList[i][8];
		parent.appendChild(childA);
		parent.appendChild(childB);
		parent.setAttribute("onclick", "changeSelectedEarthquake(" + i + ")");
		table.appendChild(parent);
	}
	earthquakeList=newList;
}

function compareLatLng(lat, lng){
	if(earthquakeList!=undefined &&
	lat<=earthquakeList[selectedEarthquake][6]+1 && lat>=earthquakeList[selectedEarthquake][6]-1 &&
	lng<=earthquakeList[selectedEarthquake][7]+1 && lng>=earthquakeList[selectedEarthquake][7]-1) return true;
	
	// For debugging purposes.
	// Just centers the map on the Latitude/longitude of the selected earthquake.
	center(earthquakeList[selectedEarthquake][6], earthquakeList[selectedEarthquake][7]);
	return false;
}


// No longer needed for debugging purposes now that highlighting works.
function showSelectedEarthquake(){
	parent=document.createElement("p");
	parent.textContent=selectedEarthquake;
	document.getElementById("list").appendChild(parent);
}
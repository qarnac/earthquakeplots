// We are no longer going to use a list, but instead are going to be using a table isntead.

// This is the Earthquake currently being plotted on the map.
// The value is it's slot in the earthquake array.
var selectedEarthquake=0;

function changeSelectedEarthquake(value){
    selectedEarthquake=value
    alert("Function has been called.");
}

// Is called once the csv has been retrieved and parsed.  Simply takes the top 5 earthquakes, and displays them in a table.
function updateList(newList){
    var table=document.getElementById("earthquakeTable");
    for (var i=1; i<6; i++){
	var parent=document.createElement("tr");
	childA=document.createElement("td");
	childB=document.createElement("td");
	childA.textContent=newList[i][11];
	childB.textContent=newList[i][8];
	parent.appendChild(childA);
	parent.appendChild(childB);
	table.appendChild(parent);
	}
}
// We are no longer going to use a list, but instead are going to be using a table isntead.

// This is the Earthquake currently being plotted on the map.
// The value is it's slot in the earthquake array.
var selectedEarthquake=0;

function changeSelectedEarthquake(value){
    selectedEarthquake=value
    document.getElementById("selected").innerHTML="World";
    alert("Function has been called.");
}

// Is called once the csv has been retrieved and parsed.  Simply takes the top 5 earthquakes, and displays them in a table.
function updateList(newList){
    var table=document.getElementById("earthquakeTable");
    for (var i=1; i<6; i++){
	
	var parent=document.createElement("tr");
	var childA=document.createElement("td");
	childA.textContent=newList[i][11];
	parent.appendChild(childA);
	var childB=document.createElement("td");
	childB.textContentxs=newList[i][8];
	parent.appendChild(childB);
	table.appendChild(parent);

	/*
	var parent=table.appendChild("tr");
	var child=parent.appendChild("td");
	child.createTextNode(newList[i][11]);
	var child=parent.appendChild("td");
	child.createTextNode(newList[i][8]);
	child.onclick(changeSelectedEarthquake(i-1));
	*/
	}
}
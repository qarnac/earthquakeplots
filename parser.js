var MAGNITUDE=8;
var LATITUDE=6;
var LONGITUDE=7;

// Calls parser.php to get the earthquake list, and then calls parseToArrays to parse it.
function getEarthquakeInfo(divName){
	var request=new XMLHttpRequest();
	request.onreadystatechange=function()
	  {
	  if (request.readyState==4 && request.status==200)
		{
		if(request.responseText==null){
			updateList("Server returned null");
		} else{
			updateList(ParseToArrays(request.responseText));
			}
		}
	  }
	  request.open("GET", "fetcher.php", true);
	  request.send();
  }
  

// Is given a csv as a string, and splits it into an array.
// Current problem:  Doesn't ignore commas within a quote.
function ParseToArrays(data){
	data=data.split("\n");
	var returnvalue=[];
	for(var i=0; i<data.length-2; i++){
		returnvalue[i]=data[i+2].split(',');
	}
	return radixSort(returnvalue);
}

// This function will not work with an earthquake that has a magnitude of 10.0
// Currently relies on the Magnitude being in the 8th slot of the array.
function radixSort(data){
    var buckets=[];
    for(var i=0; i<10; i++) buckets[i]=[];
    // The 8th slot in the data array contains the magnitude of the earthquake.
    for(var i=0; i<data.length; i++){ 
	if(data[i][MAGNITUDE]!=undefined) buckets[data[i][MAGNITUDE].charAt(2)].push(data[i]);
    }
    data=[];
    data=buckets[9].concat( buckets[8], buckets[7], buckets[6], buckets[5]
			    ,buckets[4], buckets[3], buckets[2], buckets[1], buckets[0]);

    for(var i=0; i<10; i++) buckets[i]=[];   
 for(var i=0; i<data.length; i++) buckets[data[i][MAGNITUDE].charAt(0)].push(data[i]);
    data=[];
    data=buckets[9].concat( buckets[8], buckets[7], buckets[6], buckets[5]
			    ,buckets[4], buckets[3], buckets[2], buckets[1], buckets[0]);

    return data;
}
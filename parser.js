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
  
function ParseToArrays(data){
var data=data.split("\n");
var returnvalue=[];
for(var i=0; i<data.length-2; i++){
	returnvalue[i]=data[i+2].split(',');
}
return returnvalue;
}

function radixSort(
function initialize() {
    var myOptions = {
	center: new google.maps.LatLng(0,0),
	zoom: 4,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	preserveViewport: true
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
				  myOptions);
    var kml=new google.maps.KmlLayer("http://ouyangdev.cs.csusm.edu/earthquakeplots/earthquake.kml?c=31", myOptions);
    kml.setMap(map);
    map.setZoom(3);
    google.maps.event.addListener(map, 'click', function(event){
	    alert('Lat: ' + event.latLng.lat() + ' Lng: ' + event.latLng.lng());
	});

    getEarthquakeInfo(list);
}

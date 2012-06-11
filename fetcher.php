<?php
// Get a file into an array.  In this example we’ll go through HTTP to get
// the HTML source of a URL.
$lines = file("http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M2.5.txt");

// Loop through our array, show HTML source as HTML source; and line numbers too.
foreach ($lines as $line_num => $line) {
    echo htmlspecialchars($line) . "<br />\n";
}
?>
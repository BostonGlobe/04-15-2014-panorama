all:

	cd data; cat polygons.json | json -e 'this.latlngs = JSON.stringify(this.latlngs)' | in2csv -f json > polygons.csv;
	cd data; csvjoin -c id,ID polygons.csv quotes.csv | csvcut -c Name,Title,Notable_for,Quote,ID,latlngs | csvjson | json -e 'this.latlngs = JSON.parse(this.latlngs)' | json -o json-0 > all.json;
	cd data; { echo 'var globeGraphicRunners = '; cat all.json; echo ';'; } > ../js/globe.graphicRunners.js;

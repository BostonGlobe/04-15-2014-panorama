# 04-15-2014-photo

## TODO

### spreadsheet issues


### UI concerns


### content
- add new person (see shoe)


## Notes

- resize the input image to the closest multiple of 2. For example, this file was originally 5,483px wide. 171px*2*2*2*2*2 = 5,472. So I resized the image to 5,472, and the resulting tiles will be 171px by 171px.

- find/replace all instances of `256` with `171` in gdal2tiles.py (the `--tilesize` option doesn't exist).

- run the following command: `gdal2tiles.py panorama.jpg -p raster -z 0-5 -w none -r lanczos`


cat polygons.json | json -e 'this.latlngs = JSON.stringify(this.latlngs)' | in2csv -f json > polygons.csv
csvjoin -c id,ID polygons.csv quotes.csv | csvcut -c Category,Name,Title,Notable_for,Quote,ID,latlngs | csvjson | json -e 'this.latlngs = JSON.parse(this.latlngs)' | json -o json-0 > all.json

mogrify -quality 100 -format jpg -background black **/*.png


## About

This graphic was generated with [generator-globegraphic](https://github.com/BostonGlobe/generator-globegraphic).

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## Install

- `npm install`

## Usage
- `gulp` to run the development server.
- `gulp prod` to run the production server and concatenate everything to `PROD.jpt`.

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)

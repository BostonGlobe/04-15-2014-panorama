# [04-01-2014-panorama](http://www.bostonglobe.com/2014/04/14/one-year-one-city/LJpXxSk22z1ifq6c06uQFM/story.html)

This graphic was generated with [generator-globegraphic](https://github.com/BostonGlobe/generator-globegraphic). Consults its [README](https://github.com/BostonGlobe/generator-globegraphic) for more information.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## Notes

- To generate tiles run: `gdal2tiles.py panorama.jpg -p raster -z 0-5 -w none -r lanczos`
- To convert the png tiles to jpg run: `mogrify -quality 100 -format jpg -background black **/*.png`

## Install

- `npm install`

## Usage

### Development

- `gulp standalone` for **standalone** graphic.
- `gulp homepage` for **homepage** graphic.

### Production

- `gulp standalone-prod` for **standalone** graphic.
- `gulp homepage-prod` for **homepage** graphic.

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)



export const getRandomPoint = (geojson, num) => turf.randomPoint(num, { bbox: turf.bbox(geojson) })
export const getRandomPolygon = (geojson, num) => turf.randomPolygon(num, { bbox: turf.bbox(geojson) })
export const getRandomLineString = (geojson, num) => turf.randomLineString(num, { bbox: turf.bbox(geojson) })
export const getCenter = geojson => turf.center(geojson)

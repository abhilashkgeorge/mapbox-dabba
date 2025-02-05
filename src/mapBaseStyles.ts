export default {
  version: 8 as const,
  name: 'Basic',
  metadata: {
    'mapbox:autocomposite': true,
  },
  sources: {
    mapbox: {
      url: 'mapbox://mapbox.mapbox-streets-v8',
      type: 'vector',
    },
  },
  sprite: 'mapbox://sprites/mapbox/basic-v8',
  glyphs: 'mapbox://fonts/mapbox/{fontstack}/{range}.pbf',
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': '#dedede',
      },
    },
    {
      id: 'landuse_overlay_national_park',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'landuse_overlay',
      filter: ['==', 'class', 'national_park'],
      paint: {
        'fill-color': '#d2edae',
        'fill-opacity': 0.75,
      },
    },
    {
      id: 'landuse_park',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'landuse',
      filter: ['==', 'class', 'park'],
      paint: {
        'fill-color': '#d2edae',
      },
    },
    {
      id: 'waterway',
      type: 'line',
      source: 'mapbox',
      'source-layer': 'waterway',
      filter: ['all', ['==', '$type', 'LineString'], ['in', 'class', 'river', 'canal']],
      paint: {
        'line-color': '#a0cfdf',
        'line-width': {
          base: 1.4,
          stops: [
            [8, 0.5],
            [20, 15],
          ],
        },
      },
    },
    {
      id: 'water',
      type: 'fill',
      source: 'mapbox',
      'source-layer': 'water',
      paint: {
        'fill-color': '#a0cfdf',
      },
    },
    {
      id: 'building',
      type: 'fill-extrusion',
      source: 'mapbox',
      'source-layer': 'building',
      paint: {
        'fill-extrusion-color': '#d6d6d6',
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15,
          0,
          15.05,
          ['get', 'height'],
        ],
        'fill-extrusion-base': ['get', 'min_height'],
        'fill-extrusion-opacity': 0.8,
      },
    },
    {
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          [
            'in',
            'class',
            'motorway_link',
            'street',
            'street_limited',
            'service',
            'track',
            'pedestrian',
            'path',
            'link',
          ],
          ['==', 'structure', 'tunnel'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'tunnel_minor',
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
        'line-dasharray': [0.36, 0.18],
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['in', 'class', 'motorway', 'primary', 'secondary', 'tertiary', 'trunk'],
          ['==', 'structure', 'tunnel'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'tunnel_major',
      paint: {
        'line-color': '#fff',
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30],
          ],
        },
        'line-dasharray': [0.28, 0.14],
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          [
            'in',
            'class',
            'motorway_link',
            'street',
            'street_limited',
            'service',
            'track',
            'pedestrian',
            'path',
            'link',
          ],
          ['in', 'structure', 'none', 'ford'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'road_minor',
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['in', 'class', 'motorway', 'primary', 'secondary', 'tertiary', 'trunk'],
          ['in', 'structure', 'none', 'ford'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'road_major',
      paint: {
        'line-color': '#fff',
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30],
          ],
        },
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          [
            'in',
            'class',
            'motorway_link',
            'street',
            'street_limited',
            'service',
            'track',
            'pedestrian',
            'path',
            'link',
          ],
          ['==', 'structure', 'bridge'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'bridge_minor case',
      paint: {
        'line-color': '#dedede',
        'line-width': {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10],
          ],
        },
        'line-gap-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'butt',
        'line-join': 'miter',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['in', 'class', 'motorway', 'primary', 'secondary', 'tertiary', 'trunk'],
          ['==', 'structure', 'bridge'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'bridge_major case',
      paint: {
        'line-color': '#dedede',
        'line-width': {
          base: 1.6,
          stops: [
            [12, 0.5],
            [20, 10],
          ],
        },
        'line-gap-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          [
            'in',
            'class',
            'motorway_link',
            'street',
            'street_limited',
            'service',
            'track',
            'pedestrian',
            'path',
            'link',
          ],
          ['==', 'structure', 'bridge'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'bridge_minor',
      paint: {
        'line-color': '#efefef',
        'line-width': {
          base: 1.55,
          stops: [
            [4, 0.25],
            [20, 30],
          ],
        },
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        [
          'all',
          ['in', 'class', 'motorway', 'primary', 'secondary', 'tertiary', 'trunk'],
          ['==', 'structure', 'bridge'],
        ],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'bridge_major',
      paint: {
        'line-color': '#fff',
        'line-width': {
          base: 1.4,
          stops: [
            [6, 0.5],
            [20, 30],
          ],
        },
      },
      'source-layer': 'road',
    },
    {
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      filter: [
        'all',
        ['==', '$type', 'LineString'],
        ['all', ['<=', 'admin_level', 2], ['==', 'maritime', 0]],
      ],
      type: 'line',
      source: 'mapbox',
      id: 'admin_country',
      paint: {
        'line-color': '#8b8a8a',
        'line-width': {
          base: 1.3,
          stops: [
            [3, 0.5],
            [22, 15],
          ],
        },
      },
      'source-layer': 'admin',
    },
    {
      minzoom: 5,
      layout: {
        'icon-image': '{maki}-11',
        'text-offset': [0, 0.5],
        'text-field': '{name_en}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-max-width': 8,
        'text-anchor': 'top',
        'text-size': 11,
        'icon-size': 1,
      },
      filter: [
        'all',
        ['==', '$type', 'Point'],
        ['all', ['==', 'scalerank', 1], ['==', 'localrank', 1]],
      ],
      type: 'symbol',
      source: 'mapbox',
      id: 'poi_label',
      paint: {
        'text-color': '#666',
        'text-halo-width': 1,
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-blur': 1,
      },
      'source-layer': 'poi_label',
    },

    {
      minzoom: 8,
      layout: {
        'text-field': '{name_en}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-max-width': 6,
        'text-size': {
          stops: [
            [6, 12],
            [12, 16],
          ],
        },
      },
      filter: [
        'all',
        ['==', '$type', 'Point'],
        ['in', 'type', 'town', 'village', 'hamlet', 'suburb', 'neighbourhood', 'island'],
      ],
      type: 'symbol',
      source: 'mapbox',
      id: 'place_label_other',
      paint: {
        'text-color': '#666',
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-width': 1,
        'text-halo-blur': 1,
      },
      'source-layer': 'place_label',
    },
    {
      layout: {
        'text-field': '{name_en}',
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-max-width': 10,
        'text-size': {
          stops: [
            [3, 12],
            [8, 16],
          ],
        },
      },
      maxzoom: 16,
      filter: ['all', ['==', '$type', 'Point'], ['==', 'type', 'city']],
      type: 'symbol',
      source: 'mapbox',
      id: 'place_label_city',
      paint: {
        'text-color': '#666',
        'text-halo-color': 'rgba(255,255,255,0.75)',
        'text-halo-width': 1,
        'text-halo-blur': 1,
      },
      'source-layer': 'place_label',
    },
  ],
};

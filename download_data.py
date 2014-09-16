#!/usr/bin/python3

from subprocess import call

import simplejson


cities_json = open('data/cities.geojson', 'r').read()
cities = simplejson.loads(cities_json)
  
queries = [
    {'name': 'shop', 'query': 'shop=bicycle'},
    {'name': 'parking', 'query': 'amenity=bicycle_parking'},
    {'name': 'rental', 'query': 'amenity=bicycle_rental'}
]

for city in cities['features']:
    city_id = 3600000000 + city['properties'].get('id')
    city_name = city['properties'].get('name')
    city_code = city['properties'].get('code')
    for item in queries:
        url = 'http://overpass-api.de/api/interpreter?data=[out:json];' + \
            'node(area:%s)[%s];out;' % (city_id, item['query'])
        file_name = 'data/%s_%s.geojson' % (city_code, item['name'])
        call(['wget', '-O', file_name, url])

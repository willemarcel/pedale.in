import json
from subprocess import call


def get_data():
    """Read cities.geojson and get the data using Overpass API"""

    cities = json.load(open('cities.geojson'))
    queries = [
        {'name': 'shop', 'query': 'shop=bicycle'},
        {'name': 'parking', 'query': 'amenity=bicycle_parking'},
        {'name': 'rental', 'query': 'amenity=bicycle_rental'}
    ]

    for city in cities['features']:
        for query in queries:
            id = 3600000000 + city['properties']['id']
            q = 'node(area:%s)[%s]' % (id, query['query'])
            filename = '%s-%s.geojson' % (query['name'],
                city['properties']['code']
                )
            print('Querying for %s and saving the data in %s' % (q, filename))
            call(['overpass', '--timeout', '60', q, filename])


if __name__ == '__main__':
    get_data()

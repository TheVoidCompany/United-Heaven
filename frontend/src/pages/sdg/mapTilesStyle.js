export const countryLayer = {
    'id': 'country-layer',
    'type': 'fill',
    'source': 'country',
    // 'filter': ['==', 'continent', 'Africa'],
    'paint': {
        'fill-color': 'rgba(200, 100, 240, 1)',
        'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.4
        ]

    }
};

export const countryOutline = {
    'id': 'country-outline',
    'type': 'line',
    'source': 'country',
    // 'filter': ['==', 'continent', 'Africa'],
    'paint': {
        'line-color': 'rgba(200, 100, 240, 1)',
        'line-width': 2
    }
};

export const selectedCountryFill = (selectedCountry) => {
    return {
        'id': 'selected-country-outline',
        'type': 'fill',
        'source': 'country',
        'filter': ['==', 'name', selectedCountry.name || 'null'],
        'paint': {
            'fill-color': 'rgba(100, 100, 240, 1)',
        }
    }
};
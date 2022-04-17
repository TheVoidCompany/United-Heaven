export const countryLayer = (colorMode) => {
    return {
        'id': 'country-layer',
        'type': 'fill',
        'source': 'country',
        // 'filter': ['==', 'continent', 'Africa'],
        'paint': {
            'fill-color': colorMode === 'light' ? '#B7C2CD' : '#31465B',
            'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'hover'], false],
                1,
                0.4
            ]

        }
    }
};

export const countryOutline = (colorMode) => {
    return {
        'id': 'country-outline',
        'type': 'line',
        'source': 'country',
        // 'filter': ['==', 'continent', 'Africa'],
        'paint': {
            'line-color': colorMode === 'light' ? '#B7C2CD' : '#31465B',
            'line-width': 2
        }
    }
};

export const selectedCountryFill = (colorMode, selectedCountry) => {
    return {
        'id': 'selected-country-outline',
        'type': 'fill',
        'source': 'country',
        'filter': ['==', 'ADMIN', selectedCountry.ADMIN || 'null'],
        'paint': {
            'fill-color': colorMode === 'light' ? '#11465B' : '#93ADC6',
        }
    }
};
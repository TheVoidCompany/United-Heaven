const formatter = {
    onlyNumbers,
    onlyAlphabets,
    noFormat
};

function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}

function onlyNumbers(value) {
    return clearNumber(value)
}

function onlyAlphabets(value) {
    return value.replace(/[^a-zA-Z ]/g, '')
}

function noFormat(value) {
    return value
}

export default formatter;


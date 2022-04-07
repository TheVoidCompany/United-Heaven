export const findTypeColor = (typeName) => {

    const type = typeName.toLowerCase();
    if (type === "action") {
        return 'green.500'
    } else if (type === "news") {
        return 'yellow.500'
    } else if (type === "event") {
        return 'red.500'
    } else {
        return 'pink.500'
    }
}
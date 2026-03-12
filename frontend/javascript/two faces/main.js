const hanich = {
    id: 90,
    firstName: "john",
    lastName: "doe",
    age: 14
};

function doubleValue(obj) {
    let doubled = Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'number') {
                return [key, value * 2];
            }
            return [key, value]; 
        })
    );
    return doubled
}

function switchKeyValue(obj) {
    const switched = Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [value, key]));
    return switched;
}

function doubleValueImperative(obj) {
    for (key in obj) {
        if (typeof obj[key] === 'number') {
                obj[key]= obj[key] * 2;
            }
    }

    return obj;
}

function switchKeyValueImperative(obj) {
    for (key in obj) {
        const newValue = key;
        const newKey = obj[key]
        delete obj[key];
        obj[newKey] = newValue;
    }

    return obj;
}

console.log(switchKeyValue(hanich));

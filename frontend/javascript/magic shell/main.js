const data = [
    {
        name: 'Spongebob',
        age: 15,
        houseType: 'pineapple',
    },
    {
        name: 'Patrick',
        age: 42,
        houseType: 'dome',
    },
    {
        name: 'Sandy',
        age: 12,
        houseType: 'dome',
    },
    {
        name: 'Mr. Krabs',
        age: 1000,
        houseType: 'anchor',
    },
    {
        name: 'Squidward',
        age: 37,
        houseType: 'moai',
    }
]

function domeProfiles(data) {
    const domes = data.filter(dome => dome.houseType === 'dome')
    .map(prof => (prof.name + ' - ' + prof.age));
    return domes;
}

function sumDomeAges(data) {
    const sum = data.filter(dome => dome.houseType === 'dome')
    .reduce((sum, prof) => sum + prof.age, 0);
    return sum;
}

console.log(sumDomeAges(data));
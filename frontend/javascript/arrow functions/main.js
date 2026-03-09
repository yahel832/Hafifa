const fibonacciByIndex = (index) => {
    index--;
    if (index === 0) return 0;
    if (index === 1) return 1;

    let sequence = [0, 1];
    for (let i = 2; i <= index; i++) {
        sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence[index];
}

const runFibonacci = (num) => {
    if (!num) num = 10;

    setTimeout(recursiveTimeout, 100, 1, num);
}

const recursiveTimeout = (currIndex, limit) => {
    console.log(fibonacciByIndex(currIndex));
    currIndex++;

    if (currIndex <= limit) {
        setTimeout(recursiveTimeout, 100, currIndex, limit);
    } else {
        console.log(`Execution finished after ${limit} calls.`);
    }
}

// runFibonacci(9);

const evenArray = (arr) => {
    const evens = arr.map(filteredarr => filteredarr.filter(num => num % 2 === 0))
    .filter(array => array.length > 0);
    return evens
}

array = [
    [1, 2, 3],
    [4, 6, 9],
    [7, 89]
]

console.log(evenArray(array))
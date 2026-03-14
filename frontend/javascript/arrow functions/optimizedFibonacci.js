const fibonacciByIndex = (index, first, second) => {
    if (index == 0) {
        return [second, first];
    }
    
    return [second, first + second];
}

const runFibonacci = (num = 10) => {
    setTimeout(recursiveTimeout, 100, 0, num - 1, 0, 1);
}

const recursiveTimeout = (currIndex, limit, first, second) => {
    newSequence = fibonacciByIndex(currIndex, first, second);
    console.log(newSequence[1])
    currIndex++;

    if (currIndex <= limit) {
        setTimeout(recursiveTimeout, 100, currIndex, limit, newSequence[0], newSequence[1]);
    } else {
        console.log(`Execution finished after ${limit} calls.`);
    }
}

runFibonacci(10);

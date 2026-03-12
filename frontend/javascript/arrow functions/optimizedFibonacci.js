const fibonacciByIndex = (index, sequence) => {
    if (index >= 2) {
        sequence[index] = sequence[index - 1] + sequence[index - 2];
    }
    
    return sequence;
}

const runFibonacci = (num = 10) => {
    setTimeout(recursiveTimeout, 100, 0, num - 1, [0, 1]);
}

const recursiveTimeout = (currIndex, limit, sequence) => {
    newSequence = fibonacciByIndex(currIndex, sequence);
    console.log(newSequence[currIndex])
    currIndex++;

    if (currIndex <= limit) {
        setTimeout(recursiveTimeout, 100, currIndex, limit, newSequence);
    } else {
        console.log(`Execution finished after ${limit} calls.`);
    }
}

runFibonacci(10);
function serialize(nums: number[]): string {
    if (nums.length === 0) return '';

    const serialized = [];
    let count = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            count++;
        } else {
            serialized.push(nums[i - 1].toString());
            if (count > 1) {
                serialized.push(count.toString());
            }
            count = 1;
        }
    }

    serialized.push(nums[nums.length - 1].toString());
    if (count > 1) {
        serialized.push(count.toString());
    }

    return serialized.join('');
}

function deserialize(serialized: string): number[] {
    if (serialized.length === 0) return [];

    const nums = [];
    let i = 0;

    while (i < serialized.length) {
        let numStr = '';
        while (i < serialized.length && /[0-9]/.test(serialized[i])) {
            numStr += serialized[i];
            i++;
        }
        const num = parseInt(numStr);

        let count = 1;
        numStr = '';
        while (i < serialized.length && /[0-9]/.test(serialized[i])) {
            numStr += serialized[i];
            i++;
        }
        if (numStr) {
            count = parseInt(numStr);
        }

        for (let j = 0; j < count; j++) {
            nums.push(num);
        }
    }

    return nums;
}

function calculateCompressionRatio(original: string, compressed: string): number {
    return original.length / compressed.length;
}

function runTests() {
    const testCases: [number[], string, number][] = [
        // Примеры из задания
        [[1, 2, 2, 3, 3, 3, 4], "1223334", 0.5714285714285714],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "12345678910", 1],
        [[1, 1, 1, 1, 1], "15", 0.6],
        [[11, 22, 33, 44, 55], "1122334455", 1],
        [[1, 1, 1, 2, 2, 2, 3, 3, 3], "13122333", 0.4444444444444444],

        // Граничные случаи
        [[1], "1", 1],
        [[1, 300], "1300", 1],
        [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "1234567891011", 1],

        // Случайные числа
        [
            [192, 256, 128, 64, 32, 1, 255, 10, 42, 100],
            "1922561286432112551042100",
            0.36363636363636365,
        ],
    ];

    for (const [input, expectedSerialized, expectedCompressionRatio] of testCases) {
        const serialized = serialize(input);
        const compressionRatio = calculateCompressionRatio(JSON.stringify(input), serialized);
        const deserialized = deserialize(serialized);

        console.log("Input:", input);
        console.log("Expected Serialized:", expectedSerialized);
        console.log("Actual Serialized:", serialized);
        console.log("Expected Compression Ratio:", expectedCompressionRatio);
        console.log("Actual Compression Ratio:", compressionRatio);
        console.log("Deserialized:", deserialized);
        console.log("---");
    }
}

runTests();

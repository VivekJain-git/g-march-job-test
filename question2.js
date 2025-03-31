/**
 * Given an array of integers and a target number, this function returns the indices of the two numbers such that they add up to the target.
 */
function twoSum(nums, target) {
    // Edge case: check if the input is a valid array and the target is a number
    if (!Array.isArray(nums)) {
        throw new Error("The first argument must be an array.");
    }
    if (typeof target !== 'number') {
        throw new Error("The target must be a number.");
    }

    // Edge case: check if the array has at least two elements
    if (nums.length < 2) {
        throw new Error("Array must contain at least two numbers.");
    }

    // Create a Map to store the index of each number we've seen
    const numMap = new Map();

    // Iterate through the array
    for (let i = 0; i < nums.length; i++) {
        // Check if the current element is a valid number
        if (typeof nums[i] !== 'number') {
            throw new Error(`Element at index ${i} is not a valid number: ${nums[i]}`);
        }

        const complement = target - nums[i]; // Calculate the complement of the current number

        // If the complement is already in the Map, return the indices
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }

        // Otherwise, store the current number and its index in the Map
        numMap.set(nums[i], i);
    }

    // If no solution is found, throw an error
    throw new Error("No two sum solution exists.");
}

// Example usage:
try {
    const nums = [2, 7, 11, 15];
    const target = 9;
    console.log(twoSum(nums, target));  // Output: [0, 1]
} catch (error) {
    console.error(error.message);
}

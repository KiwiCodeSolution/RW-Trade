export const getRandomNews = (array) => {
  // Make a copy of the original array to avoid modifying it
  const copiedArray = [...array];
  const result = [];
  
  // Determine how many items to pick (either 10 or the array length if it's smaller)
  const count = Math.min(6, copiedArray.length);
  
  for (let i = 0; i < count; i++) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * copiedArray.length);
      // Remove the selected item from the copied array and add it to the result
      result.push(copiedArray.splice(randomIndex, 1)[0]);
  }
  
  return result;
}
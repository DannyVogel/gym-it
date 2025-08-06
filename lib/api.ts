export function async(param: string): Promise<string> {
  // Your async logic here
  return new Promise((resolve, reject) => {
    // Simulate an async operation
    setTimeout(() => {
      resolve("Async operation completed");
    }, 2000);
  });
}

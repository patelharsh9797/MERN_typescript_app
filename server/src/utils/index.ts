export const createResJson = (success: boolean, data: unknown) => ({
  success,
  ...(success ? { data } : { error: data }),
});

// // Using bracket notation (slightly less readable)
// export const createResJson = (success: boolean, data: any) => ({
//   success,
//   [success ? "data" : "error"]: data,
// });

// // Using logical AND operator
// export const createResJson = (success: boolean, data: any) =>
//   ({
//     success,
//     data: success && data,
//     error: !success && data,
//   }.filter(Boolean)); // Note: This would need additional filtering

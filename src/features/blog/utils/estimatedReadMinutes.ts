export const estimatedReadMinutes = (description: string) => {
  return Math.max(1, Math.ceil(description.trim().split(/\s+/).length / 200));
};

export function getPercentage(total: number, success: number): number {
  const successPercentage = (success / total) * 100;

  return successPercentage;
}

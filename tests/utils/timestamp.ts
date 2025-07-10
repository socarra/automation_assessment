export function getMinuteSecondTimestamp() {
  const now = new Date();
  return `${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
}
const pad = (n: number) => String(n).padStart(2, '0');

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// "14:05" for today, "10/27 14:05" otherwise
export const formatMessageTime = (iso: string): string => {
  const date = new Date(iso);
  const time = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return isSameDay(date, new Date()) ? time : `${date.getMonth() + 1}/${date.getDate()} ${time}`;
};

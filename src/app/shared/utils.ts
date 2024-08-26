export function generateId(): string {
  return new Date().toISOString();
}

export function convert24HourTo12Hour(hours24: number): { hours: number; period: "AM" | "PM" } {
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 > 12 ? hours24 - 12 : hours24 === 0 ? 12 : hours24;

  return { hours, period };
}

export function convert12HourTo24Hour(hours12: number, period: "AM" | "PM"): number {
  if (period === "PM" && hours12 !== 12) {
    return hours12 + 12;
  } else if (period === "AM" && hours12 === 12) {
    return 0;
  } else {
    return hours12;
  }
}

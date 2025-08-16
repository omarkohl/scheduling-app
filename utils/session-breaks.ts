import type { Session } from "@/db/sessions";

/**
 * Calculate adjusted duration by subtracting break time
 * Rule: ≤60 minutes subtract 5 minutes, >60 minutes subtract 10 minutes
 */
export function getAdjustedDuration(originalMinutes: number): number {
  return originalMinutes <= 60 ? originalMinutes - 5 : originalMinutes - 10;
}

/**
 * Format duration minutes into a short string (e.g., "25m", "1h 20m")
 */
export function formatDurationShort(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

/**
 * Format duration minutes into a long string (e.g., "25 minutes", "1 hour 20 minutes")
 */
export function formatDurationLong(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minutes`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const hoursStr = hours === 1 ? "hour" : "hours";

  if (remainingMinutes === 0) {
    return `${hours} ${hoursStr}`;
  } else {
    return `${hours} ${hoursStr} ${remainingMinutes} minutes`;
  }
}

/**
 * Calculate the adjusted end time for a session, accounting for enforced breaks.
 * Rule: ≤60 minutes subtract 5 minutes, >60 minutes subtract 10 minutes
 *
 * Note: This is only used for DISPLAY purposes on existing sessions.
 */
export function getAdjustedSessionTimes(session: Session): {
  startTime: Date;
  endTime: Date;
  adjustedEndTime: Date;
  adjustedDurationMinutes: number;
  breakMinutes: number;
} {
  const startTime = new Date(session["Start time"]);
  const endTime = new Date(session["End time"]);
  const originalDurationMs = endTime.getTime() - startTime.getTime();
  const originalDurationMinutes = originalDurationMs / (1000 * 60);

  const breakMinutes = originalDurationMinutes <= 60 ? 5 : 10;
  const adjustedEndTime = new Date(
    endTime.getTime() - breakMinutes * 60 * 1000
  );
  const adjustedDurationMinutes = getAdjustedDuration(originalDurationMinutes);

  return {
    startTime,
    endTime,
    adjustedEndTime,
    adjustedDurationMinutes,
    breakMinutes,
  };
}

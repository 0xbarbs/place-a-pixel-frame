import { PAINT_THROTTLE } from "@/constants";

export const getUnixTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

export const getSecondsSince = (timestamp: number) => {
  return getUnixTimestamp() - timestamp;
};

export const getCoolDownPeriod = (timestamp: number) => {
  return PAINT_THROTTLE - getSecondsSince(timestamp);
}

export const isThrottled = (timestamp: number) => {
  return getSecondsSince(timestamp) < PAINT_THROTTLE;
}
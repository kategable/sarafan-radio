export interface Day {
  name: string;
  completed: boolean;
  color: string;
  startTime: string;
  endTime: string;
}
export interface Week {
  days: Day[];
}

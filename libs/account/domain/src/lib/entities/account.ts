export interface Account {
    id: number;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    description: string;
    schedule:any
}
export interface Schedule{
  weekDays: string[];
  startTime: string;
  endTime: string;
}

export type Category = "Fruit" | "Vegetable";

export type Status = "main" | "active";

export interface Todo {
  id: number;
  name: string;
  type: Category;
  status: Status;
}

export type Mode = "select" | "drag";

export type TimerState = {
  timeoutId?: NodeJS.Timeout;
  startTime?: number;
  remaining: number;
  paused: boolean;
};

export type Category = "Fruit" | "Vegetable";

export type Status = "main" | "active";

export interface Todo {
  id: number;
  name: string;
  type: Category;
  status: Status;
}

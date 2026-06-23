export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  age: number;

  company?: {
    department?: string;
  };

  hair?: {
    color?: string;
  };

  address?: {
    postalCode?: string;
  };
}

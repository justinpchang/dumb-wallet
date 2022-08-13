interface Category {
  id: number;
  title: string;
}

interface Transaction {
  // belongs to User
  // has one Category
  id: number;
  amount: number;
  description: string;
  notes: string;
  date: Date;
  type: "INCOME" | "EXPENSE";
  user_id: number;
  category_id: string;
}

interface User {
  // has many Transactions
  id: number;
  first_name: string;
  last_name: string;
}

export {};

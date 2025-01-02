export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  quantitySold: number;
  colors: string[];
  sizes: ['S', 'M', 'L', 'XL'];
  type: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  photo? : string
};

export type Message = {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
};

export type Order = {
  id: string;
  userId: string;
  products: Product[];
  total: number;
  status: 'pending' | 'completed';
  timestamp: string;
};

export type Notification = {
  id: string;
  userId: string;
  message: string;
  timestamp: string;
};
export type ProductKind = "tea" | "accessory";
export type TeaType = "black" | "green" | "white" | "oolong" | "puer" | "herbal";
export type OrderStatus = "new" | "confirmed" | "ready" | "completed" | "cancelled";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  kind: ProductKind;
  teaType: TeaType | null;
  country: string;
  weightGrams: number | null;
  unit: string;
  price: number;
  visual: "leaf" | "tin" | "pot" | "cup";
  accent: string;
  imageAlt: string;
  isActive: boolean;
  isFeatured: boolean;
  isDemo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  kind: "retail" | "warehouse";
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  workingHours: string;
  isPickupAvailable: boolean;
  isActive: boolean;
  isDemo: boolean;
}

export interface Inventory {
  productId: string;
  storeId: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  unit: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  number: number;
  status: OrderStatus;
  fulfillment: "pickup" | "delivery";
  storeId: string | null;
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  comment: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  consentAt: string;
  consentVersion: string;
  createdAt: string;
  updatedAt: string;
}

export interface Database {
  products: Product[];
  stores: Store[];
  inventory: Inventory[];
  orders: Order[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

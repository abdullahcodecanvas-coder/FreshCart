export interface OrderProduct {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  category?: { name: string };
  brand?: { name: string };
}

export interface OrderItem {
  _id: string;
  count: number;
  price: number;
  product: OrderProduct;
}

export interface Orders {
  _id: string;
  id: number;
  cartItems: OrderItem[];
  shippingAddress: { details: string; phone: string; city: string };
  paymentMethodType: string;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
}
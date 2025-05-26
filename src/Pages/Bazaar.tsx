type SummaryEntry = {
  amount: number;
  pricePerUnit: number;
  orders: number;
}

type QuickStatus = {
  productId: string;
  sellPrice: number;
  sellVolume: number;
  sellMovingWeek: number;
  sellOrders: number;
  buyPrice: number;
  buyVolume: number;
  buyMovingWeek: number;
  buyOrders: number;
}

type Product = {
  product_id: string;
  sell_summary: SummaryEntry[];
  buy_summary: SummaryEntry[];
  quick_status: QuickStatus;
}

export type BazarResponse = {
  success: boolean;
  lastUpdated: number;
  products: {
    [productId: string]: Product;
  };
}
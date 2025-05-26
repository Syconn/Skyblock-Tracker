import { product, type Item } from "../util/Components";

type SummaryEntry = {
    amount: number;
    pricePerUnit: number;
    orders: number;
}

type Product = {
    product_id: string;
    sell_summary: SummaryEntry[];
    buy_summary: SummaryEntry[];
    quick_status: QuickStatus;
}

export type QuickStatus = {
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

export type BazarResponse = {
    success: boolean;
    lastUpdated: number;
    products: {
        [productId: string]: Product;
    };
}

export function generateBazarFlips(bazaar: BazarResponse, budget: number, minOrders: number, minVolume: number, minWeekly: number, mapper: (val: string) => string): Item[] {
    return Object.entries(bazaar.products).map<Item>(v => product(mapper(v[0]), v[1].quick_status.sellPrice, v[1].quick_status.buyPrice, v[1].quick_status, Math.floor(budget / v[1].quick_status.sellPrice)))
        .filter(v => v.expense <= budget).filter(v => v.data.buyOrders >= minOrders && v.data.sellOrders >= minOrders).filter(v => v.data.buyMovingWeek >= minWeekly && v.data.sellMovingWeek >= minWeekly)
        .filter(v => v.data.buyVolume >= minVolume && v.data.sellVolume >= minVolume);
}
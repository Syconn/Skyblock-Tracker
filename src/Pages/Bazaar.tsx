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

export type NEUResponse = {
    items: {
        [productId: string]: NEUItem
    }
}

export type NEUItem = {
    recipe: {
        A1: string;
        A2: string;
        A3: string;
        B1: string;
        B2: string;
        B3: string;
        C1: string;
        C2: string;
        C3: string;
    };
    crafttext: string;
    internalname: string;
}

export function instaSellPrice(product: Product): number {
    return product.sell_summary[0]?.pricePerUnit;
}

export function instaBuyPrice(product: Product): number {
    return product.buy_summary[0]?.pricePerUnit
}

export function generateBazaarFlips(bazaar: BazarResponse, budget: number, minOrders: number, minVolume: number, minWeekly: number, maxBuy: number, mapper: (val: string) => string): Item[] {
    return Object.entries(bazaar.products).map<Item>(v => product(mapper(v[0]), instaSellPrice(v[1]), instaBuyPrice(v[1]), v[1].quick_status, Math.floor(budget / v[1].quick_status.sellPrice), maxBuy))
        .filter(v => v.expense <= budget).filter(v => v.data.buyOrders >= minOrders && v.data.sellOrders >= minOrders).filter(v => v.data.buyMovingWeek >= minWeekly && v.data.sellMovingWeek >= minWeekly)
        .filter(v => v.data.buyVolume >= minVolume && v.data.sellVolume >= minVolume);
}

export function generateBazaarCrafts(bazaar: BazarResponse): string[] {
    return Object.entries(bazaar.products).map(v => v[0]);
}
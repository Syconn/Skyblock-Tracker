import type { QuickStatus } from "../Pages/Bazaar";
import { capitalize, money } from "./Utils";

export type Item = {
    name: string;
    count: number;
    expense: number;
    revenue: number;
    profit: number;
    data: QuickStatus;
}

export function product(name: string, expense: number, revenue: number, data: QuickStatus, count: number): Item {
    return {"name": name, "expense": expense, "revenue": revenue, "profit": money(revenue - expense) * count, "data": data, "count": count};
}

export function ItemList({items, type, number}: {items: Item[], type: string, number: number}) {
    const list = items.sort((a, b) => b.profit - a.profit).slice(0, Math.min(number + 1, items.length));
    return (
        <>
        <label>{"Best " + number + " " + type + " Flips"}</label>
        <ol>
            {list.map((v, i) => v != undefined && v.name != undefined &&
                <li key={i}> {(v.count != 1 ? (v.count + "x ") : "") + capitalize(v.name.replace(/_/g, " ").toLowerCase()) + " $" + v.profit.toLocaleString() 
                    + " Buy: $" + v.expense.toLocaleString() + " Sell: $" + v.revenue.toLocaleString()}</li>
            )}
        </ol>
        </>
    );
}
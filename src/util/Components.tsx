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

export function product(name: string, expense: number, revenue: number, data: QuickStatus, count: number, max: number): Item {
    return {"name": name, "expense": expense, "revenue": revenue, "profit": money(revenue - expense) * Math.min(count, max), "data": data, "count": Math.min(count, max)};
}

export function BudgetInput({budget, setBudget}: {budget: number, setBudget: (b: number) => void}) {
    return (
        <div>
        <input type="text" value={budget} onChange={v => setBudget(parseInt(v.target.value))}/>
        <label> {"$" + budget.toLocaleString()}</label>
        </div>
    );
};

export function ItemList({items, type, number}: {items: Item[], type: string, number: number}) {
    const list = items.sort((a, b) => b.profit - a.profit).slice(0, Math.min(number + 2, items.length));
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

export function ItemDisplay({item}: {item: Item}) {
    return (
        <>
        <dt key={item.data.productId}>{item.name}</dt>
        </>
    )
}
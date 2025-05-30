import { useEffect, useState } from "react";

export function useDynamicState<T>(val: T[] | (() => T[])): [T[], (i: T | T[]) => void]{
    const [inputs, setInputs] = useState(val);
    
    const addInput = (input: T | T[]) => {
        const itemsToAdd = Array.isArray(input) ? input : [input];
        setInputs((prev) => [...prev, ...itemsToAdd]);
    };

    return [inputs, addInput];
}

export function loadJSON<R>(url: string): [data: R | null, error: string] {
    const [data, setData] = useState<R | null>(null);
	const [error, setError] = useState<string>("");
    
    useEffect(() => {
		const fetchData = () => fetch(url).then((res) => {
			if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
			return res.json();
		}).then((json: R) => setData(json)).catch((err) => setError(err.message));

		fetchData();
		const interval = setInterval(fetchData, 30000);
    	return () => clearInterval(interval);
  	}, []);

    return [data, error];
}

function transformHypixelToNEU(hypixelId: string): string {
    const match = hypixelId.match(/^ENCHANTMENT_(\D*)_(\d+)$/);
  
    if (match) {
        const [, enchantment, level] = match;
        return `${enchantment};${level}`;
    }

    return hypixelId.replace(":", "-");
}

export function money(v: number | string): number {
    return Number(Number(v).toFixed(0));
}

export function capitalize(s: string): string {
    let r: string = "";
    for (let i = 0; i < s.length; i++) {
        if (i == 0) r += s[0].toLocaleUpperCase();
        else {
            if (s[i - 1] == " ") r += s[i].toLocaleUpperCase();
            else r += s[i].toLocaleLowerCase();
        }
    }
    return r;
}
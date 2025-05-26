interface Skin {
	value: string;
	signature: string;
}

interface Item {
	material: string;
	durability: number;
	skin: Skin;
	name: string;
	category: string;
	tier: string;
	npc_sell_price: number;
	id: string;
}

export type ItemsResponse = {
	success: boolean;
	lastUpdated: number;
	items: Item[];
}

export function nameRecord(response: ItemsResponse | null, flip: boolean): Record<string, string> {
    const items: { [id: string]: string } = {};
    if (response?.items && flip) response?.items.forEach(item => items[item.id] = item.name.toLowerCase());
	if (response?.items && !flip) response?.items.forEach(item => items[item.name.toLowerCase()] = item.id);
    return items;
}
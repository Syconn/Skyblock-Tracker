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

export function nameMapper(response: ItemsResponse): (val: string) => string {
	const nameToId = response.items.reduce((acc, item) => {
		acc[item.name.toLowerCase()] = item.id;
		return acc;
	}, {} as Record<string, string>);
	const idToName = response.items.reduce((acc, item) => {
		acc[item.id] = item.name.toLowerCase();
		return acc;
	}, {} as Record<string, string>);

    return (val: string) => {
		if (nameToId[val.toLowerCase()] != undefined) return nameToId[val];
		else if (idToName[val] != undefined) return idToName[val];
		return val;
	};
}
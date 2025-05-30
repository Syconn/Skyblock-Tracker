import { useState } from 'react';
import './App.css'
import { generateBazaarCrafts, generateBazaarFlips, type BazarResponse, type NEUItem, type NEUResponse } from './Pages/Bazaar';
import { nameMapper, type ItemsResponse } from './Pages/Items';
import { BudgetInput, ItemList } from './util/Components';
import { loadJSON } from './util/Utils';

function App() {
	const [bazaar, error1] = loadJSON<BazarResponse>("https://api.hypixel.net/v2/skyblock/bazaar");
	const [items, error2] = loadJSON<ItemsResponse>("https://api.hypixel.net/v2/resources/skyblock/items");
	const [crafts, error3] = loadJSON<NEUResponse>("crafts.json");

	const [budget, setBudget] = useState(1000);
	const [useBazaar, setBazaar] = useState(true);
	const [advanced, setAdvanced] = useState(false);
	const [minOrders, setMinOrders] = useState(100);
	const [minVolume, setMinVolume] = useState(10000);
	const [minWeekly, setMinWeekly] = useState(70000);
	const [maxBuy, setMaxBuy] = useState(10000);
	
	if (items == null || bazaar == null || crafts == null) return <div>Loading...</div>;
	if (error1 || error1 || error2) return <div>Error: {error1.length ? error1 : error2.length ? error2 : error3}</div>;


	// TODO
	// - Percentage of Sales / Purchases
	// - Bazaar/AH crafts

	const mapper = nameMapper(items);

	return (
		<>
		<BudgetInput budget={budget} setBudget={setBudget}/>
		<label> Bazaar</label>
		<input type='checkbox' checked={useBazaar} onChange={e => setBazaar(e.target.checked)}/>
		<label> Advanced</label>
		<input type='checkbox' checked={advanced} onChange={e => setAdvanced(e.target.checked)}/>
		<hr/>
		<div>
			{advanced && (
				<>
				<label>Min Orders: </label>
				<input type='number' value={minOrders} onChange={v => setMinOrders(parseInt(v.target.value))}/>
				<label> Min Volume: </label>
				<input type='number' value={minVolume} onChange={v => setMinVolume(parseInt(v.target.value))}/>
				<label> Min Weekly: </label>
				<input type='number' value={minWeekly} onChange={v => setMinWeekly(parseInt(v.target.value))}/>
				<label> Max Buy: </label>
				<input type='number' value={maxBuy} onChange={v => setMaxBuy(parseInt(v.target.value))}/>
				<hr/>
				</>
			)}
		</div>
		<div>
			{useBazaar && <ItemList items={generateBazaarFlips(bazaar, budget, minOrders, minVolume, minWeekly, maxBuy, mapper)} type={'Bazaar'} number={10}/>}
		</div>
		{crafts === null && <label>Loading Crafts</label>}
		</>
	);
}

export default App

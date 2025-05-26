import { useState } from 'react';
import './App.css'
import { generateBazarFlips, type BazarResponse } from './Pages/Bazaar';
import { nameMapper, type ItemsResponse } from './Pages/Items';
import { loadJSON } from './util/Utils';
import { ItemList } from './util/Components';

function App() {
	const [bazaar, error1] = loadJSON<BazarResponse>("https://api.hypixel.net/v2/skyblock/bazaar");
	const [items, error2] = loadJSON<ItemsResponse>("https://api.hypixel.net/v2/resources/skyblock/items");
	const [budget, setBudget] = useState(1000);
	const [useBazaar, setBazaar] = useState(true);
	const [advanced, setAdvanced] = useState(false);
	const [minOrders, setMinOrders] = useState(100);
	const [minVolume, setMinVolume] = useState(10000);
	const [minWeekly, setMinWeekly] = useState(70000);
	
	if (items == null || bazaar == null) return <div>Loading...</div>;
	if (error1 || error1) return <div>Error: {error1.length ? error1 : error2}</div>;

	const mapper = nameMapper(items);

	console.log(bazaar.products["DIAMOND"].quick_status)

	return (
		<>
		<label>Budget: </label>
		<input type='number' value={budget} onChange={v => setBudget(parseInt(v.target.value))}/>
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
				<hr/>
				</>
			)}
		</div>
		<div>
			<ItemList items={generateBazarFlips(bazaar, budget, minOrders, minVolume, minWeekly, mapper)} type={'Bazaar'} number={10} />
		</div>
		</>
	);
}

export default App
import './App.css'
import type { BazarResponse } from './Pages/Bazaar';
import { nameRecord, type ItemsResponse } from './Pages/Items';
import { loadJSON, money } from './util/Utils';

function App() {
	const [bazaar, error1] = loadJSON<BazarResponse>("https://api.hypixel.net/v2/skyblock/bazaar");
	const [items, error2] = loadJSON<ItemsResponse>("https://api.hypixel.net/v2/resources/skyblock/items");
	
	if (items == null || bazaar == null) return <div>Loading...</div>;
	if (error1 || error1) return <div>Error: {error1.length ? error1 : error2}</div>;

	const idFromNames = nameRecord(items);

	return (
		<>
		<label></label>
		<input type='number'/>
		<div>
			<p>Buy Price: {money(bazaar.products[idFromNames["redstone"]].quick_status.sellPrice)}</p>
			<p>Sell Price: {money(bazaar.products[idFromNames["redstone"]].quick_status.buyPrice)}</p>
		</div>
		</>
	);
}

export default App
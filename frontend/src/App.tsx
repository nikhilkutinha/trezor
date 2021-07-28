import "./App.css";

import PasteCreate from "./pages/Paste/Create";
import PasteShow from "./pages/Paste/Show";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/:id" component={PasteShow} />
					<Route path="/" component={PasteCreate} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;

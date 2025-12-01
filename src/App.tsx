import type { Component } from "solid-js";

import { Route } from "@solidjs/router";
import MainMenu from "./pages/MainMenu";
import Game from "./pages/Game";

const App: Component = () => {
	return (
		<>
			<Route path="/" component={MainMenu} />
			<Route path="/game" component={Game} />
		</>
	);
};

export default App;

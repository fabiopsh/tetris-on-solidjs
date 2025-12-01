/**
 * Componente ControlsLegend
 *
 * Visualizza una legenda dei controlli di gioco (tastiera) per l'utente.
 * Mostra quali tasti premere per muovere, ruotare e far cadere i pezzi.
 */
import { Component } from "solid-js";

const ControlsLegend: Component = () => {
	return (
		<div class="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg text-gray-300">
			<h3 class="text-xl font-bold mb-4 text-purple-400 border-b border-gray-700 pb-2">Controls</h3>
			<ul class="space-y-3">
				<li class="flex items-center justify-between">
					<span>Move Left</span>
					<kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono border border-gray-600">←</kbd>
				</li>
				<li class="flex items-center justify-between">
					<span>Move Right</span>
					<kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono border border-gray-600">→</kbd>
				</li>
				<li class="flex items-center justify-between">
					<span>Rotate</span>
					<kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono border border-gray-600">↑</kbd>
				</li>
				<li class="flex items-center justify-between">
					<span>Soft Drop</span>
					<kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono border border-gray-600">↓</kbd>
				</li>
				<li class="flex items-center justify-between gap-2">
					<span>Hard Drop</span>
					<kbd class="px-2 py-1 bg-gray-700 rounded text-sm font-mono border border-gray-600">Space</kbd>
				</li>
			</ul>
		</div>
	);
};

export default ControlsLegend;

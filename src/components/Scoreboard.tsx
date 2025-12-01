/**
 * Componente Scoreboard
 *
 * Visualizza la classifica dei migliori 10 punteggi.
 * È responsive e gestisce lo scrolling se la lista è lunga.
 *
 * Props:
 * - scores: Array degli oggetti punteggio (nome, punteggio, data).
 * - currentScore: (Opzionale) Il punteggio della partita corrente per evidenziarlo.
 */
import { Component, For } from "solid-js";
import { ScoreEntry } from "../utils/scoreStorage";

interface ScoreboardProps {
	scores: ScoreEntry[];
	currentScore?: number; // Optional: highlight current run if needed
}

const Scoreboard: Component<ScoreboardProps> = (props) => {
	return (
		<div class="bg-gray-800 p-6 rounded-lg border border-gray-700 shadow-lg w-full max-w-md">
			<h3 class="text-2xl font-bold mb-4 text-purple-400 text-center uppercase tracking-wider">High Scores</h3>

			<div class="overflow-hidden rounded-md border border-gray-700 bg-gray-900/50">
				<div class="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
					<table class="w-full text-left text-sm">
						<thead class="bg-gray-700 text-gray-300 sticky top-0 z-10">
							<tr>
								<th class="px-4 py-3 font-medium">Rank</th>
								<th class="px-4 py-3 font-medium">Player</th>
								<th class="px-4 py-3 font-medium text-right">Score</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-700/50">
							<For
								each={props.scores}
								fallback={
									<tr>
										<td colspan="3" class="px-4 py-8 text-center text-gray-500 italic">
											No scores yet. Be the first!
										</td>
									</tr>
								}
							>
								{(entry, index) => (
									<tr
										class={`transition-colors ${
											entry.score === props.currentScore
												? "bg-purple-900/30 animate-pulse"
												: "hover:bg-gray-700/30"
										}`}
									>
										<td class="px-4 py-2 text-gray-500 font-mono">#{index() + 1}</td>
										<td class="px-4 py-2 font-medium text-white">{entry.name}</td>
										<td class="px-4 py-2 text-right text-purple-300 font-bold">{entry.score}</td>
									</tr>
								)}
							</For>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Scoreboard;

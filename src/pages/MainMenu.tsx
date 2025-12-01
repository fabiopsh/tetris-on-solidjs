/**
 * Pagina MainMenu
 *
 * La schermata iniziale dell'applicazione.
 * Permette all'utente di:
 * - Inserire il proprio nome.
 * - Visualizzare la classifica dei punteggi migliori.
 * - Avviare una nuova partita.
 */
import { Component, createSignal, onMount } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import Scoreboard from "../components/Scoreboard";
import { getScores, ScoreEntry } from "../utils/scoreStorage";

const MainMenu: Component = () => {
	const [playerName, setPlayerName] = createSignal("Player 1");
	const [scores, setScores] = createSignal<ScoreEntry[]>([]);
	const navigate = useNavigate();

	onMount(() => {
		setScores(getScores());
	});

	const handleStart = () => {
		navigate(`/game?player=${encodeURIComponent(playerName())}`);
	};

	return (
		<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 gap-12">
			<div class="text-center">
				<h1 class="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
					TETRIS
				</h1>
				<p class="text-gray-400 text-lg">Advanced Programming Edition</p>
			</div>

			<div class="flex flex-col gap-6 w-full max-w-xs">
				<div class="flex flex-col gap-2">
					<label class="text-sm text-gray-400 font-bold uppercase tracking-wider">Player Name</label>
					<input
						type="text"
						value={playerName()}
						onInput={(e) => setPlayerName(e.currentTarget.value)}
						class="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors text-center font-bold text-lg"
						placeholder="Enter Name"
						maxLength={12}
					/>
				</div>

				<button
					onClick={handleStart}
					class="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold text-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
				>
					Start Game
				</button>
			</div>

			<Scoreboard scores={scores()} />
		</div>
	);
};

export default MainMenu;

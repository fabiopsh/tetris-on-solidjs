/**
 * Pagina Game
 *
 * Questa è la pagina principale di gioco. Integra tutti i componenti del gioco:
 * - Board: la griglia di gioco.
 * - NextPieces: l'anteprima dei prossimi pezzi.
 * - Scoreboard: la classifica (mostrata al Game Over).
 * - ControlsLegend: la legenda dei comandi.
 *
 * Gestisce anche l'input da tastiera e il loop di gioco tramite l'hook useTetris.
 */
import { Component, createSignal, onCleanup, onMount, createEffect } from "solid-js";
import { A, useSearchParams } from "@solidjs/router";
import Board from "../components/Board";
import ControlsLegend from "../components/ControlsLegend";
import { useTetris } from "../game/useTetris";
import NextPieces from "../components/NextPieces";
import { getScores, saveScore, ScoreEntry } from "../utils/scoreStorage";
import Scoreboard from "../components/Scoreboard";

const Game: Component = () => {
	const [searchParams] = useSearchParams();
	const playerName = () => {
		const p = searchParams.player;
		return Array.isArray(p) ? p[0] : p || "Player 1";
	};
	const [highScores, setHighScores] = createSignal<ScoreEntry[]>([]);
	const [scoreSaved, setScoreSaved] = createSignal(false);

	const {
		board,
		currentPiece,
		piecePosition,
		pieceRotation,
		moveLeft,
		moveRight,
		moveDown,
		rotate,
		hardDrop,
		gameOver,
		score,
		nextPieces,
	} = useTetris();

	// Save score when game over triggers
	// We use an effect to watch gameOver state
	// But since we are in a component, we can just check it in the render or use an effect
	// Let's use an effect to save once.

	// Actually, better to just save it when the game over UI is rendered or when state changes.
	// Let's use a derived computation or effect.

	// Simple effect to save score
	let hasSaved = false;

	// We need to reset hasSaved if the game restarts, but here we reload the page to restart.

	const handleGameOver = () => {
		if (!scoreSaved()) {
			const newScores = saveScore(playerName(), score());
			setHighScores(newScores);
			setScoreSaved(true);
		}
	};

	// Watch for game over
	// Since `gameOver` is a signal, we can just check it.
	// However, useTetris doesn't expose a "onGameOver" callback.
	// We can use createEffect.

	// NOTE: createEffect runs immediately. We need to check if gameOver is true.

	// Let's just do it in the render logic for simplicity, or add an effect.
	// Adding an effect here:

	createEffect(() => {
		if (gameOver() && !scoreSaved()) {
			handleGameOver();
		}
	});

	const handleKeyDown = (e: KeyboardEvent) => {
		if (gameOver()) return;

		switch (e.key) {
			case "ArrowLeft":
				moveLeft();
				break;
			case "ArrowRight":
				moveRight();
				break;
			case "ArrowDown":
				moveDown();
				break;
			case "ArrowUp":
				rotate();
				break;
			case " ":
				hardDrop();
				break;
		}
	};

	onMount(() => {
		window.addEventListener("keydown", handleKeyDown);
	});

	onCleanup(() => {
		window.removeEventListener("keydown", handleKeyDown);
	});

	return (
		<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
			<div class="absolute top-4 left-4 flex items-center gap-4">
				<A href="/" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition-colors">
					&larr; Back to Menu
				</A>
				<div class="text-gray-400 font-bold">
					Playing as: <span class="text-purple-400">{playerName()}</span>
				</div>
			</div>

			<div class="flex gap-12 items-start">
				<div class="flex flex-col gap-4">
					<div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg text-center min-w-[150px]">
						<h3 class="text-gray-400 text-sm uppercase tracking-wider mb-1">Score</h3>
						<p class="text-3xl font-bold text-purple-400">{score()}</p>
					</div>

					<ControlsLegend />
				</div>

				<div class="relative">
					<Board
						board={board()}
						currentPieceShape={pieceRotation()}
						currentPieceType={currentPiece()}
						piecePosition={piecePosition()}
					/>

					{gameOver() && (
						<div class="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 p-4 animate-in fade-in duration-300">
							<div class="flex flex-col items-center max-w-2xl w-full bg-gray-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl">
								<h2 class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4 animate-bounce drop-shadow-lg">
									GAME OVER
								</h2>
								<p class="text-2xl mb-8 text-gray-300 font-light">
									Final Score:{" "}
									<span class="text-white font-bold text-4xl ml-2 text-purple-400 drop-shadow-md">
										{score()}
									</span>
								</p>

								<div class="mb-8 w-full max-w-md">
									<Scoreboard scores={highScores()} currentScore={score()} />
								</div>

								<div class="flex gap-4">
									<A
										href="/"
										class="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold transition-all hover:scale-105 shadow-lg border border-gray-600"
									>
										Main Menu
									</A>
									<button
										onClick={() => window.location.reload()}
										class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
									>
										Play Again
									</button>
								</div>
							</div>
						</div>
					)}
				</div>

				<div class="flex flex-col gap-4">
					<NextPieces nextPieces={nextPieces()} />
				</div>
			</div>
		</div>
	);
};

export default Game;

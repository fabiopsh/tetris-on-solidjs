/**
 * Componente NextPieces
 *
 * Visualizza la coda dei prossimi pezzi che cadranno.
 * Mostra il prossimo pezzo in grande e i successivi 4 in piccolo.
 *
 * Props:
 * - nextPieces: Array dei tipi di tetramino in coda.
 */
import { Component, For } from "solid-js";
import { TetrominoType } from "../game/types";
import TetrominoPreview from "./TetrominoPreview";

interface NextPiecesProps {
	nextPieces: TetrominoType[];
}

const NextPieces: Component<NextPiecesProps> = (props) => {
	return (
		<div class="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg flex flex-col items-center">
			<h3 class="text-xl font-bold mb-4 text-purple-400 border-b border-gray-700 pb-2 w-full text-center">Next</h3>

			<div class="mb-4">
				<TetrominoPreview type={props.nextPieces[0]} />
			</div>

			<div class="flex flex-col gap-2">
				<For each={props.nextPieces.slice(1, 5)}>{(type) => <TetrominoPreview type={type} small />}</For>
			</div>
		</div>
	);
};

export default NextPieces;

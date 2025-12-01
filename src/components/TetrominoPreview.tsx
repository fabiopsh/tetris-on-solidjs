/**
 * Componente TetrominoPreview
 *
 * Visualizza l'anteprima di un singolo tetramino.
 * Usato nel componente NextPieces per mostrare i pezzi in coda.
 * Supporta una modalità "small" per le anteprime secondarie.
 *
 * Props:
 * - type: Il tipo di tetramino da visualizzare.
 * - small: (Opzionale) Se true, renderizza una versione ridotta.
 */
import { Component, For } from "solid-js";
import { TETROMINOES } from "../game/constants";
import { TetrominoType } from "../game/types";
import Cell from "./Cell";

interface TetrominoPreviewProps {
	type: TetrominoType;
	small?: boolean;
}

const TetrominoPreview: Component<TetrominoPreviewProps> = (props) => {
	const tetromino = () => TETROMINOES[props.type];

	return (
		<div
			class={`flex flex-col gap-0.5 bg-gray-800 rounded-lg shadow-lg border border-gray-700 items-center justify-center ${
				props.small ? "p-1 w-16 h-16" : "p-4 w-32 h-32"
			}`}
		>
			{!props.small && <h3 class="text-center text-gray-400 font-bold mb-2">{props.type}</h3>}
			<div class="flex items-center justify-center w-full h-full">
				<div
					class="grid gap-0.5"
					style={{
						"grid-template-columns": `repeat(${tetromino().shape[0].length}, min-content)`,
						transform: props.small ? "scale(0.6)" : "scale(1)",
					}}
				>
					<For each={tetromino().shape}>
						{(row) => (
							<For each={row}>
								{(cell) => <Cell filled={cell !== 0} color={cell !== 0 ? tetromino().color : undefined} />}
							</For>
						)}
					</For>
				</div>
			</div>
		</div>
	);
};

export default TetrominoPreview;

/**
 * Componente Board
 *
 * Questo componente renderizza la griglia di gioco principale del Tetris.
 * Gestisce la visualizzazione delle celle occupate (pezzi bloccati) e del pezzo
 * attualmente in caduta (pezzo attivo).
 *
 * Props:
 * - board: La matrice che rappresenta lo stato attuale della griglia.
 * - currentPieceShape: La forma (matrice) del pezzo attivo.
 * - currentPieceType: Il tipo di tetramino attivo (per il colore).
 * - piecePosition: Le coordinate (x, y) del pezzo attivo.
 */
import { Component, For } from "solid-js";
import { Board as BoardType } from "../game/types";
import Cell from "./Cell";
import { TETROMINOES } from "../game/constants";

interface BoardProps {
	board: BoardType;
	currentPieceShape: number[][];
	currentPieceType: string;
	piecePosition: { x: number; y: number };
}

const Board: Component<BoardProps> = (props) => {
	return (
		<div class="relative bg-gray-900 border-4 border-gray-700 rounded-lg shadow-2xl overflow-hidden">
			<div class="grid grid-rows-[repeat(20,minmax(0,1fr))] grid-cols-[repeat(10,minmax(0,1fr))] gap-0.5 p-1">
				<For each={props.board}>
					{(row, y) => (
						<For each={row}>
							{(cell, x) => {
								return (
									<Cell
										filled={
											cell !== null ||
											(() => {
												const py = y() - props.piecePosition.y;
												const px = x() - props.piecePosition.x;
												return (
													py >= 0 &&
													py < props.currentPieceShape.length &&
													px >= 0 &&
													px < props.currentPieceShape[py].length &&
													props.currentPieceShape[py][px] !== 0
												);
											})()
										}
										color={(() => {
											const py = y() - props.piecePosition.y;
											const px = x() - props.piecePosition.x;
											if (
												py >= 0 &&
												py < props.currentPieceShape.length &&
												px >= 0 &&
												px < props.currentPieceShape[py].length &&
												props.currentPieceShape[py][px] !== 0
											) {
												// @ts-ignore
												return TETROMINOES[props.currentPieceType].color;
											}
											return cell as string;
										})()}
									/>
								);
							}}
						</For>
					)}
				</For>
			</div>
		</div>
	);
};

export default Board;

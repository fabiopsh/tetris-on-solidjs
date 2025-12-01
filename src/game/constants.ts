import { Tetromino, TetrominoType } from "./types";

export const TETROMINOES: Record<TetrominoType, Tetromino> = {
	I: {
		shape: [
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		],
		color: "bg-cyan-400",
	},
	J: {
		shape: [
			[0, 1, 0],
			[0, 1, 0],
			[1, 1, 0],
		],
		color: "bg-blue-500",
	},
	L: {
		shape: [
			[0, 1, 0],
			[0, 1, 0],
			[0, 1, 1],
		],
		color: "bg-orange-500",
	},
	O: {
		shape: [
			[1, 1],
			[1, 1],
		],
		color: "bg-yellow-400",
	},
	S: {
		shape: [
			[0, 1, 1],
			[1, 1, 0],
			[0, 0, 0],
		],
		color: "bg-green-500",
	},
	T: {
		shape: [
			[0, 1, 0],
			[1, 1, 1],
			[0, 0, 0],
		],
		color: "bg-purple-500",
	},
	Z: {
		shape: [
			[1, 1, 0],
			[0, 1, 1],
			[0, 0, 0],
		],
		color: "bg-red-500",
	},
};

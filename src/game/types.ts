export type TetrominoType = "I" | "J" | "L" | "O" | "S" | "T" | "Z";

export interface Coordinate {
	x: number;
	y: number;
}

export interface Tetromino {
	shape: number[][];
	color: string; // Tailwind class for background color
}

export type Board = (string | null)[][];

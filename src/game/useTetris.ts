/**
 * Hook useTetris
 *
 * Questo hook contiene tutta la logica di gioco del Tetris.
 * Gestisce:
 * - Lo stato della griglia (board).
 * - Il pezzo corrente e la sua posizione.
 * - La coda dei prossimi pezzi.
 * - Il punteggio e il livello.
 * - Il loop di gioco (caduta automatica).
 * - Le collisioni e la rotazione dei pezzi.
 * - La pulizia delle linee completate.
 */
import { createSignal, onCleanup, onMount } from "solid-js";
import { TETROMINOES } from "./constants";
import { Board, Coordinate, Tetromino, TetrominoType } from "./types";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

const createEmptyBoard = (): Board => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

const createBag = (): TetrominoType[] => {
	const types = Object.keys(TETROMINOES) as TetrominoType[];
	// Fisher-Yates shuffle
	for (let i = types.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[types[i], types[j]] = [types[j], types[i]];
	}
	return types;
};

export const useTetris = () => {
	const [board, setBoard] = createSignal<Board>(createEmptyBoard());

	const getNextPiece = (currentQueue: TetrominoType[]): { next: TetrominoType; newQueue: TetrominoType[] } => {
		const next = currentQueue[0];
		let remaining = currentQueue.slice(1);

		if (remaining.length < 7) {
			// If queue gets low, replenish with a new bag
			remaining = [...remaining, ...createBag()];
		}

		return { next, newQueue: remaining };
	};

	// Initialize with enough pieces
	const initialBag = [...createBag(), ...createBag()];
	const [nextPieces, setNextPieces] = createSignal<TetrominoType[]>(initialBag.slice(1));
	const [currentPiece, setCurrentPiece] = createSignal<TetrominoType>(initialBag[0]);

	const [piecePosition, setPiecePosition] = createSignal<Coordinate>({ x: 3, y: 0 });
	const [pieceRotation, setPieceRotation] = createSignal<number[][]>(TETROMINOES[initialBag[0]].shape);
	const [score, setScore] = createSignal(0);
	const [gameOver, setGameOver] = createSignal(false);
	const [isPaused, setIsPaused] = createSignal(false);

	const checkCollision = (x: number, y: number, shape: number[][], currentBoard: Board): boolean => {
		for (let row = 0; row < shape.length; row++) {
			for (let col = 0; col < shape[row].length; col++) {
				if (shape[row][col] !== 0) {
					const newX = x + col;
					const newY = y + row;

					if (
						newX < 0 ||
						newX >= BOARD_WIDTH ||
						newY >= BOARD_HEIGHT ||
						(newY >= 0 && currentBoard[newY][newX] !== null)
					) {
						return true;
					}
				}
			}
		}
		return false;
	};

	const rotateMatrix = (matrix: number[][]): number[][] => {
		return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
	};

	const move = (dx: number, dy: number) => {
		if (gameOver() || isPaused()) return;

		const newPos = { x: piecePosition().x + dx, y: piecePosition().y + dy };
		if (!checkCollision(newPos.x, newPos.y, pieceRotation(), board())) {
			setPiecePosition(newPos);
			return true;
		}
		return false;
	};

	const rotate = () => {
		if (gameOver() || isPaused()) return;

		const newShape = rotateMatrix(pieceRotation());
		if (!checkCollision(piecePosition().x, piecePosition().y, newShape, board())) {
			setPieceRotation(newShape);
		} else {
			// Wall kick (basic implementation - try moving left/right)
			if (!checkCollision(piecePosition().x - 1, piecePosition().y, newShape, board())) {
				setPiecePosition({ ...piecePosition(), x: piecePosition().x - 1 });
				setPieceRotation(newShape);
			} else if (!checkCollision(piecePosition().x + 1, piecePosition().y, newShape, board())) {
				setPiecePosition({ ...piecePosition(), x: piecePosition().x + 1 });
				setPieceRotation(newShape);
			}
		}
	};

	const lockPiece = () => {
		const newBoard = board().map((row) => [...row]);
		const shape = pieceRotation();
		const pos = piecePosition();
		const type = currentPiece();
		const color = TETROMINOES[type].color;

		for (let row = 0; row < shape.length; row++) {
			for (let col = 0; col < shape[row].length; col++) {
				if (shape[row][col] !== 0) {
					if (pos.y + row < 0) {
						setGameOver(true);
						return;
					}
					newBoard[pos.y + row][pos.x + col] = color;
				}
			}
		}

		setBoard(newBoard);

		// Check lines
		let linesCleared = 0;
		const cleanBoard = newBoard.filter((row) => {
			const isFull = row.every((cell) => cell !== null);
			if (isFull) linesCleared++;
			return !isFull;
		});

		if (linesCleared > 0) {
			const newRows = Array.from({ length: linesCleared }, () => Array(BOARD_WIDTH).fill(null));
			setBoard([...newRows, ...cleanBoard]);

			// Scoring: 100, 300, 500, 800
			const points = [0, 100, 300, 500, 800];
			setScore((s) => s + points[linesCleared]);
		}

		// Spawn new piece from queue
		const currentQueue = nextPieces();
		const nextType = currentQueue[0];
		let newQueue = currentQueue.slice(1);

		if (newQueue.length < 7) {
			newQueue = [...newQueue, ...createBag()];
		}

		setNextPieces(newQueue);
		setCurrentPiece(nextType);
		setPieceRotation(TETROMINOES[nextType].shape);
		setPiecePosition({ x: 3, y: 0 });

		if (checkCollision(3, 0, TETROMINOES[nextType].shape, newBoard)) {
			setGameOver(true);
		}
	};

	const drop = () => {
		if (gameOver() || isPaused()) return;

		if (!move(0, 1)) {
			lockPiece();
		}
	};

	const hardDrop = () => {
		if (gameOver() || isPaused()) return;
		while (move(0, 1)) {}
		lockPiece();
	};

	// Game Loop
	let gameInterval: number | undefined;

	const startGame = () => {
		if (gameInterval) clearInterval(gameInterval);
		gameInterval = setInterval(() => {
			drop();
		}, 1000); // 1 second drop speed
	};

	onMount(() => {
		startGame();
	});

	onCleanup(() => {
		if (gameInterval) clearInterval(gameInterval);
	});

	return {
		board,
		currentPiece,
		piecePosition,
		pieceRotation,
		score,
		gameOver,
		isPaused,
		nextPieces,
		moveLeft: () => move(-1, 0),
		moveRight: () => move(1, 0),
		moveDown: drop,
		rotate,
		hardDrop,
		togglePause: () => setIsPaused((p) => !p),
	};
};

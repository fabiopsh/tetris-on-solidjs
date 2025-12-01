export interface ScoreEntry {
	name: string;
	score: number;
	date: string;
}

const STORAGE_KEY = "tetris_scores";

export const getScores = (): ScoreEntry[] => {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return [];
		return JSON.parse(stored);
	} catch (e) {
		console.error("Failed to load scores", e);
		return [];
	}
};

export const saveScore = (name: string, score: number): ScoreEntry[] => {
	const scores = getScores();
	const newEntry: ScoreEntry = {
		name,
		score,
		date: new Date().toISOString(),
	};

	const newScores = [...scores, newEntry]
		.sort((a, b) => {
			if (b.score !== a.score) return b.score - a.score;
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		})
		.slice(0, 10);

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newScores));
	} catch (e) {
		console.error("Failed to save score", e);
	}

	return newScores;
};

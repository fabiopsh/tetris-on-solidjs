/**
 * Componente Cell
 *
 * Rappresenta una singola cella (blocco) nella griglia di gioco.
 * Può essere vuota o piena (colorata) e gestisce lo stile visivo
 * inclusi i bordi e gli effetti "neon".
 *
 * Props:
 * - type: (Opzionale) Il tipo di tetramino.
 * - color: (Opzionale) La classe colore Tailwind.
 * - filled: Se la cella è occupata o meno.
 */
import { Component } from "solid-js";

interface CellProps {
	type?: string; // e.g., 'I', 'J', etc. or '0' for empty
	color?: string; // Tailwind class
	filled?: boolean;
}

const Cell: Component<CellProps> = (props) => {
	return (
		<div
			class={`w-6 h-6 border border-white/10 ${props.filled && props.color ? props.color : "bg-gray-900/50"} ${
				props.filled
					? "shadow-[inset_0_0_8px_rgba(0,0,0,0.25)] border-t-white/30 border-l-white/30 border-b-black/30 border-r-black/30"
					: ""
			}`}
		/>
	);
};

export default Cell;

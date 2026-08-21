"use client";

import { BOARD_TRACK, PLAYERS, type BoardCell, type PlayerId, type PlayerState } from "./walkthroughData";
import { IconChance, IconScenario } from "@/components/primitives/Icons";
import styles from "./GameTable.module.css";

const VB = 640;
const CENTER = VB / 2;
const BOARD_MIN = 150;
const BOARD_MAX = 490;
const AVATAR_RADIUS = 275;

const CELL_KIND_COLOR: Record<string, string> = {
  go: "#5ee1f2",
  stop: "#ff5e7e",
  "power-outage": "#f5a623",
  "card-penalty": "#7c8a93",
  chance: "#a3d94f",
  scenario: "#b48fe0",
};

/** Maps a board-track index (0-27) to an (x, y) point on the square track's
 * perimeter. 7 cells per side, corners at 0/7/14/21, matching the paper's
 * cyclic 28-cell design. Illustrative layout, not the literal photographed
 * board (no per-cell coordinates exist for that). */
function cellPoint(index: number): { x: number; y: number } {
  const size = BOARD_MAX - BOARD_MIN;
  const side = Math.floor(index / 7) % 4;
  const t = (index % 7) / 7;
  switch (side) {
    case 0:
      return { x: BOARD_MIN + t * size, y: BOARD_MAX };
    case 1:
      return { x: BOARD_MAX, y: BOARD_MAX - t * size };
    case 2:
      return { x: BOARD_MAX - t * size, y: BOARD_MIN };
    default:
      return { x: BOARD_MIN, y: BOARD_MIN + t * size };
  }
}

function avatarPoint(seatIndex: number): { x: number; y: number; angle: number } {
  const angle = -90 + seatIndex * (360 / PLAYERS.length);
  const rad = (angle * Math.PI) / 180;
  return { x: CENTER + AVATAR_RADIUS * Math.cos(rad), y: CENTER + AVATAR_RADIUS * Math.sin(rad), angle };
}

const TOKEN_OFFSETS = [
  { dx: 0, dy: 0 },
  { dx: 9, dy: -3 },
  { dx: -9, dy: -3 },
  { dx: 5, dy: 8 },
  { dx: -5, dy: 8 },
];

export function GameTable({
  playerStates,
  activePlayer,
  selectedPlayer,
  onSelectPlayer,
  highlightCellIndex,
}: {
  playerStates: Record<PlayerId, PlayerState>;
  activePlayer: PlayerId | null;
  selectedPlayer: PlayerId;
  onSelectPlayer: (id: PlayerId) => void;
  highlightCellIndex: number | null;
}) {
  const highlightCell = highlightCellIndex !== null ? BOARD_TRACK[highlightCellIndex] : null;
  const highlightPoint = highlightCellIndex !== null ? cellPoint(highlightCellIndex) : null;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} className={styles.svg} role="img" aria-label="Round table with five players and the CyQured board">
      <defs>
        <radialGradient id="tableGrad" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#101b2b" />
          <stop offset="100%" stopColor="#05070d" />
        </radialGradient>
      </defs>

      {/* Table */}
      <circle cx={CENTER} cy={CENTER} r={305} fill="url(#tableGrad)" stroke="rgba(94,225,242,0.18)" strokeWidth={2} />
      <circle cx={CENTER} cy={CENTER} r={305} fill="none" stroke="rgba(94,225,242,0.08)" strokeWidth={14} />

      {/* Board */}
      <rect
        x={BOARD_MIN - 14}
        y={BOARD_MIN - 14}
        width={BOARD_MAX - BOARD_MIN + 28}
        height={BOARD_MAX - BOARD_MIN + 28}
        rx={10}
        fill="rgba(5,8,16,0.85)"
        stroke="rgba(255,255,255,0.1)"
      />
      <text x={CENTER} y={CENTER - 6} textAnchor="middle" className={styles.boardLabel}>
        cyQured
      </text>
      <text x={CENTER} y={CENTER + 16} textAnchor="middle" className={styles.boardSubLabel}>
        28-cell board
      </text>

      {/* Cells */}
      {BOARD_TRACK.map((cell, i) => {
        const p = cellPoint(i);
        const isActive = i === highlightCellIndex;
        const fill = cell.kind === "device" ? cell.color ?? "#5c6b78" : CELL_KIND_COLOR[cell.kind];
        return (
          <rect
            key={i}
            x={p.x - (isActive ? 11 : 7)}
            y={p.y - (isActive ? 11 : 7)}
            width={isActive ? 22 : 14}
            height={isActive ? 22 : 14}
            rx={3}
            fill={fill}
            opacity={isActive ? 1 : 0.55}
            stroke={isActive ? "#eaf7fb" : "rgba(0,0,0,0.35)"}
            strokeWidth={isActive ? 2 : 1}
            className={isActive ? styles.activeCell : undefined}
          />
        );
      })}

      {/* Active-cell callout */}
      {highlightCell && highlightPoint ? (
        <CellCallout point={highlightPoint} cell={highlightCell} />
      ) : null}

      {/* Player tokens on the board */}
      {PLAYERS.map((pl, i) => {
        const pos = playerStates[pl.id].boardPos;
        const cp = cellPoint(pos);
        const off = TOKEN_OFFSETS[i];
        return (
          <circle
            key={pl.id}
            cx={cp.x + off.dx}
            cy={cp.y + off.dy}
            r={7}
            fill={pl.color}
            stroke="#05070d"
            strokeWidth={1.5}
          />
        );
      })}

      {/* Avatars around the table */}
      {PLAYERS.map((pl, i) => {
        const pos = avatarPoint(i);
        const isActive = pl.id === activePlayer;
        const isSelected = pl.id === selectedPlayer;
        return (
          <g
            key={pl.id}
            transform={`translate(${pos.x} ${pos.y})`}
            role="button"
            tabIndex={0}
            aria-label={`Show ${pl.name}'s status`}
            aria-pressed={isSelected}
            className={styles.avatarGroup}
            onClick={() => onSelectPlayer(pl.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelectPlayer(pl.id);
              }
            }}
          >
            {isActive ? <circle r={40} fill="none" stroke={pl.color} strokeWidth={2} className={styles.activePulse} /> : null}
            {isSelected ? <circle r={34} fill="none" stroke="#eaf7fb" strokeWidth={2} strokeDasharray="4 3" /> : null}
            {/* top-down "meeple": torso ellipse behind, head circle in front, flat color, no face */}
            <ellipse cx={0} cy={6} rx={22} ry={16} fill={pl.color} opacity={0.55} />
            <circle cx={0} cy={-6} r={15} fill={pl.color} />
            <text y={54} textAnchor="middle" className={styles.avatarLabel}>
              {pl.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function CellCallout({ point, cell }: { point: { x: number; y: number }; cell: BoardCell }) {
  const above = point.y > CENTER;
  const y = above ? point.y - 30 : point.y + 30;
  const isChance = cell.kind === "chance";
  const isScenario = cell.kind === "scenario";
  return (
    <g transform={`translate(${point.x} ${y})`} className={styles.callout}>
      <rect x={-58} y={-14} width={116} height={28} rx={8} fill="rgba(5,8,16,0.92)" stroke="#eaf7fb" strokeWidth={1} />
      {isChance ? (
        <g transform="translate(-46 -6)" color="#a3d94f">
          <IconChance size={12} />
        </g>
      ) : null}
      {isScenario ? (
        <g transform="translate(-46 -6)" color="#b48fe0">
          <IconScenario size={12} />
        </g>
      ) : null}
      <text x={isChance || isScenario ? 6 : 0} y={4} textAnchor="middle" className={styles.calloutText}>
        {cell.name}
        {cell.points ? ` · ${cell.points}pt` : ""}
      </text>
    </g>
  );
}

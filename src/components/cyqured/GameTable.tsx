"use client";

import { BOARD_TRACK, PLAYERS, type BoardCell, type PlayerId, type PlayerState } from "./walkthroughData";
import { IconChance, IconScenario } from "@/components/primitives/Icons";
import styles from "./GameTable.module.css";

const VB = 700;
const CENTER = 350;
const AVATAR_RADIUS = 270;

// The real board image is 1403x1800px (7 columns x 9 rows of square cells).
// Keep that exact aspect ratio here so cell positions line up precisely.
const BOARD_H = 380;
const BOARD_W = (BOARD_H * 1403) / 1800;
const BOARD_X_MIN = CENTER - BOARD_W / 2;
const BOARD_Y_MIN = CENTER - BOARD_H / 2;
const COLS = 7;
const ROWS = 9;

/** Maps a board cell's (col, row) on the real board image's 7x9 grid to an
 * (x, y) point in the SVG canvas. */
function cellPoint(index: number): { x: number; y: number } {
  const cell = BOARD_TRACK[index];
  return {
    x: BOARD_X_MIN + ((cell.col + 0.5) / COLS) * BOARD_W,
    y: BOARD_Y_MIN + ((cell.row + 0.5) / ROWS) * BOARD_H,
  };
}

function avatarPoint(seatIndex: number): { x: number; y: number; angle: number } {
  const angle = -90 + seatIndex * (360 / PLAYERS.length);
  const rad = (angle * Math.PI) / 180;
  return { x: CENTER + AVATAR_RADIUS * Math.cos(rad), y: CENTER + AVATAR_RADIUS * Math.sin(rad), angle };
}

const TOKEN_OFFSETS = [
  { dx: 0, dy: 0 },
  { dx: 7, dy: -2 },
  { dx: -7, dy: -2 },
  { dx: 4, dy: 6 },
  { dx: -4, dy: 6 },
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
  const cellW = BOARD_W / COLS;
  const cellH = BOARD_H / ROWS;

  return (
    <svg viewBox={`0 0 ${VB} ${VB}`} className={styles.svg} role="img" aria-label="Round table with five players and the CyQured board">
      <defs>
        <radialGradient id="tableGrad" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#101b2b" />
          <stop offset="100%" stopColor="#05070d" />
        </radialGradient>
      </defs>

      {/* Table */}
      <circle cx={CENTER} cy={CENTER} r={330} fill="url(#tableGrad)" stroke="rgba(94,225,242,0.18)" strokeWidth={2} />
      <circle cx={CENTER} cy={CENTER} r={330} fill="none" stroke="rgba(94,225,242,0.08)" strokeWidth={14} />

      {/* The real printed board */}
      <image
        href="/media/publications/cyqured/board.webp"
        x={BOARD_X_MIN}
        y={BOARD_Y_MIN}
        width={BOARD_W}
        height={BOARD_H}
        preserveAspectRatio="none"
      />
      <rect x={BOARD_X_MIN} y={BOARD_Y_MIN} width={BOARD_W} height={BOARD_H} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth={2} />

      {/* Active-cell highlight ring */}
      {highlightPoint ? (
        <rect
          x={highlightPoint.x - cellW / 2}
          y={highlightPoint.y - cellH / 2}
          width={cellW}
          height={cellH}
          fill="none"
          stroke="#5ee1f2"
          strokeWidth={3}
          rx={3}
          className={styles.activeCell}
        />
      ) : null}

      {/* Active-cell callout */}
      {highlightCell && highlightPoint ? <CellCallout point={highlightPoint} cell={highlightCell} /> : null}

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
            r={6}
            fill={pl.color}
            stroke="#05070d"
            strokeWidth={1.3}
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
  const y = above ? point.y - 34 : point.y + 34;
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

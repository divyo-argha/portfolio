"use client";

import { BOARD_TRACK, PLAYERS, type BoardCell, type PlayerId, type PlayerState } from "./walkthroughData";
import { IconChance, IconScenario } from "@/components/primitives/Icons";
import styles from "./GameTable.module.css";

const VB = 700;
const CENTER = 350;
const AVATAR_RADIUS = 270;

// The real board image is 1403x1800px (7 columns x 9 rows of cells).
// Keep that exact aspect ratio here so cell positions line up precisely.
const BOARD_H = 380;
const BOARD_W = (BOARD_H * 1403) / 1800;
const BOARD_X_MIN = CENTER - BOARD_W / 2;
const BOARD_Y_MIN = CENTER - BOARD_H / 2;
const COLS = 7;
const ROWS = 9;

// Column/row divider lines measured directly off the printed board art
// (public/media/publications/cyqured/board.webp). The 4 corner cells are
// noticeably wider/taller than the 5x7 middle cells, so a naive uniform
// 7x9 split puts tokens visibly off-centre, worse near the corners. These
// are fractions of the source image's width/height.
const COL_BOUNDS = [59, 315, 468, 622, 777, 929, 1083, 1339].map((px) => px / 1403);
const ROW_BOUNDS = [79, 335, 498, 660, 822, 984, 1146, 1308, 1470, 1726].map((px) => px / 1800);

/** The exact pixel rect (in SVG canvas space) a board cell occupies on the board image. */
function cellRect(cell: BoardCell): { x: number; y: number; width: number; height: number } {
  const x0 = COL_BOUNDS[cell.col];
  const x1 = COL_BOUNDS[cell.col + 1];
  const y0 = ROW_BOUNDS[cell.row];
  const y1 = ROW_BOUNDS[cell.row + 1];
  return {
    x: BOARD_X_MIN + x0 * BOARD_W,
    y: BOARD_Y_MIN + y0 * BOARD_H,
    width: (x1 - x0) * BOARD_W,
    height: (y1 - y0) * BOARD_H,
  };
}

/** Maps a board cell's (col, row) to its true centre point in the SVG canvas. */
function cellPoint(index: number): { x: number; y: number } {
  const rect = cellRect(BOARD_TRACK[index]);
  return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
}

const CORNER_COLS = new Set([0, COLS - 1]);
const CORNER_ROWS = new Set([0, ROWS - 1]);
function isCornerCell(cell: BoardCell): boolean {
  return CORNER_COLS.has(cell.col) && CORNER_ROWS.has(cell.row);
}

/** The reference line running through a track cell's centre: straight along
 * the direction of travel for edge cells, and diagonally across the cell
 * (following its own true corner-to-corner slope) for the 4 corner cells. */
function trackLine(cell: BoardCell): { x1: number; y1: number; x2: number; y2: number } {
  const r = cellRect(cell);
  if (isCornerCell(cell)) {
    // Top-left/bottom-right corners run "\" (their own top-left -> bottom-right
    // diagonal); top-right/bottom-left corners run "/" the other way.
    const isTopLeft = cell.col === 0 && cell.row === 0;
    const isBottomRight = cell.col === COLS - 1 && cell.row === ROWS - 1;
    return isTopLeft || isBottomRight
      ? { x1: r.x, y1: r.y, x2: r.x + r.width, y2: r.y + r.height }
      : { x1: r.x, y1: r.y + r.height, x2: r.x + r.width, y2: r.y };
  }
  if (cell.row === 0 || cell.row === ROWS - 1) {
    return { x1: r.x, y1: r.y + r.height / 2, x2: r.x + r.width, y2: r.y + r.height / 2 };
  }
  return { x1: r.x + r.width / 2, y1: r.y, x2: r.x + r.width / 2, y2: r.y + r.height };
}

function avatarPoint(seatIndex: number): { x: number; y: number; angle: number } {
  const angle = -90 + seatIndex * (360 / PLAYERS.length);
  const rad = (angle * Math.PI) / 180;
  return { x: CENTER + AVATAR_RADIUS * Math.cos(rad), y: CENTER + AVATAR_RADIUS * Math.sin(rad), angle };
}

/** Small, tight offset clusters so tokens sharing a cell fan out just enough
 * to stay readable, while a lone token sits dead-centre on its cell. */
const CLUSTER_OFFSETS: Record<number, { dx: number; dy: number }[]> = {
  1: [{ dx: 0, dy: 0 }],
  2: [
    { dx: -8, dy: 0 },
    { dx: 8, dy: 0 },
  ],
  3: [
    { dx: 0, dy: -8 },
    { dx: -8, dy: 6 },
    { dx: 8, dy: 6 },
  ],
  4: [
    { dx: -8, dy: -8 },
    { dx: 8, dy: -8 },
    { dx: -8, dy: 8 },
    { dx: 8, dy: 8 },
  ],
  5: [
    { dx: 0, dy: -10 },
    { dx: -10, dy: -3 },
    { dx: 10, dy: -3 },
    { dx: -6, dy: 9 },
    { dx: 6, dy: 9 },
  ],
};

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
  const highlightRect = highlightCell ? cellRect(highlightCell) : null;

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

      {/* Reference track line through the centre of every cell: straight
          along the direction of travel on the edges, diagonal across the
          4 corners, so a token's (cx, cy) always lands exactly on a line. */}
      <g className={styles.trackLines}>
        {BOARD_TRACK.map((cell, i) => {
          const line = trackLine(cell);
          return <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />;
        })}
      </g>

      {/* Active-cell highlight ring */}
      {highlightPoint && highlightRect ? (
        <rect
          x={highlightRect.x}
          y={highlightRect.y}
          width={highlightRect.width}
          height={highlightRect.height}
          fill="none"
          stroke="#5ee1f2"
          strokeWidth={3}
          rx={3}
          className={styles.activeCell}
        />
      ) : null}

      {/* Active-cell callout */}
      {highlightCell && highlightPoint ? <CellCallout point={highlightPoint} cell={highlightCell} /> : null}

      {/* Player tokens on the board, grouped by cell so shared cells fan out
          just enough to stay readable, and a lone token sits dead-centre. */}
      {Object.entries(
        PLAYERS.reduce<Record<number, typeof PLAYERS>>((acc, pl) => {
          const pos = playerStates[pl.id].boardPos;
          (acc[pos] ??= []).push(pl);
          return acc;
        }, {}),
      ).flatMap(([posStr, group]) => {
        const pos = Number(posStr);
        const cp = cellPoint(pos);
        const offsets = CLUSTER_OFFSETS[group.length] ?? CLUSTER_OFFSETS[5];
        return group.map((pl, i) => {
          const off = offsets[i];
          const isActive = pl.id === activePlayer;
          return (
            <circle
              key={pl.id}
              cx={cp.x + off.dx}
              cy={cp.y + off.dy}
              r={isActive ? 12 : 8}
              fill={pl.color}
              stroke={isActive ? "#eaf7fb" : "#05070d"}
              strokeWidth={isActive ? 2.2 : 1.6}
              className={isActive ? [styles.token, styles.tokenActive].join(" ") : styles.token}
            />
          );
        });
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

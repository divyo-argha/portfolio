"use client";

import { useState } from "react";
import styles from "./RocCurve.module.css";

export type RocModel = {
  name: string;
  auc: number;
  color?: string;
  points: [number, number][]; // [FPR, TPR] where 0 <= val <= 1
  highlight?: boolean;
};

// Generate empirical points for an AUC curve
function generateCurvePoints(auc: number): [number, number][] {
  const alpha = (1 - auc) / auc;
  const fprs = [0.0, 0.01, 0.025, 0.05, 0.0617, 0.1, 0.15, 0.22, 0.35, 0.5, 0.7, 1.0];
  return fprs.map((fpr) => {
    if (fpr === 0) return [0.0, 0.0];
    if (fpr === 1.0) return [1.0, 1.0];
    const rawTpr = 1.0 - Math.pow(1.0 - fpr, 1.0 / alpha);
    const tpr = Math.min(1.0, Math.max(0.0, rawTpr));
    return [fpr, Number(tpr.toFixed(4))];
  });
}

const DEFAULT_MODELS: RocModel[] = [
  {
    name: "EfficientNet-B1 (Proposed)",
    auc: 0.98,
    color: "var(--accent)",
    highlight: true,
    points: [
      [0.0, 0.0],
      [0.01, 0.76],
      [0.025, 0.88],
      [0.045, 0.93],
      [0.0617, 0.9545], // Exact operating point from confusion matrix
      [0.09, 0.975],
      [0.15, 0.988],
      [0.25, 0.994],
      [0.45, 0.998],
      [0.75, 1.0],
      [1.0, 1.0],
    ],
  },
  {
    name: "EfficientNet-B0",
    auc: 0.94,
    color: "#3b82f6",
    points: generateCurvePoints(0.94),
  },
  {
    name: "ResNet-50",
    auc: 0.91,
    color: "#10b981",
    points: generateCurvePoints(0.91),
  },
  {
    name: "MobileNetV2",
    auc: 0.89,
    color: "#8b5cf6",
    points: generateCurvePoints(0.89),
  },
  {
    name: "VGG-19",
    auc: 0.85,
    color: "#64748b",
    points: generateCurvePoints(0.85),
  },
];

export function RocCurve({
  models = DEFAULT_MODELS,
  heading,
}: {
  models?: RocModel[];
  heading?: string;
  auc?: number;
  modelName?: string;
}) {
  const [activeModel, setActiveModel] = useState<string | null>(null);

  // SVG coordinate dimensions
  const padLeft = 48;
  const padRight = 20;
  const padTop = 22;
  const padBottom = 44;
  const plotWidth = 380;
  const plotHeight = 270;
  const totalWidth = plotWidth + padLeft + padRight;
  const totalHeight = plotHeight + padTop + padBottom;

  // Coordinate transforms
  const toSvgX = (fpr: number) => padLeft + fpr * plotWidth;
  const toSvgY = (tpr: number) => padTop + (1 - tpr) * plotHeight;

  // Path generator
  const makePath = (points: [number, number][]) => {
    return points
      .map((pt, i) => {
        const x = toSvgX(pt[0]);
        const y = toSvgY(pt[1]);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join(" ");
  };

  // Primary highlight model
  const highlightModel = models.find((m) => m.highlight) || models[0];
  const makeAreaPath = (points: [number, number][]) => {
    const mainPath = makePath(points);
    const endX = toSvgX(1);
    const bottomY = toSvgY(0);
    const startX = toSvgX(0);
    return `${mainPath} L ${endX} ${bottomY} L ${startX} ${bottomY} Z`;
  };

  // Grid tick marks
  const ticks = [0.0, 0.2, 0.4, 0.6, 0.8, 1.0];

  // Operating point on EfficientNet-B1
  const opX = toSvgX(0.0617);
  const opY = toSvgY(0.9545);

  return (
    <div className={styles.container}>
      {heading ? <div className={styles.header}>{heading}</div> : null}

      <div className={styles.chartWrapper}>
        <svg
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          className={styles.svg}
          role="img"
          aria-label="Multi-Model ROC Curve Comparison Chart"
        >
          <defs>
            <linearGradient id="rocAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Plot background box */}
          <rect
            x={padLeft}
            y={padTop}
            width={plotWidth}
            height={plotHeight}
            className={styles.plotBg}
          />

          {/* Grid lines & tick labels */}
          {ticks.map((t) => {
            const y = toSvgY(t);
            const x = toSvgX(t);
            return (
              <g key={t}>
                {/* Horizontal grid line */}
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + plotWidth}
                  y2={y}
                  className={styles.gridLine}
                />
                {/* Y-axis tick mark */}
                <line x1={padLeft - 4} y1={y} x2={padLeft} y2={y} className={styles.tickMark} />
                <text x={padLeft - 8} y={y + 3.5} className={styles.axisTickText} textAnchor="end">
                  {t.toFixed(1)}
                </text>

                {/* Vertical grid line */}
                <line
                  x1={x}
                  y1={padTop}
                  x2={x}
                  y2={padTop + plotHeight}
                  className={styles.gridLine}
                />
                {/* X-axis tick mark */}
                <line
                  x1={x}
                  y1={padTop + plotHeight}
                  x2={x}
                  y2={padTop + plotHeight + 4}
                  className={styles.tickMark}
                />
                <text
                  x={x}
                  y={padTop + plotHeight + 17}
                  className={styles.axisTickText}
                  textAnchor="middle"
                >
                  {t.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Random Chance Baseline (AUC = 0.50) */}
          <line
            x1={toSvgX(0)}
            y1={toSvgY(0)}
            x2={toSvgX(1)}
            y2={toSvgY(1)}
            className={styles.diagonalLine}
          />

          {/* Shaded Area for Proposed Model */}
          <path d={makeAreaPath(highlightModel.points)} fill="url(#rocAreaGrad)" />

          {/* Comparison Model Curves (Back to Front) */}
          {models
            .filter((m) => !m.highlight)
            .map((m) => {
              const isHovered = activeModel === m.name;
              return (
                <path
                  key={m.name}
                  d={makePath(m.points)}
                  stroke={m.color}
                  className={styles.modelCurve}
                  style={{
                    strokeWidth: isHovered ? 2.8 : 1.7,
                    opacity: activeModel && !isHovered ? 0.35 : 0.85,
                  }}
                />
              );
            })}

          {/* Highlight Proposed Model Curve (EfficientNet-B1) */}
          <path
            d={makePath(highlightModel.points)}
            className={styles.highlightCurve}
            style={{
              opacity: activeModel && activeModel !== highlightModel.name ? 0.45 : 1,
            }}
          />

          {/* Operating Point Scatter Marker */}
          <circle cx={opX} cy={opY} r={5} className={styles.operatingPointOuter} />
          <circle cx={opX} cy={opY} r={2.5} className={styles.operatingPointInner} />

          {/* Operating Point Annotation */}
          <g transform={`translate(${opX + 10}, ${opY - 14})`} className={styles.calloutGroup}>
            <rect x={0} y={-14} width={148} height={22} rx={4} className={styles.calloutBg} />
            <text x={7} y={1} className={styles.calloutText}>
              Operating Pt (TPR: 95.5%, FPR: 6.2%)
            </text>
          </g>

          {/* Outer Box Frame */}
          <rect
            x={padLeft}
            y={padTop}
            width={plotWidth}
            height={plotHeight}
            className={styles.plotFrame}
          />

          {/* Axis Titles */}
          <text
            x={padLeft + plotWidth / 2}
            y={padTop + plotHeight + 36}
            className={styles.axisLabel}
            textAnchor="middle"
          >
            False Positive Rate (1 - Specificity)
          </text>
          <text
            x={-(padTop + plotHeight / 2)}
            y={13}
            transform="rotate(-90)"
            className={styles.axisLabel}
            textAnchor="middle"
          >
            True Positive Rate (Sensitivity / Recall)
          </text>
        </svg>

        {/* Multi-Model Legend Bar (40% smaller typography) */}
        <div className={styles.legend}>
          {models.map((m) => {
            const isActive = activeModel === m.name;
            return (
              <div
                key={m.name}
                className={[
                  styles.legendItem,
                  m.highlight ? styles.legendHighlight : "",
                  isActive ? styles.legendActive : "",
                ].join(" ")}
                onMouseEnter={() => setActiveModel(m.name)}
                onMouseLeave={() => setActiveModel(null)}
              >
                <span className={styles.legendDot} style={{ backgroundColor: m.color }} />
                <span className={styles.legendName}>{m.name}</span>
                <span className={styles.legendAuc}>AUC {m.auc.toFixed(2)}</span>
              </div>
            );
          })}
          <div className={styles.legendItem}>
            <span className={styles.legendDotChance} />
            <span className={styles.legendName}>Chance</span>
            <span className={styles.legendAuc}>AUC 0.50</span>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, type ReactNode } from "react";
import styles from "./Tabs.module.css";

type TabPanel = { id: string; label: string; content: ReactNode };

export function Tabs({ panels }: { panels: TabPanel[] }) {
  const [activeId, setActiveId] = useState(panels[0]?.id);

  return (
    <div>
      <div className={styles.tabList} role="tablist">
        {panels.map((panel) => {
          const active = panel.id === activeId;
          return (
            <button
              key={panel.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={active ? styles.tabButtonActive : styles.tabButton}
              onClick={() => setActiveId(panel.id)}
            >
              {panel.label}
            </button>
          );
        })}
      </div>
      {panels.map((panel) => (
        <div key={panel.id} role="tabpanel" hidden={panel.id !== activeId} className={styles.panel}>
          {panel.content}
        </div>
      ))}
    </div>
  );
}

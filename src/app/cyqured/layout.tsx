import type { Metadata } from "next";
import { CyquredMagneticGrid } from "@/components/cyqured/CyquredMagneticGrid";
import { CyquredThemeScope } from "@/components/cyqured/CyquredThemeScope";

export const metadata: Metadata = {
  title: {
    default: "CyQured",
    template: "%s · CyQured",
  },
};

export default function CyQuredGameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CyquredThemeScope />
      <CyquredMagneticGrid />
      {children}
    </>
  );
}

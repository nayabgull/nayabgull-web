import type { Page } from "@playwright/test";

export interface LayoutProblems {
  horizontalOverflow: boolean;
  overlapping: string[];
  clipped: string[];
  smallTargets: string[];
}

/** Runs in the page: overflow, overlapping interactive elements, clipped text, tap targets < 44 px. */
export async function findLayoutProblems(page: Page): Promise<LayoutProblems> {
  return page.evaluate(() => {
    const describe = (el: Element): string =>
      `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""} "${el.textContent.trim().slice(0, 40)}"`;
    const visible = (el: Element): boolean => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.visibility !== "hidden" &&
        style.display !== "none"
      );
    };

    const doc = document.documentElement;
    const interactive = [
      ...document.querySelectorAll("a[href], button, input, select, textarea, [role='button']"),
    ]
      .filter(visible)
      .filter((el) => !el.closest("[aria-hidden='true']"));

    const overlapping: string[] = [];
    const rects = interactive.map((el) => el.getBoundingClientRect());
    for (let i = 0; i < rects.length; i++) {
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i];
        const b = rects[j];
        const elA = interactive[i];
        const elB = interactive[j];
        if (!a || !b || !elA || !elB || elA.contains(elB) || elB.contains(elA)) continue;
        const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (overlapX > 1 && overlapY > 1) overlapping.push(`${describe(elA)} ↔ ${describe(elB)}`);
      }
    }

    const smallTargets = interactive
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        // Inline links inside running text are exempt under WCAG 2.5.8; everything else needs 44 × 44.
        const inline =
          el.tagName === "A" &&
          getComputedStyle(el).display === "inline" &&
          el.closest("p, li") !== null;
        return !inline && (rect.width < 44 || rect.height < 44);
      })
      .map(describe);

    const clipped = [...document.querySelectorAll("body *")]
      .filter(visible)
      .filter((el) => {
        const style = getComputedStyle(el);
        const clips =
          ["hidden", "clip"].includes(style.overflowX) ||
          ["hidden", "clip"].includes(style.overflowY);
        const hasText = [...el.childNodes].some(
          (n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim() !== "",
        );
        return (
          clips &&
          hasText &&
          (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)
        );
      })
      .map(describe);

    return {
      horizontalOverflow: doc.scrollWidth > doc.clientWidth,
      overlapping,
      clipped,
      smallTargets,
    };
  });
}

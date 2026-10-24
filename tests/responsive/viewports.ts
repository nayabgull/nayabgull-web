/** CI viewport matrix from docs/rules/frontend.md §1. */
export interface ViewportClass {
  name: string;
  widths: readonly number[];
  /** Phones and tablets also run in landscape. */
  landscape: boolean;
  /** Portrait height used for the class. */
  height: number;
}

export const VIEWPORT_CLASSES: readonly ViewportClass[] = [
  { name: "folded", widths: [280, 320, 360], landscape: true, height: 740 },
  { name: "phone", widths: [375, 390, 414, 430], landscape: true, height: 860 },
  { name: "tablet", widths: [768, 820, 1024], landscape: true, height: 1180 },
  { name: "laptop", widths: [1280, 1366, 1440], landscape: false, height: 800 },
  { name: "desktop", widths: [1920, 2560], landscape: false, height: 1080 },
];

export interface Viewport {
  label: string;
  width: number;
  height: number;
}

export function viewportMatrix(): Viewport[] {
  return VIEWPORT_CLASSES.flatMap((cls) =>
    cls.widths.flatMap((width) => {
      const portrait = { label: `${width}-portrait`, width, height: cls.height };
      return cls.landscape
        ? [portrait, { label: `${width}-landscape`, width: cls.height, height: width }]
        : [portrait];
    }),
  );
}

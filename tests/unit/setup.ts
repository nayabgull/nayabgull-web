import { vi } from "vitest";

import "@testing-library/jest-dom/vitest";

// The quote form posts to a Server Action that loads Payload. Unit tests never touch the database.
vi.mock("@/app/(site)/actions.ts", () => ({ submitLeadAction: vi.fn() }));

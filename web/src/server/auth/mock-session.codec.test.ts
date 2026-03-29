import { describe, expect, it } from "vitest";

import { decodeMockSessionPayload, encodeMockSessionPayload } from "@/server/auth/mock-session.codec";

describe("mock-session.codec", () => {
  it("round-trips admin payload", () => {
    const encoded = encodeMockSessionPayload({ role: "admin", email: "owner@example.com" });
    expect(decodeMockSessionPayload(encoded)).toEqual({
      role: "admin",
      email: "owner@example.com"
    });
  });

  it("returns null for invalid input", () => {
    expect(decodeMockSessionPayload(undefined)).toBeNull();
    expect(decodeMockSessionPayload("not-valid")).toBeNull();
  });
});

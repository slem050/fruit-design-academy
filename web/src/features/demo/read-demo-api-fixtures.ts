import { readFile } from "node:fs/promises";
import path from "node:path";

export type DemoApiFixtures = {
  contact?: {
    successExtra?: Record<string, unknown>;
  };
};

export async function readDemoApiFixtures(): Promise<DemoApiFixtures | null> {
  try {
    const filePath = path.join(process.cwd(), "data", "demo-api-fixtures.json");
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as DemoApiFixtures;
  } catch {
    return null;
  }
}

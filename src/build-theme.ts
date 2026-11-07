import * as fs from "fs";
import * as path from "path";
import classicalDark from "./theme";
import classicalDarkMidnight from "./midnight";
import type { ThemeDefinition } from "./theme";

const outputDir = path.resolve(__dirname, "..", "themes");

const themes: Array<[file: string, theme: ThemeDefinition]> = [
  ["classical-dark.json", classicalDark],
  ["classical-dark-midnight.json", classicalDarkMidnight],
];

fs.mkdirSync(outputDir, { recursive: true });

for (const [file, theme] of themes) {
  const outputFile = path.join(outputDir, file);
  fs.writeFileSync(outputFile, JSON.stringify(theme, null, 2) + "\n", "utf8");
  console.log(`Theme written to: ${outputFile}`);
}

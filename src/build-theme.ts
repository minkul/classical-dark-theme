import * as fs from "fs";
import * as path from "path";
import theme from "./theme";

const outputDir = path.resolve(__dirname, "..", "themes");
const outputFile = path.join(outputDir, "classical-dark.json");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(theme, null, 2) + "\n", "utf8");

console.log(`Theme written to: ${outputFile}`);

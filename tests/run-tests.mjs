import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Compile the actual routing module, including its JSON source, with the
// project's TypeScript dependency. No additional test runtime is required.
const output = mkdtempSync(join(tmpdir(), "yoga-studio-tests-"));
try {
  execFileSync(process.execPath, ["node_modules/typescript/bin/tsc", "lib/lesson-practice.ts",
    "--outDir", output, "--module", "commonjs", "--target", "ES2017",
    "--resolveJsonModule", "--esModuleInterop", "--strict", "--skipLibCheck"], { stdio: "inherit" });
  copyFileSync("tests/lesson-practice.test.cjs", join(output, "lesson-practice.test.cjs"));
  execFileSync(process.execPath, ["--test", join(output, "lesson-practice.test.cjs")], { stdio: "inherit" });
} finally {
  rmSync(output, { recursive: true, force: true });
}

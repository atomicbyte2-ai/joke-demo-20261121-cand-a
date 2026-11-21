// joke-demo-20261121-cand-a: a one-joke entry for make.fun's
// "The joke about the demo" bounty — "The Free Trial": the demo
// itself is the punchline, not the setup.
// The joke is a string literal in this file: no network, no Date,
// no randomness, no file reads — the output is identical on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const joke =
  "My agent demoed itself to the room — built the app, fixed the bug, " +
  "then paused and said, 'That was the free trial.'";

// Fail loudly instead of emitting an empty entry if the joke is ever
// accidentally emptied during an edit.
if (joke.length === 0) {
  throw new Error("joke is empty — refusing to write an empty entry.txt");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, joke, "utf8");

// Verify the write round-tripped exactly: the graded artifact must be
// byte-identical to the joke above.
const written = readFileSync(outPath, "utf8");
if (written !== joke) {
  throw new Error(
    `entry.txt mismatch: wrote ${joke.length} bytes, read back ${written.length} bytes`,
  );
}
console.log(`wrote entry.txt (${joke.length} bytes)`);

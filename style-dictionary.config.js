import StyleDictionary from "style-dictionary";

// ─── NAME TRANSFORM (clean + stable) ─────────────────────────────
StyleDictionary.registerTransform({
  name: "tokens/name-clean",
  type: "name",
  transform: (token) => {
    return token.path
      .filter((part) => !/default|collection|mode/i.test(part))
      .filter((part) => !/^[\p{Emoji}]/u.test(part))
      .join("-")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }
});

// ─── SIZE → PX (only numbers) ────────────────────────────────────
StyleDictionary.registerTransform({
  name: "tokens/size-px",
  type: "value",
  transitive: true,
  filter: (token) => typeof token.value === "number",
  transform: (token) => {
    return token.value === 0 ? "0" : `${token.value}px`;
  }
});

// ─── FONT QUOTING (safe) ────────────────────────────────────────
StyleDictionary.registerTransform({
  name: "font/quote",
  type: "value",
  transitive: true,
  filter: (token) =>
    token.path.some((p) => typeof p === "string" && p.includes("font")),
  transform: (token) => `"${token.value}"`,
});

// ─── CLEAN CSS FORMAT ───────────────────────────────────────────
StyleDictionary.registerFormat({
  name: "css/variables-clean",
  format: ({ dictionary }) => {
    const lines = dictionary.allTokens.map(
      (t) => `  --${t.name}: ${t.value};`
    );

    const uniqueLines = [...new Set(lines)];

    return `/** Auto-generated - do not edit */\n\n:root {\n${uniqueLines.join(
      "\n"
    )}\n}\n`;
  },
});

// ─── CONFIG ─────────────────────────────────────────────────────
const sd = new StyleDictionary({
  source: ["tokens.json"],
  platforms: {
    css: {
      transforms: [
        "tokens/name-clean",
        "tokens/size-px",
        "font/quote",
        "color/css",
      ],
      buildPath: "./",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables-clean",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

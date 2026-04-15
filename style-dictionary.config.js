import StyleDictionary from "style-dictionary";

// ─── Custom Transforms ──────────────────────────────────────────────────────

// clean name transform
StyleDictionary.registerTransform({
  name: "name/clean-kebab",
  type: "name",
  transform: (token) =>
    token.path
      .filter((part) => {
        if (part === "Default") return false;
        if (/[/]/.test(part)) return false;
        if (/^\p{Emoji}/u.test(part)) return false;
        return true;
      })
      .join("-")
      .toLowerCase()
      .replace(/\s+/g, "-"),
});

// size transform with px
StyleDictionary.registerTransform({
  name: "size/px",
  type: "value",
  transitive: true,
  filter: (token) => {
    return token.path.some(p => /gap|radius|typography|spacing/i.test(p));
  },
  transform: (token) => {
    const val = parseFloat(token.value);
    return isNaN(val) ? token.value : `${val}px`;
  }
});

// font transform with quotes
StyleDictionary.registerTransform({
  name: "font/quote",
  type: "value",
  transitive: true,
  filter: (token) => token.path.some(p => /font/i.test(p)),
  transform: (token) => {
    const v = token.value.toString();
    return v.includes('"') ? v : `"${v}"`;
  }
});

// ─── Config ─────────────────────────────────────────────────────────────────

const sd = new StyleDictionary({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transforms: ["name/clean-kebab", "size/px", "font/quote", "color/css"],
      buildPath: "./",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();

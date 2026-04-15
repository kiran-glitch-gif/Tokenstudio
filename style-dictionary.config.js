import StyleDictionary from "style-dictionary";

const sd = new StyleDictionary({
  source: ["tokens.json"],
  hooks: {
    transforms: {
      // Custom name transform to handle emojis and nested paths
      "custom/name/kebab": {
        type: "name",
        transform: (token) => {
          return token.path
            .filter(part => !/Default|^\p{Emoji}/u.test(part))
            .join("-")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[/]/g, "-");
        }
      },
      // Universal px unit transform for all sizes and spaces
      "custom/size/px": {
        type: "value",
        transitive: true,
        filter: (token) => {
          const val = token.value ?? token.$value;
          const isSize = token.path.some(p => /gap|radius|typography|spacing|size/i.test(p));
          const isNumber = typeof val === 'number' || (typeof val === 'string' && !isNaN(parseFloat(val)));
          return isSize && isNumber;
        },
        transform: (token) => {
          const val = parseFloat(token.value ?? token.$value);
          if (val === 0) return "0";
          return `${val}px`;
        }
      }
    }
  },
  platforms: {
    css: {
      transforms: ["custom/name/kebab", "custom/size/px", "color/css"],
      buildPath: "./",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables"
        }
      ]
    }
  }
});

await sd.buildAllPlatforms();

# 🎨 Figma to CSS: Design Token Automation

This project provides a robust, automated pipeline for transforming design tokens from Figma (via Tokens Studio) into clean, production-ready CSS variables.

## 🚀 Key Features

- **Automated Sync**: Every time `tokens.json` is updated, a GitHub Action automatically rebuilds the CSS.
- **Smart Transformation**:
  - **Naming**: Converts complex Figma paths into clean `kebab-case` variables.
  - **Units**: Automatically adds `px` to spacing, border-radius, and typography tokens.
  - **Fonts**: Handles font-family quoting for reliability.
- **Live CDN**: Serves the resulting `tokens.css` via GitHub Pages for use across all your web projects.

## 🛠️ How it Works

1. **Design in Figma**: Update your tokens using Tokens Studio or Figma Variables.
2. **Push to GitHub**: When you save/push changes to `tokens.json`, the automation triggers.
3. **Automatic Build**: GitHub Actions runs Style Dictionary to generate an updated `tokens.css`.
4. **Auto-Commit**: The bot pushes the new `tokens.css` back to your repository and deploys it to the web.

## 📦 Usage

### Linking the Tokens
You can link the live tokens directly in any HTML file:

```html
<link rel="stylesheet" href="https://kiran-glitch-gif.github.io/Tokenstudio/tokens.css">
```

### Manual Build
If you want to run the build locally:

```bash
npm install
npm run build-tokens
```

## 📂 Project Structure

- `tokens.json`: The source of truth for all design tokens.
- `tokens.css`: The auto-generated output (Do not edit directly!).
- `style-dictionary.config.js`: The "brain" of the transformation logic.
- `.github/workflows/design-tokens.yml`: The automation script.

---
*Created and maintained with ❤️ by kiran*

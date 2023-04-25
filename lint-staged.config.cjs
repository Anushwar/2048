const config = {
  // Type check TypeScript files
  "**/*.(ts|tsx)": () => "yarn tsc --noEmit",

  // Lint then format TypeScript and JavaScript files
  "**/*.(ts|tsx|js)": (/** @type {string[]} */ filenames) => [
    `pnpm eslint --fix --max-warnings=0 ${filenames.join(" ")}`,
    `pnpm prettier --write --ignore-unknown ${filenames.join(" ")}`,
  ],

  // Format MarkDown and JSON
  "**/*.(md|json)": (/** @type {string[]} */ filenames) => [
    `pnpm prettier --write --ignore-unknown ${filenames.join(" ")}`,
  ],
};

module.exports = config;

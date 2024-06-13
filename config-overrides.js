const path = require("path");

module.exports = {
  webpack: (config) => {
    const electronMainConfig = {
      target: "electron-main",
      mode: "production",
      entry: path.join(__dirname, "electron", "main.js"), // Input path
      output: {
        ...config.output,
        filename: "static/js/electron.main.js", // Output path (minus `build`)
      },
    };

    return process.env.NODE_ENV === "development"
      ? config
      : [config, electronMainConfig];
  },
};

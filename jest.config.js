module.exports = {
    transform: {
      "^.+\\.js$": "babel-jest",
      "^.+\\.ts$": "babel-jest", // If you're using TypeScript
      "^.+\\.vue$": "@vue/vue3-jest" // If you're using Vue components
    },
  };
  
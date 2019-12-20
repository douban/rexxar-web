module.exports = {
  "testMatch": [
    "**/__tests__/**/?(*.)+(spec|test).ts?(x)",
    "**/?(*.)+(spec|test).ts?(x)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "moduleDirectories": [
    "src",
    "node_modules"
  ]
}
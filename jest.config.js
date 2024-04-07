module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["<rootDir>/tests"],
	collectCoverageFrom: [
		"<rootDir>/src/**/*.ts",
		"!<rootDir>/src/main/**",
		"!<rootDir>/src/**/index.ts"
	],
	transformIgnorePatterns: ["^.+\\.ts?$"]
}
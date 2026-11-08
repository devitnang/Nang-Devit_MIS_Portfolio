import("./generate-mockups.mjs").catch((error) => {
  console.error("Failed to generate project mockups.", error);
  process.exitCode = 1;
});

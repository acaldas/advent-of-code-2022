import fs from "fs";

async function part1(input: string) {
  console.log(
    Math.max(
      ...input
        .split("\n\n")
        .map((e) => e.split("\n").reduce((total, e) => total + parseInt(e), 0))
    )
  );
}

async function part2(input: string) {
  console.log(
    input
      .split("\n\n")
      .map((e) => e.split("\n").reduce((total, e) => total + parseInt(e), 0))
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((total, e) => total + e, 0)
  );
}

async function main() {
  const input = await fs.readFileSync("./challenges/01.txt", "utf8");
  await part1(input);
  await part2(input);
}

main();

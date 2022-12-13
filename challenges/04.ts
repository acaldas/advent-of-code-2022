import fs from "fs";

function pairToValues(pair: string) {
  const p = pair.split(",").map((range) => range.split("-"));
  const [a0, a1, b0, b1] = p.reduce((acc, curr) => {
    return [...acc, ...curr.map((v) => parseInt(v))];
  }, new Array<number>());
  return [a0, a1, b0, b1] as const;
}

function part1(input: string) {
  console.log(
    input.split("\n").filter((pair) => {
      const [a0, a1, b0, b1] = pairToValues(pair);
      return (a0 <= b0 && a1 >= b1) || (b0 <= a0 && b1 >= a1);
    }).length
  );
}

function part2(input: string) {
  console.log(
    input.split("\n").filter((pair) => {
      const [a0, a1, b0, b1] = pairToValues(pair);
      return (
        (a0 >= b0 && a0 <= b1) ||
        (a1 >= b0 && a1 <= b1) ||
        (b0 >= a0 && b0 <= a1) ||
        (b1 >= a0 && b1 <= a1)
      );
    }).length
  );
}

async function main() {
  const input = await fs.readFileSync("./challenges/04.txt", "utf8");
  await part1(input);
  await part2(input);
}

main();

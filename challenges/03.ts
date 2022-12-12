import fs from "fs";

const letters = "abcdefghijklmnopqrstuvwxyz";
const priorities = [...letters.split(""), ...letters.toUpperCase().split("")];

const getPriority = (letter: string) => priorities.indexOf(letter) + 1;

function getCommonItemType(items: string) {
  const first = items.slice(0, items.length / 2);
  const second = items.slice(-items.length / 2);
  return first.split("").find((l) => second.includes(l)) || "";
}

async function part1(input: string) {
  console.log(
    input
      .split("\n")
      .reduce(
        (total, items) => total + getPriority(getCommonItemType(items)),
        0
      )
  );
}

async function part2(input: string) {
  const items = input.split("\n");
  let total = 0;
  for (let i = 0; i < items.length - 2; i += 3) {
    total += getPriority(
      items[i]
        .split("")
        .find((l) => items[i + 1].includes(l) && items[i + 2].includes(l)) || ""
    );
  }
  console.log(total);
}

async function main() {
  const input = await fs.readFileSync("./challenges/03.txt", "utf8");
  await part1(input);
  await part2(input);
}

main();

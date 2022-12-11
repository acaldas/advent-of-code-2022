import fs from "fs";

enum Shape {
  Rock,
  Paper,
  Scissors,
}

const ShapeWin: Record<Shape, Shape> = {
  [Shape.Rock]: Shape.Paper,
  [Shape.Paper]: Shape.Scissors,
  [Shape.Scissors]: Shape.Rock,
};

const ShapeScore: Record<Shape, number> = {
  [Shape.Rock]: 1,
  [Shape.Paper]: 2,
  [Shape.Scissors]: 3,
};

const PlayShape: Record<string, Shape> = {
  A: Shape.Rock,
  B: Shape.Paper,
  C: Shape.Scissors,
  X: Shape.Rock,
  Y: Shape.Paper,
  Z: Shape.Scissors,
};

enum OutcomeScore {
  "Lost" = 0,
  "Draw" = 3,
  "Won" = 6,
}

function getScore(shapeOpp: Shape, shapePlayer: Shape) {
  let outcomeScore = 0;
  if (shapeOpp === shapePlayer) {
    outcomeScore = OutcomeScore.Draw;
  } else if (ShapeWin[shapeOpp] === shapePlayer) {
    outcomeScore = OutcomeScore.Won;
  } else if (ShapeWin[shapePlayer] === shapeOpp) {
    outcomeScore = OutcomeScore.Lost;
  }

  return outcomeScore + ShapeScore[shapePlayer];
}

function getPlayShapes1(play: string) {
  const [opp, player] = play.split(" ");
  const shapeOpp = PlayShape[opp];
  const shapePlayer = PlayShape[player];
  return [shapeOpp, shapePlayer] as const;
}

function getPlayShapes2(play: string) {
  const [opp, outcome] = play.split(" ");
  const shapeOpp = PlayShape[opp];
  let shapePlayer = shapeOpp;
  // lose
  if (outcome === "X") {
    const index = Object.values(ShapeWin).findIndex((s) => s === shapeOpp);
    shapePlayer = Object.keys(ShapeWin)[index] as unknown as Shape;
  } else if (outcome === "Z") {
    shapePlayer = ShapeWin[shapeOpp];
  }
  return [shapeOpp, shapePlayer] as const;
}

async function part1(input: string) {
  console.log(
    input
      .split("\n")
      .reduce((total, play) => total + getScore(...getPlayShapes1(play)), 0)
  );
}

async function part2(input: string) {
  console.log(
    input
      .split("\n")
      .reduce((total, play) => total + getScore(...getPlayShapes2(play)), 0)
  );
}

async function main() {
  const input = await fs.readFileSync("./challenges/02.txt", "utf8");
  await part1(input);
  await part2(input);
}

main();

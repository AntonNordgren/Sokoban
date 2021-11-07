let gameDone = false;

let Player = {
  X: 11,
  Y: 11,
}

let blockCounter = 0;
class Block {
  constructor(id, y, x) {
    this.id = id;
    this.y = y;
    this.x = x;
  }
}

let goalCounter = 0;
class Goal {
  constructor(id, y, x) {
    this.id = id;
    this.y = y;
    this.x = x;
  }
}

let blocks = [];
let goals = [];

let currentMap = LoadMap(tileMap01, 40, 40);
drawMap(currentMap);

function fixStartTile() {
  currentMap[Player.X][Player.Y].classList.add(Tiles.Space);
}

fixStartTile();

function LoadMap(tileMap, width, height) {
  let result = [];

  for (let i = 0; i < tileMap.height; i++) {
    let row = [];

    for (let y = 0; y < tileMap.width; y++) {
      let newTile = document.createElement("img");
      newTile.width = width;
      newTile.height = height;

      newTile.classList.add(Tiles.Space);

      if (tileMap.mapGrid[i][y] == "W") {
        newTile.classList.add(Tiles.Wall);
      }
      else if (tileMap.mapGrid[i][y] == "B") {
        newTile.classList.add(Entities.Block);
        blocks.push(new Block(blockCounter++, i, y));
      }
      else if (tileMap.mapGrid[i][y] == "P") {
        newTile.classList.add(Entities.Character);
      }
      else if (tileMap.mapGrid[i][y] == "G") {
        newTile.classList.add(Tiles.Goal);
        goals.push(new Goal(goalCounter++, i, y));
      }

      row.push(newTile);
    }

    result.push(row);
  }

  return result;
}

document.addEventListener('keydown', (event) => {

  event.preventDefault();

  switch (event.key) {
    case "ArrowUp":
      movePlayer("up");
      break;
    case "ArrowLeft":
      movePlayer("left");
      break;
    case "ArrowDown":
      movePlayer("down");
      break;
    case "ArrowRight":
      movePlayer("right");
      break;
  }
});

function drawMap(tileMap) {
  for (let i = 0; i < tileMap.length; i++) {

    let newRow = document.createElement("div");
    newRow.classList.add("rowContainer");

    for (let y = 0; y < tileMap[i].length; y++) {
      newRow.appendChild(tileMap[i][y]);
    }

    document.getElementById("map").appendChild(newRow);
  }
}

function movePlayer(direction) {
  console.log(Player)
  if (!gameDone) {

    if (direction == "up") {
      if (!currentMap[Player.Y - 1][Player.X].classList.contains(Tiles.Wall)) {

        if (currentMap[Player.Y - 1][Player.X].classList.contains(Entities.Block)) {

          if (!currentMap[Player.Y - 2][Player.X].classList.contains(Tiles.Wall) &&
            !currentMap[Player.Y - 2][Player.X].classList.contains(Entities.Block)) {

            currentMap[Player.Y - 1][Player.X].classList.remove(Entities.Block);
            currentMap[Player.Y - 2][Player.X].classList.add(Entities.Block);

            currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
            currentMap[--Player.Y][Player.X].classList.add(Entities.Character);

            for (let i = 0; i < blocks.length; i++) {

              console.log(Player.X, Player.Y);

              if (blocks[i].x == Player.X && blocks[i].y == Player.Y) {
                console.log(blocks[i]);
                blocks[i].y--;

                if (currentMap[blocks[i].y][blocks[i].x].classList.contains(Tiles.Goal)) {
                  currentMap[blocks[i].y + 1][blocks[i].x].classList.remove(Entities.BlockDone);
                  currentMap[blocks[i].y][blocks[i].x].classList.add(Entities.BlockDone);
                }
                else {
                  currentMap[blocks[i].y + 1][blocks[i].x].classList.remove(Entities.BlockDone);
                }
              }
            }

          }
        }
        else {
          currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
          currentMap[--Player.Y][Player.X].classList.add(Entities.Character);
        }

      }
    }

    if (direction == "left") {

      if (!currentMap[Player.Y][Player.X - 1].classList.contains(Tiles.Wall)) {

        if (currentMap[Player.Y][Player.X - 1].classList.contains(Entities.Block)) {

          if (!currentMap[Player.Y][Player.X - 2].classList.contains(Tiles.Wall) &&
            !currentMap[Player.Y][Player.X - 2].classList.contains(Entities.Block)) {

            currentMap[Player.Y][Player.X - 1].classList.remove(Entities.Block);
            currentMap[Player.Y][Player.X - 2].classList.add(Entities.Block);

            currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
            currentMap[Player.Y][--Player.X].classList.add(Entities.Character);

            for (let i = 0; i < blocks.length; i++) {
              console.log(Player.X, Player.Y);
              if (blocks[i].x == Player.X && blocks[i].y == Player.Y) {
                console.log(blocks[i]);
                blocks[i].x--;

                if (currentMap[blocks[i].y][blocks[i].x].classList.contains(Tiles.Goal)) {
                  currentMap[blocks[i].y][blocks[i].x + 1].classList.remove(Entities.BlockDone);
                  currentMap[blocks[i].y][blocks[i].x].classList.add(Entities.BlockDone);
                }
                else {
                  currentMap[blocks[i].y][blocks[i].x + 1].classList.remove(Entities.BlockDone);
                }
              }
            }


          }
        }
        else {
          currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
          currentMap[Player.Y][--Player.X].classList.add(Entities.Character);
        }


      }
    }

    if (direction == "down") {

      if (!currentMap[Player.Y + 1][Player.X].classList.contains(Tiles.Wall)) {

        if (currentMap[Player.Y + 1][Player.X].classList.contains(Entities.Block)) {

          if (!currentMap[Player.Y + 2][Player.X].classList.contains(Tiles.Wall) &&
            !currentMap[Player.Y + 2][Player.X].classList.contains(Entities.Block)) {

            currentMap[Player.Y + 1][Player.X].classList.remove(Entities.Block);
            currentMap[Player.Y + 2][Player.X].classList.add(Entities.Block);

            currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
            currentMap[++Player.Y][Player.X].classList.add(Entities.Character);

            for (let i = 0; i < blocks.length; i++) {
              console.log(Player.X, Player.Y);

              if (blocks[i].x == Player.X && blocks[i].y == Player.Y) {
                console.log(blocks[i]);
                blocks[i].y++;

                if (currentMap[blocks[i].y][blocks[i].x].classList.contains(Tiles.Goal)) {
                  currentMap[blocks[i].y - 1][blocks[i].x].classList.remove(Entities.BlockDone);
                  currentMap[blocks[i].y][blocks[i].x].classList.add(Entities.BlockDone);
                }
                else {
                  currentMap[blocks[i].y - 1][blocks[i].x].classList.remove(Entities.BlockDone);
                }
              }
            }


          }
        }
        else {
          currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
          currentMap[++Player.Y][Player.X].classList.add(Entities.Character);
        }


      }

    }

    if (direction == "right") {

      if (!currentMap[Player.Y][Player.X + 1].classList.contains(Tiles.Wall)) {

        if (currentMap[Player.Y][Player.X + 1].classList.contains(Entities.Block)) {

          if (!currentMap[Player.Y][Player.X + 2].classList.contains(Tiles.Wall) &&
            !currentMap[Player.Y][Player.X + 2].classList.contains(Entities.Block)) {

            currentMap[Player.Y][Player.X + 1].classList.remove(Entities.Block);
            currentMap[Player.Y][Player.X + 2].classList.add(Entities.Block);

            currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
            currentMap[Player.Y][++Player.X].classList.add(Entities.Character);

            for (let i = 0; i < blocks.length; i++) {
              console.log(Player.X, Player.Y);

              if (blocks[i].x == Player.X && blocks[i].y == Player.Y) {
                console.log(blocks[i]);
                blocks[i].x++;

                if (currentMap[blocks[i].y][blocks[i].x].classList.contains(Tiles.Goal)) {
                  currentMap[blocks[i].y][blocks[i].x - 1].classList.remove(Entities.BlockDone);
                  currentMap[blocks[i].y][blocks[i].x].classList.add(Entities.BlockDone);
                }
                else {
                  currentMap[blocks[i].y][blocks[i].x - 1].classList.remove(Entities.BlockDone);
                }

              }
            }


          }
        }
        else {
          currentMap[Player.Y][Player.X].classList.remove(Entities.Character);
          currentMap[Player.Y][++Player.X].classList.add(Entities.Character);
        }


      }

    }

    if (checkIfDone()) {
      alert("You cleared the level!");
      gameDone = true;
    }

  }
}

function checkIfDone() {
  let listOfDone = []

  for (let i = 0; i < goals.length; i++) {

    for (let y = 0; y < blocks.length; y++) {

      if (goals[i].x == blocks[y].x && goals[i].y == blocks[y].y) {
        listOfDone.push(1);
      }
    }
  }

  if (listOfDone.length == blocks.length) {
    return true;
  }
  return false;

}
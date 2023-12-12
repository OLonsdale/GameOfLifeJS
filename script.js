"use strict"

const rows = 150
const cols = 150

const data = [[]]

let table = document.createElement("table")

init()

function init() {

  table.remove()
  table = document.createElement("table")

  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr")
    data.push([])
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td")
      if(data[i][j]){
        cell.classList.add("active")
      }
      cell.onclick = (() => cellClick(i,j))
      row.append(cell)
      data[i][j] = false;
    }
    table.append(row)
  }
  app.append(table)

}

function render(){

  table.remove()
  table = document.createElement("table")

  for (let i = 0; i < rows; i++) {
    let row = document.createElement("tr")
    for (let j = 0; j < cols; j++) {
      let cell = document.createElement("td")
      if(data[i][j]){
        cell.classList.add("active")
      }
      cell.onclick = (() => cellClick(i,j))
      row.append(cell)
    }
    table.append(row)
  }
  app.append(table)

}
function cellClick(x,y){
  data[x][y] = !data[x][y] 
  render()
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function step() {

  let toChange = []
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let colIndex = 0; colIndex < cols; colIndex++) {
      
      let activeNeighbours = 0
      
      activeNeighbours += data[(rowIndex - 1 + rows) % rows][ (colIndex - 1 + cols) % cols] ? 1 : 0;
      activeNeighbours += data[(rowIndex - 1 + rows) % rows][ colIndex] ? 1 : 0;
      activeNeighbours += data[(rowIndex - 1 + rows) % rows][ (colIndex + 1) % cols] ? 1 : 0;

      activeNeighbours += data[rowIndex][ (colIndex - 1 + cols) % cols] ? 1 : 0;
      activeNeighbours += data[rowIndex][ (colIndex + 1) % cols] ? 1 : 0;

      activeNeighbours += data[(rowIndex + 1) % rows][ (colIndex - 1 + cols) % cols] ? 1 : 0;
      activeNeighbours += data[(rowIndex + 1) % rows][ colIndex] ? 1 : 0;
      activeNeighbours += data[(rowIndex + 1) % rows][ (colIndex + 1) % cols] ? 1 : 0;

      if(data[rowIndex][colIndex] === true && (activeNeighbours === 0 || activeNeighbours === 1 || activeNeighbours > 3)){
        toChange.push({row: rowIndex, col:colIndex})
      }
      else if (data[rowIndex][colIndex] === false && activeNeighbours === 3){
        toChange.push({row: rowIndex, col:colIndex})
      }
    }
  }

  toChange.forEach(element => {
    data[element.row][element.col] = !data[element.row][element.col]
  });

  render()

  await sleep(10)
  step()
}
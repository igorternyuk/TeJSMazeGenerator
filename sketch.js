var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;
const CELL_SIZE = 40;
const Direction = Object.freeze({ NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 });
const Offsets = [{dir: Direction.NORTH, dx: 0, dy: -1}, {dir: Direction.EAST, dx: 1, dy: 0},
                 {dir: Direction.SOUTH, dx: 0, dy: +1}, {dir: Direction.WEST, dx: -1, dy: 0}];
var cols, rows;
var grid = [];
var currentCell, nextCell;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(5);
    cols = CANVAS_WIDTH / CELL_SIZE;
    rows = CANVAS_HEIGHT / CELL_SIZE;
    for(let row = 0; row < rows; ++row){
    	let line = [];
    	for(let col = 0; col < cols; ++col){
    		line.push(new Cell(row, col))
    	}
    	grid.push(line);
    }
    currentCell = grid[0][0];
    nextCell = grid[0][0];
    let vecinos = currentCell.getNeighbours();
    vecinos.forEach(v => {
    	v.cell.print();
    	console.log("dir = " + v.dir);
    });
    console.log("**** Setup finished *****"); 
}


//main loop
function draw() {
	background(70, 70, 70);

	currentCell.visited = true;
	let unvisited = currentCell.getUnvisitedNeighbours();
	if(unvisited && unvisited.length > 0){
		nextCell = unvisited[floor(random(0, unvisited.length))].cell;	
		currentCell = nextCell;
	}

	for(let row = 0; row < rows; ++row){
		for(let col = 0; col < cols; ++col){
			grid[row][col].render();
		}
	}	
	
}

function isValidCellCoords(row, col){
	return row >= 0 && row < grid.length && col >= 0 && col < grid[row].length;
}

class Cell {
	constructor(row, col){
		this.row = row;
		this.col = col;
		this.x = this.col * CELL_SIZE;
		this.y = this.row * CELL_SIZE;
		this.walls = [true, true, true, true];
		this.visited = false;	
	}

	getNeighbours(){
		let neighbours = [];
		Offsets.forEach(offset => {
			let newCol = this.col + offset.dx;
			let newRow = this.row + offset.dy;
			if(isValidCellCoords(newRow, newCol)){
				neighbours.push({ cell: grid[newRow][newCol], dir: offset.dir });
			}
		});
		return neighbours;
	}

	getUnvisitedNeighbours(){
		return this.getNeighbours().filter(neighbour => !neighbour.cell.visited);
	}
	
	render(){

		if(this.visited){
			fill(255, 0, 255, 100);
			rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
		}

		stroke(255);
		//strokeWeight(2);
		//fill(255,255,0);
		//noFill();
		//rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
		//Top wall
		if(this.walls[Direction.NORTH]){
			line(this.x, this.y, this.x + CELL_SIZE, this.y);	
		}
		
		//Right wall
		if(this.walls[Direction.EAST]){
			line(this.x + CELL_SIZE, this.y, this.x + CELL_SIZE, this.y + CELL_SIZE);
		}

		//Bottom wall
		if(this.walls[Direction.SOUTH]){
			line(this.x + CELL_SIZE, this.y + CELL_SIZE, this.x, this.y + CELL_SIZE);
		}

		//Left wall
		if(this.walls[Direction.WEST]){
			line(this.x, this.y + CELL_SIZE, this.x, this.y);
		}
	}

	print(){
		console.log("=======================================")
		console.log("{ row = " + this.row + " col = " + this.col + "}");
		console.log("=======================================")
	}
}


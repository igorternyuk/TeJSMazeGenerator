var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;
const CELL_SIZE = 20;
const Direction = Object.freeze({ NORTH: 0, EAST: 1, SOUTH: 2, WEST: 3 });
const Offsets = [{dir: Direction.NORTH, dx: 0, dy: -1}, {dir: Direction.EAST, dx: 1, dy: 0},
                 {dir: Direction.SOUTH, dx: 0, dy: +1}, {dir: Direction.WEST, dx: -1, dy: 0}];
var cols, rows;
var grid = [];
var stack = [];
var currentCell, nextCell;

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(20);
    cols = CANVAS_WIDTH / CELL_SIZE;
    rows = CANVAS_HEIGHT / CELL_SIZE;
    for(let row = 0; row < rows; ++row){
    	let line = [];
    	for(let col = 0; col < cols; ++col){
    		line.push(new Cell(row, col));
    	}
    	grid.push(line);
    }
    currentCell = grid[0][0];
    nextCell = grid[0][0];
}


//main loop
function draw() {
	background(70, 70, 70);

	currentCell.visited = true;
	currentCell.highlight();
	let unvisited = currentCell.getUnvisitedNeighbours();
	if(unvisited.length > 0){
		stack.push(currentCell);
		let randNeighbour = unvisited[floor(random(0, unvisited.length))];
		nextCell = randNeighbour.cell;
		let nextCellDir = randNeighbour.dir;
		currentCell.walls[nextCellDir] = false;
		nextCell.walls[getOppositeDirection(nextCellDir)] = false;	
		currentCell = nextCell;
	} else {
		if(stack.length > 0) {
			currentCell = stack.pop();
		}		
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

function getOppositeDirection(dir){
	if(dir === Direction.NORTH){
		return Direction.SOUTH;
	}

	if(dir === Direction.SOUTH){
		return Direction.NORTH;
	}

	if(dir === Direction.WEST){
		return Direction.EAST;
	}

	if(dir === Direction.EAST){
		return Direction.WEST;
	}
}
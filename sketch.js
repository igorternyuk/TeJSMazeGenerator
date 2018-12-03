var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;
const CELL_SIZE = 40;

var cols, rows;
var grid = [];

function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    frameRate(10);
    cols = CANVAS_WIDTH / CELL_SIZE;
    rows = CANVAS_HEIGHT / CELL_SIZE;
    for(let row = 0; row < rows; ++row){
    	let line = [];
    	for(let col = 0; col < cols; ++col){
    		line.push(new Cell(row, col))
    	}
    	grid.push(line);
    }
}


//main loop
function draw() {
	background(70, 70, 70);
	for(let row = 0; row < rows; ++row){
		for(let col = 0; col < cols; ++col){
			grid[row][col].render();
		}
	}
}

class Cell {
	constructor(row, col){
		this.row = row;
		this.col = col;
		this.x = this.col * CELL_SIZE;
		this.y = this.row * CELL_SIZE;	
	}
	
	render(){
		stroke(255);
		noFill();
		rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
	}
}


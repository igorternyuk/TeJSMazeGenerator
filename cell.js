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

	highlight(){
		fill(0, 255, 0);
		noStroke();
		rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
	}
	
	render(){

		if(this.visited){
			fill(255, 0, 255, 100);
			noStroke();
			rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
		}

		stroke(255);
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
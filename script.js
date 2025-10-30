const grid = document.querySelector(".grid");

// create a grid of 16x16 cells
createGrid(16, 16, 32);

//
function createCell(cellSize) {
	const cell = document.createElement("div");
	cell.style.backgroundColor = "gray";
	cell.style.borderStyle = "solid";
	cell.style.width = cellSize + "px";
	cell.style.height = cellSize + "px";

	return cell;
}

function createGrid(height, width, cellSize) {
	let grid = document.createElement("div");
	grid.style.display = "flex";
	grid.style.flexWrap = "wrap";
	grid.style.justifyContent = "flex-start";
	grid.style.alignContent = "flex-start";
	grid.style.width = width * cellSize + "px";
	grid.style.height = height * cellSize + "px";

	for (let x = 0; x < height; x++) {
		for (let y = 0; y < width; y++) {
			const cell = createCell(cellSize);
			grid.appendChild(cell);
		}
	}

	document.querySelector("body").appendChild(grid);
}

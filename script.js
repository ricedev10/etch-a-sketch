const body = document.querySelector("body");

// create a grid of 16x16 cells
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
body.appendChild(container);

const grid = createGrid(16, 16, 16);
grid.style.alignSelf = "center";
container.appendChild(grid);

//
function createCell(cellSize) {
	const cell = document.createElement("div");
	cell.style.backgroundColor = "gray";
	cell.style.borderStyle = "solid";
	cell.style.borderWidth = "0px";
	cell.style.width = cellSize + "px";
	cell.style.height = cellSize + "px";

	// add hovering effect to cell
	{
		let cooldown = 0;
		cell.addEventListener("mouseenter", () => {
			cell.style.backgroundColor = "red";
		});
		cell.addEventListener("mouseleave", () => {
			cooldown += 0.2;
			setTimeout(
				() => (cell.style.backgroundColor = "gray"),
				cooldown * 1000
			);
		});
	}

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
			cell.setAttribute("class", "cell");
			grid.appendChild(cell);
		}
	}

	return grid;
}

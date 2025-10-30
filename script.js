"use strict";
const body = document.querySelector("body");
const gridSize = document.querySelector("#grid-size");

const pixelDensityInput = document.querySelector(
	".pixel-density"
);

let pixelDensity = +pixelDensityInput.value;
let before = pixelDensityInput.value;
pixelDensityInput.addEventListener("focus", (event) => {
	before = pixelDensityInput.value;
});
pixelDensityInput.addEventListener(
	"beforeinput",
	(event) => {
		let num = +event.data;
		if (isNaN(num)) {
			event.preventDefault();
		}
	}
);
pixelDensityInput.addEventListener("keydown", (event) => {
	if (event.key == "Enter") {
		pixelDensityInput.blur();
		const newValue = +pixelDensityInput.value;
		if (newValue > 100) {
			pixelDensityInput.value = before;
		} else {
			pixelDensity = newValue;
			updateGrid();
		}
	}
});

// create a grid of 16x16 cells
const container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
body.appendChild(container);

let grid = createGrid(+gridSize.value, pixelDensity);
container.appendChild(grid);

// configuration of grid
gridSize.addEventListener("focusout", updateGrid);
gridSize.addEventListener("input", (event) =>
	console.log(event.key)
);

//
function updateGrid() {
	const newGridSize = +gridSize.value;

	if (
		typeof newGridSize != "number" &&
		typeof newGridSize != "number"
	) {
		return;
	}

	// remove current grid, and create a new one based on settings
	grid.remove();
	grid = createGrid(newGridSize, pixelDensity);
	container.appendChild(grid);
}

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
		cell.addEventListener("mouseleave", (event) => {
			cooldown += 0.2;
			setTimeout(
				() => (cell.style.backgroundColor = "gray"),
				cooldown * 1000
			);
		});
	}

	return cell;
}

function createGrid(size, density) {
	let grid = document.createElement("div");
	grid.style.alignSelf = "center";
	grid.style.display = "flex";
	grid.style.flexWrap = "wrap";
	grid.style.justifyContent = "flex-start";
	grid.style.alignContent = "flex-start";
	grid.style.width = size + "px";
	grid.style.height = size + "px";

	const cellSize = size / density;
	size /= cellSize;

	for (let x = 0; x < size; x++) {
		for (let y = 0; y < size; y++) {
			const cell = createCell(cellSize);
			cell.setAttribute("class", "cell");
			grid.appendChild(cell);
		}
	}

	return grid;
}

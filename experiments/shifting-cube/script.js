import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const letters = {
  m: ["a3", "a1", "b2", "c1", "c3"],
  a: ["a3", "b1", "c3"],
  v: ["a1", "b3", "c1"],
  i: ["b1", "b3"],
};

const shapes = {
  mavi: {
    a1: { x: 0, y: 0 },
    b1: { x: 50, y: 0 },
    c1: { x: 100, y: 0 },
    b2: { x: 50, y: 50 },
    a3: { x: 0, y: 100 },
    b3: { x: 50, y: 100 },
    c3: { x: 100, y: 100 },
  },

  cube: {
    a1: { x: 0, y: 16.666 },
    b1: { x: 50, y: 116.666 },
    c1: { x: 100, y: 16.666 },
    b2: { x: 50, y: -16.666 },
    a3: { x: 0, y: 83.333 },
    b3: { x: 50, y: 50 },
    c3: { x: 100, y: 83.333 },
  },
};

// Clone the shapes object
let coordinates = JSON.parse(JSON.stringify(shapes.mavi));

// Define constraint boundaries as global variables
const constraintTopLeft = { x: -50, y: -50 };
const constraintBottomRight = { x: 150, y: 150 };

const svg = d3.select("#logo");
const thickness = 10;
const radius = 12.5;
const smallCircleRadius = 10;

// Define the array of colors
let colors = [
  "Plum",
  "RebeccaPurple",
  "Indigo",
  "HotPink",
  "DeepPink",
  "Turquoise",
  "PowderBlue",
  "Tomato",
  "Coral",
];

colors = colors.map((color) => d3.color(color).formatHex());

// Function to create path string from letter
function createPathString(letter) {
  return letter
    .map((point) => `L ${coordinates[point].x} ${coordinates[point].y}`)
    .join(" ")
    .replace("L", "M");
}

// Function to update paths
function updatePaths() {
  Object.keys(letters).forEach((letter) => {
    svg.select(`path#${letter}`).attr("d", createPathString(letters[letter]));
  });
}

// Function to update coordinates on drag with constraints
function dragHandler(event, d) {
  // Constrain the x and y coordinates
  const constrainedX = Math.max(
    constraintTopLeft.x,
    Math.min(constraintBottomRight.x, event.x)
  );
  const constrainedY = Math.max(
    constraintTopLeft.y,
    Math.min(constraintBottomRight.y, event.y)
  );

  d3.select(this)
    .attr("cx", (d.x = constrainedX))
    .attr("cy", (d.y = constrainedY));

  coordinates[d.id].x = constrainedX;
  coordinates[d.id].y = constrainedY;

  // Update small circles
  svg
    .select(`circle#small-${d.id}`)
    .attr("cx", constrainedX)
    .attr("cy", constrainedY);

  updatePaths();
}

const drag = d3.drag().on("drag", dragHandler);

// Create big circles
svg
  .selectAll("circle.big-circle")
  .data(Object.entries(coordinates).map(([id, { x, y }]) => ({ id, x, y })))
  .enter()
  .append("circle")
  .attr("class", "big-circle")
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("r", radius)
  .attr("fill", "DeepPink")
  .attr("opacity", 0)
  .call(drag);

// Function to get small circle data
function getSmallCircleData() {
  return Object.entries(coordinates).map(([id, { x, y }]) => ({
    id: `small-${id}`,
    x: x, // Positioning the small circle at the edge of the big circle
    y: y,
    bigCircleId: id,
  }));
}

// Create small circles
svg
  .selectAll(".small-circle")
  .data(getSmallCircleData())
  .enter()
  .append("circle")
  .attr("class", "small-circle")
  .attr("id", (d) => d.id)
  .attr("cx", (d) => d.x)
  .attr("cy", (d) => d.y)
  .attr("fill", () => getRandomColor()) // Assign a unique random color for each path;
  .attr("r", () => {
    const min = smallCircleRadius * 0.5; // Minimum value of the range
    const max = smallCircleRadius * 2; // Maximum value of the range
    return Math.random() * (max - min) + min; // Random value within the range
  });

// Function to get a random color from the array
function getRandomColor(index) {
  if (index && index < colors.length) {
    return colors[index];
  }
  return colors[Math.floor(Math.random() * colors.length)];
}

// Create paths
Object.keys(letters).forEach((letter) => {
  svg
    .append("path")
    .attr("id", letter)
    .attr("d", createPathString(letters[letter]))
    .attr("stroke", getRandomColor())
    .attr("stroke-width", () => {
      const min = thickness * 0.5; // Minimum value of the range
      const max = thickness * 2; // Maximum value of the range
      return Math.random() * (max - min) + min; // Random value within the range
    })
    .attr("stroke-linecap", "round")
    .attr("stroke-linejoin", "round")
    .attr("fill", "none");
});

// Function to randomize coordinates with transition
function randomize(shape) {
  if (shape && shape in shapes) {
    coordinates = JSON.parse(JSON.stringify(shapes[shape]));
  } else {
    Object.keys(coordinates).forEach((key) => {
      // Generate random coordinates within constraints
      coordinates[key].x =
        Math.random() * (constraintBottomRight.x - constraintTopLeft.x) +
        constraintTopLeft.x;
      coordinates[key].y =
        Math.random() * (constraintBottomRight.y - constraintTopLeft.y) +
        constraintTopLeft.y;
    });
  }

  // Transition duration
  const transitionDuration = 750;

  let data = Object.entries(coordinates).map(([id, { x, y }]) => ({
    id,
    x,
    y,
  }));

  // Transition for big circles
  svg
    .selectAll("circle.big-circle")
    .data(data)
    .transition()
    .duration(transitionDuration)
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);

  // Transition for small circles
  svg
    .selectAll(".small-circle")
    .data(getSmallCircleData())
    .transition()
    .duration(transitionDuration)
    .attr("fill", () => {
      if (shape === "cube") {
        return getRandomColor(4);
      }
      return getRandomColor();
    }) // Assign a unique random color for each path;
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", () => {
      if (shape === "cube") {
        return thickness;
      }
      const min = thickness * 0.5; // Minimum value of the range
      const max = thickness * 2; // Maximum value of the range
      return Math.random() * (max - min) + min; // Random value within the range
    });

  // Transition for paths
  Object.keys(letters).forEach((letter) => {
    svg
      .select(`path#${letter}`)
      .transition()
      .duration(transitionDuration)
      .attr("d", createPathString(letters[letter]))
      .attr("stroke-width", () => {
        if (shape === "cube") {
          return thickness;
        }
        const min = thickness * 0.5; // Minimum value of the range
        const max = thickness * 2; // Maximum value of the range
        return Math.random() * (max - min) + min; // Random value within the range
      })
      .attr("stroke", () => {
        if (shape === "cube") {
          return getRandomColor(4);
        }
        return getRandomColor();
      }); // Assign a unique random color for each path;
  });
}

function download() {
  let svg = document.getElementById("logo");
  let serializer = new XMLSerializer();
  let svgBlob = new Blob([serializer.serializeToString(svg)], {
    type: "image/svg+xml",
  });

  // Generate a unique filename
  let filename = "logo-" + new Date().getTime() + ".svg";

  // Create an anchor tag and trigger download
  let downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(svgBlob);
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Event listener for the shuffle button
document.querySelector("#shuffle").addEventListener("click", () => {
  randomize();
});

document.querySelector("#download").addEventListener("click", () => {
  download();
});

document.querySelectorAll("button[data-shape]").forEach((button) => {
  button.addEventListener("click", () => {
    randomize(button.dataset.shape);
  });
});

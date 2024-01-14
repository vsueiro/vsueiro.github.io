const letters = {
  m: ["a3", "a1", "b2", "c1", "c3"],
  a: ["a3", "b1", "c3"],
  v: ["a1", "b2", "c1"],
  i: ["b1", "b3"],
};

const dots = {
  a1: { x: 0, y: 0 },
  b1: { x: 50, y: 0 },
  c1: { x: 100, y: 0 },
  b2: { x: 50, y: 50 },
  a3: { x: 0, y: 100 },
  b3: { x: 50, y: 100 },
  c3: { x: 100, y: 100 },
};

// Select <svg> element
const logo = document.querySelector("svg#logo");

// Draw circles
for (const letter in letters) {
  const points = letters[letter];
  for (const point of points) {
    const coords = dots[point];
    const markup = `
      <circle cx="${coords.x}" cy="${coords.y}" r="4"></circle>
      `;
    logo.insertAdjacentHTML("beforeend", markup);
  }
}

// Draw paths
for (const letter in letters) {
  const points = letters[letter];
  let d = "";

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const coords = dots[point];
    if (i === 0) {
      d += `M ${coords.x} ${coords.y} `;
    } else {
      d += `L ${coords.x} ${coords.y} `;
    }
  }

  const pathMarkup = `<path d="${d}" stroke="black" fill="none" />`;
  logo.insertAdjacentHTML("beforeend", pathMarkup);
}

class Grid {
  constructor(options) {
    // Status
    // 0: blank cell
    // 1: painted cell

    // Define default values
    const defaults = {
      rows: 24,
      cols: 24,
      side: 24,
      lineWidth: 2,
      parent: document.body,
    };

    // Use defaults if custom value was not passed
    this.opt = Object.assign({}, defaults, options);

    // Create list of rows, each containing a list of columns
    this.rows = Array.from({ length: this.opt.rows }, () =>
      Array(this.opt.cols).fill(0)
    );

    // Will be true if a touch event is ever fired
    this.isTouch = false;

    // Will hold {row: N, col: N} when hovered
    this.hovered = false;

    // Will br "painter" or "eraser"
    this.role = "painter";

    // Create <canvas>
    this.setup();

    // Draw grid cells
    this.draw();
  }

  setup() {
    // Create <canvas> element
    this.canvas = document.createElement("canvas");

    // Calculate dimensions
    this.w = this.opt.cols * this.opt.side;
    this.h = this.opt.rows * this.opt.side;

    // Apply dimensions
    this.canvas.width = this.w;
    this.canvas.height = this.h;

    // Enable 2D tools
    this.ctx = this.canvas.getContext("2d");

    // Add to page
    this.opt.parent.append(this.canvas);

    // Enable mousedown event
    this.canvas.addEventListener("mousedown", (event) =>
      this.handleMousedown(event)
    );

    // Enable mousemove event
    this.canvas.addEventListener("mousemove", (event) =>
      this.handleMousemove(event)
    );

    // Enable touchstart event (but apply mousedown rules)
    this.canvas.addEventListener("touchstart", (event) =>
      this.handleMousedown(event)
    );

    // Enable touchmove event
    this.canvas.addEventListener("touchmove", (event) =>
      this.handleTouchmove(event)
    );

    // Enable mouseleave evenet
    this.canvas.addEventListener("mouseleave", (event) =>
      this.handleMouseleave(event)
    );
  }

  getCell(event) {
    // These will hold click coordinates
    let clientX, clientY;

    // If is touch event
    if (event.touches) {
      // Turn flag on
      this.isTouch = true;

      // Use first touch position
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      // Otherwise, use cursor position
      clientX = event.clientX;
      clientY = event.clientY;
    }

    // Get position of cursor click (may work on zoomed canvas)
    const bounding = this.canvas.getBoundingClientRect();
    const scale = this.canvas.width / parseFloat(bounding.width);
    const x = (clientX - bounding.left) * scale;
    const y = (clientY - bounding.top) * scale;

    // Find clicked cell
    const row = Math.floor((y / this.h) * this.opt.rows);
    const col = Math.floor((x / this.w) * this.opt.cols);

    const status = this.rows[row][col];

    return { row, col, status };
  }

  updateCell(row, col, status) {
    // TEMP: Disable eraser role
    status = 1;

    // Update array of rows and columns
    this.rows[row][col] = status;

    // Draw grid based on new data
    this.draw();
  }

  drawCell(row, col, status) {
    // Get cell coordinates
    const side = this.opt.side;
    const x = col * side;
    const y = row * side;

    // Allow changes to previous settings
    this.ctx.beginPath();

    // Define basic cell style
    this.ctx.lineWidth = this.opt.lineWidth;
    this.ctx.strokeStyle = "GhostWhite";
    this.ctx.fillStyle = "Lavender";

    // Apply different color to clicked cells
    if (status === 1) {
      this.ctx.fillStyle = "HotPink";
    }

    // Draw cell
    this.ctx.rect(x, y, side, side);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawHover(row, col) {
    // Get cell coordinates
    let side = this.opt.side;
    let x = col * side;
    let y = row * side;

    // Adjust so the stroke is “inside”
    x += this.opt.lineWidth / 2;
    y += this.opt.lineWidth / 2;
    side -= this.opt.lineWidth;

    // Allow changes to previous settings
    this.ctx.beginPath();

    // Define basic cell style
    this.ctx.lineWidth = this.opt.lineWidth;
    this.ctx.strokeStyle = "Indigo";

    // Draw hover overlay
    this.ctx.rect(x, y, side, side);
    this.ctx.stroke();
  }

  handleMousedown(event) {
    // Find cell based on cursor position
    const { row, col, status } = this.getCell(event);

    // If cell is already painted
    if (status === 1) {
      // Role will be eraser
      this.role = "eraser";
      this.updateCell(row, col, 0);
    } else if (status === 0) {
      // Role will be painter
      this.role = "painter";
      this.updateCell(row, col, 1);
    }
  }

  handleTouchmove(event) {
    // Find cell based on cursor position
    const { row, col } = this.getCell(event);

    // If current role is eraser
    if (this.role === "eraser") {
      // Clear it
      this.updateCell(row, col, 0);
    } else if (this.role === "painter") {
      // Otherwise, paint it
      this.updateCell(row, col, 1);
    }

    // Disable hover
    this.hovered = false;

    // Draw grid based on new data
    this.draw();
  }

  handleMousemove(event) {
    // Abort if is touch device
    if (this.isTouch) {
      return;
    }

    // Find cell based on cursor position
    const { row, col, status } = this.getCell(event);

    // Check if mouse is pressed
    const pressed = event.buttons === 1;

    // If mouse is being pressed
    if (pressed) {
      // If current role is eraser
      if (this.role === "eraser") {
        // Clear it
        this.updateCell(row, col, 0);
      } else if (this.role === "painter") {
        // Otherwise, paint it
        this.updateCell(row, col, 1);
      }
    }

    // Updated hovered cell
    this.hovered = { row, col };

    // Draw grid based on new data
    this.draw();
  }

  handleMouseleave(event) {
    // Turn off flag
    this.hovered = false;

    // Draw grid based on new data
    this.draw();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  draw() {
    // Clear canvas before drawing
    this.clear();

    // For each row
    for (let [rowIndex, row] of this.rows.entries()) {
      // For each column
      for (let [colIndex, status] of row.entries()) {
        // Draw cell
        this.drawCell(rowIndex, colIndex, status);
      }
    }

    // If user is hovering over grid
    if (this.hovered) {
      // Draw hover overlay
      this.drawHover(this.hovered.row, this.hovered.col);
    }
  }
}

export { Grid };

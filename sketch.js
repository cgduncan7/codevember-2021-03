/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 60;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  let palette;
  let curves = [];

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h);
    canvas = p5canvas.canvas;
    sketch.frameRate(framerate);
    
    const a = sketch.createVector(0.8,0.2,0.5);
    const b = sketch.createVector(0.1,0.2,0.5);
    const c = sketch.createVector(0.5,0.8,0.2);
    const d = sketch.createVector(0.2, 0.99, 0.2);
    palette = new Palette(sketch,a,b,c,d);

    sketch.smooth();
    sketch.background(200, 50);
  }

  sketch.draw = function() {
    sketch.background(200, 50);

    if (curves.length <= 20 && sketch.frameCount % 5 === 0) {
      curves.push(new Curve(sketch, palette.getColor(sketch.random())));
    }

    for (let i = curves.length - 1; i >= 0; i-= 1) {
      let curve = curves[i];
      if (curve.time === 101) {
        curves[i] = new Curve(sketch, palette.getColor(sketch.random()));
      } else {
        curve.draw(sketch);
      }
    }
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));

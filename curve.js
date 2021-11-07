function Curve (sketch, color) {
  this.time = 0;
  this.color = color;
  this.resolution = 35;
  this.points = [
    { x: 0, y: sketch.random(0, sketch.height)},
    { x: sketch.random(sketch.width/3, 2*sketch.width/3), y: sketch.random(sketch.height/3, 2*sketch.height/3) },
    { x: sketch.random(sketch.width/3, 2*sketch.width/3), y: sketch.random(sketch.height/3, 2*sketch.height/3) },
    { x: sketch.width, y: sketch.random(0, sketch.height) },
  ];
}

Curve.prototype.getPointOnCurve = function (sketch, time) {
  const x = sketch.bezierPoint(
    this.points[0].x,
    this.points[1].x,
    this.points[2].x,
    this.points[3].x,
    time
  );
  const y = sketch.bezierPoint(
    this.points[0].y,
    this.points[1].y,
    this.points[2].y,
    this.points[3].y,
    time
  );

  return { x, y };
}

Curve.prototype.drawSegment = function (sketch, time, index) {
  sketch.strokeWeight(this.resolution - index + 1);
  const point = this.getPointOnCurve(sketch, (time - index) / this.resolution);
  const previousPoint = this.getPointOnCurve(sketch, (time - index - 1) / this.resolution);

  sketch.beginShape(sketch.LINES);
  sketch.curveVertex(previousPoint.x, previousPoint.y);
  sketch.curveVertex(point.x, point.y);
  sketch.endShape();
}

Curve.prototype.draw = function (sketch) {
  sketch.push();
  sketch.translate(this.time, 0);
  sketch.stroke(this.color);
  for (let s = 1; s <= this.resolution; s++) {
    this.drawSegment(sketch, this.time, s);
  }
  sketch.pop();

  this.time += 1;
}
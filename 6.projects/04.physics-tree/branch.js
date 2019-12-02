class Branch {
  constructor(begin, end, level) {
    this.level = level;
    this.begin = begin;
    this.end = end;
    let d = dist(this.end.x, this.end.y, this.begin.x, this.begin.y);
    let repulsion = new AttractionBehavior(this.end, d * 0.5, -0.5);
    physics.addBehavior(repulsion);

    let spring = new VerletSpring2D(this.begin, this.end, d, 0.01);
    physics.addSpring(spring);
    this.finished = false;
  }

  show() {
    stroke(255);
    let sw = 4 / log(this.level + 2);
    strokeWeight(sw);
    // strokeWeight(map(this.level, 0, totalLevels, 8, 1));
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branchA() {
    let dir = this.end.sub(this.begin);
    dir.rotate(PI / 6);
    dir.scaleSelf(0.67);
    let newEnd = new VerletParticle2D(this.end.add(dir));
    physics.addParticle(newEnd);
    let b = new Branch(this.end, newEnd, this.level + 1);
    return b;
  }

  branchB() {
    let dir = this.end.sub(this.begin);
    dir.rotate(-PI / 4);
    dir.scaleSelf(0.67);
    let newEnd = new VerletParticle2D(this.end.add(dir));
    physics.addParticle(newEnd);
    let b = new Branch(this.end, newEnd, this.level + 1);
    return b;
  }
}
class Population {
  constructor(target, mutation, num){
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.finished = false;

    this.target = target;
    this.mutationRate = mutation;
    this.num = num;
    this.perfectScore = 1;
    this.best = "";

    for(let i = 0; i < this.num; i++){
      this.population[i] = new DNA(this.target.length);
    }
    this.matingPool = [];
    this.calcFitness();
  }

  calcFitness(){
    for(let i = 0; i < this.population.length; i++){
      this.population[i].calcFitness(target);
    }
  }

  naturalSelection(){
    this.matingPool = [];

    let maxFitness = 0;
    for(let i = 0; i < this.population.length; i++){
      if(this.population[i].fitness > maxFitness){
        maxFitness = this.population[i].fitness;
      }
    }

    for(let i = 0; i < this.population.length; i++){
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let monteCarlo = floor(fitness * 100);
      for(let j = 0; j < monteCarlo; j++){
        this.matingPool.push(this.population[i]);
      }
    }
  }

  generate() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  getBest() {
    return this.best;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  allPhrases() {
    let everything = "";

    let displayLimit = min(this.population.length, 50);


    for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
}

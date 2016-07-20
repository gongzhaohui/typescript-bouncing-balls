/// <reference path="../index.d.ts" />

import Vector2 from './Vector2'

export default class Ball {
  private bouncyness: number = 0.6
  private mass: number = 1
  private previousPosition: Vector2
  private path: Vector2[] = []
  private velocity: Vector2 = new Vector2(0, 0)

  constructor(
    public radius: number,
    private color: string,
    public currentPosition: Vector2,
    private force: Vector2 = new Vector2(0,0)
  ) {
    this.previousPosition = new Vector2(currentPosition.x, currentPosition.y)
  }

  update(deltaTime) {
    var dtSeconds = deltaTime/1000

    // move current to previous
    this.previousPosition.x = this.currentPosition.x
    this.previousPosition.y = this.currentPosition.y

    this.path.push(new Vector2(this.previousPosition.x, this.previousPosition.y))

    // new velocity
    this.velocity.x += (1/this.mass * this.force.x) * dtSeconds
    this.velocity.y += (1/this.mass * this.force.y) * dtSeconds

    // new position
    this.currentPosition.x += this.velocity.x * dtSeconds
    this.currentPosition.y += this.velocity.y * dtSeconds

    // zero forces
    this.force.x = 0
    this.force.y = 0
  }

  bounce() {
    this.velocity.y = 0 - this.velocity.y * this.bouncyness
  }

  render(alpha: number, context: CanvasRenderingContext2D) {
    var interpolatedPosition = new Vector2(
      this.currentPosition.x * alpha + this.previousPosition.x * (1-alpha),
      this.currentPosition.y * alpha + this.previousPosition.y * (1-alpha))

    // draw circle
    context.beginPath()
    context.arc(interpolatedPosition.x, interpolatedPosition.y, this.radius, 0, 2 * Math.PI, false)
    context.fillStyle = this.color
    context.fill()

    // draw trail
    context.beginPath()
    context.moveTo(interpolatedPosition.x, interpolatedPosition.y)
    context.strokeStyle = this.color
    this.path.reverse().forEach((pos) => {
      context.lineTo(pos.x, pos.y)
    })
    context.stroke()
  }

  addForce(force: Vector2) {
    this.force.x += force.x
    this.force.y += force.y
  }

}

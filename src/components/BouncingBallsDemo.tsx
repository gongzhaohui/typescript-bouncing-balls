/// <reference path="../index.d.ts" />

import * as React from 'react'
import * as RandomMaterialColor from 'random-material-color'

import Ball from "./Ball"
import Vector2 from "./Vector2"

var getTime = () => (new Date).getTime()
var randomNumberBetween = (min,max) => Math.floor(Math.random() * (1 + max - min)) + min

export default class BouncingBallsDemo extends React.Component<any, any> {
  refs : {
    [key : string] : (Element)
    canvas? : (HTMLCanvasElement)
  } = {}
  balls : Ball[] = []

  constructor() {
    super()
    this.state = {
      screen: this.getScreenSize(),
      context: null
    }
  }

  start(): Function {
    var fps = 100
    var deltaTime = 1000 / fps
    var accumulator = 0
    var maxDesync = 20 * deltaTime

    var currentTime = getTime()
    var frameStart = currentTime

    let interval = setInterval(() => {
      currentTime = getTime()

      accumulator += currentTime - frameStart

      frameStart = currentTime

      if (accumulator > maxDesync) {
        accumulator = maxDesync
      }

      while (accumulator > deltaTime) {
        this.updatePhysics(deltaTime)
        accumulator -= deltaTime
      }

      let alpha = accumulator / deltaTime
      this.renderFrame(alpha)
    }, 0)

    return () => clearInterval(interval)

  }

  updatePhysics(deltaTime) {
    this.balls.forEach((ball) => {
      ball.addForce(new Vector2(0, 100))
      ball.update(deltaTime)

      // Quick and dirty collision detection & clip avoidance
      if (ball.currentPosition.y + ball.radius >= this.state.screen.height) {
        ball.currentPosition.y = this.state.screen.height - ball.radius
        ball.bounce()
      }
    })
  }

  renderFrame(alpha: number) {
    var context = this.state.context
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
    context.font = "20px Verdana"
    context.fillStyle = "black"
    context.fillText("Click the page",10,50)

    this.balls.forEach((ball) => {
      ball.render(alpha, context)
    })
  }

  updateScreenSize() {
    this.setState({
      screen: this.getScreenSize()
    })
  }

  getScreenSize() : { width: number, height: number } {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateScreenSize.bind(this))
    window.addEventListener(
      'click',
      (e) => this.balls.push(
        new Ball(
          10,
          RandomMaterialColor.getColor(),
          new Vector2(e.clientX, e.clientY),
          new Vector2(randomNumberBetween(5000, 20000), randomNumberBetween(-20000, -5000))
        )
      )
    )

    const context = this.refs.canvas.getContext('2d')
    this.setState({ context: context })

    this.updateScreenSize()
    var stop = this.start()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateScreenSize.bind(this))
  }

  render() {
    return (
      <canvas
        ref="canvas"
        style={{backgroundColor:"#FAFAFA"}}
        width={this.state.screen.width}
        height={this.state.screen.height}>
      </canvas>
    )
  }
}

# typescript-bouncing-balls
A rather basic (and rushed) demo of bouncing balls physics written in typescript.


## Usage
```bash
$ npm install
```

## Known Issues
* No tests (though test suite all set up using karma, mocha, chai etc)
* Sometimes the canvas isn't resized when the component mounts. Not looked into.
* The collision detection & bouncing is done terribly. I decided to public some properties and do it in the main update function to avoid giving the ball itself too much knowledge. *There is definitely a better way.*
* There's a bug with the rendered path when the ball bounces, caused by the way the collision with the floor detection is done. The ball is just moved straight up from the bottom, rather than back along the path it travelled before it clipped.
* The physics values are all arbitrary.
* Would like to make `Vector2` immutable and more intelligent with methods for multiplying, dividing, subtracting and adding values & vectors to avoid having to do operations on both `Vector2.x` and `Vector2.y` seperately 
* Perhaps the Engine (most of the "start" function) could be abstracted away from the `BouncingBallsDemo` into it's own Component
* Types for things like "Screen" could be better defined
* Helper functions in `BouncingBallsDemo.tsx` could be organised/better thought out
* Performance

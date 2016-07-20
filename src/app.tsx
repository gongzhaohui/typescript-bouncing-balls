/// <reference path="./index.d.ts" />

import * as React from 'react'
import { render } from 'react-dom'
import './css/index.css';

import BouncingBallsDemo from './components/BouncingBallsDemo';

render(
  <BouncingBallsDemo />,
  document.getElementById('root')
)

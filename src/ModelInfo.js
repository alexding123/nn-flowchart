import React from 'react';
import { AssertionError } from 'assert';

function conv(props) {
  const squareSize = 40;
  const xInterval = squareSize / 4;
  const yInterval = squareSize / 4;

  const firstColor = "#2775f4";
  const secondColor = "#4286f4";
  const thirdColor = "#5c98f9";
  let activationSVG;
  if (props.activation != null) {
    activationSVG = nodeTypes[props.activation].svg(xInterval*2+5, yInterval*2+squareSize-2, squareSize-10,squareSize/2 - 4);
  } else {
    activationSVG = null
  }
  return <React.Fragment>
    <rect width={squareSize} height={squareSize} fill={firstColor}/>
    <rect x={xInterval} y={yInterval} width={squareSize} height={squareSize} fill={secondColor}/>
    <rect x={xInterval*2} y={yInterval*2} width={squareSize} height={squareSize} fill={thirdColor}/>
    {activationSVG}
  </React.Fragment>
}

function dense(props) {
  const xSize = 40;
  const ySize = 100;
  const numCircles = 3;
  const squareColor = "#665cf9";
  const circleColor = "#83a5f7";

  const circles = [...Array(numCircles)].map((_, i) =>
    <circle cx={xSize / 2} 
            cy={ySize / (numCircles+1) * (i+1)} 
            key={i}
            r={ySize / (numCircles+1) /2 - 2}
            fill={circleColor}>
            
            </circle>
  );
  let activationSVG;
  if (props.activation != null) {
    activationSVG = nodeTypes[props.activation].svg(4, ySize-2);
  } else {
    activationSVG = null
  }
  return <React.Fragment>
    <rect width={xSize} height={ySize} fill={squareColor}/>,
    {circles}
    {activationSVG}
  </React.Fragment>
}

function input(props) {
  const size = 30
  const color = "#99ccff";
  return <React.Fragment>
    <rect width={size} height={size} fill={color}/>
  </React.Fragment>
}

function output(props) {
  const color = "#008066";
  const width = 20;
  const height = 80;
  return <React.Fragment>
    <rect width={width} height={height} fill={color}></rect>
  </React.Fragment>
}

function relu(x, y) {
  return (
    <text x={x} y={y} fontSize="14">ReLU</text>
  )
}

export const nodeTypes = {
    "dense": {
        name: "Dense",
        type: "layer",
        svg: dense,
        offsetX: 20, // offsets are for giving a point of contact for lines
        offsetY: 50, 
        defaultParameters: {
          units: 16,
        },
        // the function to compute the output shape given input shape and parameters
        shapeOut: (parameters, shapeIn) => {
          // needs to have shape (batch_size, num)
          return [shapeIn[0], parameters["units"]];
        },
    },
    "conv": {
        name: "Conv",
        type: "layer",
        svg: conv,
        offsetX: 40,
        offsetY: 40,
        defaultParameters: {
          filters: 8,
          kernelSize: [3,3], // could be both tuple or int. ndim needs to match with stride
          stride: 1, // could be both tuple or int
        },
        shapeOut: (parameters, shapeIn) => {
          return [10, 2]; // TODO
        },
    },
    "input": {
      name: "Input",
      type: "layer",
      svg: input,
      offsetX: 15,
      offsetY: 15,
      defaultParameters: {
        data: "MNIST",
        batchSize: 25,
      },
      shapeOut: (parameters, shapeIn) => {
        if (parameters["data"] === "MNIST") {
          return [parameters["batchSize"], 100, 100, 3];
        }
        return [parameters["batchSize"], 100, 100, 3];
      },
    },
    "output": {
      name: "Output",
      type: "layer",
      svg: output,
      offsetX: 10,
      offsetY: 40,
      defaultParameters: {},
      shapeOut: (parameters, shapeIn) => {
        // keep shape the same
        return shapeIn;
      },
    },
    "relu": {
      name: "ReLU",
      type: "activation",
      svg: relu,
      defaultParameters: {}
    }
};

export const layerNames = ["dense", "conv"];
export const activationNames = ["relu"];
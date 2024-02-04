# chart-smoother

A Node.js module that provides a function to smooth a set of points on a chart, using the Chaikin's algorithm

## Installation

To install the chart-smoother module, run the following command:

```bash
npm install chart-smoother
```

## Usage

The `chart-smoother` module exports a single function, `chartSmoother(points, iterations)`, which takes an array of points and the number of smoothing iterations to perform. The function uses the Chaikin's algorithm to smooth the points.

### Chaikin's Algorithm

[Chaikin's algorithm](https://www.cs.unc.edu/~dm/UNC/COMP258/LECTURES/Chaikins-Algorithm.pdf) is an iterative procedure for curve smoothing. Given a set of points, the algorithm successively replaces each straight line segment connecting consecutive points with two new points, offset from the original line by a fraction of the line's length. The result is a smooth curve that approximates the original set of points.

Here's an example of how to use the `chart-smoother` module:

```javascript
const chartSmoother = require("chart-smoother");

// [x,y] array
const points = [
  [0, 0],
  [2, 2],
  [3, 3],
  [4, 1],
  [5, 0],
  [6, 0],
];
const iterations = 2;

const smoothedPoints = chartSmoother(points, iterations);

console.log(smoothedPoints);
// Output:
// [
//   [0, 0],
//   [0.125, 0.125],
//   [0.375, 0.375],
//   [0.75, 0.75],
//   [1.25, 1.25],
//   [1.6875, 1.6875],
//   [2.0625, 2.0625],
//   [2.375, 2.375],
//   [2.625, 2.625],
//   [2.875, 2.6875],
//   [3.125, 2.5625],
//   [3.375, 2.25],
//   [3.625, 1.75],
//   [3.875, 1.3125],
//   [4.125, 0.9375],
//   [4.375, 0.625],
//   [4.625, 0.375],
//   [4.875, 0.1875],
//   [5.125, 0.0625],
//   [5.375, 0],
//   [5.625, 0],
//   [5.8125, 0],
//   [5.9375, 0],
//   [6, 0],
// ]
```

#### Visual representation

Initial dataset:

![image](https://user-images.githubusercontent.com/61948229/219982541-edc3ab6b-3d93-4157-888e-e3a023c01dbb.png)

Final dataset after `chartSmoother` with two iterations:

![image](https://user-images.githubusercontent.com/61948229/219982562-4738407f-37d4-4a1f-935c-0c81dab4dd69.png)

## Contributing

Contributions to `chart-smoother` are always welcome! If you find a bug or have a feature request, please create an [issue](https://github.com/Murilo-Luciano/chart-smoother/issues/new) on GitHub. If you'd like to contribute code, please [fork](https://github.com/Murilo-Luciano/chart-smoother/fork) the repository and submit a pull request.

## License

`chart-smoother` is licensed under the MIT License.

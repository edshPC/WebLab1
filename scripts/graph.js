let graph;
function graphEntry() {
    const graphElement = document.getElementById("graph");
    graph = Desmos.GraphingCalculator(graphElement, {
        keypad: false,
        expressions: false,
        zoomFit: false,
        settingsMenu: false,
        xAxisLabel: 'x',
        yAxisLabel: 'y',
        xAxisStep: 1,
        yAxisStep: 1,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE
    });
}

const color = '#008cff';
function makeGraph(x, y, r) {
    graph.setExpression({
        id: '1',
        latex: `0<=y<=${r} \\{0<=x<=${r}\\}`,
        color: color,
        lines: false
    });
    graph.setExpression({
        id: '2',
        latex: `0<=y<=2x+${r} \\{x<=0\\}`,
        color: color,
        lines: false
    });
    graph.setExpression({
        id: '3',
        latex: `x^2+y^2<=${r}^2 \\{x<=0\\} \\{y<=0\\}`,
        color: color,
        lines: false
    });
    graph.setExpression({
        id: '4',
        latex: `(${x}, ${y})`,
        color: 'red',
        lines: false
    });

    let bounds = Math.max(x, y, r)*2;
    graph.setMathBounds({
        left: -bounds,
        right: bounds,
        bottom: -bounds,
        top: bounds
    });
}
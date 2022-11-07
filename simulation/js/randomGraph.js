'use strict';
function getRandomArbitrary(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}
export let states = {};

export let graph = [];
export let selectedEdge = [];
export let numEdges;
export let numNodes = 4;

export function makeGraph() {
    // fix 3 edges for better testcase
    graph.push({ source: 3, target: 2, weight: getRandomArbitrary(-10, 0) });
    graph.push({ source: 4, target: 2, weight: getRandomArbitrary(-5, 0) });
    graph.push({ source: 2, target: 1, weight: getRandomArbitrary(0, 5) });
    let remainingEdges = getRandomArbitrary(4, 6);
    numEdges = remainingEdges + 3;
    while (remainingEdges > 0) {
        let source;
        let target;
        source = getRandomArbitrary(1, numNodes+1);
        target = getRandomArbitrary(1, numNodes+1);
        if (source !== target && source!==2 && target!==2) {
            let isPresent = false;
            for (let i = 0; i < graph.length; i++) {
                if (graph[i].source === source && graph[i].target === target) {
                    isPresent = true;
                    break;
                }
            }
            if (!isPresent) {
                let weight = getRandomArbitrary(0, 10);
                graph.push({ source: source, target: target, weight: weight });
                remainingEdges--;
            }
        }
    }
}

export function clearGraph() {
    states = {};
    graph = [];
}

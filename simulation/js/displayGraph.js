import { graph } from "./randomGraph.js";
import { clearGraph } from "./randomGraph.js";
export let cy = cytoscape({
    container: document.getElementById('diagram'),
    elements: [
        { data: { id: '1' } },
        { data: { id: '2' } },
        { data: { id: '3', class: 'node-3' } },
        { data: { id: '4' } }
    ],
    style: [
        {
            selector: 'node',
            style: {
                'background-color': 'pink',
                label: 'data(id)',
                'text-valign': 'center',
                'text-halign': 'center'
            }
        },
        {
            selector: 'edge',
            style: {
                'curve-style': 'bezier',
                'target-arrow-shape': 'triangle',
                'line-color': "lightgreen",
                'width': 3,
                label: 'data(label)'
            }
        }
    ]
});
export function addEdges() {
    for (let node in graph) {
        let src = graph[node].source.toString();
        let dest = graph[node].target.toString();
        let weight = graph[node].weight.toString();
        let edgeId = src + ":" + dest;
        cy.add([
            { group: 'edges', data: { id: edgeId, source: src, target: dest, label: weight } }
        ]);
    }
    // change poistion of label of edge 4:2
    cy.edges('[id = "4:2"]').style('text-margin-x', -50);
}

export function removeEdges(){
    cy.remove(cy.edges());
    // empty graph
    clearGraph();
}

// change the poistion of node 3
cy.layout({ name: 'circle' }).run();
cy.zoomingEnabled(false);
cy.panningEnabled(false);
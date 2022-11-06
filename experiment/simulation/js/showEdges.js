"use strict";
import { graph,clearGraph } from "./randomGraph.js";
import { cy } from "./displayGraph.js";
export function hideEdge(edgeId) {
    let element = document.getElementById("image"+edgeId);
    element.parentNode.removeChild(element);
}

export function removeEdges(){
    cy.remove(cy.edges());
    // empty graph
    clearGraph();
}
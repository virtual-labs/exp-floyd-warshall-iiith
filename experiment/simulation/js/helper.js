'use strict';
import { removeEdges } from "./showEdges.js";
import { cy,addEdges } from "./displayGraph.js";
import { states, makeGraph, numNodes, graph, numEdges } from "./randomGraph.js";
const observ = document.getElementById("observations")

export function showInfo(){
    let info = document.getElementsByClassName("tooltiptext")[0];
    if(info.style.visibility === "visible"){
        info.style.visibility = "hidden";
    }
    else{
        info.style.visibility = "visible";
    }
}

export function refreshComponents(){
    observ.innerHTML = "";
    makeGraph();
    addEdges();
    fillStates();
    document.getElementById("iteration1").click();
}

export function updateTable(distArray){
    for(let i=1;i<=numNodes;i++){
        for(let j=1;j<=numNodes;j++){
            if(distArray[i-1][j-1]<1e5){
                document.getElementById("text"+i.toString()+j.toString()).value = distArray[i-1][j-1];
            }else{
                document.getElementById("text"+i.toString()+j.toString()).value = "INF";
            }
        }
    }
}

export function changeColorGraph(edgeColor) {
    cy.edges().style('line-color', edgeColor);
}

export function colorPreviousEdges(selectedEdges) {
    selectedEdges.forEach((edgeId) => {
        cy.edges('[id=\'' + edgeId + '\']').style('line-color', "red");
    });
}
export function areEqual(array1, array2) {
    if (array1.length === array2.length) {
        return array1.every(element => {
            if (array2.includes(element)) {
                return true;
            }
            return false;
        });
    }
    return false;
}

export function fillStates() {
    let dist = new Array(numNodes);
    for (let i = 0; i < numNodes; i++) {
        dist[i] = new Array(numNodes);
        for (let j = 0; j < numNodes; j++) {
            dist[i][j] = 1000000;
        }
        dist[i][i] = 0;
    }
    for (let edge of graph) {
        let src = edge.source - 1;
        let dest = edge.target - 1;
        dist[src][dest] = edge.weight;
    }
    let intialState = {}
    intialState["distance"] = [];
    for (let i = 0; i < numNodes; i++) {
        intialState["distance"].push(dist[i].slice());
    }
    states[0] = intialState;
    for (let k = 0; k < numNodes; k++) {
        let tempState = {};
        for (let i = 0; i < numNodes; i++) {
            for (let j = 0; j < numNodes; j++) {
                if (i !== j && j !== k && i !== k) {
                    if (dist[i][k] + dist[k][j] < dist[i][j] && dist[i][k]+dist[k][j] < 1e5) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                    }
                }
            }
        }
        tempState["distance"] = [];
        for (let i = 0; i < numNodes; i++) {
            tempState["distance"].push(dist[i].slice());
        }
        states[k+1] = tempState;
    }
}
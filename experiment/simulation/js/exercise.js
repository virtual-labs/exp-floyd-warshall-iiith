'use strict';
import { states, numNodes } from "./randomGraph.js";
import { refreshComponents, updateTableExercise, inputBox } from "./helper.js";
import { removeEdges } from "./showEdges.js";

const observ = document.getElementById("observations");

window.newGraph = newGraph;
window.restart = restart;
window.openIteration = openIteration;
window.submitIteration = submitIteration;
window.inputBox = inputBox;
let selectedIteration = 1;
let distanceArray = {};

export function initDistanceArray() {
    for (let iter = 1; iter <= numNodes; iter++) {
        let tempArray = [];
        for (let i = 1; i <= numNodes; i++) {
            tempArray[i - 1] = [];
            for (let j = 1; j <= numNodes; j++) {
                tempArray[i - 1][j - 1] = states[0]["distance"][i - 1][j - 1];
            }
        }
        distanceArray[iter] = tempArray;
    }
}

function submitIteration() {
    for(let iter = 2; iter<=numNodes; iter++){
        for(let i = 1;i<=numNodes;i++){
            for(let j = 1;j<=numNodes;j++){
                distanceArray[iter][i-1][j-1] = Math.min(distanceArray[iter][i-1][j-1], distanceArray[iter-1][i-1][j-1]);
            }
        }
    }



    for (let iter = 1; iter <= numNodes; iter++) {
        for (let i = 1; i <= numNodes; i++) {
            for(let j=1; j<=numNodes; j++){
                if(distanceArray[iter][i-1][j-1] !== states[iter]["distance"][i-1][j-1]){
                    observ.style.color = "red";
                    observ.innerHTML = "The values in the table from iteration " + iter.toString() + " are incorrect";
                    return;
                }
            }
        }
    }
    observ.innerHTML = "Correct!";
    observ.style.color = "green";
}

function openIteration(evt, iterNumber) {
    selectedIteration = parseInt(iterNumber[iterNumber.length - 1])
    for (let iter = 1; iter <= numNodes; iter++) {
        document.getElementById("iteration" + iter.toString()).classList.remove("is-active")
    }
    document.getElementById(iterNumber).classList.add("is-active");
    if(selectedIteration === 1){
        distanceArray[selectedIteration] = updateTableExercise(distanceArray[selectedIteration], states[selectedIteration - 1]["distance"]);
    } else {
        distanceArray[selectedIteration] = updateTableExercise(distanceArray[selectedIteration], distanceArray[selectedIteration - 1]);
    }
    console.log(distanceArray[selectedIteration]);
}

export function newGraph() {
    removeEdges();
    refreshWorkingArea();
}

function restart() {
    selectedIteration = 1;
    distanceArray = {};
    initDistanceArray();
    document.getElementById("iteration1").click();
}

export function refreshWorkingArea() {
    selectedIteration = 1;
    refreshComponents();
    initDistanceArray();
    document.getElementById("iteration1").click();
}
refreshWorkingArea();
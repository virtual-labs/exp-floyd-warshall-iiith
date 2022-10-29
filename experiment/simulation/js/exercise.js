'use strict';
import { states, numNodes } from "./randomGraph.js";
import { refreshComponents, areEqual, showInfo, updateTableExercise } from "./helper.js";
import { removeEdges } from "./showEdges.js";

const observ = document.getElementById("observations");

window.refreshWorkingArea = restartSimulation;
window.openIteration = openIteration;
window.submitIteration = submitIteration;
window.showInfo = showInfo;
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
function inputBox(val, id) {
    // check if val is either a number or INF
    let inputId = document.getElementById(id);
    if (val !== "INF" && val !== "inf" && isNaN(val)) {
        inputId.classList.add("highlight")
        setTimeout(function () { inputId.classList.remove("highlight") }, 5000);
        document.getElementById(id).value = "";
        observ.innerHTML = "Please enter a number or INF";
    } else {
        if (val === "INF" || val === "inf") {
            distanceArray[selectedIteration][parseInt(id[4]) - 1][parseInt(id[5]) - 1] = 1e6;
        } else {
            distanceArray[selectedIteration][parseInt(id[4]) - 1][parseInt(id[5]) - 1] = parseInt(val);
        }
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
            if (!areEqual(distanceArray[iter][i - 1], states[iter]["distance"][i - 1])) {
                observ.innerHTML = "Error in iteration " + iter.toString() + ". Please try again.";
                observ.style.color = "red";
                return;
            }
        }
    }
    observ.innerHTML = "Correct!";
    observ.style.color = "green";
}

function openIteration(evt, iterNumber) {
    selectedIteration = parseInt(iterNumber[iterNumber.length - 1])
    // remove classname is-active from id iteration0 to iteration 5
    for (let iter = 1; iter <= numNodes; iter++) {
        document.getElementById("iteration" + iter.toString()).classList.remove("is-active")
    }
    // add classname is-active to the selected iteration
    document.getElementById(iterNumber).classList.add("is-active");
    if(selectedIteration === 1){
        distanceArray[selectedIteration] = updateTableExercise(distanceArray[selectedIteration], states[selectedIteration - 1]["distance"]);
    } else {
        distanceArray[selectedIteration] = updateTableExercise(distanceArray[selectedIteration], distanceArray[selectedIteration - 1]);
    }
    console.log(distanceArray[selectedIteration]);
}

export function restartSimulation() {
    removeEdges();
    refreshWorkingArea();
}

export function refreshWorkingArea() {
    selectedIteration = 1;
    refreshComponents();
    initDistanceArray();
    document.getElementById("iteration1").click();
}
refreshWorkingArea();
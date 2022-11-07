'use strict';
import { states, numNodes } from "./randomGraph.js";
import { refreshComponents, updateTable, inputBox } from "./helper.js";
import { removeEdges } from "./displayGraph.js";
const observ = document.getElementById("observations");

window.newGraph = newGraph;
window.openIteration = openIteration;
window.submitIteration = submitIteration;
window.inputBox = inputBox;
let currentIteration = 1;
let selectedIteration = 1;


function submitIteration() {
    if (currentIteration > 4) {
        return;
    }
    let distance = [];
    for (let i = 1; i <= numNodes; i++) {
        distance[i - 1] = [];
        for (let j = 1; j <= numNodes; j++) {
            if(document.getElementById("text" + i.toString() + j.toString()).value === ""){
                document.getElementById("text" + i.toString() + j.toString()).classList.add("highlight");
                setTimeout(function () { document.getElementById("text" + i.toString() + j.toString()).classList.remove("highlight") }, 5000);
                observ.innerHTML = "Please fill all the boxes";
                return;
            }
            else if (document.getElementById("text" + i.toString() + j.toString()).value === "INF" || (document.getElementById("text" + i.toString() + j.toString()).value === "inf")) {
                distance[i - 1][j - 1] = 1e6;
            } else {
                distance[i - 1][j - 1] = parseInt(document.getElementById("text" + i.toString() + j.toString()).value);
            }
        }
    }
    let flag = true;
    // compare the distance array with the states array
    for (let i = 1; i <= numNodes; i++) {
        for (let j = 1; j <= numNodes; j++) {
            if (distance[i - 1][j - 1] !== states[selectedIteration]["distance"][i - 1][j - 1]) {
                document.getElementById("text" + i.toString() + j.toString()).classList.add("incorrect-value")
                setTimeout(function () { document.getElementById("text" + i.toString() + j.toString()).classList.remove("incorrect-value") }, 5000);
                flag = false;
            }
        }
    }

    if (flag) {
        observ.innerHTML = "Correct!";
        observ.style.color = "green";
        currentIteration++;
        selectedIteration++;
        if (currentIteration <= 4) {
            document.getElementById("iteration" + currentIteration.toString()).click();
        }
    } else {
        observ.innerHTML = "Highlighted boxes are incorrect, please try again";
        observ.style.color = "red";
    }

}

function openIteration(evt, iterNumber) {
    if (currentIteration >= parseInt(iterNumber[iterNumber.length - 1])) {
        selectedIteration = parseInt(iterNumber[iterNumber.length - 1])
        for (let iter = 1; iter <= numNodes; iter++) {
            document.getElementById("iteration" + iter.toString()).classList.remove("is-active")
        }
        document.getElementById(iterNumber).classList.add("is-active");
        if (currentIteration > selectedIteration) {
            updateTable(states[selectedIteration]["distance"]);
        }else{
            updateTable(states[currentIteration-1]["distance"]);
        }
        if(currentIteration===4){
            document.getElementById("submit").innerHTML = "Submit";
        }else{
            document.getElementById("submit").innerHTML = "Next Iteration";
        }

    }
}

export function newGraph() {
    removeEdges();
    refreshWorkingArea();
}

export function refreshWorkingArea() {
    currentIteration = 1;
    selectedIteration = 1;
    refreshComponents();
    updateTable(states["0"].distance);
    document.getElementById("iteration1").click();
}
refreshWorkingArea();
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let rangeFieldValue = document.querySelector('#rangeFieldValue');
const fieldGoalRange = document.querySelector('#fieldGoalRange');
let rangePointsValue = document.querySelector('#rangePointsValue');
const rangePoints = document.querySelector('#pointsRange');
let range3PointValue = document.querySelector('#range3PointValue');
const point3Range = document.querySelector('#Point3Range');
const searchBtn = document.querySelector('#searchBtn');
const positionInput = document.querySelector('#selectPlayers');
const dataBaseUrl = 'https://nbaserver-q21u.onrender.com/api/filter';
const tableBody = document.querySelector('tbody');
const teamPG = document.querySelector('#teamPG');
const teamSG = document.querySelector('#teamSG');
const teamSF = document.querySelector('#teamSF');
const teamPF = document.querySelector('#teamPF');
const teamC = document.querySelector('#teamC');
class Player {
    constructor(position, twoPercent, threePercent, points) {
        this.position = position;
        this.twoPercent = twoPercent;
        this.threePercent = threePercent;
        this.points = points;
    }
}
fieldGoalRange.addEventListener('input', () => {
    rangeFieldValue.textContent = fieldGoalRange.value;
});
rangePoints.addEventListener('input', () => {
    rangePointsValue.textContent = rangePoints.value;
});
point3Range.addEventListener('input', () => {
    range3PointValue.textContent = point3Range.value;
});
function createAddButton() {
    const button = document.createElement('button');
    button.innerText = 'Add';
    button.id = 'addButton';
    return button;
}
function playerCreator() {
    return new Player(positionInput.value, Number(fieldGoalRange.value), Number(point3Range.value), Number(rangePoints.value));
}
function searchPlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Sending request with player:', player);
            const response = yield fetch(dataBaseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = yield response.json();
            console.log('Received data:', data);
            return data;
        }
        catch (error) {
            console.error('Error in searchPlayer:', error);
            return [];
        }
    });
}
function createSpan() {
    return document.createElement('span');
}
function createbox(player) {
    const playerBox = document.createElement('div');
    playerBox.id = 'playerBox';
    const playerName = createSpan();
    playerName.innerText = player.playerName || 'name undefined';
    playerBox.appendChild(playerName);
    const playerThreeP = createSpan();
    playerThreeP.innerText = `Three Precents: ${player.threePercent.toString()}%`;
    playerBox.appendChild(playerThreeP);
    const playerTwoP = createSpan();
    playerTwoP.innerText = `Two Precents: ${player.twoPercent.toString()}%`;
    playerBox.appendChild(playerTwoP);
    const playerPoints = createSpan();
    playerPoints.innerText = `Points: ${player.points.toString()}`;
    playerBox.appendChild(playerPoints);
    return playerBox;
}
function isNotPlayer(team) {
    const nodeContent = team.childNodes.length;
    return nodeContent < 4;
}
function insertPlayer(player, team) {
    if (isNotPlayer(team)) {
        team.appendChild(createbox(player));
    }
    else
        alert("There is already a player");
}
function addPlayer(player) {
    switch (player.position) {
        case 'PG': {
            insertPlayer(player, teamPG);
            break;
        }
        case 'SG': {
            insertPlayer(player, teamSG);
            break;
        }
        case 'SF': {
            insertPlayer(player, teamSF);
            break;
        }
        case 'PF': {
            insertPlayer(player, teamPF);
            break;
        }
        case 'C': {
            insertPlayer(player, teamC);
            break;
        }
    }
}
function loadTable(foundPlayers) {
    console.log('Loading table with players:', foundPlayers);
    tableBody.innerHTML = '';
    if (foundPlayers.length === 0) {
        const newRow = tableBody.insertRow();
        const cell = newRow.insertCell();
        cell.colSpan = 6;
        cell.textContent = 'No players found';
        return;
    }
    foundPlayers.forEach((player) => {
        const newRow = tableBody.insertRow();
        newRow.insertCell().textContent = player.playerName || 'name undefined';
        newRow.insertCell().textContent = player.position;
        newRow.insertCell().textContent = player.points.toString();
        newRow.insertCell().textContent = player.twoPercent.toString();
        newRow.insertCell().textContent = player.threePercent.toString();
        const addButton = createAddButton();
        newRow.insertCell().appendChild(addButton);
        addButton.addEventListener('click', () => {
            addPlayer(player);
        });
    });
}
searchBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const players = yield searchPlayer(playerCreator());
    yield loadTable(players);
}));

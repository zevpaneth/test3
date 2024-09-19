let rangeFieldValue = document.querySelector('#rangeFieldValue') as HTMLSpanElement;
const fieldGoalRange = document.querySelector('#fieldGoalRange') as HTMLInputElement;
let rangePointsValue = document.querySelector('#rangePointsValue') as HTMLSpanElement;
const rangePoints = document.querySelector('#pointsRange') as HTMLInputElement;
let range3PointValue = document.querySelector('#range3PointValue') as HTMLSpanElement;
const point3Range = document.querySelector('#Point3Range') as HTMLInputElement;
const searchBtn = document.querySelector('#searchBtn') as HTMLButtonElement;
const positionInput = document.querySelector('#selectPlayers') as HTMLSelectElement;
const dataBaseUrl: string = 'https://nbaserver-q21u.onrender.com/api/filter';
const tableBody = document.querySelector('tbody') as HTMLTableSectionElement;
const teamPG = document.querySelector('#teamPG') as HTMLDivElement;
const teamSG = document.querySelector('#teamSG') as HTMLDivElement;
const teamSF = document.querySelector('#teamSF') as HTMLDivElement;
const teamPF = document.querySelector('#teamPF') as HTMLDivElement;
const teamC = document.querySelector('#teamC') as HTMLDivElement;

class Player {
    playerName?: string;
    age?: number;
    position: string;
    twoPercent: number;
    threePercent: number;
    games?: number;
    team?: string;
    season?: number[];
    points: number;
    constructor(position: string, twoPercent: number, threePercent: number, points: number) {
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

function createAddButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.innerText = 'Add';
    button.id = 'addButton';
    return button;
}

function playerCreator(): Player {
    return new Player(
        positionInput.value,
        Number(fieldGoalRange.value),
        Number(point3Range.value),
        Number(rangePoints.value)
    );
}

async function searchPlayer(player: Player): Promise<Player[]> {
    try {
        console.log('Sending request with player:', player);
        const response = await fetch(dataBaseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        console.log('Received data:', data);
        return data as Player[];
    }
    catch (error) {
        console.error('Error in searchPlayer:', error);
        return [];
    }
}

function createSpan() {
    return document.createElement('span');
}

function createbox(player: Player) {

    const playerBox = document.createElement('div');
    playerBox.id = 'playerBox';
    const playerName = createSpan()
    playerName.innerText = player.playerName || 'name undefined';
    playerBox.appendChild(playerName);
    const playerThreeP = createSpan()
    playerThreeP.innerText = player.threePercent.toString();
    playerBox.appendChild(playerThreeP);
    const playerTwoP = createSpan()
    playerTwoP.innerText = player.twoPercent.toString();
    playerBox.appendChild(playerTwoP);
    const playerPoints = createSpan();
    playerPoints.innerText = player.points.toString();
    playerBox.appendChild(playerPoints);
    return playerBox
}

function isNotPlayer(team: HTMLDivElement) {
    const nodeContent = team.childNodes.length;
    return nodeContent < 4;
}

function insertPlayer(player: Player, team: HTMLDivElement) {
    if (isNotPlayer(team)){
        team.appendChild(createbox(player));
    }
    else alert("There is already a player")
}

function addPlayer(player: Player) {
    switch (player.position){
        case 'PG':{
            insertPlayer(player, teamPG)
            break;
        }
        case 'SG':{
            insertPlayer(player, teamSG)
            break;
        }
        case 'SF':{
            insertPlayer(player, teamSF)
            break;
        }
        case 'PF':{
            insertPlayer(player, teamPF)
            break;
        }
        case 'C':{
            insertPlayer(player, teamC)
            break;
        }

    }
}

function loadTable(foundPlayers: Player[]) {
    console.log('Loading table with players:', foundPlayers);
    tableBody.innerHTML = '';

    if (foundPlayers.length === 0) {
        const newRow = tableBody.insertRow();
        const cell = newRow.insertCell();
        cell.colSpan = 6;
        cell.textContent = 'No players found';
        return
    }
    foundPlayers.forEach((player: Player) => {
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

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const players: Player[] = await searchPlayer(playerCreator());
    await loadTable(players);
});
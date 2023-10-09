// Array para armazenar jogadores e suas pontuações
const players = [];

// Array para armazenar resultados das partidas
const matchResults = [];

// Adicionar jogador ao array
document.getElementById("addPlayer").addEventListener("click", () => {
  const playerName = document.getElementById("playerName").value;
  if (playerName.trim() !== "") {
    players.push({
      name: playerName,
      score: 0,
    });
    document.getElementById("playerName").value = "";
    updatePlayerList();
  }
});

// Iniciar torneio
document.getElementById("startTournament").addEventListener("click", () => {
  generateMatches();
});

// Gerar partidas
function generateMatches() {
  const matchesTable = document.getElementById("matchesTable");
  matchesTable.innerHTML = "";

  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      const matchRow = document.createElement("tr");
      matchRow.innerHTML = `
                <td>${players[i].name}</td>
                <td>vs</td>
                <td>${players[j].name}</td>
                <td><input type="text" class="resultInput" placeholder="Resultado"></td>
            `;
      matchesTable.appendChild(matchRow);
    }
  }
}
// Registrar Resultados
document.getElementById("recordResults").addEventListener("click", () => {
  const resultInputs = document.querySelectorAll(".resultInput");

  resultInputs.forEach((input) => {
    const result = input.value.trim();
    const playersInMatch =
      input.parentElement.parentElement.getElementsByTagName("td");
    const player1Name = playersInMatch[0].textContent;
    const player2Name = playersInMatch[2].textContent;

    if (result === player1Name) {
      updatePlayerScore(player1Name, 2);
    } else if (result === player2Name) {
      updatePlayerScore(player2Name, 2);
    } else {
      updatePlayerScore(player1Name, 1);
      updatePlayerScore(player2Name, 1);
    }
  });

  // Ordenar jogadores por pontuação (decrescente)
  players.sort((a, b) => b.score - a.score);

  // Exibir o top 3 jogadores
  showTop3();

  // Ordenar jogadores por pontuação (decrescente)
  players.sort((a, b) => b.score - a.score);

  // Exibir o top 3 jogadores
  showTop3();
});

// Atualizar pontuação do jogador
function updatePlayerScore(playerName, points) {
  const player = players.find((player) => player.name === playerName);
  if (player) {
    player.score += points;
  }
}

// Atualizar lista de jogadores
function updatePlayerList() {
  const playersTable = document.getElementById("playersTable").getElementsByTagName("tbody")[0];
  playersTable.innerHTML = "";
  players.forEach((player, index) => {
    const row = playersTable.insertRow();
    const cellIndex = row.insertCell(0);
    const cellName = row.insertCell(1);
    const cellScore = row.insertCell(2);
    cellIndex.innerHTML = index + 1;
    cellName.innerHTML = player.name;
    cellScore.innerHTML = player.score;
  });
}

// Exibir o top 3 jogadores
function showTop3() {
  const top3List = document.getElementById("top3List");
  top3List.innerHTML = "";

  for (let i = 0; i < Math.min(3, players.length); i++) {
    const player = players[i];
    const listItem = document.createElement("li");
    listItem.textContent = `${player.name} - ${player.score} ponto(s)`;
    top3List.appendChild(listItem);
  }
}

// Armazenar dados no LocalStorage
function savingData() {
  localStorage.setItem('players', JSON.stringify(players));
  localStorage.setItem('matchResults', JSON.stringify(matches));
}

// Exibir dado do LocalStorage
function exbitingData() {
  players = JSON.parse(localStorage.getItem('players')) || [];
  matches = JSON.parse(localStorage.getItem('matches')) || [];
  //Observação: mostrar os dados na tela quando eu entender o código da Rafaela
}

document.getElementById("saving").addEventListener("click", savingData());
document.getElementById("exbitingButton").addEventListener("click", exbitingData());

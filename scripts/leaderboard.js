// let fbAuth = firebase.auth();

const tableBody = document.getElementById('leaderboard-default');
const teamTablesDiv = document.getElementById('teamTables');

// Function to fetch data, sort by points, add rank, and populate the table
function populateIndividualTable() {
    db.collection("users").get()
        .then((querySnapshot) => {

            // Get data and sort by points
            let sortedData = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                sortedData.push(data);
            });

            // Sort data by points
            sortedData.sort((a, b) => b.points - a.points);

            // Populate the table with sorted data and add ranks
            sortedData.forEach((data, index) => {
                let rank = index + 1; // Rank starts from 1
                let username = data.displayName;
                let team = data.team;
                let points = data.points;
                let treesPlanted = data.treesPlanted;

                // Create table row
                const row = document.createElement('tr');

                // Add an image for the top three rankings
                let rankImg = "";
                if (rank === 1) {
                    rankImg = '<img src="./images/gold-tree.png" alt="Gold" class="rankImg">';
                } else if (rank === 2) {
                    rankImg = '<img src="./images/silver-tree.png" alt="Silver" class="rankImg">';
                } else if (rank === 3) {
                    rankImg = '<img src="./images/bronze-tree.png" alt="Bronze" class="rankImg">';
                }

                row.innerHTML = `
                    <td>${rank}${rankImg}</td>
                    <td>${username}</td>
                    <td>${team}</td>
                    <td>${points}</td>
                    <td>${treesPlanted}</td>
                `;

                // Append row to table
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error getting documents: ', error);
        });
}
populateIndividualTable();

// Function to show the current table and hide team tables
function showIndividualTable() {
    document.getElementById('individualTable').style.display = 'block';
    document.getElementById('teamTables').style.display = 'none';
    tableBody.innerHTML = '';
    populateIndividualTable();
}

// Function to show team tables and hide the current table
function showTeamTables() {
    document.getElementById('teamTables').style.display = 'block';
    document.getElementById('individualTable').style.display = 'none';
    teamTablesDiv.innerHTML = ''; //Clear previous team tables

    // Fetch data for team-wise tables
    db.collection("users").get()
        .then((querySnapshot) => {
            const teamsMap = new Map();
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const team = data.team;
                if (!teamsMap.has(team)) {
                    teamsMap.set(team, []);
                }
                teamsMap.get(team).push(data);
            });

            // Sort teams by total points
            const sortedTeams = Array.from(teamsMap).sort((a, b) => {
                const totalPointsA = a[1].reduce((total, member) => total + member.points, 0);
                const totalPointsB = b[1].reduce((total, member) => total + member.points, 0);
                return totalPointsB - totalPointsA;
            });

            sortedTeams.forEach(([teamName, teamMembers], index) => {
                const sortedTeam = teamMembers.sort((a, b) => b.points - a.points);
                const totalPoints = sortedTeam.reduce((total, member) => total + member.points, 0);
                const totalTreesPlanted = sortedTeam.reduce((total, member) => total + member.treesPlanted, 0);

                const teamTable = document.createElement('table');
                let teamHeading = "";

                if (index === 0) {
                    teamHeading = `<img src="./images/gold-tree.png" alt="Gold" class="rankImg">`;
                } else if (index === 1) {
                    teamHeading = `<img src="./images/silver-tree.png" alt="Silver" class="rankImg">`;
                } else if (index === 2) {
                    teamHeading = `<img src="./images/bronze-tree.png" alt="Bronze" class="rankImg">`;
                }

                teamHeading += `<span style="margin-left: 20px;">${teamName}</span>`;
                teamHeading += `<span style="margin-left: 20px;">Total Points: ${totalPoints}</span>`;
                teamHeading += `<span style="margin-left: 20px;">Total Trees Planted: ${totalTreesPlanted}</span>`;

                teamTable.innerHTML = `
                    <thead>
                        <tr>
                            <th colspan="4">${teamHeading}</th>
                        </tr>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Trees Planted</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${sortedTeam.map((data, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${data.displayName}</td>
                                <td>${data.points}</td>
                                <td>${data.treesPlanted}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                `;
                teamTablesDiv.appendChild(teamTable);
            });
        })
        .catch((error) => {
            console.error('Error getting documents: ', error);
        });
}
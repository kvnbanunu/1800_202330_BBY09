// let fbAuth = firebase.auth();

const tableBody = document.getElementById('leaderboard-default');

function populateTable() {
    db.collection("users").get()
        .then((querySnapshot) => {

            let sortedData = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                sortedData.push(data);
            });

            sortedData.sort((a, b) => b.points - a.points);

            sortedData.forEach((data) => {
                let username = data.displayName;
                let team = data.team;
                let points = data.points;
                let treesPlanted = data.treesPlanted;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${username}</td>
                    <td>${team}</td>
                    <td>${points}</td>
                    <td>${treesPlanted}</td>
                `;

                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error getting documents: ', error);
        });
}
populateTable();
wordle_url = "https://www.nytimes.com/svc/wordle/v2/";
connections_url = "https://www.nytimes.com/svc/connections/v2/";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

function findWordleSolution() {
    fetch(`${wordle_url}${formattedDate}.json`, {
        method: 'GET'
    }).then(res => {
        res.json().then(d => {
            const p = document.createElement("p");
            p.innerHTML = d.solution;

            const el = document.getElementsByClassName("sol")[0];
            el.innerHTML = '';
            el.appendChild(p);
        });
    });
}

function findConnectionsSolution() {
    fetch(`${connections_url}${formattedDate}.json`, {
        method: 'GET'
    }).then(res => {
        res.json().then(d => {
            const ps = [];
            d.categories.forEach(category => {
                const p = document.createElement("p");
                p.innerHTML = `${category.cards[0].content}, ${category.cards[1].content}, ${category.cards[2].content}, ${category.cards[3].content}`;

                ps.push(p);
            });


            const el = document.getElementsByClassName("sol")[0];
            el.innerHTML = '';
            ps.forEach(p => {
                el.appendChild(p);
            })
        });
    });
}

function getSolutionForGame() {
    const selectedGame = document.getElementById("select1").value;
    switch (selectedGame) {
        case "wordle":
            findWordleSolution();
            break;
        case "connections":
            findConnectionsSolution();
            break;
        default:
            break;
    }
}

document.getElementById("button").addEventListener("click", getSolutionForGame);

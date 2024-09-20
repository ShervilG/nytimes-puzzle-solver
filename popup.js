const WORDLE_URL = "https://www.nytimes.com/svc/wordle/v2";
const CONNECTIONS_URL = "https://www.nytimes.com/svc/connections/v2";
const MINI_CROSSWORD_URL = "https://www.nytimes.com/svc/crosswords/v6/puzzle/mini";

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

function createUrl(baseUrl, date) {
    if (date == null) {
        return `${baseUrl}.json`;
    }

    return `${baseUrl}/${date}.json`;
}

function makeJsonFetchRequest(url, callback) {
    fetch(url, { method: 'GET' }).then(data => data.json().then(d => {
        callback(d);
    }));
}

function findWordleSolution() {
    makeJsonFetchRequest(createUrl(WORDLE_URL, formattedDate), (d) => {
        const p = document.createElement("p");
        p.innerHTML = d.solution;

        const el = document.getElementsByClassName("sol")[0];
        el.innerHTML = '';
        el.appendChild(p);
    });
}

function findConnectionsSolution() {
    makeJsonFetchRequest(createUrl(CONNECTIONS_URL, formattedDate), (d) => {
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
}

function findMiniCrossWordSolution() {
    makeJsonFetchRequest(createUrl(MINI_CROSSWORD_URL, null), (d) => {
        const body = d.body[0];
        const { height, width } = body.dimensions;
        const cells = body.cells;

        const ps = [];
        for (let i = 0; i < height; i++) {
            const p = document.createElement("p");
            let content = '';

            for (let j = 0; j < width; j++) {
                const index = i * width + j;

                content += (cells[index].answer ?? '_');
            }

            p.innerHTML = content;
            ps.push(p);
        }

        const el = document.getElementsByClassName("sol")[0];
        el.innerHTML = '';
        ps.forEach(p => {
            el.appendChild(p);
        })
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
        case "mini":
            findMiniCrossWordSolution();
            break;
        default:
            break;
    }
}

document.getElementById("button").addEventListener("click", getSolutionForGame);

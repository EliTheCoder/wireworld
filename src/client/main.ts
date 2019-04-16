const socket = io();

class clickableGrid {
    element: HTMLTableElement;
    constructor(
        rows: number,
        cols: number,
        callback: (
            el: HTMLTableDataCellElement,
            r: number,
            c: number,
            i: number
        ) => void
    ) {
        let i = 0;
        let grid = document.createElement("table");
        grid.className = "grid";
        for (let r = 0; r < rows; ++r) {
            let tr = grid.appendChild(document.createElement("tr"));
            tr.classList.add("row");
            for (var c = 0; c < cols; ++c) {
                let cell = tr.appendChild(document.createElement("td"));
                cell.id = ++i + "";
                cell.classList.add("tile");
                cell.addEventListener(
                    "click",
                    (function(el, r, c, i) {
                        return function() {
                            callback(el, r, c, i);
                        };
                    })(cell, r, c, i),
                    false
                );
            }
        }
        this.element = grid;
    }
}

let grid = new clickableGrid(100, 100, (el, r, c, i) => {
    if (el.classList.contains("wire")) {
        socket.emit("remove", { i: i });
        el.classList.remove("wire");
    } else {
        socket.emit("add", { i: i });
        el.classList.add("wire");
    }
});

socket.on("add", (data: {i: number}) => {
    $(`#${data.i}`).addClass("wire")
});
socket.on("remove", (data: { i: number }) => {
    $(`#${data.i}`).removeClass("wire");
});

document.body.appendChild(grid.element);

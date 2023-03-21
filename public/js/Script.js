
function arr(){
    const reqst = new XMLHttpRequest();

    reqst.open("POST", "http://localhost:3000/mycart");
    reqst.setRequestHeader("content-type", "application/json")
    reqst.send(JSON.stringify({ index: index }));

    reqst.addEventListener("load", function () {
        document.location.reload();
        // if (reqst.status === 200) {
        //     document.location.reload();
        // }
        // else {
        //     console.log("error occured");
        // }
    })
}

var total = sessionStorage.getItem("total");
if (total) {
    total = JSON.parse(total);
    let box = document.getElementById("mycart");
    box.innerText = total;
}
else {
    total = 0;
}

function addCart(btn) {

    let idv = btn.nextElementSibling;
    total++;
    let box = document.getElementById("mycart");
    box.innerText = total;
    // let idv = btn.nextElementSibling;
    let id= idv.value;
    const reqst = new XMLHttpRequest();

    reqst.open("POST", "http://localhost:3000/mycart");
    reqst.setRequestHeader("content-type", "application/json")
    reqst.send(JSON.stringify( { id } ));

    reqst.addEventListener("load", function () {
        if (reqst.status === 200) {
            console.log("add done ");
        }
        else {
            console.log("error occured");
        }
    })

        
        
    sessionStorage.setItem("total", JSON.stringify(total));

}

function myFunction(btn) {
    let post = btn.parentElement;
    let p = post.querySelector("p");


    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
    p.style.display === "none" ? p.style.display = "block" : p.style.display = "none";

}



var currentItem = 4;

var loadMoreBtn = document.getElementById("addtodo");
let foot = document.getElementById("foot")

function loadmore() {

    let boxes = [...document.querySelectorAll(' .box')];

    for (var i = currentItem; i < currentItem + 4; i++) {
        boxes[i].style.display = 'flex';
        if (i >= boxes.length - 1) {
            console.log("true helloS");
            foot.style.display = 'none';
        }
    }
    currentItem += 4;
    // console.log(currentItem);
}



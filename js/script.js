var more = document.querySelector(".more");
var close = document.querySelector(".close");
var search = document.querySelector(".search");
var main = document.querySelector("main");
var header = document.querySelector("header");
var insert = document.querySelector(".insert");
var dateValue = document.querySelector(".date");
var taskValue = document.querySelector(".task");
var colors = ["#322F40", "#6395D2", "#D74569", "#A60910", "#C7A6D3", "#D02724", "#FFD21F", "#371E79", "#E19341", "#20C8C8"];
var now = new Date();
//var timer = 0;
//var interval = [];

var tasks = localStorage.getItem("tasks");
tasks = JSON.parse(tasks);
if(tasks == null){
    tasks = [];
}

more.onclick = function(){
    show();
}

function select(){
    var tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    if(tasks == null){
        tasks = [];
    }
    else{
        for(var j = 0; j < tasks.length; j++){
            tasks[j] = JSON.parse(tasks[j])
        }
    }
    for(var i = 0; i < tasks.length; i++){
        for(var h = i + 1; h < tasks.length; h++){
            if((+tasks[i].date.split("/")[1] * 30 + +tasks[i].date.split("/")[0]) > (+tasks[h].date.split("/")[1] * 30 + +tasks[h].date.split("/")[0])){
                var aux = tasks[i];
                tasks[i] = tasks[h];
                tasks[h] = aux;
            }
        }
        var item = tasks[i];
        var block = document.createElement("div");
        if(+item.date.split("/")[0] == now.getDate() && +item.date.split("/")[1] == (now.getMonth() + 1)){
            block.setAttribute("class", "block current");
            /*interval[timer] = setInterval(function(){
                if(interval)
                    var time = new Date();
                console.log("item" + i + " " + Math.trunc((1440 - ((time.getHours()*60) + time.getMinutes()))/60) + ":" + (1440 - ((time.getHours()*60) + time.getMinutes()))%60);
            },5000);*/
        }
        else if((+item.date.split("/")[0] < now.getDate() && +item.date.split("/")[1] == (now.getMonth() + 1)) || (+item.date.split("/")[1] < (now.getMonth() + 1))){
            block.setAttribute("class", "block lated");
        }
        else{
            block.setAttribute("class", "block");
        }
        var img = document.createElement("img");
        img.setAttribute("src", "img/" + item.img);
        var date = document.createElement("h2");
        date.innerHTML = item.date;
        date.contentEditable = "true";
        var line = document.createElement("hr");
        var text = document.createElement("p");
        text.innerHTML = item.task;
        date.contentEditable = "true";
        text.contentEditable = "true";
        var del = document.createElement("input");
        del.setAttribute("type", "submit");
        del.setAttribute("class", "del");
        del.setAttribute("value", "Excluir");
        del.setAttribute("data", i);
        del.onclick = function(){
            tasks.splice(this.getAttribute("data"), 1);
            for(var o = 0; o < tasks.length; o++){
                tasks[o] = JSON.stringify(tasks[o]);
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
            while(main.lastChild){
                main.removeChild(main.lastChild);
            }
            select();
        }
        var alt = document.createElement("input");
        alt.setAttribute("type", "submit");
        alt.setAttribute("class", "del");
        alt.setAttribute("value", "Alterar");
        alt.setAttribute("data", i);
        alt.onclick = function(){
            var random = Math.ceil(Math.random() * 10);
            tasks[this.getAttribute("data")] = JSON.stringify({
                date: this.parentNode.querySelector("h2").innerHTML,
                task: this.parentNode.querySelector("p").innerHTML,
                img: random + ".jpg",
                color: colors[--random]
            });
            for(var o = 0; o < tasks.length; o++){
                if(o != this.getAttribute("data")){
                    tasks[o] = JSON.stringify(tasks[o]);
                }
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
            while(main.lastChild){
                main.removeChild(main.lastChild);
            }
            select();
        }
        block.appendChild(img);
        block.appendChild(date);
        block.appendChild(line);
        block.appendChild(text);
        block.appendChild(alt);
        block.appendChild(del);
        block.style.border = "5px solid transparent";
        block.style.borderBottom = "5px solid " + item.color;
        main.appendChild(block);
    }
}

select();

insert.onclick = function(){
    var tasks = localStorage.getItem("tasks");
    tasks = JSON.parse(tasks);
    if(tasks == null){
        tasks = [];
    }
    var random = Math.ceil(Math.random() * 10);
    var data = JSON.stringify({
        date: dateValue.value,
        task: taskValue.value,
        img: random + ".jpg",
        color: colors[--random]
    });
    console.log(data);
    tasks.push(data);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    while(main.lastChild){
        main.removeChild(main.lastChild);
    }
    select();
    hide();
}

close.onclick = function(){
    hide();
}

function hide(){
    search.style.opacity = 0;
    header.style.filter = "blur(0)";
    main.style.filter = "blur(0)";
    more.style.filter = "blur(0)";
    search.style.display = "flex";
    search.style.zIndex = 3;
    setTimeout(function(){
        search.style.display = "none";
    }, 100);
}

function show(){
    search.style.display = "flex";
    setTimeout(function(){
        search.style.opacity = 1;
        header.style.filter = "blur(5px)";
        main.style.filter = "blur(5px)";
        more.style.filter = "blur(5px)";
        search.style.zIndex = 11;
    }, 100);
}

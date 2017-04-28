"use strict";

(function () {
    var socket = io();
    var nbr = 0;
    var nbr2 = 0;

    socket.on('readUser', function (data) {
        console.log("Read user");

        var div = document.createElement("div");
        div.id = "div" + nbr;
        div.style.border = "1px solid black";
        div.style.margin = "5px";
        div.style.padding = "5px";

        var divH2 = document.createElement("h2");
        divH2.className = "username";
        divH2.innerText = data.username;

        var divFollow = document.createElement("p");
        divFollow.className = "follow";
        divFollow.innerText = "Followers: " + data.followers;

        var divFriends = document.createElement("p");
        divFriends.className = "friends";
        divFriends.innerText = "Friends: " + data.friends;

        var divDesc = document.createElement("p");
        divDesc.className = "description";
        divDesc.innerText = data.description;

        if (div.id === "div0") {
            document.querySelector(".readUser").appendChild(div);
        } else {
            document.querySelector(".readUser").insertBefore(div, document.querySelector(".readUser").childNodes[0]);
        }
        div.appendChild(divH2);
        div.appendChild(divFollow);
        div.appendChild(divFriends);
        div.appendChild(divDesc);

        nbr++;
    });

    socket.on('savedUser', function (data) {
        console.log("Saved user");

        var div = document.createElement("div");
        div.id = "saved" + nbr;
        div.style.border = "1px solid green";
        div.style.margin = "5px";
        div.style.padding = "5px";

        var divH2 = document.createElement("h2");
        divH2.className = "username";
        divH2.innerText = data.username;

        var divFollow = document.createElement("p");
        divFollow.className = "follow";
        divFollow.innerText = "Followers: " + data.followers;

        var divFriends = document.createElement("p");
        divFriends.className = "friends";
        divFriends.innerText = "Friends: " + data.friends;

        var divDesc = document.createElement("p");
        divDesc.className = "description";
        divDesc.innerText = "Mail: " + data.email;

        if (div.id === "saved0") {
            document.querySelector(".savedUser").appendChild(div);
        } else {
            document.querySelector(".savedUser").insertBefore(div, document.querySelector(".savedUser").childNodes[0]);
        }
        div.appendChild(divH2);
        div.appendChild(divFollow);
        div.appendChild(divFriends);
        div.appendChild(divDesc);

        nbr2++;
    });
})();
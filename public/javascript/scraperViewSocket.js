(function ()
{
    let socket = io();
    let nbr = 0;
    let nbr2 = 0;


    console.log(toto);

    socket.on('readUser', (data) =>
    {
        console.log("Read user");

        let div = document.createElement("div");
        div.id = "div" + nbr;
        div.style.border = "1px solid black";
        div.style.margin = "5px";
        div.style.padding = "5px";

        let divH2 = document.createElement("h2");
        divH2.className = "username";
        divH2.innerText = data.username;

        let divFollow = document.createElement("p");
        divFollow.className = "follow";
        divFollow.innerText = "Followers: " + data.followers;

        let divFriends = document.createElement("p");
        divFriends.className = "friends";
        divFriends.innerText = "Friends: " + data.friends;

        let divDesc = document.createElement("p");
        divDesc.className = "description";
        divDesc.innerText = data.description;

        if (div.id === "div0")
        {
            document.querySelector(".readUser").appendChild(div);
        }
        else
        {
            document.querySelector(".readUser").insertBefore(div, document.querySelector(".readUser").childNodes[0]);
        }
        div.appendChild(divH2);
        div.appendChild(divFollow);
        div.appendChild(divFriends);
        div.appendChild(divDesc);

        nbr++;
    });

    socket.on('savedUser', (data) =>
    {
        console.log("Saved user");

        let div = document.createElement("div");
        div.id = "saved" + nbr;
        div.style.border = "1px solid green";
        div.style.margin = "5px";
        div.style.padding = "5px";

        let divH2 = document.createElement("h2");
        divH2.className = "username";
        divH2.innerText = data.username;

        let divFollow = document.createElement("p");
        divFollow.className = "follow";
        divFollow.innerText = "Followers: " + data.followers;

        let divFriends = document.createElement("p");
        divFriends.className = "friends";
        divFriends.innerText = "Friends: " + data.friends;

        let divDesc = document.createElement("p");
        divDesc.className = "description";
        divDesc.innerText = "Mail: " + data.email;

        if (div.id === "saved0")
        {
            document.querySelector(".savedUser").appendChild(div);
        }
        else
        {
            document.querySelector(".savedUser").insertBefore(div, document.querySelector(".savedUser").childNodes[0]);
        }
        div.appendChild(divH2);
        div.appendChild(divFollow);
        div.appendChild(divFriends);
        div.appendChild(divDesc);

        nbr2++;

    });

})();
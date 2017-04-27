(function()
{
    let socket = io();

    socket.on('toto', () =>
    {
       console.log("toto has been emitted")
    });

})();
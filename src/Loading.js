var LoadScreen = document.createElement("div")
LoadScreen.className = "load"
LoadScreen.innerHTML = "<h1 id='loaderText'>Loading...</h1><img src='loading.gif'>"

function StartLoading(text)
{
    document.body.appendChild(LoadScreen)
    document.getElementById('loaderText').innerText = text
}

function SetStatus(text)
{
}

function Loaded()
{
    LoadScreen.style.display = 'none'
}

function Restart(text)
{
    document.getElementById('loaderText').innerText = text
    LoadScreen.style.display = ''
}
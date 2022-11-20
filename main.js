var gameData = {
    gold: 0,
    goldPerClick: 1,
    goldPerClickCost: 10,
    lastTick: Date.now()
}


var mainGameLoop = window.setInterval(function(){
    diff = Date.now() - gameData.lastTick
    gameData.lastTick = Date.now()
    gameData.gold += gameData.goldPerClick * (diff/1000)
    update("goldMined", format(gameData.gold, "scientific") + " Gold Mined")

}, 1000)

var saveGameLoop = window.setInterval(function(){
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}, 15000)

var saveGame = JSON.parse(localStorage.getItem("goldMinerSave"))


function update(id, content) {
  document.getElementById(id).innerHTML = content;
}


function mineGold(){
    gameData.gold += gameData.goldPerClick
    update("goldMined", format(gameData.gold, "scientific") + " Gold Mined")
}

function buyGoldPerClick(){
    if(gameData.gold >= gameData.goldPerClickCost){
        gameData.gold -= gameData.goldPerClickCost
        gameData.goldPerClick += 1
        gameData.goldPerClickCost *= 2
        update("goldMined", format(gameData.gold, "scientific") + " Gold Mined")
        update("perClickUpgrade", "Upgrade Pickaxe (Currently Level " + format(gameData.goldPerClick, "scientific") + ") Cost: " + format(gameData.goldPerClickCost, "scientific") + " Gold")
    }
}

function resetGameData(){
    if(window.confirm("Do you really want to reset your data?")){
        gameData.gold = 0
        gameData.goldPerClick = 1
        gameData.goldPerClickCost = 10
        gameData.lastTick = Date.now()
        update("goldMined", format(gameData.gold, "scientific") + " Gold Mined")
        update("perClickUpgrade", "Upgrade Pickaxe (Currently Level " + format(gameData.goldPerClick, "scientific") + ") Cost: " + format(gameData.goldPerClickCost, "scientific") + " Gold")
        localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
    }
}

function manualSave(){
    localStorage.setItem("goldMinerSave", JSON.stringify(gameData))
}

function tab(tab){
    // hide all your tabs, then show the one the user selected.
    document.getElementById("mineGoldMenu").style.display = "none"
    document.getElementById("shopMenu").style.display = "none"
    document.getElementById("otherOptions").style.display = "none"
    document.getElementById(tab).style.display = "inline-block"
}
tab("mineGoldMenu")

function format(number, type) {
    let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

if (typeof saveGame.gold !== "undefined") gameData.gold = saveGame.gold;
if (typeof saveGame.goldPerClick !== "undefined") gameData.goldPerClick = saveGame.goldPerClick;
if (typeof saveGame.goldPerClickCost !== "undefined") gameData.goldPerClickCost = saveGame.goldPerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;

update("goldMined", format(gameData.gold, "scientific") + " Gold Mined")

// var saveGame = JSON.parse(localStorage.getItem("goldMinerSave"))
//     if(saveGame != null){
    //         gameData = saveGame
    //         document.getElementById("goldMined").innerHTML = gameData.gold + " Gold Mined"
    //         document.getElementById("perClickUpgrade").innerHTML = "Upgrade Pickaxe (Currently level " + gameData.goldPerClick + ") Cost: " + gameData.goldPerClickCost + "Gold"
    //     }
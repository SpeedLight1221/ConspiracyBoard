let turn = 0;
let tiredness = 0;
let pirTrack = 0;



document.getElementById("hypnoBtn").addEventListener("click", hypnoClick);
document.getElementById("pirBtn").addEventListener("click", pirClick);
document.getElementById("othBtn").addEventListener("click", othClick);

let TurnNum = document.getElementById("turnNum");
let TireNum = document.getElementById("tirNum");
let PirName = document.getElementById("pEffName");
let PirEff = document.getElementById("pirEffect");
NextTurn();


function hypnoClick() {
    tiredness++;
    NextTurn();
}

function pirClick() {
   
    tiredness += 0.5;
    
    NextTurn();

}

function othClick() {
    NextTurn();
}

function NextTurn() {
    pirTrack++;
    if(pirTrack > 9){
        pirTrack=1;
    }
    turn++;
    TurnNum.innerText = " " + turn;
    TireNum.innerText = " " + tiredness + "/9"
    GetPirEffect();

};

function GetPirEffect() {
    let desc;
    let name;

    switch (pirTrack) {
        case 1:
            desc = "No Effect";
            name = "Nothing";
            break;
        case 2:
            desc = "Jevil's Defense is lowered by 4, unless its already less then -16";
            name = "Jevil's Defense Drop";
            break;
        case 3:
            desc = "You have 60% less invincibility frames";
            name = "Less Invincibily";
            break;
        case 4:
            desc = "Jevil's Attack is lowered by 30% for this round";
            name = "Jevil's Attack Drop";
            break;
        case 5:
            desc = "No Effect";
            name = "Nothing";
            break;
        case 6:
            desc = "Heals a random party member by 25-55hp";
            name = "Small Heal";
            break;
        case 7:
            desc = "Party members' HP bars are shuffled. (Each party member takes on the current and max HP of the party member to their left or right, including the color of their HP bar.) Then, each fallen party member has their negative HP split among all three party members (with rounding) and are then revived with 1 HP. Then, any party members that still have negative HP (due to the splitting) are revived with 1 HP. ";
            name = "Health shuffle";
            break;
        case 8:
            desc = "Jevil's Attack is boosted by 25% for this round";
            name = "Jevil's Attack boost";
            break;
        case 9:
            desc = "Heals all party members by 36-50hp";
            name = "Party Heal";
            break;
        default:
            desc = "If you see this, I fucked up";
            name = "gg";
        
    }

    
    PirName.innerText = " " +name;
    PirEff.innerText = desc;
}

function Player(name) {
    this.name = name;
    this.age = 18;
    this.stats = {"Defense"      : 0,
                  "Shooting"     : 0,
                  "3pt Shooting" : 0,
                  "Blocking"     : 0,
                  "Steals"       : 0,
                  "Handles"      : 0,
                  "Rebounds"     : 0
    };
    this.weights = {"Defense"      : 0.16,
                    "Shooting"     : 0.16,
                    "3pt Shooting" : 0.15,
                    "Blocking"     : 0.14,
                    "Steals"       : 0.12,
                    "Handles"      : 0.13,
                    "Rebounds"     : 0.15
    };
    this.tendencies = {"Pass"    : 0,
                       "Shoot"   : 0,
                       "3pt"     : 0,
                       "Steal"   : 0,
                       "Rebound" : 0,
                       "Block"   : 0
    };
    this.gameStats = {"PTS" : 0,
                      "FGM" : 0,
                      "FGA" : 0,
                      "3PM" : 0,
                      "3PA" : 0,
                      "REB" : 0,
                      "AST" : 0,
                      "BLK" : 0,
                      "STL" : 0,
                      "TO"  : 0
    };
    this.overall = 0;

    // Randomize player attributes between 35 and 80
    this.generate = function() {
        for(var x in this.stats) { // Loop through stats
            //this.stats[x] = Math.floor(Math.random() * 36 + 45);
            this.stats[x] = Math.floor(Math.random() * 41 + 45);
        }

        for(var x in this.tendencies) { // Loop through tendencies
            this.tendencies[x] = Math.floor(Math.random() * 61 - 30);
        }

        this.calculateOverall();
    };

    // Use player attributes to calculate overall rating
    this.calculateOverall = function() {
        this.overall = 0;

        for(var x in this.stats) {
            this.overall += this.stats[x] * this.weights[x]; // Multiply each stat by its weight
        }

        this.overall = Math.round(this.overall); // Round the overall
        if(this.overall>100) this.overall=100;
    };

    this.clearGameStats = function() {
        for(var x in this.gameStats) {
            this.gameStats[x] = 0;
        }
    };

    // Create nice HTML formatted readout of player information
    this.printHTML = function() {
        var output = "";

        output += "Name: "+ this.name +"<br />"; // Name:
        output += "Age: "+ this.age +"<br />"; // Age:

        for(var x in this.stats) {
            output += x +": "+ this.stats[x] +"<br />"; // For each stat, print the stat name, then the value, and then a line break
        }

        output += "Overall: "+ this.overall +"<br /><br />"; // Print the overall rating

        return output; // Return the final output
    }
}

var playerFirstNames = ["Jacob","Mason","Ethan","Noah","William","Liam","Jayden","Michael","Alexander","Aiden","Daniel","Matthew","Elijah","James","Anthony","Benjamin","Joshua","Andrew","David","Joseph","Logan","Jackson","Christopher","Gabriel","Samuel","Ryan","Lucas","John","Nathan","Isaac","Dylan","Caleb","Christian","Landon","Jonathan","Carter","Luke","Owen","Brayden","Gavin","Wyatt","Isaiah","Henry","Eli","Hunter","Jack","Evan","Jordan","Nicholas","Tyler","Aaron","Jeremiah","Julian","Cameron","Levi","Brandon","Angel","Austin","Connor","Adrian","Robert","Charles","Thomas","Sebastian","Colton","Jaxon","Kevin","Zachary","Ayden","Dominic","Blake","Jose","Oliver","Justin","Bentley","Jason","Chase","Ian","Josiah","Parker","Xavier","Adam","Cooper","Nathaniel","Grayson","Jace","Carson","Nolan","Tristan","Luis","Brody","Juan","Hudson","Bryson","Carlos","Easton","Damian","Alex","Kayden","Ryder","Jesus"];
var playerLastNames = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson","Hill","Ramirez","Campbell","Mitchell","Roberts","Carter","Phillips","Evans","Turner","Torres","Parker","Collins","Edwards","Stewart","Flores","Morris","Nguyen","Murphy","Rivera","Cook","Rogers","Morgan","Peterson","Cooper","Reed","Bailey","Bell","Gomez","Kelly","Howard","Ward","Cox","Diaz","Richardson","Wood","Watson","Brooks","Bennett","Gray","James","Reyes","Cruz","Hughes","Price","Myers","Long","Foster","Sanders","Ross","Morales","Powell","Sullivan","Russell","Ortiz","Jenkins","Gutierrez","Perry","Butler","Barnes","Fisher","Henderson"];

function generatePlayerName() {
    // Pick random first name, random last name, then return the combination
    return playerFirstNames[Math.floor(Math.random()*playerFirstNames.length)] +" "+ playerLastNames[Math.floor(Math.random()*playerLastNames.length)];
}
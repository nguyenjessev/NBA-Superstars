var teams = [];

function Team(city, mascot) {
    this.city = city;
    this.mascot = mascot;
    this.abbreviation = "";
    this.wins = 0;
    this.losses = 0;
    this.ties = 0;
    this.score = 0;
    this.players = [];

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

    // Fill the players array with Players
    this.generate = function() {
        this.players = [];

        for(var i=0; i<5; i++) {
            this.players[i] = new Player(generatePlayerName());
            this.players[i].generate();
        }
    };

    // Use the city and mascot to generate a 3-letter abbreviation
    this.generateAbbreviation = function() {
        var abbr = teamCities[this.city] + teamNames[this.mascot];

        abbr = abbr.substr(0,3);

        this.abbreviation = abbr;
    };

    // Create nice HTML-formatted output of team information
    this.printHTML = function() {
        var output = "";

        output += "Name: "+ this.city +" "+ this.mascot +" ("+ this.abbreviation +")<br /><br />";
        output += "Players:<br />";

        for(var i=0; i<this.players.length; i++) {
            output += "<div id=\"player"+ i +"\">"+ this.players[i].name +"</div>";
        }

        return output;
    };

    this.clearGameStats = function() {
        for(var x in this.gameStats) {
            this.gameStats[x] = 0;
        }
    };

    this.compileGameStats = function() {
        this.clearGameStats();

        for(var x in this.players) {
            this.gameStats["PTS"] += this.players[x].gameStats["PTS"];
            this.gameStats["FGM"] += this.players[x].gameStats["FGM"];
            this.gameStats["FGA"] += this.players[x].gameStats["FGA"];
            this.gameStats["3PM"] += this.players[x].gameStats["3PM"];
            this.gameStats["3PA"] += this.players[x].gameStats["3PA"];
            this.gameStats["REB"] += this.players[x].gameStats["REB"];
            this.gameStats["AST"] += this.players[x].gameStats["AST"];
            this.gameStats["BLK"] += this.players[x].gameStats["BLK"];
            this.gameStats["STL"] += this.players[x].gameStats["STL"];
            this.gameStats["TO"] += this.players[x].gameStats["TO"];
        }
    }
}

var teamCities = {
"Yay Area" : "YA",
"Murder Mitten" : "MM",
"Grand Rapids" : "GR",
"Los Angeles" : "LA",
"New York" : "NY",
"Chicago" : "CHI",
"Houston" : "HOU",
"Philadelphia" : "PHI",
"Phoenix" : "PHO",
"San Antonio" : "SA",
"San Diego" : "SD",
"Dallas" : "DAL",
"San Jose" : "SJ",
"Austin" : "AUS",
"Jacksonville" : "JAC",
"Indianapolis" : "IND",
"San Francisco" : "SF",
"Columbus" : "COL",
"Fort Worth" : "FW",
"Charlotte" : "CHA",
"Detroit" : "DET",
"El Paso" : "EP",
"Memphis" : "MEM",
"Boston" : "BOS",
"Seattle" : "SEA",
"Denver" : "DEN",
"Washington" : "WAS",
"Nashville" : "NSH",
"Baltimore" : "BAL",
"Louisville" : "LVL",
"Portland" : "POR",
"Oklahoma City" : "OKC",
"Milwaukee" : "MIL",
"Las Vegas" : "LAS",
"Albuquerque" : "ABQ",
"Tucson" : "TUC",
"Fresno" : "FRE",
"Sacramento" : "SAC",
"Long Beach" : "LB",
"Kansas City" : "KC",
"Mesa" : "MS",
"Virginia Beach" : "VB",
"Atlanta" : "ATL",
"Colorado Springs" : "CS",
"Raleigh" : "RAL",
"Omaha" : "OMA",
"Miami" : "MIA",
"Oakland" : "OAK"};

var teamNames = {
"Albatrosses" : "A",
"Alligators" : "A",
"Angelfish" : "A",
"Ants" : "A",
"Anteaters" : "A",
"Antelopes" : "A",
"Armadillos" : "A",
"Baboons" : "B",
"Badgers" : "B",
"Bandicoots" : "B",
"Barnacles" : "B",
"Barracudas" : "B",
"Bats" : "B",
"Beagles" : "B",
"Bears" : "B",
"Beavers" : "B",
"Beetles" : "B",
"Bison" : "B",
"Bobcats" : "B",
"Buffalo" : "B",
"Bulldogs" : "B",
"Bullfrogs" : "B",
"Bumblebees" : "B",
"Butterflies" : "B",
"Camels" : "C",
"Cats" : "C",
"Caterpillars" : "C",
"Catfish" : "C",
"Centipedes" : "C",
"Chameleons" : "C",
"Cheetahs" : "C",
"Chickens" : "C",
"Chihuahuas" : "C",
"Chimpanzees" : "C",
"Chinchillas" : "C",
"Chipmunks" : "C",
"Cockroaches" : "C",
"Cougars" : "C",
"Cows" : "C",
"Coyotes" : "C",
"Crabs" : "C",
"Cranes" : "C",
"Crocodiles" : "C",
"Cuttlefish" : "C",
"Dalmations" : "D",
"Deer" : "D",
"Dingos" : "D",
"Dodos" : "D",
"Dogs" : "D",
"Dolphins" : "D",
"Donkeys" : "D",
"Dragonflies" : "D",
"Ducks" : "D",
"Eagles" : "E",
"Echidnas" : "E",
"Elephants" : "E",
"Emus" : "E",
"Falcons" : "F",
"Ferrets" : "F",
"Fish" : "F",
"Flamingos" : "F",
"Flounders" : "F",
"Flies" : "F",
"Foxes" : "F",
"Frogs" : "F",
"Geckos" : "G",
"Gerbils" : "G",
"Giraffes" : "G",
"Goats" : "G",
"Geese" : "G",
"Gophers" : "G",
"Gorillas" : "G",
"Grasshoppers" : "G",
"Guppies" : "G",
"Hamsters" : "H",
"Hares" : "H",
"Hedgehogs" : "H",
"Herons" : "H",
"Horses" : "H",
"Humans" : "H",
"Hummingbirds" : "H",
"Hyenas" : "H",
"Iguanas" : "I",
"Impalas" : "I",
"Insects" : "I",
"Jackals" : "J",
"Jaguars" : "J",
"Jellyfish" : "J",
"Kangaroos" : "K",
"Kiwis" : "K",
"Koalas" : "K",
"Lemmings" : "L",
"Lemurs" : "L",
"Leopards" : "L",
"Ligers" : "L",
"Lions" : "L",
"Lizards" : "L",
"Llamas" : "L",
"Lobsters" : "L",
"Lynxes" : "L",
"Manatees" : "M",
"Meerkats" : "M",
"Millipedes" : "M",
"Moles" : "M",
"Monkeys" : "M",
"Moose" : "M",
"Moths" : "M",
"Mice" : "M",
"Mules" : "M",
"Neanderthals" : "N",
"Newts" : "N",
"Ocelots" : "O",
"Octopuses" : "O",
"Opossums" : "O",
"Ostriches" : "O",
"Otters" : "O",
"Oysters" : "O",
"Panthers" : "P",
"Parrots" : "P",
"Peacocks" : "P",
"Pelicans" : "P",
"Penguins" : "P",
"Pheasants" : "P",
"Pigs" : "P",
"Piranhas" : "P",
"Platypuses" : "P",
"Poodles" : "P",
"Porcupines" : "P",
"Possums" : "P",
"Prawns" : "P",
"Pugs" : "P",
"Pumas" : "P",
"Quails" : "Q",
"Rabbits" : "R",
"Raccoons" : "R",
"Rats" : "R",
"Rattlesnakes" : "R",
"Reindeer" : "R",
"Rhinoceroses" : "R",
"Robins" : "R",
"Salamanders" : "S",
"Scorpions" : "S",
"Seals" : "S",
"Sheep" : "S",
"Shrimp" : "S",
"Skunks" : "S",
"Sloths" : "S",
"Snails" : "S",
"Snakes" : "S",
"Sparrows" : "S",
"Squid" : "S",
"Squirrels" : "S",
"Starfish" : "S",
"Stingrays" : "S",
"Swans" : "S",
"Tapirs" : "T",
"Termites" : "T",
"Tigers" : "T",
"Tortoises" : "T",
"Toucans" : "T",
"Turkeys" : "T",
"Umbrellas" : "U",
"Vultures" : "V",
"Walruses" : "W",
"Warthogs" : "W",
"Wasps" : "W",
"Weasels" : "W",
"Wolves" : "W",
"Wolverines" : "W",
"Wombats" : "W",
"Xylophones" : "X",
"Yaks" : "Y",
"Zebras" : "Z"};

function generateCity() {
    var keys = Object.keys(teamCities);

    return keys[Math.floor(Math.random()*keys.length)];
}

function generateMascot() {
    var keys = Object.keys(teamNames);

    return keys[Math.floor(Math.random()*keys.length)];
}
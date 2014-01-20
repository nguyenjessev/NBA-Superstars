var team1;
var team2;

$(document).ready(function() {
    $("button#generateTeam1").click(function() {
        team1 = new Team(generateCity(), generateMascot());
        team1.generateAbbreviation();
        team1.generate();

        $("div#team1").html(team1.printHTML());
    });

    $("button#generateTeam2").click(function() {
        team2 = new Team(generateCity(), generateMascot());
        team2.generateAbbreviation();
        team2.generate();

        $("div#team2").html(team2.printHTML());
    });

    $("button#simulateGame").click(function() {
        clearGameInfo();
        if(team1 && team2) simGame(team1, team2);
    });
});

function randomFromInterval(from, to) {
	return Math.floor(Math.random()*(to-from+1)+from);
}

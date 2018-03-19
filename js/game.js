function simGame(team1, team2) {
    var possessionsLeft = Math.floor(Math.random()*15+190);
    var teamPossession;
    var otherTeam;
    var playerPossession;
    var gameInfo = $("div#gameInfo");
    var team1Score = 0;
    var team2Score = 0;
    var assister = null;
    var nextPossession = null;
    var possessionSummary = "";
    var getRebound = false;

    var shotDifficulty = 1;
    var threePointDifficulty = 1;
    var stealDifficulty = 80;

    var threePointFrequency = 23;
    var passFrequency = 40;
    var stealFrequency = 30;

    clearGameInfo();
    
    //Sort teams by rebounding ability
    team1.players.sort(function(a, b) {
        return a.stats["Rebounds"] - b.stats["Rebounds"];
    });

    // Give first possession to random team
    if(Math.floor(Math.random()*2)) {
        teamPossession = team1;
        otherTeam = team2;
    }
    else {
        teamPossession = team2;
        otherTeam = team1;
    }

    // Add Clear Game Info button and print which team wins tipoff
    gameInfo.append("<p><button class='btn btn-danger' id='clearGameInfo' type='button'>Clear Game Info</button></p><script>$('button#clearGameInfo').click(function() { clearGameInfo() })</script>");
    gameInfo.append("<table id='playByPlay' border='1'></table>");
    var playByPlay = $("table#playByPlay");
    playByPlay.append("<tr><td><strong>"+ team1.abbreviation +"</strong></td><td><strong>SCORE</strong></td><td><strong>"+ team2.abbreviation +"</strong></td></tr>");
    playByPlay.append("<tr><td colspan='3'>"+ teamPossession.abbreviation +" wins the tipoff!</td></tr>");

    // Give ball to random player
    playerPossession = teamPossession.players[Math.floor(Math.random()*5)];

    // Simulate until no more possessions left
    while(possessionsLeft) {
        playBall();

        if(teamPossession == team1) playByPlay.append("<tr><td>"+ possessionSummary +"</td><td>"+ team1.score +"-"+ team2.score +"</td><td></td></tr>");
        else playByPlay.append("<tr><td></td><td>"+ team1.score +"-"+ team2.score +"</td><td>"+ possessionSummary +"</td></tr>");

        possessionSummary = "";
        changePossession();
    }

    while(team1.score == team2.score) {
        playByPlay.append("<tr><td colspan='3'><span style='font-size:1.5em;color:red'><strong>OVERTIME!!!</strong></span></td></tr>");
        possessionsLeft = Math.floor(Math.random()*6+22);
        while(possessionsLeft) {
            playBall();

            if(teamPossession == team1) playByPlay.append("<tr><td>"+ possessionSummary +"</td><td>"+ team1.score +"-"+ team2.score +"</td><td></td></tr>");
            else playByPlay.append("<tr><td></td><td>"+ team1.score +"-"+ team2.score +"</td><td>"+ possessionSummary +"</td></tr>");

            possessionSummary = "";
            changePossession();
        }
    }

    if(team1.score > team2.score) {
        team1.wins++;
        team2.losses++;
    } else {
        team2.wins++;
        team1.losses++;
    }

    // Print out final game score
    gameInfo.append("<br /><p>That's the end of the game! The final score is:</p><br />");
    gameInfo.append("<span style='font-size:200%;'><strong>"+ team1.abbreviation +" "+ team1.score +" - "+ team2.score +" "+ team2.abbreviation +"</strong></span>");
    gameInfo.append("<br /><br />");

    gameInfo.append("<strong>"+ team1.city +" "+ team1.mascot +" ("+ team1.wins +"-"+ team1.losses +")</strong><br />");
    gameInfo.append("<table id='team1BoxScore' border='1'></table>");
    var team1BoxScore = $("table#team1BoxScore");
    team1BoxScore.append("<tr><td>Player</td><td>PTS</td><td>FGM-FGA</td><td>FG%</td><td>3PM-3PA</td><td>3P%</td><td>REB</td><td>AST</td><td>BLK</td><td>STL</td><td>TO</td></tr>");
    for(var x in team1.players) {
        var tempPlayer = team1.players[x].gameStats;
        var tempPlayer3PP = ((Math.round(tempPlayer['3PM']/tempPlayer['3PA']*1000)/1000) || 0.000).toFixed(3);
        team1BoxScore.append("<tr><td>"+ team1.players[x].name +"</td><td>"+ tempPlayer['PTS'] +"</td><td>"+ tempPlayer['FGM'] +"-"+ tempPlayer['FGA'] +"</td><td>"+ (Math.round(tempPlayer['FGM']/tempPlayer['FGA']*1000)/1000).toFixed(3) +"</td><td>"+ tempPlayer['3PM'] +"-"+ tempPlayer['3PA'] +"</td><td>"+ tempPlayer3PP +"</td><td>"+ tempPlayer['REB'] +"</td><td>"+ tempPlayer['AST'] +"</td><td>"+ tempPlayer['BLK'] +"</td><td>"+ tempPlayer['STL'] +"</td><td>"+ tempPlayer['TO'] +"</td></tr>");
    }
    team1.compileGameStats();
    team1BoxScore.append("<tr><td><strong>Totals</strong></td><td>"+ team1.gameStats['PTS'] +"</td><td>"+ team1.gameStats['FGM'] +"-"+ team1.gameStats['FGA'] +"</td><td>"+ (Math.round(team1.gameStats['FGM']/team1.gameStats['FGA']*1000)/1000).toFixed(3) +"</td><td>"+ team1.gameStats['3PM'] +"-"+ team1.gameStats['3PA'] +"</td><td>"+ (Math.round(team1.gameStats['3PM']/team1.gameStats['3PA']*1000)/1000).toFixed(3) +"</td><td>"+ team1.gameStats['REB'] +"</td><td>"+ team1.gameStats['AST'] +"</td><td>"+ team1.gameStats['BLK'] +"</td><td>"+ team1.gameStats['STL'] +"</td><td>"+ team1.gameStats['TO'] +"</td></tr>");

    gameInfo.append("<br />");

    gameInfo.append("<strong>"+ team2.city +" "+ team2.mascot +" ("+ team2.wins +"-"+ team2.losses +")</strong><br />");
    gameInfo.append("<table id='team2BoxScore' border='1'></table>");
    var team2BoxScore = $("table#team2BoxScore");
    team2BoxScore.append("<tr><td>Player</td><td>PTS</td><td>FGM-FGA</td><td>FG%</td><td>3PM-3PA</td><td>3P%</td><td>REB</td><td>AST</td><td>BLK</td><td>STL</td><td>TO</td></tr>");
    for(var x in team2.players) {
        var tempPlayer = team2.players[x].gameStats;
        var tempPlayer3PP = ((Math.round(tempPlayer['3PM']/tempPlayer['3PA']*1000)/1000) || 0.000).toFixed(3);
        team2BoxScore.append("<tr><td>"+ team2.players[x].name +"</td><td>"+ tempPlayer['PTS'] +"</td><td>"+ tempPlayer['FGM'] +"-"+ tempPlayer['FGA'] +"</td><td>"+ (Math.round(tempPlayer['FGM']/tempPlayer['FGA']*1000)/1000).toFixed(3) +"</td><td>"+ tempPlayer['3PM'] +"-"+ tempPlayer['3PA'] +"</td><td>"+ tempPlayer3PP +"</td><td>"+ tempPlayer['REB'] +"</td><td>"+ tempPlayer['AST'] +"</td><td>"+ tempPlayer['BLK'] +"</td><td>"+ tempPlayer['STL'] +"</td><td>"+ tempPlayer['TO'] +"</td></tr>");
    }
    team2.compileGameStats();
    team2BoxScore.append("<tr><td><strong>Totals</strong></td><td>"+ team2.gameStats['PTS'] +"</td><td>"+ team2.gameStats['FGM'] +"-"+ team2.gameStats['FGA'] +"</td><td>"+ (Math.round(team2.gameStats['FGM']/team2.gameStats['FGA']*1000)/1000).toFixed(3) +"</td><td>"+ team2.gameStats['3PM'] +"-"+ team2.gameStats['3PA'] +"</td><td>"+ (Math.round(team2.gameStats['3PM']/team2.gameStats['3PA']*1000)/1000).toFixed(3) +"</td><td>"+ team2.gameStats['REB'] +"</td><td>"+ team2.gameStats['AST'] +"</td><td>"+ team2.gameStats['BLK'] +"</td><td>"+ team2.gameStats['STL'] +"</td><td>"+ team2.gameStats['TO'] +"</td></tr>");

    // Main simulation of shooting, passes, etc.
    function playBall() {
        if(Math.floor(Math.random()*101) < passFrequency+playerPossession.tendencies["Pass"]) { // Generate random number from 0-100. If it is less than 40+the player's tendency to pass...
            var passTarget;

            // Get random teammate
            do {
                passTarget = teamPossession.players[Math.floor(Math.random()*5)];
            } while(passTarget == playerPossession);

            // Print out pass and pass ball to teammate
            possessionSummary += "<p>"+ playerPossession.name +" passes the ball to "+ passTarget.name +"</p>";
            assister = playerPossession;
            playerPossession = passTarget;

            // Continue simulation with new player
            playBall();
        } else { // If generated number is MORE than 40+player's tendency to pass
            var matchup = otherTeam.players[Math.floor(Math.random()*5)];

            if(Math.floor(Math.random()*101) < stealFrequency+matchup.tendencies["Steal"]) {
                if(Math.round(Math.random()*101 + (matchup.stats["Steals"]-playerPossession.stats["Handles"]) > stealDifficulty)) {
                    matchup.gameStats["STL"]++;
                    playerPossession.gameStats["TO"]++;
                    possessionSummary += "<p>"+ matchup.name +" steals the ball! ("+ matchup.gameStats["STL"] +" STL)</p>";
                    nextPossession = matchup;

                    return;
                } else doShot();

            } else doShot();
        }
    }

    // Transfer possession between teams
    function changePossession() {
        var tempTeam = otherTeam;
        otherTeam = teamPossession;
        teamPossession = tempTeam;

        if(nextPossession) {
            playerPossession = nextPossession;
            nextPossession = null;
        } else if(getRebound) {
            
            playerPossession = teamPossession.players[Math.floor(Math.random()*5)];
            playerPossession.gameStats["REB"]++;
            possessionSummary += playerPossession.name +" gets the rebound ("+ playerPossession.gameStats['REB'] +" REB)";
            getRebound = false;
        } else playerPossession = teamPossession.players[Math.floor(Math.random()*5)];

        assister = null;

        possessionsLeft--;
    }

    function doShot() {
        if(Math.floor(Math.random()*101) < threePointFrequency+playerPossession.tendencies["3pt"]) {
            var makeChance = Math.round(20*Math.log(playerPossession.stats["3pt Shooting"])/threePointDifficulty - randomFromInterval(50, 60));

            playerPossession.gameStats["3PA"]++;
            playerPossession.gameStats["FGA"]++;

            if(Math.floor(Math.random()*101) <= makeChance) {
                playerPossession.gameStats["3PM"]++;
                playerPossession.gameStats["FGM"]++;
                playerPossession.gameStats["PTS"] += 3;
                teamPossession.score += 3;

                if(assister) {
                    assister.gameStats["AST"]++;
                    possessionSummary += "<p>"+ playerPossession.name +" shoots it from deep and makes it! ("+ playerPossession.gameStats['PTS'] +" PTS) "+ assister.name +" gets the assist ("+ assister.gameStats['AST'] +" AST)</p>";
                } else possessionSummary += "<p>"+ playerPossession.name +" shoots it from deep and makes it! ("+ playerPossession.gameStats['PTS'] +" PTS)</p>";

            } else {
                possessionSummary += "<p>"+ playerPossession.name +" shoots it from deep and misses!</p>";
                getRebound = true;
            }
        } else {
            var makeChance = Math.round(20*Math.log(playerPossession.stats["Shooting"])/shotDifficulty - randomFromInterval(25, 35)); // Formula for calculating shooting percentage from Shooting stat

            playerPossession.gameStats["FGA"]++; // Increment FGA

            if(Math.floor(Math.random()*101) <= makeChance) { // Generate random number from 0-100. If less than or equal to makeChance
                playerPossession.gameStats["FGM"]++;          // Make shot
                playerPossession.gameStats["PTS"] += 2;       // Score points
                teamPossession.score += 2;                    // Add points to team total

                if(assister) {
                    assister.gameStats["AST"]++;
                    possessionSummary += "<p>"+ playerPossession.name +" shoots and scores ("+ playerPossession.gameStats['PTS'] +" PTS) "+ assister.name +" gets the assist ("+ assister.gameStats['AST'] +" AST)</p>";
                } else possessionSummary += "<p>"+ playerPossession.name +" shoots and scores ("+ playerPossession.gameStats['PTS'] +" PTS)</p>"; // Print made shot

            } else {
                possessionSummary += "<p>"+ playerPossession.name +" shoots and misses</p>";
                getRebound = true;
            } // or print missed shot
        }
    }
}

function clearGameInfo() {
    $('div#gameInfo').html('');
    for(var i=0; i<team1.players.length; i++) {
        team1.players[i].clearGameStats();
    }
    for(var i=0; i<team2.players.length; i++) {
        team2.players[i].clearGameStats();
    }
    team1.score = 0;
    team2.score = 0;
}

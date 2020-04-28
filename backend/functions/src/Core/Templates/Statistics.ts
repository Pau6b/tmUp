export const matchStats = {
    football: {
        fouls: 0,
        goalsReceived: 0,
        goalsScored: 0,
        lostBalls: 0,
        redCards: 0,
        yellowCards: 0
    },
    basketball : {
        fouls: 0,
        pointsReceived: 0,
        pointsScored: 0,
        technicalFouls: 0,
        threePointShots: 0,
        unsportsmanlikeFouls: 0
    },
    handball: {
        goalsReceived: 0,
        goalsScored: 0,
        lostBalls: 0,
        sevenMeters: 0,
        stops: 0,
        twoMinutes: 0
    },
    baseball: {
        homeRuns: 0,
        runs: 0,
        strikes: 0
    }
};

export const memberhsipStats = {
    football : {
        assists: 0,
        fouls: 0,
        goals: 0,
        minPlayed: 0,
        redCards: 0,
        yellowCards: 0
    },
    basketball : {
        assists: 0,
        points: 0,
        rebounds: 0,
        minPlayed: 0,
        fouls: 0,
        expulsions: 0
    },
    handball: {
        goals: 0,
        lostBalls: 0,
        minPlayed: 0,
        redCard: 0,
        twoMinutes: 0
    },
    baseball: {
        homeRuns: 0,
        runs: 0,
        strikes: 0,
        minPlayed: 0
    }
};

export const teamStats = {
    football : {
        wonMatches: 0,
        drawedMatches: 0,
        lostMatches: 0,
        goalsScored: 0,
        goalsReceived: 0
    },
    basketball : {
        wonMatches: 0,
        lostMatches: 0,
        pointsScored: 0,
        pointsReceived: 0
    },
    handball: {
        wonMatches: 0,
        drawedMatches: 0,
        lostMatches: 0,
        goalsScored: 0,
        goalsReceived: 0
    },
    baseball: {
        wonMatches: 0,
        lostMatches: 0,
        homeRunsScored: 0,
        homeRunsReceived: 0,
        runsScored: 0,
        runsReceived: 0
    }
};

export function GetTeamStatsBySport(sport: string) {
    let result = {};
    if (sport === "Football") {
        result = teamStats.football;
    }
    else if (sport === "Basketball") {
        result = teamStats.basketball;
    }
    else if (sport === "Handball") {
        result = teamStats.handball;
    }
    else if (sport === "Baseball") {
        result = teamStats.baseball;
    }
    return result;
}

export function GetMembershipStatsBySport(sport: string) {
    let result = {};
    if (sport === "Football") {
        result = memberhsipStats.football;
    }
    else if (sport === "Basketball") {
        result = memberhsipStats.basketball;
    }
    else if (sport === "Handball") {
        result = memberhsipStats.handball;
    }
    else if (sport === "Baseball") {
        result = memberhsipStats.baseball;
    }
    return result;
}

export function GetMatchStatsBySport(sport: string) {
    let result = {};
    if (sport === "Football") {
        result = matchStats.football;
    }
    else if (sport === "Basketball") {
        result = matchStats.basketball;
    }
    else if (sport === "Handball") {
        result = matchStats.handball;
    }
    else if (sport === "Baseball") {
        result = matchStats.baseball;
    }
    return result;
}
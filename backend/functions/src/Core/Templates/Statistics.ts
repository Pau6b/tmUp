export const matchStats = {
    football: {
        goalsReceived: 0,
        goalsScored: 0,
        redCards: 0,
        yellowCards: 0,
        changes: 0,
        stops: 0
    },
    basketball : {
        asissts: 0,
        pointsReceived: 0,
        pointsScored: 0,
        twoPointShots: 0,
        rebounds: 0,
        threePointShots: 0,
    },
    handball: {
        goalsReceived: 0,
        goalsScored: 0,
        lostBalls: 0,
        sevenMeters: 0,
        stops: 0,
        twoMinutes: 0
    }
};

export const memberhsipStats = {
    football : {
        assists: 0,
        goals: 0,
        minPlayed: 0,
        redCards: 0,
        yellowCards: 0
    },
    basketball : {
        assists: 0,
        points: 0,
        rebounds: 0,
        twoPointShots: 0,
        threePointShots: 0
    },
    handball: {
        goals: 0,
        lostBalls: 0,
        stops: 0,
        sevenMeters: 0,
        twoMinutes: 0
    }
};

export const teamStats = {
    football : {
        wonMatches: 0,
        drawedMatches: 0,
        lostMatches: 0,
        goalsScored: 0,
        goalsReceived: 0,
        yellowCards: 0,
        redCards: 0
    },
    basketball : {
        twoPointShots: 0,
        threePointShots: 0,
        wonMatches: 0,
        lostMatches: 0,
        pointsScored: 0,
        pointsReceived: 0,
    },
    handball: {
        wonMatches: 0,
        drawedMatches: 0,
        lostMatches: 0,
        goalsScored: 0,
        goalsReceived: 0,
        stops: 0,
        lostBalls: 0
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
    return result;
}
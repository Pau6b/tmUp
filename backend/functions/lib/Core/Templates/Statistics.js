"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchStats = {
    football: {
        goalsReceived: 0,
        goalsScored: 0,
        redCards: 0,
        yellowCards: 0,
        changes: 0,
        stops: 0
    },
    basketball: {
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
exports.memberhsipStats = {
    football: {
        assists: 0,
        goals: 0,
        minPlayed: 0,
        redCards: 0,
        yellowCards: 0
    },
    basketball: {
        assists: 0,
        points: 0,
        rebounds: 0,
        twoPointShots: 0,
        threePointShots: 0
    },
    handball: {
        goalsScored: 0,
        lostBalls: 0,
        stops: 0,
        sevenMeters: 0,
        twoMinutes: 0
    }
};
exports.teamStats = {
    football: {
        wonMatches: 0,
        drawedMatches: 0,
        lostMatches: 0,
        goalsScored: 0,
        goalsReceived: 0,
        yellowCards: 0,
        redCards: 0
    },
    basketball: {
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
function GetTeamStatsBySport(sport) {
    let result = {};
    if (sport === "Football") {
        result = exports.teamStats.football;
    }
    else if (sport === "Basketball") {
        result = exports.teamStats.basketball;
    }
    else if (sport === "Handball") {
        result = exports.teamStats.handball;
    }
    return result;
}
exports.GetTeamStatsBySport = GetTeamStatsBySport;
function GetMembershipStatsBySport(sport) {
    let result = {};
    if (sport === "Football") {
        result = exports.memberhsipStats.football;
    }
    else if (sport === "Basketball") {
        result = exports.memberhsipStats.basketball;
    }
    else if (sport === "Handball") {
        result = exports.memberhsipStats.handball;
    }
    return result;
}
exports.GetMembershipStatsBySport = GetMembershipStatsBySport;
function GetMatchStatsBySport(sport) {
    let result = {};
    if (sport === "Football") {
        result = exports.matchStats.football;
    }
    else if (sport === "Basketball") {
        result = exports.matchStats.basketball;
    }
    else if (sport === "Handball") {
        result = exports.matchStats.handball;
    }
    return result;
}
exports.GetMatchStatsBySport = GetMatchStatsBySport;
//# sourceMappingURL=Statistics.js.map
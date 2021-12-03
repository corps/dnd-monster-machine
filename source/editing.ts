import {
	defaultCombatRank,
	defaultMonster,
	defaultRankLevel,
	EditMonster,
	Monster,
	RankLevel,
	Template
} from "./types";
import {emptyObject, emptyTuple, matchNumber, matchWhitespace, Parser} from "./parser";

export const ranks = {
	Minion: {...defaultCombatRank, acMod: -2, hpMult: 0.2, stMod: -2, dmgMult: 0.75, xpMult: 0.25},
	Grunt: {...defaultCombatRank},
	Elite: {...defaultCombatRank, acMod: 2, hpMult: 2, stMod: 2, dmgMult: 1.1, attackMod: 2, dcMod: 2, initProfMod: 1, xpMult: 2},
	Paragon: {...defaultCombatRank, acMod: 2, hpMult: 4, stMod: 2, dmgMult: 1.2, attackMod: 2, dcMod: 2, initProfMod: 1, xpMult: 4},
};

export function toEditMonster(monster: Monster | Template): EditMonster {
	const normalized: Monster = {...defaultMonster, ...monster};
	const {DamageImmunities, ConditionImmunities, DamageResistances, DamageVulnerabilities} = normalized;

	const CombatLevel = parseInt(normalized.Challenge, 10) || 0;
	const RankLevel = combatLevelToGruntPower(CombatLevel);
	const CombatRank = inferCombatRank(RankLevel, normalized);

	return {
		CombatLevel,
		CombatRank,
		DamageImmunities,
		ConditionImmunities,
		DamageResistances,
		DamageVulnerabilities,
	}
}

const headNumber = matchNumber.terminatedBy(Parser.nextMatching(/, |-/));

const rankLevelParser: Parser<RankLevel> =
	emptyObject
		.withKey('ac', matchNumber.terminatedBy(matchWhitespace))
		.withKey('hp', matchNumber.terminatedBy(matchWhitespace))
		.withKey('attack', matchNumber.terminatedBy(matchWhitespace))
		.withKey('dcs', emptyTuple.plus(headNumber).plus(matchNumber).terminatedBy(matchWhitespace))
		.withKey('damage', matchNumber.terminatedBy(matchWhitespace))
		.withKey('prof', matchNumber.terminatedBy(matchWhitespace))
		.withKey('st', emptyTuple.plus(headNumber).plus(headNumber).plus(matchNumber).terminatedBy(matchWhitespace))
		.withKey('ab', emptyTuple.plus(headNumber).plus(headNumber).plus(headNumber).plus(headNumber).plus(headNumber).plus(matchNumber).terminatedBy(matchWhitespace))
		.proceededBy(matchNumber.terminatedBy(matchWhitespace))

const rankLevels = `0 14 16 +2 7-10 1 +1 4, 2, 0 3, 2, 1, 1, 0, -1 1/8 25
1 14 26 +3 8-11 2 +2 5, 3, 0 3, 2, 1, 1, 0, -1 1/4 50
2 14 29 +3 8-11 4 +2 5, 3, 0 3, 2, 1, 1, 0, -1 1/2 112
3 14 33 +3 8-11 5 +2 5, 3, 0 3, 2, 1, 1, 0, -1 1/2 175
4 15 36 +4 9-12 8 +2 6, 3, 1 4, 3, 2, 1, 1, 0 1 275
5 16 60 +5 10-13 9 +3 7, 4, 1 4, 3, 2, 1, 1, 0 2 450
6 16 64 +5 10-13 11 +3 7, 4, 1 4, 3, 2, 1, 1, 0 2 575
7 16 68 +5 10-13 13 +3 7, 4, 1 4, 3, 2, 1, 1, 0 3 725
8 17 71 +6 11-14 17 +3 8, 5, 1 5, 3, 2, 2, 1, 0 3 975
9 18 102 +7 12-15 19 +4 9, 5, 2 5, 3, 2, 2, 1, 0 4 1,250
10 18 106 +7 12-15 21 +4 9, 5, 2 5, 3, 2, 2, 1, 0 4 1,475
11 18 111 +7 12-15 23 +4 9, 5, 2 5, 3, 2, 2, 1, 0 5 1,800
12 18 115 +8 12-15 28 +4 10, 6, 2 6, 4, 3, 2, 1, 0 5 2,100
13 19 152 +9 13-16 30 +5 11, 7, 2 6, 4, 3, 2, 1, 0 6 2,500
14 19 157 +9 13-16 32 +5 11, 7, 2 6, 4, 3, 2, 1, 0 6 2,875
15 19 162 +9 13-16 34 +5 11, 7, 2 6, 4, 3, 2, 1, 0 7 3,250
16 20 166 +10 14-17 41 +5 12, 7, 3 7, 5, 3, 2, 2, 1 7 3,750
17 21 210 +11 15-18 43 +6 13, 8, 3 7, 5, 3, 2, 2, 1 8 4,500
18 21 215 +11 15-18 46 +6 13, 8, 3 7, 5, 3, 2, 2, 1 9 5,000
19 21 221 +11 15-18 48 +6 13, 8, 3 7, 5, 3, 2, 2, 1 9 5,500
20 22 226 +12 16-19 51 +6 14, 9, 3 8, 6, 4, 3, 2, 1 10 6,250
21 22 276 +13 17-20 53 +7 15, 9, 4 8, 6, 4, 3, 2, 1 11 8,250
22 22 282 +13 17-20 56 +7 15, 9, 4 8, 6, 4, 3, 2, 1 13 10,250
23 22 288 +13 17-20 58 +7 15, 9, 4 8, 6, 4, 3, 2, 1 14 12,500
24 23 293 +14 17-20 61 +7 16, 10, 4 9, 6, 4, 3, 2, 1 16 15,500`.split('\n').map(line => rankLevelParser.run(line));

export function combatLevelToGruntPower(combatLevel: number): RankLevel {
	return rankLevels[combatLevel] || defaultRankLevel;
}

export function inferCombatRank(rankLevel: RankLevel, normalized: Monster) {
	for (let rank of Object.values(ranks)) {
		if (Math.floor(rank.hpMult * rankLevel.hp) <= normalized.HP.Value) {
			return rank;
		}
	}

	return ranks.Paragon;
}

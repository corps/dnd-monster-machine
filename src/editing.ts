import {
	CombatRank,
	CombatRole,
	defaultCombatRank,
	defaultCombatRole,
	defaultMonster,
	defaultRankLevel,
	EditMonster,
	Monster,
	RankLevel,
} from "./types";
import {emptyObject, emptyTuple, matchNumber, matchWhitespace, Parser} from "./parser";

export const ranks: Record<'Minion' | 'Grunt' | 'Elite' | 'Paragon', CombatRank> = {
	Minion: {...defaultCombatRank, acMod: -2, hpMult: 0.2, stMod: -2, dmgMult: 0.75, xpMult: 0.25},
	Grunt: {...defaultCombatRank},
	Elite: {
		...defaultCombatRank, acMod: 2, hpMult: 2, stMod: 2, dmgMult: 1.1, attackMod: 2, dcMod: 2, initProfMod: 1, xpMult: 2
	},
	Paragon: {
		...defaultCombatRank, acMod: 2, hpMult: 4, stMod: 2, dmgMult: 1.2, attackMod: 2, dcMod: 2, initProfMod: 1, xpMult: 4
	},
};

export const roles: Record<'Controller' | 'Defender' | 'Lurker' | 'Scout' | 'Striker' | 'Supporter', CombatRole> = {
	Controller: {
		...defaultCombatRole, acMod: 2, stMod: 1, dmgMult: 0.75, initProfMod: 1,
	}, Defender: {
		...defaultCombatRole, acMod: 4, stMod: 2, hpMult: 0.75, speed: -5,
	}, Lurker: {
		...defaultCombatRole,
		acMod: -4,
		stMod: -2,
		hpMult: 0.75,
		attack: 3,
		dcMod: 3,
		dmgMult: 1.5,
		speed: 5,
		stealthProfMod: 1,
	}, Scout: {
		...defaultCombatRole, attack: -1, dcMod: -1, dmgMult: 0.75, speed: 10, stealthProfMod: 1, perceptionProfMod: 1,
	}, Striker: {
		...defaultCombatRole, acMod: -2, stMod: -1, hpMult: 1.25, attack: 2, dcMod: 2, dmgMult: 1.25,
	}, Supporter: {
		...defaultCombatRole, hpMult: 1.5, attack: -2, dcMod: -2, initProfMod: 1,
	},
}

export const conditionImmunitiesByFlag: Record<string, string[]> = {
	celestial: [],
	hardened: [],
	intangible: ['grappled', 'restrained'],
	animated: ['blinded', 'paralyzed', 'exhaustion', 'unconscious'],
	undead: ['frightened', 'exhaustion', 'stunned', 'charmed', 'unconscious'],
	fey: ['charmed'],
	wriggler: ['prone'],
	swarm: ['prone', 'exhaustion'],
	toxic: ['poisoned', 'petrified']
}

export const vulnerabilitiesByFlag: Record<string, string[]> = {
	celestial: [],
	fey: [],
	hardened: [],
	intangible: [],
	toxic: [],
	wriggler: [],
	undead: ['radiant'],
	swarm: ['thunder'],
	animated: ['thunder']
}

export const resistancesByFlag: Record<string, string[]> = {
	animated: [],
	intangible: [],
	swarm: [],
	wriggler: [],
	hardened: ['blunt', 'piercing', 'slashing'],
	undead: ['cold', 'necrotic'],
	fey: ['psychic'],
	celestial: ['radiant'],
	toxic: ['poison']
}

export const immunitiesByFlag: Record<string, string[]> = {
	celestial: [],
	fey: [],
	hardened: [],
	intangible: [],
	swarm: [],
	toxic: [],
	wriggler: [],
	undead: ['poison'],
	animated: ['psychic', 'poison']
}

export function toEditMonster(monster: Monster): EditMonster {
	return monster._editing;
}

const headNumber = matchNumber.terminatedBy(Parser.nextMatching(/, |-/));

const rankLevelParser: Parser<RankLevel> = emptyObject
	.withKey('ac', matchNumber.terminatedBy(matchWhitespace))
	.withKey('hp', matchNumber.terminatedBy(matchWhitespace))
	.withKey('attack', matchNumber.terminatedBy(matchWhitespace))
	.withKey('dcs', emptyTuple.plus(headNumber).plus(matchNumber).terminatedBy(matchWhitespace))
	.withKey('damage', matchNumber.terminatedBy(matchWhitespace))
	.withKey('prof', matchNumber.terminatedBy(matchWhitespace))
	.withKey('st', emptyTuple.plus(headNumber).plus(headNumber).plus(matchNumber).terminatedBy(matchWhitespace))
	.withKey(
		'ab',
		emptyTuple.plus(headNumber).plus(headNumber).plus(headNumber).plus(headNumber).plus(headNumber).plus(matchNumber)
			.terminatedBy(matchWhitespace)
	)
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

export function expandToRankLevel(combatLevel: number, combatRank: CombatRank, combatRole: CombatRole): RankLevel {
	let {hp, ac, ab, attack, damage, dcs: [dc1, dc2], st: [st1, st2, st3], prof} = combatLevelToGruntPower(combatLevel);

	hp = Math.floor(hp * 0.75);
	damage = Math.floor(damage * 1.33);

	return {
		hp: Math.floor(hp * combatRank.hpMult * combatRole.hpMult),
		ac: ac + combatRank.acMod + combatRole.acMod,
		ab,
		attack: attack + combatRank.attackMod + combatRole.attack,
		damage: Math.floor(damage * combatRank.dmgMult * combatRole.dmgMult),
		dcs: [dc1 + combatRank.dcMod + combatRole.dcMod, dc2 + combatRank.dcMod + combatRole.dcMod],
		st: [
			st1 + combatRank.stMod + combatRole.stealthProfMod,
			st2 + combatRank.stMod + combatRole.stMod,
			st3 + combatRank.stMod + combatRole.stMod
		],
		prof
	}
}

export function abModAsAb(mod: number) {
	return 10 + mod * 2;
}

export function abAsAbMod(ab: number) {
	return Math.floor((ab - 10) / 2);
}

export function expandEdit(editMonster: EditMonster): Monster {
	const {
		CombatLevel, CombatRank, CombatRole, flags
	} = editMonster;
	const {hp, prof, ac, ab, st, attack, dcs, damage} = expandToRankLevel(CombatLevel, CombatRank, CombatRole);


	const Abilities = {...defaultMonster.Abilities};
	const Saves = [...defaultMonster.Saves];

	editMonster.Abilities.forEach((ability, i) => {
		if (!(ability in Abilities)) return;
		const nextVal = ab[i];
		if (nextVal == null) return;

		Abilities[ability as keyof typeof Abilities] = abModAsAb(nextVal);

		if (i < 1) {
			Saves.push({Name: ability, Modifier: st[0],})
		} else if (i < 3) {
			Saves.push({Name: ability, Modifier: st[1],})
		} else {
			Saves.push({Name: ability, Modifier: st[2],})
		}
	})

	const DamageImmunities = flags.map(k => immunitiesByFlag[k] || []).flat()
	const DamageResistances = flags.map(k => resistancesByFlag[k] || []).flat()
	const DamageVulnerabilities = flags.map(k => vulnerabilitiesByFlag[k] || []).flat()
	const ConditionImmunities = flags.map(k => conditionImmunitiesByFlag[k] || []).flat()

	const Actions = [...defaultMonster.Actions];
	const BonusActions = [...defaultMonster.BonusActions];
	const Reactions = [...defaultMonster.Reactions];
	const LegendaryActions = [...defaultMonster.LegendaryActions];
	const Traits = [...defaultMonster.Traits];


	Traits.push({Name: '+', Content: editMonster.WinCondition});
	Traits.push({Name: '-', Content: editMonster.CounterMeasure});

	Actions.push({
		Name: 'Attack',
		Content: `Attack: ${attack}, DC ${dcs[0]}, Damage: ${[4, 6, 8, 12].map(sides => rollToString(toRoll(damage, sides))).join(' / ')}`,
	})

	Actions.push({
		Name: 'Power (3/Day)',
		Content: ``,
	})

	if (flags.includes('legendary')) {
		Traits.push({
			Name: 'Legendary Resistance (3/Day)',
			Content: 'May succeed a failed saving throw.',
		})

		LegendaryActions.push({
			Name: 'Move',
			Content: 'Make another movement (2 Actions)',
		})
	}

	BonusActions.push({
		Name: 'Secondary Effect',
		Content: `DC ${dcs[1]}`
	})

	Reactions.push({
		Name: 'Reaction',
		Content: `Prof: ${prof}`
	})

	return {
		...defaultMonster,
		HP: {Value: hp, Notes: ""},
		InitiativeModifier: (prof * (CombatRank.initProfMod + CombatRole.initProfMod)) + abAsAbMod(Abilities.Dex),
		Saves: Saves,
		AC: {Value: ac, Notes: ""},
		Senses: [`passive Perception ${10 + abAsAbMod(Abilities.Wis) + prof * CombatRole.perceptionProfMod}`],
		Skills: [
			{
				Name: 'Stealth', Modifier: abAsAbMod(Abilities.Dex) + prof * CombatRole.stealthProfMod
			}
		],
		Speed: [`move +${CombatRole.speed} ft`],
		Abilities,
		DamageImmunities,
		DamageResistances,
		DamageVulnerabilities,
		ConditionImmunities,
		Traits,
		Actions,
		BonusActions,
		Reactions,
		LegendaryActions,
		_editing: editMonster,
	}
}

export type Roll = { sides: number, dice: number, mod: number };

export function rollToString({sides, dice, mod}: Roll): string {
	const mult = sides / 2 + 0.5;
	if (sides < 1 || dice < 1) {
		return (mult * sides).toString();
	}

	if (mod > 0) {
		return `${dice}d${sides}+${mod}`
	}

	if (mod < 0) {
		return `${dice}d${sides}${mod}`
	}

	return `${dice}d${sides}`
}

export function toRoll(i: number, sides: number = 6): Roll {
	const mult = sides / 2 + 0.5;
	let dice = Math.floor(i / mult);

	if (!dice) {
		dice += 1;
		i -= mult;
	}

	const mod = Math.floor(i % mult);
	return {dice, mod, sides};
}

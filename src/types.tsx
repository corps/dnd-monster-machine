export const defaultModifier = {
	Name: "", Modifier: 0,
}

export const defaultContent = {
	Name: "", Content: ""
};

export type Save = typeof defaultModifier;
export type Skill = typeof defaultModifier;
export type TraitOrAction = typeof defaultContent;

// (3/Day)
// (Recharge 5-6)

export const defaultCombatRole = {
	acMod: 0,
	stMod: 0,
	hpMult: 1,
	attack: 0,
	dcMod: 0,
	dmgMult: 1,
	speed: 0,
	perceptionProfMod: 0,
	stealthProfMod: 0,
	initProfMod: 0,
}

export type CombatRole = typeof defaultCombatRole;

export const defaultCombatRank = {
	acMod: 0,
	hpMult: 1,
	stMod: 0,
	initProfMod: 0,
	attackMod: 0,
	dcMod: 0,
	dmgMult: 1,
	xpMult: 1,
};

export type CombatRank = typeof defaultCombatRank;

export const defaultEditMonster = {
	CombatLevel: 0,
	CombatRank: defaultCombatRank,
	CombatRole: defaultCombatRole,
	Abilities: ["Str", "Dex", "Con", "Wis", "Int", "Cha"],
	flags: [] as string[],
	WinCondition: "",
	CounterMeasure: "",
}

export type EditMonster = typeof defaultEditMonster;


export const defaultMonster = {
	Source: "dndmm",
	_editing: defaultEditMonster,
	Type: "beast",
	Challenge: "0",
	HP: {Value: 3, Notes: ""},
	AC: {Value: 10, Notes: ""},
	InitiativeModifier: 0,
	InitiativeAdvantage: false,
	Speed: [
		"walk 30 ft."
	],
	Abilities: {
		"Str": 10, "Dex": 10, "Con": 10, "Int": 10, "Wis": 10, "Cha": 10
	},
	DamageVulnerabilities: [] as string[],
	DamageResistances: [] as string[],
	DamageImmunities: [] as string[],
	ConditionImmunities: [] as string[],
	Saves: [] as Save[],
	Skills: [] as Skill[],
	Senses: [] as string[],
	Languages: [] as string[],
	Traits: [] as TraitOrAction[],
	Actions: [] as TraitOrAction[],
	BonusActions: [] as TraitOrAction[],
	Reactions: [] as TraitOrAction[],
	LegendaryActions: [] as TraitOrAction[],
	MythicActions: [] as TraitOrAction[],
	Version: "1.0",
	Player: "",
	ImageUrl: "",
}

export type Monster = typeof defaultMonster;



export const defaultRankLevel = {
	ac: 0,
	hp: 0,
	attack: 0,
	dcs: [0, 0] as [number, number],
	damage: 1,
	prof: 0,
	st: [0, 0, 0] as [number, number, number],
	ab: [0, 0, 0, 0, 0, 0] as [number, number, number, number, number, number],
}

export type RankLevel = typeof defaultRankLevel;

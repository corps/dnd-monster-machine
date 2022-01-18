import React, {useMemo} from 'react';
import {
	AutoMultilineString,
	autoMultiSelect,
	AutoNumber,
	autoOption,
	autoOrder,
	AutoString,
	labeled, lift,
	noop,
	objectFrom,
	passThrough,
	translate,
	useTap
} from "./autoform";
import {
	conditionImmunitiesByFlag, expandEdit,
	immunitiesByFlag,
	ranks,
	resistancesByFlag,
	roles,
	vulnerabilitiesByFlag
} from "./editing";
import {defaultEditMonster} from "./types";

function App() {
	const [EditMonster, editMonster] = useTap(useMemo(() => {
		return objectFrom(defaultEditMonster, {
			...passThrough(defaultEditMonster),
			CombatLevel: labeled("Level", AutoNumber),
			CombatRank: labeled(
				"Rank",
				translate(autoOption(Object.keys(ranks) as (keyof typeof ranks)[]),
					k => ranks[k as keyof typeof ranks],
					rank => Object.keys(ranks).find(k => ((ranks as any)[k] === rank)) as any || 'Grunt'
				)
			),
			CombatRole: labeled(
				"Role",
				translate(autoOption(Object.keys(roles) as (keyof typeof roles)[]),
					k => roles[k as keyof typeof roles],
					role => Object.keys(roles).find(k => ((roles as any)[k] === role)) as any || 'Controller'
				)
			),
			Abilities: labeled("Abilities", autoOrder(defaultEditMonster.Abilities)),
			WinCondition: lift(""),
			CounterMeasure: lift(""),
			flags: lift([] as string[]),
		})
	}, [defaultEditMonster]), defaultEditMonster);

	const monster = useMemo(() => expandEdit(editMonster), [editMonster]);
	const baseData = useMemo(() => (
		{
			HP: monster.HP.Value + " " + monster.HP.Notes,
			AC: monster.AC.Value + " " + monster.AC.Notes,
			Init: monster.InitiativeModifier,
			Per: monster.Senses.join(', '),
			Skls: monster.Skills.map(({Name, Modifier}) => `${Name}: ${Modifier}`).join(', '),
			ST: monster.Saves.map(({Name, Modifier}) => `${Name}: ${Modifier}`).join(', '),
			Imm: [...new Set<string>([...monster.DamageImmunities, ...monster.ConditionImmunities]).values()].join(', '),
			Res: [...new Set(monster.DamageResistances).values()].join(', '),
			Vuln: [...new Set(monster.DamageVulnerabilities).values()].join(', '),
		}
	), [monster]);

	return (
    <div className="mw7 center pa4">
		<EditMonster onChange={noop} />

		<pre>
			HP {baseData.HP} AC: {baseData.AC} Init: {baseData.Init}  Per: {baseData.Per} {baseData.Skls}<br/>
			{monster.Actions[0].Content}<br/>
			{monster.Saves.map(({Name, Modifier}) => `${Name}: ${Modifier}`).join(' ')}
		</pre>

		<div>
			<textarea value={JSON.stringify(monster, null, 2)} className="input-reset w-100" rows={4}/>
		</div>
    </div>
  );
}

export default App;

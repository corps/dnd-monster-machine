import React, {useMemo} from 'react';
import {
	autoMultiSelect,
	AutoNumber,
	autoOption,
	autoOrder,
	AutoString,
	labeled, noop,
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
			WinCondition: labeled('Win Condition', AutoString),
			CounterMeasure: labeled('Counter Measure', AutoString),
			flags: labeled("Flags", autoMultiSelect([
				...Object.keys({...immunitiesByFlag, ...vulnerabilitiesByFlag, ...conditionImmunitiesByFlag, ...resistancesByFlag}),
				'legendary'
			])),
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

		<div>
			<textarea value={JSON.stringify(monster, null, 2)} className="input-reset w-100" rows={4}/>
		</div>
		<div>
			HP {baseData.HP} AC: {baseData.AC} Init: {baseData.Init} {baseData.Per}
		</div>
		<div>
			{baseData.Skls} Imm: {baseData.Imm} Res: {baseData.Res} Vuln: {baseData.Vuln}
		</div>

		<div>
			<h3>Traits</h3>
			<ul>
				{monster.Traits.map(({Name, Content}) => <li>
					<b>{Name}</b> {Content}
				</li>)}
			</ul>
		</div>

		<div>
			<h3>Actions</h3>
			<ul>
				{monster.Actions.map(({Name, Content}) => <li>
					<b>{Name}</b> {Content}
				</li>)}
			</ul>
		</div>

		<div>
			<h3>Bonus Actions</h3>
			<ul>
				{monster.BonusActions.map(({Name, Content}) => <li>
					<b>{Name}</b> {Content}
				</li>)}
			</ul>
		</div>

		<div>
			<h3>Reactions</h3>
			<ul>
				{monster.Reactions.map(({Name, Content}) => <li>
					<b>{Name}</b> {Content}
				</li>)}
			</ul>
		</div>

		<div>
			<h3>Legendary Actions</h3>
			<ul>
				{monster.LegendaryActions.map(({Name, Content}) => <li>
					<b>{Name}</b> {Content}
				</li>)}
			</ul>
		</div>
    </div>
  );
}

export default App;

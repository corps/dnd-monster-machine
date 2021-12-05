import React, {PropsWithChildren, useCallback, useMemo} from 'react';
import {Monster} from "./types";
import * as fs from 'fs';
import {
	conditionImmunitiesByFlag,
	expandEdit,
	immunitiesByFlag,
	ranks,
	resistancesByFlag,
	roles,
	toEditMonster,
	vulnerabilitiesByFlag
} from "./editing";
import {
	autoMultiSelect,
	AutoNumber,
	autoOption,
	autoOrder,
	AutoString,
	labeled,
	noop,
	objectFrom,
	passThrough,
	translate,
	useTap,
} from "./autoform";
import {Newline, useApp, useInput} from "ink";
import Table from "ink-table";
import {FocusableButton} from "./button";

interface EditorProps {
	startingJson: Monster,
	outputFileName: string,
}

export function Editor({startingJson, outputFileName}: PropsWithChildren<EditorProps>) {
	const {exit} = useApp();

	useInput((input, key) => {
		if (key.ctrl && input == 'c') {
			exit();
		}
	});

	const startingEdit = useMemo(() => toEditMonster(startingJson), [startingJson]);

	const [EditMonster, editMonster] = useTap(useMemo(() => {
		return objectFrom(startingEdit, {
			...passThrough(startingEdit),
			CombatLevel: labeled("Level", AutoNumber),
			CombatRank: labeled(
				"Rank",
				translate(autoOption(Object.keys(ranks) as (keyof typeof ranks)[]),
					k => ranks[k],
					rank => Object.keys(ranks).find(k => ((ranks as any)[k] === rank)) as any || 'Grunt'
				)
			),
			CombatRole: labeled(
				"Role",
				translate(autoOption(Object.keys(roles) as (keyof typeof roles)[]),
					k => roles[k],
					role => Object.keys(roles).find(k => ((roles as any)[k] === role)) as any || 'Controller'
				)
			),
			Abilities: labeled("Abilities", autoOrder(startingEdit.Abilities)),
			WinCondition: labeled('Win Condition', AutoString),
			CounterMeasure: labeled('Counter Measure', AutoString),
			flags: labeled("Flags", autoMultiSelect([
				...Object.keys({...immunitiesByFlag, ...vulnerabilitiesByFlag, ...conditionImmunitiesByFlag, ...resistancesByFlag}),
				'legendary'
			])),
		})
	}, [startingEdit]), startingEdit);


	const monster = useMemo(() => expandEdit(editMonster), [editMonster]);
	const baseData = useMemo(() => [
		{
			HP: monster.HP.Value + " " + monster.HP.Notes,
			AC: monster.AC.Value + " " + monster.AC.Notes,
			Init: monster.InitiativeModifier,
			Per: monster.Senses.join(', '),
			Skls: monster.Skills.map(({Name, Modifier}) => `${Name} ${Modifier}`).join(', '),
			ST: monster.Saves.map(({Name, Modifier}) => `${Name} ${Modifier}`).join(', '),
			Imm: [...new Set<string>([...monster.DamageImmunities, ...monster.ConditionImmunities]).values()].join(', '),
			Res: [...new Set(monster.DamageResistances).values()].join(', '),
			Vuln: [...new Set(monster.DamageVulnerabilities).values()].join(', '),
		}
	], [monster]);

	const save = useCallback(() => {
		fs.writeFileSync(outputFileName, JSON.stringify(monster, null, 2), 'utf-8')
		console.error(`Saved to ${outputFileName}`);
	}, [outputFileName, monster])

	return <>
		<Newline/>
		<EditMonster onChange={noop} order={0} parentId={0}/>
		<FocusableButton order={1} onSubmit={save}>
			Save
		</FocusableButton>
		<Newline/>
		<Table data={baseData}/>
		<Table data={[
			...monster.Traits,
			...monster.Actions,
			...monster.BonusActions,
			...monster.Reactions,
			...monster.LegendaryActions
		]}/>
	</>;
}

// const {nothingFocused, setFocus} = useFocusManager2();
// const {isFocused: focus, focusReady, focusId: gridFocusId} = useFocus2({ order: 0, parentId: focusId });

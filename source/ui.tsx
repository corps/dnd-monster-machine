import React, {PropsWithChildren, useMemo} from 'react';
import {Monster} from "./types";
import {expandEdit, ranks, roles, toEditMonster} from "./editing";
import {
	AutoBool, AutoNumber, autoOption, autoOrder, labeled, noop, objectFrom, passThrough, translate, useTap
} from "./autoform";
import {Newline, useApp, useInput} from "ink";
import Table from "ink-table";

interface EditorProps {
	startingJson: Monster,
	outputFileName: string,
}

export function Editor({startingJson}: PropsWithChildren<EditorProps>) {
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
			CombatRank: labeled("Rank", translate(autoOption(Object.keys(ranks) as (keyof typeof ranks)[]), k => ranks[k], rank =>
				Object.keys(ranks).find(k => ((ranks as any)[k] === rank)) as any || 'Grunt')),
			CombatRole: labeled("Role", translate(autoOption(Object.keys(roles) as (keyof typeof roles)[]), k => roles[k], role =>
				Object.keys(roles).find(k => ((roles as any)[k] === role)) as any || 'Controller')),
			Abilities: labeled("Abilities", autoOrder(startingEdit.Abilities)),
			intangible: labeled("Intangible?", AutoBool),
			animated: labeled("Animated?", AutoBool),
			undead: labeled("Undead?", AutoBool),
			celestial: labeled("Celestial?", AutoBool),
			fey: labeled("Fey?", AutoBool),
			wriggler: labeled("Wriggler?", AutoBool),
			swarm: labeled("Swarm?", AutoBool),
			toxic: labeled("Toxic?", AutoBool),
			hardened: labeled("Hardened?", AutoBool),
		})
	}, [startingEdit]), startingEdit);

	const monster = useMemo(() => expandEdit(editMonster), [editMonster]);
	const baseData = useMemo(() => [{
		HP: monster.HP.Value + " " + monster.HP.Notes,
		AC: monster.AC.Value + " " + monster.AC.Notes,
		Init: monster.InitiativeModifier,
		Per: monster.Senses.join(', '),
		Skls: monster.Skills.map(({Name, Modifier}) => `${Name} ${Modifier}`).join(', '),
		ST: monster.Saves.map(({Name, Modifier}) => `${Name} ${Modifier}`).join(', '),
		Imm: [...new Set<string>([...monster.DamageImmunities, ...monster.ConditionImmunities]).values()].join(', '),
		Res: [...new Set(monster.DamageResistances).values()].join(', '),
		Vuln: [...new Set(monster.DamageVulnerabilities).values()].join(', '),
	}], [monster]);

	return <>
		<Newline/>
		<EditMonster onChange={noop} order={0} parentId={0}/>
		<Newline/>
		<Table data={baseData}/>
	</>;
}

// const {nothingFocused, setFocus} = useFocusManager2();
// const {isFocused: focus, focusReady, focusId: gridFocusId} = useFocus2({ order: 0, parentId: focusId });

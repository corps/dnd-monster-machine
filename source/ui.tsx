import React, {PropsWithChildren, useMemo} from 'react';
import {CombatRank, defaultEditMonster, Monster, Template} from "./types";
import {expandEdit, ranks, toEditMonster} from "./editing";
import {AutoForm, autoInt, autoOption, concat, labeled, lift, map, useTap} from "./autoform";
import {Box, Newline, Text, useApp, useInput} from "ink";

interface EditorProps {
	startingJson: Monster | Template,
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

	const [editMonster$, editMonster] = useTap(useMemo(() => {
		const startingRank: keyof typeof ranks = Object.keys(ranks).find(k => ((ranks as any)[k] === startingEdit.CombatRank)) as any || 'Grunt';

		return map(
			concat(
				concat(
					lift([] as []),
					labeled("Level", autoInt(startingEdit.CombatLevel))
				),
				labeled("Rank", map(autoOption(startingRank, Object.keys(ranks)), r => (ranks as any)[r] as CombatRank))
			),
			([CombatLevel, CombatRank]) => ({
			...defaultEditMonster,
			CombatLevel,
			CombatRank,
		}))
	}, [startingEdit]), startingEdit);

	const monster = useMemo(() => expandEdit(editMonster), [editMonster]);

	return <>
		<Newline/>
		<AutoForm input={editMonster$} order={0}/>
		<Box flexDirection='row'>
			<Box width={8}>
				<Text>
					HP {monster.HP.Value}
				</Text>
			</Box>
			<Box width={8}>
				<Text>
					AC {monster.AC.Value}
				</Text>
			</Box>
		</Box>
	</>;
}

// const {nothingFocused, setFocus} = useFocusManager2();
// const {isFocused: focus, focusReady, focusId: gridFocusId} = useFocus2({ order: 0, parentId: focusId });

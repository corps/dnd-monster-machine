import React, {PropsWithChildren, useMemo} from 'react';
import {Monster, Template} from "./types";
import {toEditMonster} from "./editing";
import {AutoForm, autoInt, labeled} from "./autoform";
import {useApp, useInput} from "ink";

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

	const monster$ = useMemo(() => {
		const editState = toEditMonster(startingJson)
		return labeled("CombatLevel", autoInt(editState.CombatLevel))
	}, [startingJson])

	return <>
		<AutoForm input={monster$} order={0}/>
	</>;
}

// const {nothingFocused, setFocus} = useFocusManager2();
// const {isFocused: focus, focusReady, focusId: gridFocusId} = useFocus2({ order: 0, parentId: focusId });

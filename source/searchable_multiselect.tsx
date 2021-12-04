import React, {useCallback, useMemo, useState} from 'react';
import {Box} from "ink";
import TextInput from "ink-text-input";
import {OptionsList} from "./options_list";
import {useFocusManager2} from "./better_focus";

interface Props {
  items: [string, ...string[]][],
  pinned: string[],
  onSubmit: (value: string) => void,
  onSelect: (value: string) => void,
  focus?: boolean,
}

export function SearchableMultiSelect({items, onSelect, onSubmit, pinned, focus}: Props) {
  const [input, setInput] = useState("");
  const [selection, setSelection] = useState("");
  const {focusNext} = useFocusManager2();

  const parts = useMemo(() => input.split(/\s+/), [input])

  const submit = useCallback((s: string) => {
    onSubmit(s);
    focusNext();
    setInput("");
  }, [focusNext, setInput, setSelection]);

  const select = useCallback((s: string) => {
    setSelection(s);
    onSelect(s);
  }, [setSelection, onSelect]);

  const matches = useMemo(() => {
    return items.filter(([label, ...tags]) => {
      if (pinned.includes(label)) return false;
      return parts.every(part => {
				return label.includes(part) || tags.includes(part);
			})
    });
  }, [parts, items, pinned]);

  const matchingLabels = useMemo(() => matches.map(([label]) => label).concat(pinned), [matches, pinned]);

  return <Box flexDirection="column">
    <Box borderStyle="double" width="100%">
      <TextInput value={input} onChange={setInput} focus={focus}/>
    </Box>
    <Box width="100%">
      <OptionsList focus={focus} selected={selection} options={matchingLabels} onChange={select} onSubmit={submit}/>
    </Box>
  </Box>
}

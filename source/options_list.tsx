import React, {useMemo} from "react";
import {Box, Text, useInput} from 'ink'
import {ShareFocus} from "./share_focus";

interface Props {
  options: (string | { label: string, child: React.ReactNode })[],
  disabled?: string[],
  onChange: (o: string) => void,
  selected?: string | null,
  focus?: boolean,
  onSubmit?: (s: string) => void,
  hide?: boolean
}

export function OptionsList({options, hide, disabled = [], onChange, selected, focus, onSubmit}: Props) {
  const stringOptions = useMemo(() => options.map(o => typeof o === "string" ? o : o.label), [options]);
  const selectedIdx = useMemo(() => selected ? stringOptions.indexOf(selected) : -1, [selected, stringOptions]);

  useInput((_, key) => {
    if (!focus) return;

    if (key.upArrow) {
      let idx = selectedIdx - 1
      for (; options[idx]; --idx) {
        if (!disabled.includes(stringOptions[idx] as any)) break;
      }

      const option = stringOptions[idx];
      if (option) onChange(option);
      return;
    }

    if (key.downArrow) {
      let idx = selectedIdx + 1
      for (; options[idx]; ++idx) {
        if (!disabled.includes(stringOptions[idx] as any)) break;
      }

      const option = stringOptions[idx];
      if (option) onChange(option);
      return;
    }

    if (key.return && onSubmit && selected && !disabled.includes(selected) && options.includes(selected)) {
      onSubmit(selected)
    }
  }, {isActive: focus});

  return <Box flexDirection="column">
    {hide && !focus ? null : options.map((option, i) => {
      const string = stringOptions[i];

      return <Box key={i + ""} flexDirection="column">
        <Text
          underline={selected === string}
          inverse={selected === string && focus}
          bold={!disabled.includes(string as any)}
          dimColor={disabled.includes(string as any)}
          italic={disabled.includes(string as any)}>
          {string}
        </Text>
        <Box marginLeft={2}>
          {selected === string ? typeof option === "string" ? null : option.child : null}
        </Box>
      </Box>
    })}
  </Box>
}

export const FocusableOptionsList = ShareFocus(OptionsList);

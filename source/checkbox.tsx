import React from 'react';
import {Text, useInput} from "ink";

interface Props {
  checked: boolean,
  onChange: (v: boolean) => void,
  focus?: boolean,
}

export function Checkbox({ checked, onChange, focus }: Props) {
  const mark = checked ? '✓' : ' ';

  useInput((_, key) => {
    if (!focus) return;
    if (key.return) {
      onChange(!checked);
    }
  }, {isActive: focus});

  return <Text inverse={focus}>[{mark}]</Text>
}

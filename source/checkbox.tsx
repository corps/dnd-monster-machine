import React from 'react';
import {Text, useInput} from "ink";

interface Props {
  value: boolean,
  onChange: (v: boolean) => void,
  focus?: boolean,
}

export function Checkbox({ value, onChange, focus }: Props) {
  const mark = value ? '✓' : ' ';

  useInput((_, key) => {
    if (!focus) return;
    if (key.return) {
      onChange(!value);
    }
  }, {isActive: focus});

  return <Text inverse={focus}>[{mark}]</Text>
}

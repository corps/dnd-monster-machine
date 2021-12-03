import React, {useCallback} from "react";
import TextInput from 'ink-text-input';
import {ShareFocus} from "./share_focus";
import {useInput} from "ink";

interface Props {
  value: number,
  onChange: (v: number) => void,
  focus?: boolean,
  placeholder?: string,
}

export function NumberInput({value, onChange, focus, placeholder}: Props) {
  const updateValue = useCallback((v: string) => {
    const int = parseInt(v, 10);
    if (!isNaN(int)) {
      onChange(int);
    }
  }, [onChange]);

  useInput((_, key) => {
    if (!focus) return;
    if (key.upArrow) {
      onChange(value + 1);
    }

    if (key.downArrow) {
      onChange(value - 1);
    }
  }, {isActive: focus});

  return <TextInput value={value + ""} onChange={updateValue} focus={focus} placeholder={placeholder} />
}

export const FocusableNumberInput = ShareFocus(NumberInput);

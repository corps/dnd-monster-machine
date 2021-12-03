import React, {PropsWithChildren} from 'react';
import {Text, useInput} from "ink";
import {ShareFocus} from "./share_focus";

interface Props {
  onSubmit: () => void,
  focus?: boolean,
}

export function Button({ focus, children, onSubmit }: PropsWithChildren<Props>) {
  useInput((_, key) => {
    if (!focus) return;

    if (key.return) {
      onSubmit();
    }
  }, {isActive: focus})

  return <>
    <Text inverse={focus}>
      {children}
    </Text>
  </>
}

export const FocusableButton = ShareFocus(Button);

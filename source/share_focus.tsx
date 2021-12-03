import React from "react";
import {FC} from "react";
import {Except} from "type-fest";
import {Box, BoxProps} from "ink";
import {useFocus2} from "./better_focus";

interface FocusableBoxOptions {
  focus?: boolean,
  focusStyle?: { border: BoxProps['borderStyle'], color: BoxProps['borderColor'] }
}

export const FocusableBox: FC<BoxProps & FocusableBoxOptions> = ({
  children, focus, focusStyle = {border: 'bold'}, ...box
}) => {
  if (focus) {
    box = {
      ...box, borderColor: focusStyle.color, borderStyle: focusStyle.border,
    }
  }

  return <Box {...box}>
    {children}
  </Box>
}

export function ShareFocus<P extends { focus?: boolean, focusId?: number }>(c: FC<P>): FC<Except<P, 'focus' | 'focusId'> & { active?: boolean, parentId?: number | null, order: number }> {
	const f = useFocus2; // to dodge eslint
  return (p) => {
    const {active = true, parentId, order, ...passThrough} = p;
    const {isFocused, focusId} = f({isActive: active, parentId, order})
    return c({...passThrough, focus: isFocused, focusId: focusId} as any);
  }
}

import React, {useCallback, useEffect, useMemo, useState} from "react";
import {FocusableNumberInput} from "./number_input";
import {ShareFocus} from "./share_focus";
import TextInput from "ink-text-input";
import {FocusableButton} from "./button";
import {FocusableOptionsList} from "./options_list";
import {useCell} from "./use_cell";
import {Box, Text} from "ink";
import {Checkbox} from "./checkbox";
import {useFocus2, useFocusManager2} from "./better_focus";

const FocusableTextInput = ShareFocus(TextInput);
const FocusableCheckbox = ShareFocus(Checkbox);

export type AutoInput<T> = (onChange: (t: T) => void, order: number, parentId: number | null, __t?: T) => React.ReactElement | null;

const noop = () => null;
export function AutoForm<T>({ input, order, parentId = null, onChange = noop }: { input: AutoInput<T>, onChange?: (v: T) => void, order: number, parentId?: number | null }) {
  return input(onChange, order, parentId);
}

export function never<T>(): AutoInput<T> {
  return (() => <></>);
}

export function autoString(d: string) {
  return ((onChange, order, parentId) => {
    const [value, setValue] = useState(d);

    const innerOnChange = useCallback((v: string) => {
      setValue(v);
      onChange(v);
    }, [onChange]);

    useEffect(() => {
      onChange(d);
    }, []);

    return <FocusableTextInput value={value} onChange={innerOnChange} order={order} parentId={parentId}/>
  }) as AutoInput<string>
}

export function autoInt(d: number) {
  return ((onChange, order, parentId) => {
    const [value, setValue] = useState(d);

    const innerOnChange = useCallback((v: number) => {
      setValue(v);
      onChange(v);
    }, [onChange]);

    useEffect(() => {
      onChange(d);
    }, []);

    return <FocusableNumberInput value={value} onChange={innerOnChange} order={order} parentId={parentId}/>
  }) as AutoInput<number>;
}

export function autoCheck(d: boolean): AutoInput<boolean> {
  return ((onChange, order, parentId) => {
    const [value, setValue] = useState(d);

    const innerOnChange = useCallback((v: boolean) => {
      setValue(v);
      onChange(v);
    }, [onChange]);

    useEffect(() => {
      onChange(d);
    }, []);

    return <FocusableCheckbox checked={value} onChange={innerOnChange} order={order} parentId={parentId}/>
  })
}

export function autoOption<R extends string>(d: R, options: R[], requireSubmit = false) {
  return ((onChange, order, parentId) => {
    const [value, setValue] = useState(d as string);

    useEffect(() => {
    	const option = options[0];
      if (!options.includes(value as R) && option != null) {
        setValue(option);
        onChange(option);
      }
    }, [options, value]);

    const innerOnChange = useCallback((v: string) => {
      setValue(v as R);
      onChange(v as R);
    }, [onChange]);

    useEffect(() => {
      onChange(d);
    }, []);

    if (requireSubmit) {
      return <FocusableOptionsList order={order} parentId={parentId} options={options} selected={value} onSubmit={innerOnChange} onChange={setValue}/>
    } else {
      return <FocusableOptionsList order={order} parentId={parentId} options={options} selected={value} onChange={innerOnChange}/>
    }
  }) as AutoInput<R>;
}

export function autoSubforms<R>(subforms: {[k: string]: AutoInput<R>}, pageFlow = false): AutoInput<R> {
  return ((onChange, order, parentId) => {
    const [{subformKey, value}, setFormState] = useState(() => ({ subformKey: Object.keys(subforms)[0] || "", value: null as null | [R]}));
    const [nextForm, setNextForm] = useState(() => null as AutoInput<R> | null);

    const {focusId} = useFocus2({ parentId, order, isActive: false });
    const {setFocus} = useFocusManager2();

    useEffect(() => {
      if (!(subformKey in subforms)) {
        const nSubformKey = Object.keys(subforms)[0] || "";
        setFormState({ subformKey: nSubformKey, value: null });
      }
    }, [subforms, subformKey]);

    useEffect(() => {
      if (value) onChange(value[0]);
    }, [value]);

    const updateSubformValue = useCallback((value: R) => {
      setFormState((s) => ({...s, value: [value]}));
    }, []);

    const updateSubformKey = useCallback((k: string) => {
      setFormState((_) => ({ value: null, subformKey: k }));
    }, []);

    const onSubmitSubformKey = useCallback((value: string) => {
    	const subform = subforms[value];
      if (subform) setNextForm(() => subform);
      setFocus(focusId);
    }, [subforms])

    const options = useMemo(() => Object.keys(subforms).map((label, i) => {
      const input = subforms[label];
      if (!input) throw new Error('never');

      return {
        label,
        child: <AutoForm order={i + 1} parentId={focusId} input={input} key={label + "-" + i} onChange={updateSubformValue}/>
      }
    }), [subforms, updateSubformValue]);


    if (nextForm) {
      return <AutoForm order={0} parentId={focusId} key="inner" input={nextForm} onChange={updateSubformValue}/>;
    }

    if (pageFlow) {
      return <Box key="outer" flexDirection="column">
        <FocusableOptionsList order={0} parentId={focusId} options={Object.keys(subforms)} selected={subformKey} onChange={updateSubformKey} onSubmit={onSubmitSubformKey}/>
      </Box>
    } else {
      return <Box key="pageFlowLess" flexDirection="column">
        <FocusableOptionsList order={0} parentId={focusId} options={options} selected={subformKey} onChange={updateSubformKey}/>
      </Box>
    }
  }) as AutoInput<R>;
}

export function autoSubmit<R>(input: AutoInput<R>): AutoInput<R> {
  return ((onChange, order, parentId) => {
    const [lastP, setLastP] = useCell<R>();
    const onSubmit = useCallback(() => {
      if (lastP) onChange(lastP[0]);
    }, [lastP]);
    const {focusId} = useFocus2({ parentId, order, isActive: false });

    return <>
      <AutoForm order={0} parentId={focusId} input={input} onChange={setLastP}/>
      { lastP && <>
      <FocusableButton order={1} parentId={focusId} onSubmit={onSubmit}>
        OK
      </FocusableButton></> }
    </>
  }) as AutoInput<R>;
}

export function lift<V>(v: V): AutoInput<V> {
  return ((onChange) => {
    useEffect(() => {
      onChange(v);
    }, [v]);

    return <></>;
  }) as AutoInput<V>;
}

export function map<I, O>(input: AutoInput<I>, f: (i: I) => O): AutoInput<O> {
  return ((onChange, order, parentId) => {
    const doMap = useCallback((i: I) => {
      onChange(f(i));
    }, [f, onChange]);

    return <AutoForm order={order} parentId={parentId} input={input} onChange={doMap}/>
  });
}

export function tap<I>(input: AutoInput<I>, f: (i: I) => void): AutoInput<I> {
  return ((onChange, order, parentId) => {
    const doMap = useCallback((i: I) => {
      f(i);
      onChange(i);
    }, [onChange]);

    return <AutoForm order={order} parentId={parentId} input={input} onChange={doMap}/>
  });
}

export function labeled<T>(label: string, input: AutoInput<T>): AutoInput<T> {
  return ((onChange, order, parentId) => {
    return <Box flexDirection="row">
      <Text>{label}: </Text>
      <AutoForm order={order} parentId={parentId} input={input} onChange={onChange}/>
    </Box>
  }) as AutoInput<T>;
}

export function useTap<O>(input: AutoInput<O>, d: O): [AutoInput<O>, O] {
  const [v, setV] = useState(d);
  return [tap(input, (v: O) => setV(() => v)), v];
}

export function apply<I, O>(input: AutoInput<(i: I) => O>, param: AutoInput<I>): AutoInput<O> {
  return ((onChange, order, parentId) => {
    const [lastF, setLastF] = useCell<(i: I) => O>();
    const [lastP, setLastP] = useCell<I>();
    const {focusId} = useFocus2({ order, parentId, isActive: false });


    useEffect(() => {
      if (lastF && lastP) {
        onChange(lastF[0](lastP[0]));
      }
    }, [lastF, lastP]);

    return <>
      <AutoForm order={0} parentId={focusId} input={input} onChange={setLastF}/>
      <AutoForm order={1} parentId={focusId} input={param} onChange={setLastP}/>
    </>
  }) as AutoInput<O>;
}

export function bind<I, O>(param: AutoInput<I>, op: (i: I) => AutoInput<O>): AutoInput<O> {
  return ((onChange, order, parentId) => {
    const [i, setI] = useCell<I>()
    const op$ = useMemo(() => i ? op(i[0]) : null, [i]);
    const {focusId} = useFocus2({ order, parentId, isActive: false, });
    const OpComponent = useCallback(({ onChange }) => op$ ?
      <AutoForm order={1} parentId={focusId} input={op$} onChange={onChange}/> : null, [op$]);

    return <>
      <AutoForm order={0} parentId={focusId} input={param} onChange={setI}/>
      <OpComponent onChange={onChange}/>
    </>;
  });
}

export function apply2<I, I2, O>(
  Input: AutoInput<(i: I) => (i: I2) => O>,
  p: AutoInput<I>,
  p2: AutoInput<I2>
): AutoInput<O> {
  return apply(apply(Input, p), p2);
}

export function apply3<I, I2, I3, O>(
  Input: AutoInput<(i: I) => (i: I2) => (i: I3) => O>,
  p: AutoInput<I>,
  p2: AutoInput<I2>,
  p3: AutoInput<I3>
): AutoInput<O> {
  return apply(apply(apply(Input, p), p2), p3);
}

export function apply4<I, I2, I3, I4, O>(
  Input: AutoInput<(i: I) => (i: I2) => (i: I3) => (i: I4) => O>,
  p: AutoInput<I>,
  p2: AutoInput<I2>,
  p3: AutoInput<I3>,
  p4: AutoInput<I4>
): AutoInput<O> {
  return apply(apply(apply(apply(Input, p), p2), p3), p4);
}

export function concat<T extends any[], V>(
	A: AutoInput<T>,
	B: AutoInput<V>
): AutoInput<[...T, V]> {
	return apply2(lift(a => b => [...a, b]), A, B)
}

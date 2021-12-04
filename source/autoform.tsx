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
import {SearchableMultiSelect} from "./searchable_multiselect";

const FocusableTextInput = ShareFocus(TextInput);
const FocusableCheckbox = ShareFocus(Checkbox);
const FocusableMultiSelect = ShareFocus(SearchableMultiSelect);

export type BoundAutoInputParams<T> = { onChange: (t: T) => void, order: number, parentId: number }
export type AutoInputParams<T> = BoundAutoInputParams<T> & { default: T }
export type AutoInput<T> = (params: AutoInputParams<T>) => React.ReactElement | null;
export type BoundAutoInput<T> = (params: BoundAutoInputParams<T>) => React.ReactElement | null;
export type AutoWrappableInputParams<T> = { onChange: (t: T) => void, order: number, parentId: number, value: T };

export const never: AutoInput<any> = () => <></>;

export const noop: () => void = () => null;

export function bindAuto<T>(Input: AutoInput<T>, d: T): BoundAutoInput<T> {
	function Bound(p: BoundAutoInputParams<T>) {
		return <Input {...p} default={d}/>
	}

	return Bound;
}

export function translate<A, B>(Input: AutoInput<A>, toB: (a: A) => B, fromB: (b: B) => A): AutoInput<B> {
	return ({onChange, order, parentId, default: d}) => {
		const defaultA = useMemo(() => fromB(d), [d]);
		const doMap = useCallback((i: A) => {
			onChange(toB(i));
		}, [toB, onChange]);

		return <Input order={order} parentId={parentId} onChange={doMap} default={defaultA}/>
	};
}


export function wrapAuto<T>(Input: (p: AutoWrappableInputParams<T>) => React.ReactElement | null): AutoInput<T> {
	return ({onChange, order, parentId, default: d}) => {
		const [value, setValue] = useState(d);

		const innerOnChange = useCallback((v: T) => {
			setValue(v);
			onChange(v);
		}, [onChange]);

		return <Input value={value} onChange={innerOnChange} order={order} parentId={parentId}/>
	}
}

export const AutoString = wrapAuto(FocusableTextInput);
export const AutoNumber = wrapAuto(FocusableNumberInput);
export const AutoBool = wrapAuto(FocusableCheckbox);

export function autoOption<R extends string>(options: R[]): AutoInput<R> {
	function AutoOption({order, parentId, onChange, value}: AutoWrappableInputParams<R>): React.ReactElement | null {
		return <FocusableOptionsList order={order} parentId={parentId} options={options} selected={value}
																 onChange={onChange as any}/>
	}

	return wrapAuto(AutoOption);
}

export function pushDefault<T>(Input: AutoInput<T>): AutoInput<T> {
	function PushDefault(p: AutoInputParams<T>) {
		const {onChange, default: d} = p;
		useEffect(() => {
			onChange(d);
		}, []);

		return <Input {...p}/>;
	}

	return PushDefault;
}

export function autoSubforms<R>(subforms: { [k: string]: AutoInput<R> }, pageFlow = false): AutoInput<R> {
	return (({onChange, order, parentId, default: d}) => {
		const [{subformKey, value}, setFormState] = useState(() => ({
			subformKey: Object.keys(subforms)[0] || "",
			value: d
		}));
		const [NextForm, setNextForm] = useState(() => null as AutoInput<R> | null);

		const {focusId} = useFocus2({parentId, order, isActive: false});
		const {setFocus} = useFocusManager2();

		useEffect(() => {
			if (!(subformKey in subforms)) {
				const nSubformKey = Object.keys(subforms)[0] || "";
				setFormState({subformKey: nSubformKey, value: d});
				onChange(d);
			}
		}, [subforms, subformKey]);

		useEffect(() => {
			onChange(value);
		}, [value]);

		const updateSubformValue = useCallback((value: R) => {
			setFormState((s) => ({...s, value}));
			onChange(value);
		}, [onChange]);

		const updateSubformKey = useCallback((k: string) => {
			setFormState((s) => ({...s, subformKey: k}));
		}, []);

		const onSubmitSubformKey = useCallback((value: string) => {
			const subform = subforms[value];
			if (subform) setNextForm(() => subform);
			setFocus(focusId);
		}, [subforms])

		const options = useMemo(() => Object.keys(subforms).map((label, i) => {
			const Input = subforms[label];
			if (!Input) throw new Error('never');

			return {
				label,
				child: <Input order={i + 1} parentId={focusId} key={label + "-" + i} onChange={updateSubformValue} default={d}/>
			}
		}), [subforms, updateSubformValue]);


		if (NextForm) {
			return <NextForm order={0} parentId={focusId} key="inner" onChange={updateSubformValue} default={d}/>;
		}

		if (pageFlow) {
			return <Box key="outer" flexDirection="column">
				<FocusableOptionsList order={0} parentId={focusId} options={Object.keys(subforms)} selected={subformKey}
															onChange={updateSubformKey} onSubmit={onSubmitSubformKey}/>
			</Box>
		} else {
			return <Box key="pageFlowLess" flexDirection="column">
				<FocusableOptionsList order={0} parentId={focusId} options={options} selected={subformKey}
															onChange={updateSubformKey}/>
			</Box>
		}
	});
}

export function withSubmitButton<R>(Input: AutoInput<R>): AutoInput<R> {
	return (({onChange, order, parentId, default: d}) => {
		const [lastP, setLastP] = useCell<R>();
		const onSubmit = useCallback(() => {
			if (lastP) onChange(lastP[0]);
		}, [lastP]);

		const {focusId} = useFocus2({parentId, order, isActive: false});

		return <>
			<Input key="input" order={0} parentId={focusId} onChange={setLastP} default={d}/>
			{lastP && <>
				<FocusableButton key="submit" order={1} parentId={focusId} onSubmit={onSubmit}>
					OK
				</FocusableButton></>}
		</>
	}) as AutoInput<R>;
}

export function lift<V>(v: V): BoundAutoInput<V> {
	return (({onChange}) => {
		useEffect(() => {
			onChange(v);
		}, [v]);

		return <></>;
	});
}


export function map<I, O>(Input: BoundAutoInput<I>, f: (i: I) => O): BoundAutoInput<O> {
	return (({onChange, order, parentId}) => {
		const doMap = useCallback((i: I) => {
			onChange(f(i));
		}, [f, onChange]);

		return <Input order={order} parentId={parentId} onChange={doMap}/>
	});
}

export function tap<I>(Input: BoundAutoInput<I>, f: (i: I) => void): BoundAutoInput<I> {
	return (({onChange, order, parentId}) => {
		const doMap = useCallback((i: I) => {
			f(i);
			onChange(i);
		}, [f, onChange]);

		return <Input order={order} parentId={parentId} onChange={doMap}/>
	});
}

export function labeled<T>(label: string, Input: AutoInput<T>): AutoInput<T> {
	return (p => {
		return <Box flexDirection="row">
			<Text>{label}: </Text>
			<Input key="labeled" {...p}/>
		</Box>
	});
}

export function useTap<O>(input: AutoInput<O>, d: O): [BoundAutoInput<O>, O] {
	const [v, setV] = useState(d);
	const bound = useMemo(() => tap(bindAuto(input, d), (v: O) => setV(() => v)), [input, d])
	return [bound, v];
}

export function apply<I, O>(F: BoundAutoInput<(i: I) => O>, P: BoundAutoInput<I>): BoundAutoInput<O> {
	return (({onChange, order, parentId}) => {
		const [lastF, setLastF] = useCell<(i: I) => O>();
		const [lastP, setLastP] = useCell<I>();
		const {focusId} = useFocus2({order, parentId, isActive: false});


		useEffect(() => {
			if (lastF && lastP) {
				onChange(lastF[0](lastP[0]));
			}
		}, [lastF, lastP]);

		return <>
			<F order={0} parentId={focusId} key="f" onChange={setLastF}/>
			<P order={1} parentId={focusId} key="p" onChange={setLastP}/>
		</>
	});
}

export function bind<I, O>(Param: BoundAutoInput<I>, f: (i: I) => BoundAutoInput<O>): BoundAutoInput<O> {
	return (({onChange, order, parentId}) => {
		const [i, setI] = useCell<I>()
		const Op = useMemo(() => i ? f(i[0]) : null, [i]);
		const {focusId} = useFocus2({ order, parentId, isActive: false, });
		const OpComponent = useCallback(({ onChange }) => Op ?
			<Op order={1} parentId={focusId} onChange={onChange}/> : null, [Op]);

		return <>
			<Param order={0} parentId={focusId} onChange={setI}/>
			<OpComponent onChange={onChange}/>
		</>;
	});
}


export function apply2<I, I2, O>(Input: BoundAutoInput<(i: I) => (i: I2) => O>,
	p: BoundAutoInput<I>,
	p2: BoundAutoInput<I2>
): BoundAutoInput<O> {
	return apply(apply(Input, p), p2);
}

export function apply3<I, I2, I3, O>(Input: BoundAutoInput<(i: I) => (i: I2) => (i: I3) => O>,
	p: BoundAutoInput<I>,
	p2: BoundAutoInput<I2>,
	p3: BoundAutoInput<I3>
): BoundAutoInput<O> {
	return apply(apply(apply(Input, p), p2), p3);
}

export function apply4<I, I2, I3, I4, O>(Input: BoundAutoInput<(i: I) => (i: I2) => (i: I3) => (i: I4) => O>,
	p: BoundAutoInput<I>,
	p2: BoundAutoInput<I2>,
	p3: BoundAutoInput<I3>,
	p4: BoundAutoInput<I4>
): BoundAutoInput<O> {
	return apply(apply(apply(apply(Input, p), p2), p3), p4);
}

export function concat<T extends any[], V>(A: BoundAutoInput<T>, B: BoundAutoInput<V>): BoundAutoInput<[...T, V]> {
	return apply2(lift(a => b => [...a, b]), A, B)
}

type UnwrapAuto<T extends AutoInput<any>> = T extends AutoInput<infer V> ? V : unknown;

type AutoRecord<Inputs extends Record<string, AutoInput<any>>> = {
	[A in keyof Inputs]: UnwrapAuto<Inputs[A]>
}

type RecordOfAutos<R extends Record<string, any>> = {
	[A in keyof R]: AutoInput<R[A]>
}

export function objectFrom<Inputs extends Record<string, AutoInput<any>>>(
	d: AutoRecord<Inputs>,
	inputs: Inputs
): BoundAutoInput<AutoRecord<Inputs>> {
	let result = lift(d);

	for (let k in inputs) {
		result = apply2(lift(o => (v: any) => ({...o, [k]: v})), result, bindAuto(pushDefault(inputs[k] as any), d[k]));
	}

	return result;
}

export function passThrough<D extends Record<string, any>>(
	d: D,
): RecordOfAutos<D> {
	const result: any = {};
	for (let k in d) {
		result[k] = lift(d);
	}

	return result;
}

export function autoOrder<T extends S[], S extends string>(t: T): AutoInput<T> {
	let result: BoundAutoInput<T> = lift([] as any);

	for (let i = 0; i < t.length; ++i) {
		result = bind(result, selected => {
			const available = t.filter(v => !selected.includes(v));
			return map(bindAuto(pushDefault(autoOption(available)), available[0] || "" as S), n => [...selected, n]);
		}) as any;
	}

	return result;
}

export function autoMultiSelect(t: string[]): AutoInput<string[]> {
	const items = t.map(v => [v] as [string]);
	return ({onChange, order, parentId, default: d}) => {
		const [value, setValue] = useState(d);

		const innerOnChange = useCallback((v) => {
			setValue(v);
			onChange(v);
		}, [onChange]);

		const changeBy = useCallback((v: string) => {
			if (value.includes(v)) {
				const newV = [...value];
				newV.splice(newV.indexOf(v), 1);
				innerOnChange(newV);
			} else {
				innerOnChange([...value, v]);
			}
		}, [innerOnChange, value])

		return <>
			<Text>{value.join(', ')}</Text>
			<FocusableMultiSelect order={order} parentId={parentId} items={items} pinned={value} onSubmit={changeBy} onSelect={noop} />
		</>
	}
}

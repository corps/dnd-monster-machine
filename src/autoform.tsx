import React, {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {useCell} from "./use_cell";

export type BoundAutoInputParams<T> = { onChange: (t: T) => void }
export type AutoInputParams<T> = BoundAutoInputParams<T> & { default: T }
export type AutoInput<T> = (params: AutoInputParams<T>) => React.ReactElement | null;
export type BoundAutoInput<T> = (params: BoundAutoInputParams<T>) => React.ReactElement | null;
export type AutoWrappableInputParams<T> = { onChange: (t: T) => void, value: T };

export const never: AutoInput<any> = () => <></>;

export const noop: () => void = () => null;

export function bindAuto<T>(Input: AutoInput<T>, d: T): BoundAutoInput<T> {
	function Bound(p: BoundAutoInputParams<T>) {
		return <Input {...p} default={d}/>
	}

	return Bound;
}

export function translate<A, B>(Input: AutoInput<A>, toB: (a: A) => B, fromB: (b: B) => A): AutoInput<B> {
	return ({onChange, default: d}) => {
		const defaultA = useMemo(() => fromB(d), [d]);
		const doMap = useCallback((i: A) => {
			onChange(toB(i));
		}, [toB, onChange]);

		return <Input onChange={doMap} default={defaultA}/>
	};
}


export function wrapAuto<T>(Input: (p: AutoWrappableInputParams<T>) => React.ReactElement | null): AutoInput<T> {
	return ({onChange, default: d}) => {
		const [value, setValue] = useState(d);

		const innerOnChange = useCallback((v: T) => {
			setValue(v);
			onChange(v);
		}, [onChange]);

		return <Input value={value} onChange={innerOnChange}/>
	}
}

function NumberInput({value, onChange}: AutoWrappableInputParams<number>) {
	return <input type="number" step="1" value={value}
				  className="input-reset ba b--black-20 pa2 mb2 db w-100"
				  onChange={(e) => {onChange(parseInt(e.target.value, 10))}} />;
}

function StringInput({value, onChange}: AutoWrappableInputParams<string>) {
	return <input value={value}
				  className="input-reset ba b--black-20 pa2 mb2 db w-100"
				  onChange={(e) => {onChange(e.target.value)}} />;
}

function MultilineStringInput({value, onChange}: AutoWrappableInputParams<string>) {
	return <textarea value={value}
								className="input-reset ba b--black-20 pa2 mb2 db w-100"
								onChange={(e) => {onChange(e.target.value)}} />;
}


function BoolInput({value, onChange}: AutoWrappableInputParams<boolean>) {
	return <input checked={value} onChange={(e) => {onChange(e.target.checked)}} />
}


export const AutoString = wrapAuto(StringInput);
export const AutoMultilineString = wrapAuto(MultilineStringInput);
export const AutoNumber = wrapAuto(NumberInput);
export const AutoBool = wrapAuto(BoolInput);

export function autoOption(options: string[]): AutoInput<string> {
	function AutoOption({onChange, value}: AutoWrappableInputParams<string>): React.ReactElement | null {
		return <select
			className="input-reset ba b--black-20 pa2 mb2 db w-100"
			onChange={(e) => onChange(e.target.value)}>
			{options.map((o, i) => <option key={i} value={o} selected={o === value}>{o}</option> )}
		</select>
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

export function lift<V>(v: V): BoundAutoInput<V> {
	return (({onChange}) => {
		useEffect(() => {
			onChange(v);
		}, [v]);

		return <></>;
	});
}


export function map<I, O>(Input: BoundAutoInput<I>, f: (i: I) => O): BoundAutoInput<O> {
	return (({onChange}) => {
		const doMap = useCallback((i: I) => {
			onChange(f(i));
		}, [f, onChange]);

		return <Input onChange={doMap}/>
	});
}

export function tap<I>(Input: BoundAutoInput<I>, f: (i: I) => void): BoundAutoInput<I> {
	return (({onChange}) => {
		const doMap = useCallback((i: I) => {
			f(i);
			onChange(i);
		}, [f, onChange]);

		return <Input onChange={doMap}/>
	});
}

export function labeled<T>(label: string, Input: AutoInput<T>): AutoInput<T> {
	return (p => {
		return <div className="flex items-center mb2">
			<label className="lh-copy mr2 mb2">{label}: </label>
			<Input {...p}/>
		</div>;
	});
}

export function useTap<O>(input: AutoInput<O>, d: O): [BoundAutoInput<O>, O] {
	const [v, setV] = useState(d);
	const bound = useMemo(() => tap(bindAuto(input, d), (v: O) => setV(() => v)), [input, d])
	return [bound, v];
}

export function apply<I, O>(F: BoundAutoInput<(i: I) => O>, P: BoundAutoInput<I>): BoundAutoInput<O> {
	return (({onChange}) => {
		const [lastF, setLastF] = useCell<(i: I) => O>();
		const [lastP, setLastP] = useCell<I>();

		useEffect(() => {
			if (lastF && lastP) {
				onChange(lastF[0](lastP[0]));
			}
		}, [lastF, lastP]);

		return <>
			<F key="f" onChange={setLastF}/>
			<P key="p" onChange={setLastP}/>
		</>
	});
}

export function bind<I, O>(Param: BoundAutoInput<I>, f: (i: I) => BoundAutoInput<O>): BoundAutoInput<O> {
	return (({onChange}) => {
		const [i, setI] = useCell<I>()
		const Op = useMemo(() => i ? f(i[0]) : null, [i]);
		const OpComponent = useCallback(({ onChange }) => Op ?
			<Op onChange={onChange}/> : null, [Op]);

		return <>
			<Param onChange={setI}/>
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
	return ({onChange, default: d}) => {
		const [value, setValue] = useState(d);

		const innerOnChange = useCallback((v) => {
			setValue(v);
			onChange(v);
		}, [onChange]);

		const changeBy = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
			const options = (e.target as HTMLSelectElement).options
			const value: string[] = [];
			for (let i = 0; i < options.length; ++i) {
				if(options[i].selected) value.push(options[i].value)
			}
			innerOnChange(value);
		}, [innerOnChange, value])

		return <select
			className="input-reset ba b--black-20 pa2 mb2 db w-100"
			multiple
			onChange={changeBy}>
			{t.map((o, i) => <option key={i} value={o} selected={value.includes(o)}>{o}</option> )}
		</select>
	}
}



export function autoMulti<T>(Input: BoundAutoInput<T>, validate: (t: T) => boolean): AutoInput<T[]> {
	return ({onChange, default: d}) => {
		const [value, setValue] = useState(() => d.map((v, i) => [v, i] as [T, number]));
		const [nextKeyId, setNextKeyId] = useState(value.length);

		const innerChangeValue = useCallback((v: [T, number][]) => {
			onChange(v.map(([v]) => v));
			setValue(v);
		} ,[]);

    const addNewValue = useCallback((newValue: T) => {
    	if (!validate(newValue)) return;
			innerChangeValue([...value, [newValue, nextKeyId]]);
			setNextKeyId(i => i + 1);
		}, [nextKeyId, setValue, setNextKeyId, value]);

    const changeValue = useCallback((newValue: T, idx: number) => {
    	if (!validate) {
    		innerChangeValue([...value.slice(0, idx), ...value.slice(idx + 1)]);
    		return;
			}

    	innerChangeValue([...value.slice(0, idx), [newValue, value[idx][1]] as [T, number], ...value.slice(idx + 1)])
		}, [value]);

		return <>
			{value.map(([_, i]) => <Input onChange={(v) => changeValue(v, i)}/>)}
			{<Input onChange={addNewValue}/>}
		</>
	}
}

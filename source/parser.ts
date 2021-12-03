export class Parser<T> {
    constructor(public f: (state: number, input: string) => [T, number]) {
    }

    run(input: string): T {
        return this.f(0, input)[0];
    }

    withErrorMessage(message: string): Parser<T> {
        const orig = this;
        return new Parser((state, input) => {
            try {
                return orig.f(state, input);
            } catch (e) {
                throw new Error(message);
            }
        })
    }

    static nextMatching(r: RegExp): Parser<string> {
        return new Parser((state, input) => {
            const match: RegExpMatchArray | null = input.slice(state).match(r);
            if (match == null || match.index != 0 || !match[0]) {
                throw new Error("Expected matching " + r.source + " but did not find any near " + input.slice(state));
            }

            return [match[0], state + match[0].length];
        })
    }

    static just<T>(t: T): Parser<T> {
        return new Parser((state) => [t, state]);
    }

    static failWith<T>(message: string): Parser<T> {
        return new Parser(() => {
            throw new Error(message);
        });
    }

    alt(...others: Parser<T>[]): Parser<T> {
        const orig = this;
        return new Parser((state, input) => {
            const all = [orig, ...others];
            const errors: string[] = [];
            for (let p of all) {
                try {
                    return p.f(state, input);
                } catch (e) {
                    errors.push((e as any).message);
                }
            }

            throw new Error(errors.join(" or "));
        });
    }

    andThen<R>(other: (t: T) => Parser<R>): Parser<R> {
        return new Parser((state, input) => {
            const [result, state_] = this.f(state, input);
            return other(result).f(state_, input);
        })
    }

    map<R>(f: (r: T) => R): Parser<R> {
        const orig = this;
        return new Parser((state, input) => {
            const [result, state_] = orig.f(state, input);
            return [f(result), state_];
        })
    }

    static matchLiteral(s: string): Parser<string> {
        return new Parser((state, input) => {
            if (input.slice(state, state + s.length) === s) {
                return [s, state + s.length];
            }

            throw new Error('Expected ' + JSON.stringify(s) + ' near ' + JSON.stringify(input.slice(state, state + 10)));
        })
    }

    asLookahead(): Parser<T> {
        const orig = this;
        return new Parser((state, input) => {
            const [result] = orig.f(state, input);
            return [result, state];
        });
    }


	proceededBy(other: Parser<any>): Parser<T> {
		const orig = this;
		return new Parser((state, input) => {
			const [_, state_] = other.f(state, input);
			const [result, state__] = orig.f(state_, input);
			return [result, state__];
		});
	}


	terminatedBy(other: Parser<any>): Parser<T> {
		const orig = this;
        return new Parser((state, input) => {
            const [result, state_] = orig.f(state, input);
            const state__ = other.f(state_, input)[1];
            return [result, state__];
        });
    }

    someUntil<U>(pred: Parser<U>): Parser<T[]> {
        const orig = this;
        return new Parser<T[]>((state, input) => {
            const result = [];
            while (true) {
                try {
                    pred.f(state, input);
                    break;
                } catch {
                }
                const [next, state_] = orig.f(state, input);
                state = state_;
                result.push(next);
            }

            return [result, state];
        })
    }

    static liftFunction<I, O>(f: (i: I) => O): ApplicativeParser<I, O> {
        return new ApplicativeParser<I, O>((state, _) => [f, state]);
    }

    static liftFunction2<I, O1, O2>(f: (i: I) => (o: O1) => O2): ApplicativeParser2<I, O1, O2> {
        return new ApplicativeParser2<I, O1, O2>((state, _) => [f, state]);
    }

    static liftFunction3<I, O1, O2, O3>(f: (i: I) => (o: O1) => (o: O2) => O3): ApplicativeParser3<I, O1, O2, O3> {
        return new ApplicativeParser3<I, O1, O2, O3>((state, _) => [f, state]);
    }

    static liftFunction4<I, O1, O2, O3, O4>(f: (i: I) => (o: O1) => (o: O2) => (o: O3) => O4): ApplicativeParser4<I, O1, O2, O3, O4> {
        return new ApplicativeParser4<I, O1, O2, O3, O4>((state, _) => [f, state]);
    }

    static liftFunction5<I, O1, O2, O3, O4, O5>(f: (i: I) => (o: O1) => (o: O2) => (o: O3) => (o: O4) => O5): ApplicativeParser5<I, O1, O2, O3, O4, O5> {
        return new ApplicativeParser5<I, O1, O2, O3, O4, O5>((state, _) => [f, state]);
    }

    static liftFunction6<I, O1, O2, O3, O4, O5, O6>(f: (i: I) => (o: O1) => (o: O2) => (o: O3) => (o: O4) => (o: O5) => O6): ApplicativeParser6<I, O1, O2, O3, O4, O5, O6> {
        return new ApplicativeParser6<I, O1, O2, O3, O4, O5, O6>((state, _) => [f, state]);
    }
}

export class ApplicativeParser<I, O> extends Parser<(i: I) => O> {
    apply(other: Parser<I>): Parser<O> {
        const orig = this;
        return new Parser((state, input) => {
            const [f, state_] = orig.f(state, input);
            const [i, state__] = other.f(state_, input);

            return [f(i), state__];
        })
    }
}

export class ApplicativeParser2<I, O1, O2> extends Parser<(i: I) => (o: O1) => O2> {
    apply(other: Parser<I>): ApplicativeParser<O1, O2> {
        const orig = this;
        return new ApplicativeParser((state, input) => {
            const [f, state_] = orig.f(state, input);
            const [i, state__] = other.f(state_, input);

            return [f(i), state__];
        })
    }
}

export class ApplicativeParser3<I, O1, O2, O3> extends Parser<(i: I) => (o: O1) => (o: O2) => O3> {
    apply(other: Parser<I>): ApplicativeParser2<O1, O2, O3> {
        const orig = this;
        return new ApplicativeParser2((state, input) => {
            const [f, state_] = orig.f(state, input);
            const [i, state__] = other.f(state_, input);

            return [f(i), state__];
        })
    }
}

export class ApplicativeParser4<I, O1, O2, O3, O4> extends Parser<(i: I) => (o: O1) => (o: O2) => (o: O3) => O4> {
    apply(other: Parser<I>): ApplicativeParser3<O1, O2, O3, O4> {
        const orig = this;
        return new ApplicativeParser3((state, input) => {
            const [f, state_] = orig.f(state, input);
            const [i, state__] = other.f(state_, input);

            return [f(i), state__];
        })
    }
}

export class ApplicativeParser5<I, O1, O2, O3, O4, O5> extends Parser<(i: I) => (o: O1) => (o: O2) => (o: O3) => (o: O4) => O5> {
    apply(other: Parser<I>): ApplicativeParser4<O1, O2, O3, O4, O5> {
        const orig = this;
        return new ApplicativeParser4((state, input) => {
            const [f, state_] = orig.f(state, input);
            const [i, state__] = other.f(state_, input);

            return [f(i), state__];
        })
    }
}

export class ApplicativeParser6<I, O1, O2, O3, O4, O5, O6> extends Parser<(i: I) => (o: O1) => (o: O2) => (o: O3) => (o: O4) => (o: O5) => O6> {
    apply(other: Parser<I>): ApplicativeParser5<O1, O2, O3, O4, O5, O6> {
        const orig = this;
        return new ApplicativeParser5((state, input) => {
            const [f, state_] = orig.f(state, input);
            const [i, state__] = other.f(state_, input);

            return [f(i), state__];
        })
    }
}

export class ObjectBuildingParser<T extends Object> extends Parser<T> {
	withKey<K extends string, V>(t: K, parser: Parser<V>) {
		const p = this.andThen(o => parser.map(v => ({...o, [t]: v})));
		return new ObjectBuildingParser<T & {[KK in K]: V}>(p.f as any);
	}
}

export class TupleBuildingParser<T extends any[]> extends Parser<T> {
	plus<V>(parser: Parser<V>) {
		const p = this.andThen(o => parser.map(v => [...o, v] as [...T, V]));
		return new TupleBuildingParser<[...T, V]>(p.f)
	}
}

export const skipWhitespace = Parser.nextMatching(/\s*/)
export const matchWhitespace = Parser.nextMatching(/\s+/);
export const matchEof = Parser.nextMatching(/$/);
export const matchNumber: Parser<number> = Parser.nextMatching(/[+-]?([0-9]*[.])?[0-9]+([eE][-+]?[0-9]+)?/).map(s => parseFloat(s));
export const emptyObject = new ObjectBuildingParser<{}>((s) => [{}, s]);
export const emptyTuple = new TupleBuildingParser<[]>((s) => [[], s]);

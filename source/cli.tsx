#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import * as fs from 'fs';
import {defaultMonster, Monster} from "./types";
import { Editor } from './ui';
import {BetterFocus} from "./better_focus";

const cli = meow(`
	Usage
	  ${process.argv0} (...options)

	Options
		--in=      The file to start editing with
		--out=     The filename to write to, defaults to stdout
`, {
	flags: {
		in: { type: 'string', default: '' },
		out: { type: 'string', default: '/dev/fd/1' },
	}
});

const startingJson: Monster = cli.flags.in ? JSON.parse(fs.readFileSync(cli.flags.in, 'utf-8')) : defaultMonster;

render(
	<BetterFocus>
		<Editor startingJson={startingJson} outputFileName={cli.flags.out}/>
	</BetterFocus>
);

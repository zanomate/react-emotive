import { gen } from './gen';
import { appendFile, writefile } from './print';

// CORE
appendFile('./src/core.ts');

// GEN
gen();

writefile();

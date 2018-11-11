import {appendFile, writefile} from "gen/print";
import {genStyled} from "gen/Styled";

appendFile('./src/core/imports.ts');
appendFile('./src/core/emotive.ts', true);
appendFile('./src/core/react-emotive.ts', true);

genStyled();

writefile();

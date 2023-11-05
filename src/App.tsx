import React, {ReactElement} from 'react'
import './App.css'
import {AnimationPlayer} from './components/player/AnimationPlayer'
import {useWindowDimensions} from './hook/UseWindowDimensions'
import {
    InitialValuesOfVariable
} from './lessons/javatest/Building Blocks/005 Initial Values of Variables/InitialValuesOfVariable';
import {
    DecimalIntegerLiterals
} from "./lessons/javatest/Building Blocks/006 Decimal Integer Literals/DecimalIntegerLiterals";
import {
    CliLegalEntryPointMethods
} from "./lessons/javatest/Building Blocks/001 Cli legal entry point methods/CliLegalEntryPointMethods";
import {TextBlocks} from "./lessons/javatest/Building Blocks/003 Text blocks/TextBlocks";
import {
    NumberOfRemovedImports
} from "./lessons/javatest/Building Blocks/007 Number of removed imports/NumberOfRemovedImports";
import {FindCompileErrors} from "./lessons/javatest/Building Blocks/008 FindCompileErrors/FindCompileErrors";
import {ValidJavaIdentifiers} from "./lessons/javatest/Building Blocks/002 Valid java identifiers/ValidJavaIdentifiers";
import {VarCompileInAMethod} from "./lessons/javatest/Building Blocks/004 Var compile in a method/VarCompileInAMethod";
import {ValidLiterals} from "./lessons/javatest/Building Blocks/009 ValidLiterals/ValidLiterals";
import {Demo} from "./lessons/Demo";
import {GarbageCollection} from "./lessons/javatest/Building Blocks/010 Garbage collection/GarbageCollection";
import {calculateArrayPercentValue} from "./common/Utils";

const App = (): ReactElement => {
    const lesson = [
        CliLegalEntryPointMethods,
        ValidJavaIdentifiers,
        TextBlocks,
        VarCompileInAMethod,
        InitialValuesOfVariable,
        DecimalIntegerLiterals,
        NumberOfRemovedImports,
        FindCompileErrors,
        ValidLiterals,
        GarbageCollection,
        Demo
    ][9]
    const canvasTop = 50
    const left = (useWindowDimensions().width - lesson.canvasDimensions.width) / 2

    return <AnimationPlayer
        top={canvasTop}
        left={left}
        lesson={lesson}
    />
}

export default App

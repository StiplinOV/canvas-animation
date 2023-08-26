import {LessonJsonType} from '../../AnimationsJsonType'

export const Demo: LessonJsonType = {
    sound: require('./../Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 1000,
                    appearDuration: 1000,
                    disappearTime: 30000,
                    disappearDuration: 5000
                }],
                selections: [
                    {
                        time: 15000,
                        duration: 2000,
                        type: {
                            code: {
                                substrings: [{
                                    from: 30,
                                    to: 50
                                }]
                            }
                        }
                    },
                    {
                        time: 20000,
                        duration: 2000,
                        type: {
                            code: {
                                substrings: [{
                                    from: 60,
                                    to: 70
                                }]
                            }
                        }
                    },
                    {
                        time: 25000,
                        duration: 1000,
                        type: {
                            questionnaire: {
                                lines: [1]
                            }
                        }
                    }],
                transformations: [
                    {
                        appearTime: 5000,
                        appearDuration: 1000,
                        object: {
                            codePartHeight: 360,
                            questionParamsFontSize: 25,
                            questionParamsPosition: 'down'
                        }
                    },
                    {
                        appearTime: 7000,
                        appearDuration: 1000,
                        object: {
                            questionParamsOptions: [
                                'A. unknown',
                                'B. great',
                                'C. good',
                                'D. bad',
                                'E. unknowngreatgoodbad',
                                'F. Exactly one line needs to be changed for the code to compile.',
                                'G. Exactly two line needs to be changed for the code to compile.',
                                'H. None of the above'
                            ]
                        }
                    },
                    {
                        appearTime: 10000,
                        appearDuration: 1000,
                        object: {
                            language: 'java'
                        }
                    }
                ],
                object: {
                    title: 'What is the result of executing the following code snippet?',
                    titleFontSize: 50,
                    origin: {
                        x: 0,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    codeFontSize: 25,
                    codeFormattedTextStyle: 'darcula',
                    codeText: 'final int score1 = 8, score2 = 3;\n' +
                        'char myScore = 7;\n' +
                        'var goal = switch (myScore) {\n' +
                        '\tdefault -> {if(10>score1) yield \'unknown\';}\n' +
                        '\tcase score1 -> \'great\';\n' +
                        '\tcase 2, 4, 6 -> \'good\';\n' +
                        '\tcase score2, 0 -> {\'bad\';}' +
                        '};\n' +
                        'System.out.println(goal);'
                }
            }
        ]
    }
}

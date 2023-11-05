import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const DecimalIntegerLiterals: LessonJsonType = {
    sound: require('./без названия 5.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 166000,
    cameras: [
        {
            camera: {
                x: 0,
                y: 0
            },
            startTime: 0
        },
        {
            camera: {
                x: 1280,
                y: 0
            },
            startTime: 9000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 720
            },
            startTime: 155000,
            transformDuration: 1000
        }
    ],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 11000,
                    appearDuration: 3000
                }],
                object: {
                    title: 'Which of the following expressions, when inserted independently into the blank line, ' +
                        'allow the code compile? (Choose all that apply.)',
                    titleFontSize: 46,
                    codeText: 'public void printMagicData() {\n' +
                        '    var magic = _____________;\n' +
                        '    System.out.println(magic);\n' +
                        '}',
                    codeFontSize: 30,
                    questionNumberingType: 'letters',
                    questionParamsFont: 'monospace',
                    questionParamsOptions: [
                        '3_1',
                        '1_329_.0',
                        '3_13.0_',
                        '5_291._2',
                        '2_234.0_0',
                        '9___6',
                        '_1_3_5_0'
                    ],
                    questionParamsPosition: 'right',
                    questionParamsLineSpacing: 1.8,
                    origin: {
                        x: 1280,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    questionParamsFontSize: 38
                },
                selections: [
                    {
                        time: 73000,
                        duration: 2000,
                        type: {
                            questionnaire: {
                                lines: [0, 5, 6]
                            }
                        }
                    },
                    {
                        time: 78000,
                        duration: 3000,
                        type: {
                            questionnaire: {
                                lines: [1, 2, 3, 4]
                            }
                        }
                    }
                ],
                transformations: [
                    {
                        appearTime: 98000,
                        appearDuration: 200,
                        object: {
                            questionParamsStrikethroughOptions: [6]
                        }
                    },
                    {
                        appearTime: 135000,
                        appearDuration: 500,
                        object: {
                            questionParamsStrikethroughOptions: [1, 2, 3, 6]
                        }
                    },
                    {
                        appearTime: 96000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 5,
                                    backgroundColor: 'success'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 147000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 5,
                                    backgroundColor: 'success'
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        formattedText: [
            {
                presenceParameters: [{
                    appearTime: 0,
                    appearDuration: 0
                }],
                object: {
                    width: 1280,
                    height: 720,
                    fontSize: 72,
                    zIndex: 1,
                    value: {
                        text: 'Java SE 17 Developer\nEXAM 1Z0-829'
                    },
                    origin: {
                        x: 0, y: 0
                    }
                }
            },
            {
                presenceParameters: [{
                    appearTime: 50000,
                    appearDuration: 10000,
                    disappearTime: 197000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1290, y: 300
                    },
                    width: 500,
                    height: 400,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '3.10. Literals',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t...'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tLiteral:\t\t\t\t\t\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'IntegerLiteral',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t  ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'FloatingPointLiteral',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'BooleanLiteral',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t  ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'CharacterLiteral',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'StringLiteral',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'TextBlock',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec'
                        },
                        {
                            value: 'NullLiteral',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t\t ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 81000,
                        appearDuration: 2000,
                        object: {
                            value: [
                                {
                                    value: '3.10.1. Integer Literals',
                                    type: 'paragraphTitle'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tUnderscores are allowed as separators'
                                },
                                'newline',
                                {
                                    value: '\tbetween digits that denote the integer.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 110000,
                        appearDuration: 2000,
                        object: {
                            value: [
                                {
                                    value: '3.10.2. Floating-Point Literals',
                                    type: 'paragraphTitle'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tUnderscores are allowed as separators'
                                },
                                'newline',
                                {
                                    value: '\tbetween digits that denote the whole-number'
                                },
                                'newline',
                                {
                                    value: '\tpart, and between digits that denote the'
                                },
                                'newline',
                                {
                                    value: '\tfraction part, and between digits that denote'
                                },
                                'newline',
                                {
                                    value: '\tthe exponent.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 155000,
                    appearDuration: 6000
                }],
                object: {
                    value: {
                        text: 'Produced by\n\nOleg Stiplin',
                        formattedTextStyle: animationStyle.formattedTextStyle
                    },
                    origin: {
                        x: 0, y: 720
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 72,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 161000,
                    appearDuration: 3000
                }],
                object: {
                    weight: 0,
                    value: {
                        text: '\t\t\t\t\t\t\t\t\tsubscribe...',
                        formattedTextStyle: animationStyle.formattedTextStyle
                    },
                    origin: {
                        x: 0, y: 1300
                    },
                    width: 1280,
                    height: 100,
                    fontSize: 36,
                    zIndex: 2
                }
            }
        ]
    }
}

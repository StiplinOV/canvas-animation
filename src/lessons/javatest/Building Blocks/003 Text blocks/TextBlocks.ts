import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

// https://docs.oracle.com/javase/specs/
// https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.1.4
export const TextBlocks: LessonJsonType = {
    sound: require('./без названия 2.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 232000,
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
            startTime: 10000,
            transformDuration: 2000
        },
        {
            camera: {
                x: 0,
                y: 720
            },
            startTime: 218000,
            transformDuration: 1000
        }
    ],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 12000,
                    appearDuration: 5000
                }],
                object: {
                    title: 'Which are true about this code? (Choose all that apply.)',
                    titleFontSize: 50,
                    origin: {
                        x: 1280,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    questionParamsFontSize: 25,
                    questionParamsLineSpacing: 1.3,
                    codeFontSize: 25
                },
                selections: [{
                    time: 203000,
                    duration: 10000,
                    type: {
                        code: {
                            substrings: [
                                {
                                    from: 153,
                                    to: 164
                                },
                                {
                                    from: 190,
                                    to: 201
                                },
                                {
                                    from: 231,
                                    to: 242
                                }
                            ]
                        }
                    }
                }],
                transformations: [
                    {
                        appearTime: 20000,
                        appearDuration: 2000,
                        object: {
                            codeText: 'public class KitchenSink {\n' +
                                '    private int numForks;\n' +
                                '\n' +
                                '    public static void main(String[] args) {\n' +
                                '        int numKnives;\n' +
                                '        System.out.println("""\n' +
                                '           "# forks = " + numForks +\n' +
                                '            " # knives = " + numKnives +\n' +
                                '           # cups = 0""");\n' +
                                '    }\n' +
                                '}',
                            codeFontSize: 24,
                            questionParamsOptions: [
                                [
                                    'The output includes: ',
                                    {
                                        value: '# forks = 0',
                                        font: 'monospace'
                                    },
                                    '.'
                                ],
                                [
                                    'The output includes: ',
                                    {
                                        value: '# knives = 0',
                                        font: 'monospace'
                                    },
                                    '.'
                                ],
                                [
                                    'The output includes: ',
                                    {
                                        value: '# cups = 0',
                                        font: 'monospace'
                                    },
                                    '.'
                                ],
                                'The output includes a blank line.',
                                'The output includes one or more lines that begin with whitespace.',
                                'The code does not compile.'
                            ],
                            questionNumberingType: 'letters',
                            questionParamsPosition: 'down'
                        }
                    },
                    {
                        appearTime: 80000,
                        appearDuration: 3000,
                        object: {
                            language: 'java',
                            codeLinesNumbered: true
                        }
                    },
                    {
                        appearTime: 141000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1]
                        }
                    },
                    {
                        appearTime: 172000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 3]
                        }
                    },
                    {
                        appearTime: 178000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 3, 5]
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
                    appearTime: 104000,
                    appearDuration: 5000,
                    disappearTime: 129000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1320, y: 170
                    },
                    width: 1200,
                    height: 380,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '3.10.6. Text Blocks',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'A text block is always of type String ('
                        },
                        {
                            value: '§4.3.3',
                            type: 'link'
                        },
                        {
                            value: ').'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'The '
                        },
                        {
                            value: 'opening delimiter',
                            textStyle: 'italic'
                        },
                        {
                            value: ' is a sequence that starts with three double quote characters ("""), continues with'
                        },
                        {
                            value: ' zero or more space, tab, and form feed'
                        },
                        'newline',
                        {
                            value: 'characters, and concludes with a line terminator.'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'The '
                        },
                        {
                            value: 'closing delimiter',
                            textStyle: 'italic'
                        },
                        {
                            value: ' is a sequence of three double quote characters.'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'The '
                        },
                        {
                            value: 'content',
                            textStyle: 'italic'
                        },
                        {
                            value: ' of a text block is the sequence of characters that begins immediately before the first double'
                        },
                        {
                            value: ' quote of the closing delimiter.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        }
                    ]
                }
            },
            {
                presenceParameters: [{
                    appearTime: 182000,
                    appearDuration: 2000,
                    disappearTime: 197000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1395, y: 250
                    },
                    width: 1050,
                    height: 220,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '3.10.6. Text Blocks',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        },
                        'newline',
                        'newline',
                        {
                            value: '2. Incidental white space is removed, as if by execution of '
                        },
                        {
                            value: 'String.stripIndent',
                            font: 'monospace'
                        },
                        {
                            value: ' on the characters resulting from step 1.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        }
                    ]
                }
            },
            {
                presenceParameters: [{
                    appearTime: 218000,
                    appearDuration: 6000
                }],
                object: {
                    value: {
                        text: 'Produced by\n\nOleg Stiplin'
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
                    appearTime: 166000,
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

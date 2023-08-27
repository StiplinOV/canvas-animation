import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const InitialValuesOfVariable: LessonJsonType = {
    sound: require('./без названия 4.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 155000,
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
            startTime: 143000,
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
                    title: 'Which of the following are correct? (Choose all that apply.)',
                    titleFontSize: 50,
                    origin: {
                        x: 1280,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    questionParamsFontSize: 30
                },
                transformations: [
                    {
                        appearTime: 15000,
                        appearDuration: 2000,
                        object: {
                            questionNumberingType: 'letters',
                            questionParamsOptions: [
                                [
                                    'An instance variable of type ',
                                    {
                                        value: 'float',
                                        font: 'monospace'
                                    },
                                    ' defaults to ',
                                    {
                                        value: '0',
                                        font: 'monospace'
                                    },
                                    '.'],
                                [
                                    'An instance variable of type ',
                                    {
                                        value: 'char',
                                        font: 'monospace'
                                    },
                                    ' defaults to ',
                                    {
                                        value: 'null',
                                        font: 'monospace'
                                    },
                                    '.'],
                                [
                                    'A local variable of type ',
                                    {
                                        value: 'double',
                                        font: 'monospace'
                                    },
                                    ' defaults to ',
                                    {
                                        value: '0.0',
                                        font: 'monospace'
                                    },
                                    '.'
                                ],
                                [
                                    'A local variable of type ',
                                    {
                                        value: 'int',
                                        font: 'monospace'
                                    },
                                    ' defaults to ',
                                    {
                                        value: 'null',
                                        font: 'monospace'
                                    },
                                    '.'
                                ],
                                [
                                    'A class variable of type ',
                                    {
                                        value: 'String',
                                        font: 'monospace'
                                    },
                                    ' defaults to ',
                                    {
                                        value: 'null',
                                        font: 'monospace'
                                    },
                                    '.'],
                                [
                                    'A class variable of type ',
                                    {
                                        value: 'String',
                                        font: 'monospace'
                                    },
                                    ' defaults to the empty string ',
                                    {
                                        value: '""',
                                        font: 'monospace'
                                    },
                                    '.'
                                ],
                                'None of the above.'
                            ],
                            questionParamsPosition: 'down',
                            questionParamsLineSpacing: 1.8
                        }
                    },
                    {
                        appearTime: 98000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [2, 3]
                        }
                    },
                    {
                        appearTime: 114000,
                        appearDuration: 2000,
                        object: {
                            height: 520
                        }
                    },
                    {
                        appearTime: 119000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 2, 3]
                        }
                    },
                    {
                        appearTime: 128000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 2, 3]
                        }
                    },
                    {
                        appearTime: 136000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 2, 3, 5]
                        }
                    },
                    {
                        appearTime: 140000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 2, 3, 5, 6]
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
                    appearTime: 78000,
                    appearDuration: 5000,
                    disappearTime: 197000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1290, y: 10
                    },
                    width: 1260,
                    height: 700,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '4.12.5. Initial Values of Variables',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tEvery variable in a program must have a value before its value is used:'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● Each class variable, instance variable, or array component is initialized with a '
                        },
                        {
                            value: 'default value',
                            textStyle: 'italic'
                        },
                        {
                            value: ' when it is created ('
                        },
                        {
                            value: '§15.9',
                            type: 'link'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: '§15.10.2',
                            type: 'link'
                        },
                        {
                            value: '):'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'byte',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is zero, that is, the value of '
                        },
                        {
                            value: '(byte)0',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'short',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is zero, that is, the value of '
                        },
                        {
                            value: '(short)0',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'int',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is zero, that is, '
                        },
                        {
                            value: '0',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'long',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is zero, that is, '
                        },
                        {
                            value: '0L',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'float',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is positive zero, that is, '
                        },
                        {
                            value: '0.0f',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'double',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is positive zero, that is, '
                        },
                        {
                            value: '0.0d',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'char',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is the null character, that is, '
                        },
                        {
                            value: '\'\\u0000\'',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For type '
                        },
                        {
                            value: 'boolean',
                            font: 'monospace'
                        },
                        {
                            value: ', the default value is '
                        },
                        {
                            value: 'false',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t\t○ For all reference types ('
                        },
                        {
                            value: '§4.3',
                            type: 'link'
                        },
                        {
                            value: '), the default value is '
                        },
                        {
                            value: 'null',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t...'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● A local variable declared by a statement ('
                        },
                        {
                            value: '§14.4.2',
                            type: 'link'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: '§14.14.1',
                            type: 'link'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: '§14.14.2',
                            type: 'link'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: '§14.20.3',
                            type: 'link'
                        },
                        {
                            value: ') must be explicitly given a value before it is used, by either'
                        },
                        'newline',
                        {
                            value: '\t\t   initialization ('
                        },
                        {
                            value: '§14.4',
                            type: 'link'
                        },
                        {
                            value: ') or assignment ('
                        },
                        {
                            value: '§15.26',
                            type: 'link'
                        },
                        {
                            value: '), in a way that can be verified using the rules for definite assignment ('
                        },
                        {
                            value: '§16 (Definite Assignment)',
                            type: 'link'
                        },
                        {
                            value: ').'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t...'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 97000,
                        appearDuration: 0,
                        object: {
                            zIndex: -1
                        }
                    },
                    {
                        appearTime: 100000,
                        appearDuration: 0,
                        object: {
                            zIndex: 2
                        }
                    },
                    {
                        appearTime: 114000,
                        appearDuration: 2000,
                        object: {
                            height: 200,
                            width: 1280,
                            origin: {
                                x: 1280,
                                y: 520
                            },
                            value: [
                                {
                                    value: '4.12.5. Initial Values of Variables',
                                    type: 'paragraphTitle'
                                },
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                {
                                    value: '\t\t\t○ For type '
                                },
                                {
                                    value: 'float',
                                    font: 'monospace'
                                },
                                {
                                    value: ', the default value is positive zero, that is, '
                                },
                                {
                                    value: '0.0f',
                                    font: 'monospace'
                                },
                                {
                                    value: '.'
                                },
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                {
                                    value: '\t\t\t○ For type '
                                },
                                {
                                    value: 'char',
                                    font: 'monospace'
                                },
                                {
                                    value: ', the default value is the null character, that is, '
                                },
                                {
                                    value: '\'\\u0000\'',
                                    font: 'monospace'
                                },
                                {
                                    value: '.'
                                },
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                {
                                    value: '\t\t\t○ For all reference types ('
                                },
                                {
                                    value: '§4.3',
                                    type: 'link'
                                },
                                {
                                    value: '), the default value is '
                                },
                                {
                                    value: 'null',
                                    font: 'monospace'
                                },
                                {
                                    value: '.'
                                },
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
                    appearTime: 143000,
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
                    appearTime: 149000,
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

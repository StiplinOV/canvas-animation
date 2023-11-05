import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const ValidLiterals: LessonJsonType = {
    sound: require('./без названия 8.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 278000,
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
            startTime: 268000,
            transformDuration: 1000
        }
    ],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 9000,
                    appearDuration: 0
                }],
                object: {
                    title: 'Which of the following statements about the code snippet are true? (Choose all that apply.)',
                    titleFontSize: 39,
                    origin: {
                        x: 1280,
                        y: 0
                    },
                    width: 1280,
                    height: 720
                },
                transformations: [
                    {
                        appearTime: 12000,
                        appearDuration: 3000,
                        object: {
                            codeText: `short numPets = 5L;
int numGrains = 2.0;
String name = "Scruffy";
int d = numPets.length();
int e = numGrains.length;
int f = name.length();`,
                            codeFontSize: 30,
                            codeLinesNumbered: true,
                            questionNumberingType: 'letters',
                            questionParamsFont: 'monospace',
                            questionParamsOptions: [
                                'Line 1 generates a compiler error.',
                                'Line 2 generates a compiler error.',
                                'Line 3 generates a compiler error.',
                                'Line 4 generates a compiler error.',
                                'Line 5 generates a compiler error.',
                                'Line 6 generates a compiler error.'
                            ],
                            questionParamsPosition: 'right',
                            questionParamsLineSpacing: 1.8,
                            questionParamsFontSize: 26
                        }
                    },
                    {
                        appearTime: 41000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'warning',
                                    num: 0
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 42000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [{
                                textColor: 'warning',
                                num: 0
                            }]
                        }
                    },
                    {
                        appearTime: 102000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [{
                                textColor: 'fail',
                                num: 0
                            }]
                        }
                    },
                    {
                        appearTime: 104000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 107000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 1
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 110000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [{
                                textColor: 'fail',
                                num: 0
                            }, {
                                textColor: 'warning',
                                num: 1
                            }]
                        }
                    },
                    {
                        appearTime: 150000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [{
                                textColor: 'fail',
                                num: 0
                            }, {
                                textColor: 'fail',
                                num: 1
                            }]
                        }
                    },
                    {
                        appearTime: 154000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 156000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 2
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 160000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'warning',
                                    num: 2
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 174000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [2],
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                }
                            ],
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 176000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 3
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 180000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                },
                                {
                                    textColor: 'warning',
                                    num: 3
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 194000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                },
                                {
                                    textColor: 'fail',
                                    num: 3
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 206000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 3
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 210000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                },
                                {
                                    textColor: 'fail',
                                    num: 3
                                },
                                {
                                    textColor: 'warning',
                                    num: 4
                                }
                            ],
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 3
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 4
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 230000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                },
                                {
                                    textColor: 'fail',
                                    num: 3
                                },
                                {
                                    textColor: 'fail',
                                    num: 4
                                }
                            ],
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 3
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 4
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 235000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                },
                                {
                                    textColor: 'fail',
                                    num: 3
                                },
                                {
                                    textColor: 'fail',
                                    num: 4
                                },
                                {
                                    textColor: 'warning',
                                    num: 5
                                }
                            ],
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 3
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 4
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 5
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 260000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
                                {
                                    textColor: 'fail',
                                    num: 0
                                },
                                {
                                    textColor: 'fail',
                                    num: 1
                                },
                                {
                                    textColor: 'success',
                                    num: 2
                                },
                                {
                                    textColor: 'fail',
                                    num: 3
                                },
                                {
                                    textColor: 'fail',
                                    num: 4
                                },
                                {
                                    textColor: 'success',
                                    num: 5
                                }
                            ],
                            questionParamsStrikethroughOptions: [2, 5],
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 1
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 3
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 4
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        graphDataStructure: [
            {
                presenceParameters: [{
                    appearTime: 85000,
                    appearDuration: 500,
                    disappearTime: 154000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 2180, y: 10
                    },
                    vertexStyle: {
                        fontSize: 20,
                        diameter: 55
                    },
                    edgeStyle: {
                        sourceType: 'Arrow',
                        targetType: 'None'
                    },
                    frame: {},
                    vertices: [
                        {
                            id: 'double',
                            label: 'double'
                        },
                        {
                            id: 'float',
                            label: 'float'
                        },
                        {
                            id: 'long',
                            label: 'long'
                        },
                        {
                            id: 'int',
                            label: 'int'
                        },
                        {
                            id: 'char',
                            label: 'char'
                        },
                        {
                            id: 'short',
                            label: 'short'
                        },
                        {
                            id: 'byte',
                            label: 'byte'
                        }
                    ],
                    edges: [
                        {
                            sourceId: 'double',
                            targetId: 'float'
                        },
                        {
                            sourceId: 'float',
                            targetId: 'long'
                        },
                        {
                            sourceId: 'long',
                            targetId: 'int'
                        },
                        {
                            sourceId: 'int',
                            targetId: 'char'
                        },
                        {
                            sourceId: 'int',
                            targetId: 'short'
                        },
                        {
                            sourceId: 'short',
                            targetId: 'byte'
                        }
                    ],
                    zIndex: 2
                },
                transformations: [
                    {
                        appearTime: 94000,
                        appearDuration: 1000,
                        object: {
                            origin: {
                                x: 1300, y: 10
                            },
                            transpose: true
                        }
                    }
                ],
                selections: [
                    {
                        time: 90000,
                        duration: 10000,
                        type: {
                            vertexIds: ['short', 'int', 'long'],
                            edges: [
                                {
                                    sourceId: 'long',
                                    targetId: 'int'
                                },
                                {
                                    sourceId: 'int',
                                    targetId: 'short'
                                }
                            ]
                        }
                    },
                    {
                        time: 141000,
                        duration: 15000,
                        type: {
                            vertexIds: ['double', 'float', 'long', 'int'],
                            edges: [
                                {
                                    sourceId: 'double',
                                    targetId: 'float'
                                },
                                {
                                    sourceId: 'float',
                                    targetId: 'long'
                                },
                                {
                                    sourceId: 'long',
                                    targetId: 'int'
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
                    appearDuration: 2000,
                    disappearTime: 63000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1420, y: 235
                    },
                    width: 1000,
                    height: 250,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '3.10.1. Integer Literals',
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
                            value: '\tAn integer literal is of type '
                        },
                        {
                            value: 'long',
                            font: 'monospace'
                        },
                        {
                            value: ' if it is suffixed with an ASCII letter '
                        },
                        {
                            value: 'L',
                            font: 'monospace'
                        },
                        {
                            value: ' or '
                        },
                        {
                            value: 'l',
                            font: 'monospace'
                        },
                        {
                            value: ' (ell); otherwise it is of type '
                        },
                        {
                            value: 'int',
                            font: 'monospace'
                        },
                        {
                            value: ' ('
                        },
                        {
                            value: '§4.2.1',
                            type: 'link'
                        },
                        {
                            value: ').'
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
                    appearTime: 73000,
                    appearDuration: 2000,
                    disappearTime: 94000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1520, y: 135
                    },
                    width: 800,
                    height: 450,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '4.10.1. Subtyping among Primitive Types',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tThe following rules define the direct supertype relation among the primitive types:'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● double > float'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● float > long'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● long > int'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● int > char'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● int > short'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t● short > byte'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 85000,
                        appearDuration: 1000,
                        object: {
                            origin: {
                                x: 1300, y: 135
                            },
                            width: 770,
                            height: 450,
                            value: [
                                {
                                    value: '4.10.1. Subtyping among Primitive Types',
                                    type: 'paragraphTitle'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tThe following rules define the direct supertype relation among the primitive types:'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t\t● double > float'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t\t● float > long'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t\t● long > int'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t\t● int > char'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t\t● int > short'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t\t● short > byte'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 117000,
                    appearDuration: 2000,
                    disappearTime: 132000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1420, y: 235
                    },
                    width: 1000,
                    height: 250,
                    fontSize: 18,
                    zIndex: 10,
                    value: [
                        {
                            value: '3.10.2. Floating-Point Literals',
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
                            value: '\tA floating-point literal is of type '
                        },
                        {
                            value: 'float',
                            font: 'monospace'
                        },
                        {
                            value: ' if it is suffixed with an ASCII letter '
                        },
                        {
                            value: 'F',
                            font: 'monospace'
                        },
                        {
                            value: ' or '
                        },
                        {
                            value: 'f',
                            font: 'monospace'
                        },
                        {
                            value: '; otherwise its type is '
                        },
                        {
                            value: 'double',
                            font: 'monospace'
                        },
                        'newline',
                        {
                            value: ' and it can optionally be suffixed with an ASCII letter '
                        },
                        {
                            value: 'D',
                            font: 'monospace'
                        },
                        {
                            value: ' or '
                        },
                        {
                            value: 'd',
                            font: 'monospace'
                        },
                        {
                            value: '.'
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
                    appearTime: 167000,
                    appearDuration: 1000,
                    disappearTime: 170000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1420, y: 235
                    },
                    width: 1000,
                    height: 250,
                    fontSize: 18,
                    zIndex: 10,
                    value: [
                        {
                            value: '3.10.5. String Literals',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tA '
                        },
                        {
                            value: 'string literal',
                            textStyle: 'italic'
                        },
                        {
                            value: ' consists of zero or more characters enclosed in double quotes. Characters such as newlines may be'
                        },
                        'newline',
                        {
                            value: '\trepresented by escape sequences ('
                        },
                        {
                            value: '§3.10.7',
                            type: 'link'
                        },
                        {
                            value: ').'
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
                    appearTime: 198000,
                    appearDuration: 1000,
                    disappearTime: 203000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1520, y: 285
                    },
                    width: 800,
                    height: 150,
                    fontSize: 18,
                    zIndex: 10,
                    value: [
                        {
                            value: '4.2.2. Integer Operations',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t<, <=, >, >=, ==, !=, +, -, *, /, %, ++, --, <<, >>, >>>, ~, &, ^, |, ?, :, cast operator, '
                        }
                    ]
                }
            },
            {
                presenceParameters: [{
                    appearTime: 224000,
                    appearDuration: 1000,
                    disappearTime: 227000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1520, y: 285
                    },
                    width: 800,
                    height: 150,
                    fontSize: 18,
                    zIndex: 10,
                    value: [
                        {
                            value: '4.2.4. Floating-Point Operations',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t<, <=, >, >=, ==, !=, +, -, *, /, %, ++, --, <<, >>, >>>, ~, &, ^, |, ?, :, cast operator, '
                        }
                    ]
                }
            },
            {
                presenceParameters: [{
                    appearTime: 268000,
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
                    appearTime: 270000,
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

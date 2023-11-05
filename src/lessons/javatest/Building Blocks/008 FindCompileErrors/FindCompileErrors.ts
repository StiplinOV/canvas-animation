import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const FindCompileErrors: LessonJsonType = {
    sound: require('./без названия 7.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 293000,
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
            startTime: 282000,
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
                    title: 'Which statements about the following class are correct? (Choose all that apply.)',
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
                            codeText: `public class ClownFish {
    int gills = 0, double weight=2;
    { int fins = gills; }
    void print (int length = 3) {
        System.out.println(gills);
        System.out.println(weight);
        System.out.println(fins);
        System.out.println(length);
} }`,
                            codeFontSize: 25,
                            codeLinesNumbered: true,
                            questionNumberingType: 'letters',
                            questionParamsFont: 'monospace',
                            questionParamsOptions: [
                                'Line 2 generates a compiler error.',
                                'Line 3 generates a compiler error.',
                                'Line 4 generates a compiler error.',
                                'Line 7 generates a compiler error.',
                                'The code prints 0.',
                                'The code prints 2.0.',
                                'The code prints 2.',
                                'The code prints 3.'
                            ],
                            questionParamsPosition: 'right',
                            questionParamsLineSpacing: 1.8,
                            questionParamsFontSize: 26
                        }
                    },
                    {
                        appearTime: 49000,
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
                        appearTime: 52000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [{
                                textColor: 'warning',
                                num: 1
                            }]
                        }
                    },
                    {
                        appearTime: 108000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                }
                            ],
                            codeSelectedLines: [{
                                textColor: 'fail',
                                num: 1
                            }]
                        }
                    },
                    {
                        appearTime: 112000,
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
                        appearTime: 114000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
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
                        appearTime: 159000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
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
                        appearTime: 163000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [1],
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 165000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 2
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 168000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
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
                        appearTime: 223000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
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
                        appearTime: 227000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 2
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 229000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 2
                                },
                                {
                                    backgroundColor: 'warning',
                                    num: 3
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 233000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
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
                                    num: 6
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 250000,
                        appearDuration: 0,
                        object: {
                            codeSelectedLines: [
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
                                    num: 6
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 260000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    backgroundColor: 'success',
                                    num: 0
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 2
                                },
                                {
                                    backgroundColor: 'success',
                                    num: 3
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 273000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [1, 4, 5, 6, 7]
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
                    appearTime: 58000,
                    appearDuration: 7300,
                    disappearTime: 98000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1470, y: 110
                    },
                    width: 900,
                    height: 500,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '14.4. Local Variable Declarations',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tA '
                        },
                        {
                            value: 'local variable declaration',
                            textStyle: 'italic'
                        },
                        {
                            value: ' declares and optionally initializes one or more local variables ('
                        },
                        {
                            value: '§4.12.3',
                            type: 'link'
                        },
                        {
                            value: ').'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tLocalVariableDeclaration:\t\t\t\t\t\t\t\t\t\t  ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t{',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'VariableModifier',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '} ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'LocalVariableType',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' ',
                            type: 'codeSpec'
                        },
                        {
                            value: 'VariableDeclaratorList',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
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
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tVariableDeclaratorList:\t\t\t\t\t\t\t\t\t\t\t',
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
                            value: 'VariableDeclarator',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' {, ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'VariableDeclarator',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '}\t\t\t\t\t  ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tVariableDeclarator:\t\t\t\t\t\t\t\t\t\t\t\t',
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
                            value: 'VariableDeclaratorId',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' [= ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'VariableInitializer',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ']\t\t\t\t   ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
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
                    appearTime: 120000,
                    appearDuration: 7300,
                    disappearTime: 159000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1930, y: 170
                    },
                    width: 620,
                    height: 500,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '8.1.7. Class Body and Member Declarations',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tA '
                        },
                        {
                            value: 'class body',
                            textStyle: 'italic'
                        },
                        {
                            value: ' may contain declarations of members of the class, that'
                        },
                        'newline',
                        {
                            value: '\tis, fields ('
                        },
                        {
                            value: '§8.3',
                            type: 'link'
                        },
                        {
                            value: '), methods ('
                        },
                        {
                            value: '§8.4',
                            type: 'link'
                        },
                        {
                            value: '), classes, and interfaces ('
                        },
                        {
                            value: '§8.5',
                            type: 'link'
                        },
                        {
                            value: ').'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tA class body may also contain instance initializers ('
                        },
                        {
                            value: '§8.6',
                            type: 'link'
                        },
                        {
                            value: '), static'
                        },
                        'newline',
                        {
                            value: '\tinitializers ('
                        },
                        {
                            value: '§8.7',
                            type: 'link'
                        },
                        {
                            value: '), and declarations of constructors ('
                        },
                        {
                            value: '§8.8',
                            type: 'link'
                        },
                        {
                            value: ') for the class.'
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
                            value: '8.6. Instance Initializerss',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tAn '
                        },
                        {
                            value: 'instance initializer',
                            textStyle: 'italic'
                        },
                        {
                            value: ' declared in a class is executed when an instance'
                        },
                        'newline',
                        {
                            value: '\tof the class is created ('
                        },
                        {
                            value: '§12.5',
                            type: 'link'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: '§15.9',
                            type: 'link'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: '§8.8.7.1',
                            type: 'link'
                        },
                        {
                            value: ').'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tInstanceInitializer:\t\t\t\t\t\t\t',
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
                            value: 'Block',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        }
                    ]
                },
                transformations: []
            },
            {
                presenceParameters: [{
                    appearTime: 183000,
                    appearDuration: 7300,
                    disappearTime: 215000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1470, y: 110
                    },
                    width: 900,
                    height: 500,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '8.4. Method Declarations',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tA method declares executable code that can be invoked, passing a fixed number of values as arguments.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tMethodDeclaration:\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t{',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'MethodModifier',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '} ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'MethodHeader',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' ',
                            type: 'codeSpec'
                        },
                        {
                            value: 'MethodBody',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '\t\t\t\t\t\t\t ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tMethodHeader:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Result',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'MethodDeclarator',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' [',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Throws',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ']\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'TypeParameters',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' {',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Annotation',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '} ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Result',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'MethodDeclarator',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' [',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Throws',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ']\t\t ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tMethodDeclarator:\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Identifier',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' (',
                            type: 'codeSpec'
                        },
                        {
                            value: ' [',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'ReceiverParameter',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' ,] [',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'FormalParameterList',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '] ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: ')',
                            type: 'codeSpec'
                        },
                        {
                            value: ' [',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Dims',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ']\t',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tReceiverParameter:\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t{',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Annotation',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: '} ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'UnannType',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' [',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        {
                            value: 'Identifier',
                            type: 'codeSpecLink',
                            textStyle: 'italic'
                        },
                        {
                            value: ' .] this\t\t\t\t\t\t   ',
                            type: 'codeSpec',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpec'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        }
                    ]
                },
                transformations: []
            },
            {
                presenceParameters: [{
                    appearTime: 240000,
                    appearDuration: 2000,
                    disappearTime: 247000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1545, y: 210
                    },
                    width: 750,
                    height: 300,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '6.3. Scope of a Declaration',
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
                            value: '\tThe scope of a local variable declared in a block by a local variable declaration'
                        },
                        'newline',
                        {
                            value: '\tstatement ('
                        },
                        {
                            value: '§14.4.2',
                            type: 'link'
                        },
                        {
                            value: ') is the rest of the block, starting with the declaration\'s own'
                        },
                        'newline',
                        {
                            value: '\tinitializer and including any further declarators to the right in the local variable'
                        },
                        'newline',
                        {
                            value: '\tdeclaration statement.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...',
                            textStyle: 'italic'
                        }
                    ]
                },
                transformations: []
            },
            {
                presenceParameters: [{
                    appearTime: 282000,
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
                    appearTime: 165000,
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

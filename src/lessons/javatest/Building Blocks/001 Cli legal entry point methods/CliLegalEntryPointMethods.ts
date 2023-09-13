import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

// https://docs.oracle.com/javase/specs/
// https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.1.4
export const CliLegalEntryPointMethods: LessonJsonType = {
    sound: require('./без названия.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 180000,
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
            startTime: 11000,
            transformDuration: 2000
        },
        {
            camera: {
                x: 1280,
                y: 720
            },
            startTime: 150000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 0
            },
            startTime: 158000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 720
            },
            startTime: 165000,
            transformDuration: 1000
        }
    ],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 13000,
                    appearDuration: 5000
                }],
                object: {
                    title: 'Which of the following are legal entry point methods that can be run from the command line? (Choose all that apply.)',
                    titleFontSize: 50,
                    origin: {
                        x: 1280,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    questionParamsFontSize: 35
                },
                transformations: [
                    {
                        appearTime: 22000,
                        appearDuration: 4000,
                        object: {
                            questionParamsOptions: [
                                'private static void main(String[] args)',
                                'public static final main(String[] args)',
                                'public void main(String[] args)',
                                'public static final void main(String[] args)',
                                'public static void main(String[] args)',
                                'public static main(String[] args)'
                            ],
                            questionParamsFont: 'monospace',
                            questionNumberingType: 'letters',
                            questionParamsPosition: 'down',
                            questionParamsLineSpacing: 2
                        }
                    },
                    {
                        appearTime: 74000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0]
                        }
                    },
                    {
                        appearTime: 79500,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 5]
                        }
                    },
                    {
                        appearTime: 87000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 2, 5]
                        }
                    },
                    {
                        appearTime: 93000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [{
                                type: 'success',
                                num: 4
                            }]
                        }
                    },
                    {
                        appearTime: 161000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    type: 'success',
                                    num: 3
                                },
                                {
                                    type: 'success',
                                    num: 4
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
                    appearTime: 53000,
                    appearDuration: 5000,
                    disappearTime: 71000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1550, y: 285
                    },
                    width: 740,
                    height: 250,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '12.1.4. Invoke Test.main',
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
                            value: '\tThe method main must be declared ',
                            textStyle: 'italic'
                        },
                        {
                            value: 'public',
                            textStyle: 'bold'
                        },
                        {
                            value: ', ',
                            textStyle: 'italic'
                        },
                        {
                            value: 'static',
                            textStyle: 'bold'
                        },
                        {
                            value: ', and ',
                            textStyle: 'italic'
                        },
                        {
                            value: 'void',
                            textStyle: 'bold'
                        },
                        {
                            value: '. It must specify a formal',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\tparameter whose declared type is ',
                            textStyle: 'italic'
                        },
                        {
                            value: 'array of String.',
                            textStyle: 'bold'
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
                    appearTime: 113000,
                    appearDuration: 5000,
                    disappearTime: 129000,
                    disappearDuration: 1000
                }],
                object: {
                    value: [
                        {
                            value: '8.4.3. Method Modifiers',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tMethodModifier:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t(one of)\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
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
                            value: 'Annotation',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: ' ',
                            type: 'codeSpec'
                        },
                        {
                            value: 'public protected private\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'normal',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\tabstract static final synchronized native strictfp\t\t\t\t\t\t\t\t\t\t\t  ',
                            textStyle: 'normal',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tThe rules concerning annotation modifiers for a method declaration are specified in '
                        },
                        {
                            value: '§9.7.4',
                            type: 'link'
                        },
                        {
                            value: ' and '
                        },
                        {
                            value: '§9.7.5',
                            type: 'link'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tIt is a compile-time error if the same keyword appears more than once as a modifier for a method'
                        },
                        'newline',
                        {
                            value: '\tdeclaration, or if a method declaration has more than one of the access modifiers '
                        },
                        {
                            value: 'public',
                            textStyle: 'bold'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: 'protected',
                            textStyle: 'bold'
                        },
                        {
                            value: ','
                        },
                        'newline',
                        {
                            value: '\tand '
                        },
                        {
                            value: 'private',
                            textStyle: 'bold'
                        },
                        {
                            value: ' ('
                        },
                        {
                            value: '§6.6',
                            type: 'link'
                        },
                        {
                            value: ').'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tIt is a compile-time error if a method declaration that contains the keyword '
                        },
                        {
                            value: 'abstract',
                            textStyle: 'bold'
                        },
                        {
                            value: ' also contains'
                        },
                        'newline',
                        {
                            value: '\tany one of the keywords '
                        },
                        {
                            value: 'private',
                            textStyle: 'bold'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: 'static',
                            textStyle: 'bold'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: 'final',
                            textStyle: 'bold'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: 'native',
                            textStyle: 'bold'
                        },
                        {
                            value: ', '
                        },
                        {
                            value: 'strictfp',
                            textStyle: 'bold'
                        },
                        {
                            value: ', or '
                        },
                        {
                            value: 'synchronized',
                            textStyle: 'bold'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tIt is a compile-time error if a method declaration that contains the keyword '
                        },
                        {
                            value: 'native',
                            textStyle: 'bold'
                        },
                        {
                            value: ' also contains'
                        },
                        'newline',
                        {
                            value: '\tstrictfp',
                            textStyle: 'bold'
                        },
                        {
                            value: '.'
                        }
                    ],
                    origin: {
                        x: 1290, y: 110
                    },
                    width: 1260,
                    height: 500,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 131000,
                    appearDuration: 5000,
                    disappearTime: 148000,
                    disappearDuration: 2000
                }],
                object: {
                    value: [
                        {
                            value: '8.4.3.3. final Methods',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tA method can be declared final to prevent subclasses from overriding or hiding it.'
                        }
                    ],
                    origin: {
                        x: 1570, y: 300
                    },
                    width: 700,
                    height: 120,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 150000,
                    appearDuration: 0
                }],
                object: {
                    value: {
                        text: 'public class Parent {\n' +
                            '    public static final void main(String[] args) {\n' +
                            '        System.out.println(\'Parent\');\n' +
                            '    }\n' +
                            '}\n' +
                            '\n' +
                            'class Child extends Parent {\n' +
                            '    public static void main(String[] args) {\n' +
                            '        System.out.println(\'Child\');\n' +
                            '    }\n' +
                            '}',
                        language: 'java',
                        formattedTextStyle: animationStyle.formattedTextStyle
                    },
                    origin: {
                        x: 1280, y: 720
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 30,
                    zIndex: 1
                },
                selections: [
                    {
                        time: 154000,
                        duration: 3000,
                        substrings: [{
                            from: 40,
                            to: 45
                        }]
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 165000,
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

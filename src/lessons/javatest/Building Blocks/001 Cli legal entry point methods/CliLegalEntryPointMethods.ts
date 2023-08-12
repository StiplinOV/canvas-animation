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
                selections: [
                    {
                        time: 93000,
                        duration: 25000,
                        type: {
                            questionnaire: {
                                lines: [4]
                            }
                        }
                    },
                    {
                        time: 161000,
                        duration: 25000,
                        type: {
                            questionnaire: {
                                lines: [3, 4]
                            }
                        }
                    }
                ],
                transformations: [
                    {
                        appearTime: 22000,
                        appearDuration: 4000,
                        object: {
                            questionParamsOptions: [
                                'A. private static void main(String[] args)',
                                'B. public static final main(String[] args)',
                                'C. public void main(String[] args)',
                                'D. public static final void main(String[] args)',
                                'E. public static void main(String[] args)',
                                'F. public static main(String[] args)'
                            ],
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
                    }
                ]
            }
        ],
        highlightedText: [
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
                        x: 1550, y: 260
                    },
                    width: 740,
                    height: 200,
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
                            value: '.',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\tIt must specify a formal parameter whose declared type is',
                            textStyle: 'italic'
                        },
                        'newline',
                        {
                            value: '\tarray of String.',
                            textStyle: 'bold'
                        },
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
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tMethodModifier:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t(one of)\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: 'Annotation',
                            textStyle: 'italic',
                            type: 'link',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: ' ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: 'public protected private\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'normal',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\tabstract static final synchronized native strictfp\t\t\t\t\t\t\t\t\t\t\t  ',
                            textStyle: 'normal',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
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
                        x: 1420, y: 285
                    },
                    width: 1000,
                    height: 150,
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
                        highlightStyle: animationStyle.highlightTextStyle
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
                        text: 'Producted by\n\nOleg Stiplin',
                        highlightStyle: animationStyle.highlightTextStyle
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
                        highlightStyle: animationStyle.highlightTextStyle
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

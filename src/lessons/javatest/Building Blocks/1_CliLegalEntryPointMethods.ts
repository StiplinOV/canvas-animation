import {LessonJsonType} from '../../../AnimationsJsonType'
import {animationStyle} from '../../../Animations'

// https://docs.oracle.com/javase/specs/
// https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.1.4
export const CliLegalEntryPointMethods: LessonJsonType = {
    sound: require('./../../Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
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
            startTime: 90000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 0
            },
            startTime: 100000,
            transformDuration: 1000
        }
    ],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 4000,
                    appearDuration: 1000
                }],
                object: {
                    title: 'Which of the following are legal entry point methods that can be run from the command line? (Choose all that apply.)',
                    titleFontSize: 50,
                    origin: {
                        x: 0,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    questionParamsFontSize: 35
                },
                selections: [
                    {
                        time: 40000,
                        duration: 5000,
                        type: {
                            questionnaire: {
                                lines: [3, 4]
                            }
                        }
                    },
                    {
                        time: 45000,
                        duration: 5000,
                        type: {
                            questionnaire: {
                                lines: [3]
                            }
                        }
                    },
                    {
                        time: 102000,
                        duration: 10000,
                        type: {
                            questionnaire: {
                                lines: [3, 4]
                            }
                        }
                    }
                ],
                transformations: [
                    {
                        appearTime: 7000,
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
                            questionParamsPosition: 'down'
                        }
                    },
                    {
                        appearTime: 30000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0]
                        }
                    },
                    {
                        appearTime: 34000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 5]
                        }
                    },
                    {
                        appearTime: 36000,
                        appearDuration: 1000,
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
                    appearTime: 15000,
                    appearDuration: 5000,
                    disappearTime: 22000,
                    disappearDuration: 5000
                }],
                object: {
                    origin: {
                        x: 140, y: 210
                    },
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
                    ],
                    width: 1000,
                    height: 300,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 50000,
                    appearDuration: 5000,
                    disappearTime: 60000,
                    disappearDuration: 5000
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
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\tMethodModifier:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t(one of)\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
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
                            value: 'public protected private\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'normal',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\tabstract static final synchronized native strictfp\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            textStyle: 'normal',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
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
                        x: 10, y: 110
                    },
                    width: 1260,
                    height: 500,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 70000,
                    appearDuration: 5000,
                    disappearTime: 80000,
                    disappearDuration: 5000
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
                        x: 140, y: 285
                    },
                    width: 1000,
                    height: 150,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 90000,
                    appearDuration: 0
                }],
                object: {
                    value: {
                        text: '',
                        language: 'Java',
                        highlightStyle: 'darcula'
                    },
                    origin: {
                        x: 1280, y: 0
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 30,
                    zIndex: 1
                },
                transformations: [
                    {
                        appearTime: 91000,
                        appearDuration: 4000,
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
                                language: 'Java',
                                highlightStyle: 'darcula'
                            }
                        }
                    }
                ],
                selections: [
                    {
                        time: 96000,
                        duration: 1000,
                        substrings: [{
                            from: 40,
                            to: 45
                        }]
                    }
                ]
            }
        ]
    }
}

/*

TODO поправить selections transformations
TODO разобраться с поддержкой внешних иконок

* */
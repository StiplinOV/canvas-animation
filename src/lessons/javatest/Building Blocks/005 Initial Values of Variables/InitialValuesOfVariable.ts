import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const InitialValuesOfVariable: LessonJsonType = {
    sound: require('./без названия 4.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 251000,
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
            startTime: 240000,
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
                                'An instance variable of type float defaults to 0.',
                                'An instance variable of type chart defaults to null.',
                                'A local variable of type double defaults to 0.0.',
                                'A local variable of type int defaults to null.',
                                'A class variable of type String defaults to null.',
                                'A class variable of type String defaults to the empty String "".',
                                'None of the above.',
                            ],
                            questionParamsPosition: 'down',
                            questionParamsLineSpacing: 1.8
                        }
                    },
                    {
                        appearTime: 127000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0]
                        }
                    },
                    {
                        appearTime: 152000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 2]
                        }
                    },
                    {
                        appearTime: 172000,
                        appearDuration: 0,
                        object: {
                            questionParamsStrikethroughOptions: [0, 2, 5, 6]
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
                    appearTime: 49000,
                    appearDuration: 5000,
                    disappearTime: 107000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1320, y: 185
                    },
                    width: 1200,
                    height: 350,
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
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tLocalVariableDeclaration:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
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
                            value: '{',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'VariableModifier',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: '} ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'LocalVariableType',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: ' ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'VariableDeclaratorList',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
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
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tLocalVariableType:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
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
                            value: 'UnannType',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\tvar\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpec'
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
                        appearTime: 64000,
                        appearDuration: 2000,
                        object: {
                            origin: {
                                x: 1320, y: 85
                            },
                            width: 1200,
                            height: 550,
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
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tLocalVariableDeclaration:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
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
                                    value: '{',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'VariableModifier',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: '} ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'LocalVariableType',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: ' ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'VariableDeclaratorList',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
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
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tLocalVariableType:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
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
                                    value: 'UnannType',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\tvar\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '14.4.1. Local Variable Declarators and Types',
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
                                    value: '\t● If the '
                                },
                                {
                                    value: 'LocalVariableType',
                                    textStyle: 'italic'
                                },
                                {
                                    value: ' is var, then let T be the type of the initializer expression when treated '
                                },
                                {
                                    value: 'as if it did not appear in an assignment context,'
                                },
                                'newline',
                                {
                                    value: '\tand were thus a standalone expression...'
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
                        appearTime: 78000,
                        appearDuration: 2000,
                        object: {
                            origin: {
                                x: 1320, y: 10
                            },
                            width: 1200,
                            height: 700,
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
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tLocalVariableDeclaration:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
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
                                    value: '{',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'VariableModifier',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: '} ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'LocalVariableType',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: ' ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'VariableDeclaratorList',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
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
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tLocalVariableType:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
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
                                    value: 'UnannType',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\tvar\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '14.4.1. Local Variable Declarators and Types',
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
                                    value: '\t● If the '
                                },
                                {
                                    value: 'LocalVariableType',
                                    textStyle: 'italic'
                                },
                                {
                                    value: ' is var, then let T be the type of the initializer expression when treated '
                                },
                                {
                                    value: 'as if it did not appear in an assignment context,'
                                },
                                'newline',
                                {
                                    value: '\tand were thus a standalone expression...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '15.3. Type of an Expression',
                                    type: 'paragraphTitle'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tIf an expression denotes a variable or a value, then the expression has a '
                                },
                                {
                                    value: 'type known at compile time. The type of a standalone expression can'
                                },
                                'newline',
                                {
                                    value: '\tbe determined entirely from the contents of the expression; ...'
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
                    appearTime: 119000,
                    appearDuration: 2000,
                    disappearTime: 127000,
                    disappearDuration: 1000
                }],
                object: {
                    value: [
                        {
                            value: '14.4.1. Local Variable Declarators and Types',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tIt is a compile-time error if T is the null type.',
                            textStyle: 'bold'
                        },
                        'newline',
                        'newline',
                        {
                            value: '...'
                        }
                    ],
                    origin: {
                        x: 1605, y: 260
                    },
                    width: 630,
                    height: 200,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 162000,
                    appearDuration: 2000,
                    disappearTime: 171000,
                    disappearDuration: 1000
                }],
                object: {
                    value: [
                        {
                            value: '14.4. Local Variable Declarations',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tIt is a compile-time error if the LocalVariableType is var and any of the following are true.',
                            textStyle: 'bold'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t ● More than one ',
                            textStyle: 'bold'
                        },
                        {
                            value: 'VariableDeclarator',
                            textStyle: 'bolditalic'
                        },
                        {
                            value: ' is listed.',
                            textStyle: 'bold'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t ● The ',
                            textStyle: 'bold'
                        },
                        {
                            value: 'VariableDeclaratorId',
                            textStyle: 'bolditalic'
                        },
                        {
                            value: ' has one or more bracket pairs.',
                            textStyle: 'bold'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t ● The ',
                            textStyle: 'bold'
                        },
                        {
                            value: 'VariableDeclarator',
                            textStyle: 'bolditalic'
                        },
                        {
                            value: ' lacks an initializer.',
                            textStyle: 'bold'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t ● The initializer of the ',
                            textStyle: 'bold'
                        },
                        {
                            value: 'VariableDeclarator',
                            textStyle: 'bolditalic'
                        },
                        {
                            value: ' is an ',
                            textStyle: 'bold'
                        },
                        {
                            value: 'ArrayInitializer.',
                            textStyle: 'bolditalic'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t ● The initializer of the ',
                            textStyle: 'bold'
                        },
                        {
                            value: 'VariableDeclarator',
                            textStyle: 'bolditalic'
                        },
                        {
                            value: ' contains a reference to the variable.',
                            textStyle: 'bold'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\tExample 14.4-1. Local Variables Declared With var',
                            textStyle: 'bold',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\tThe following code illustrates these rules restricting the use of var: ',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\tvar a = 1;            // Legal\t\t\t\t\t\t\t\t\t ',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\tvar b = 2, c = 3.0;   // Illegal: multiple declarators\t\t\t ',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\tvar d[] = new int[4]; // Illegal: extra bracket pairs\t\t\t  ',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\tvar e;                // Illegal: no initializer\t\t\t\t   ',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\tvar f = { 6 };        // Illegal: array initializer\t\t\t\t',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\tvar g = (g = 7);      // Illegal: self reference in initializer\t',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            type: 'codeSpecExample'
                        },
                        {
                            value: '\t',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\tThese restrictions help to avoid confusion about the type being represented by var.',
                            textStyle: 'italic',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        {
                            value: '\t\t\t\t\t\t ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        },
                        'newline',
                        {
                            value: '\t\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ',
                            backgroundTextColor: animationStyle.codeSpecBackgroundColor
                        }
                    ],
                    origin: {
                        x: 1440, y: 5
                    },
                    width: 960,
                    height: 710,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 240000,
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
                    appearTime: 218000,
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

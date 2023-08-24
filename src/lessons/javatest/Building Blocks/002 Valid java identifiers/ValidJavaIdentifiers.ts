import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const ValidJavaIdentifiers: LessonJsonType = {
    sound: require('./без названия1.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 240000,
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
                x: 0,
                y: 720
            },
            startTime: 217000,
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
                    title: 'Which of the following are valid java identifiers? (Choose all that apply.)',
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
                        appearTime: 20000,
                        appearDuration: 2000,
                        object: {
                            questionParamsOptions: [
                                '_',
                                '_helloWorld$',
                                'true',
                                'java.lang',
                                'Public',
                                '1980_s',
                                '_Q2_'
                            ],
                            questionNumberingType: 'letters',
                            questionParamsPosition: 'down',
                            questionParamsLineSpacing: 2
                        }
                    },
                    {
                        appearTime: 101000,
                        appearDuration: 500,
                        object: {
                            questionParamsStrikethroughOptions: [0]
                        }
                    },
                    {
                        appearTime: 115000,
                        appearDuration: 500,
                        object: {
                            questionParamsStrikethroughOptions: [0, 2]
                        }
                    },
                    {
                        appearTime: 202000,
                        appearDuration: 500,
                        object: {
                            questionParamsStrikethroughOptions: [0, 2, 3]
                        }
                    },
                    {
                        appearTime: 209000,
                        appearDuration: 500,
                        object: {
                            questionParamsStrikethroughOptions: [0, 2, 3, 5]
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
                    appearTime: 58000,
                    appearDuration: 5000,
                    disappearTime: 175000,
                    disappearDuration: 1000
                }],
                object: {
                    origin: {
                        x: 1290, y: 110
                    },
                    width: 1260,
                    height: 500,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '3.8. Identifiers',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tAn identifier is an unlimited-length sequence of Java letters and Java digits, the',
                            textStyle: 'italic'
                        },
                        {
                            value: ' first of which must be a Java letter.',
                            textStyle: 'italic'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tIdentifier:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
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
                            value: 'IdentifierChars',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: ' but not a ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'Keyword',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: ' or ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'BooleanLiteral',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: ' or ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'NullLiteral',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: '\t\t\t\t\t\t\t',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tIdentifierChars:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
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
                            value: 'JavaLetter',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: ' {',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        {
                            value: 'JavaLetterOrDigit',
                            textStyle: 'italic',
                            type: 'codeSpecLink'
                        },
                        {
                            value: '}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tJavaLetter:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\tany Unicode character that is a "Java letter"\t\t\t\t\t\t\t\t\t\t\t\t ',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tJavaLetterOrDigit:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\tany Unicode character that is a "Java letter-or-digit"\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpec'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            textStyle: 'italic',
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
                        appearTime: 80000,
                        appearDuration: 0,
                        object: {
                            value: [],
                            width: 0,
                            height: 0,
                            zIndex: -1
                        }
                    },
                    {
                        appearTime: 117000,
                        appearDuration: 0,
                        object: {
                            origin: {
                                x: 1290, y: 10
                            },
                            width: 1260,
                            height: 700,
                            zIndex: 3,
                            value: [
                                {
                                    value: '3.8. Identifiers',
                                    type: 'paragraphTitle'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tAn identifier is an unlimited-length sequence of Java letters and Java digits, the first of which must',
                                    textStyle: 'italic'
                                },
                                'newline',
                                {
                                    value: '\tbe a Java letter.',
                                    textStyle: 'italic'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tIdentifier:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
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
                                    value: 'IdentifierChars',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: ' but not a ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'Keyword',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: ' or ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'BooleanLiteral',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: ' or ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'NullLiteral',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tIdentifierChars:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
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
                                    value: 'JavaLetter',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: ' {',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                {
                                    value: 'JavaLetterOrDigit',
                                    textStyle: 'italic',
                                    type: 'codeSpecLink'
                                },
                                {
                                    value: '}\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tJavaLetter:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t   ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\tany Unicode character that is a "Java letter"\t\t\t\t\t\t\t\t\t\t\t\t ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\tJavaLetterOrDigit:\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\tany Unicode character that is a "Java letter-or-digit"\t\t\t\t\t\t\t\t\t\t',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                {
                                    value: '\t'
                                },
                                {
                                    value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  ',
                                    textStyle: 'italic',
                                    type: 'codeSpec'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tThe "Java letters" include uppercase and lowercase ASCII Latin letters A-Z (\\u0041-\\u005a), and a-z',
                                    textStyle: 'italic'
                                },
                                'newline',
                                {
                                    value: '\t(\\u0061-\\u007a), and, for historical reasons, the ASCII dollar sign ($, or \\u0024) and underscore',
                                    textStyle: 'italic'
                                },
                                'newline',
                                {
                                    value: '\t(_, or \\u005f). The dollar sign should be used only in mechanically generated source code or, rarely,',
                                    textStyle: 'italic'
                                },
                                'newline',
                                {
                                    value: '\tto access pre-existing names on legacy systems. The underscore may be used in identifiers formed of',
                                    textStyle: 'italic'
                                },
                                'newline',
                                {
                                    value: '\ttwo or more characters, but it cannot be used as a one-character identifier due to being a keyword.',
                                    textStyle: 'italic'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tThe "Java digits" include the ASCII digits 0-9 (\\u0030-\\u0039).',
                                    textStyle: 'italic'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '\tLetters and digits may be drawn from the entire Unicode character set, which supports most writing'
                                },
                                'newline',
                                {
                                    value: '\tscripts in use in the world today, including the large sets for Chinese, Japanese, and Korean. This'
                                },
                                'newline',
                                {
                                    value: '\tallows programmers to use identifiers in their programs that are written in their native languages.'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 74000,
                    appearDuration: 2000,
                    disappearTime: 100000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1510, y: 155
                    },
                    width: 820,
                    height: 400,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: '3.9. Keywords',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tabstract   continue   for          new         switch\t\t   ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tassert     default    if           package     synchronized\t ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tboolean    do         goto         private     this\t\t\t ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tbreak      double     implements   protected   throw\t\t\t',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tbyte       else       import       public      throws\t\t   ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tcase       enum       instanceof   return      transient\t\t',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tcatch      extends    int          short       try\t\t\t  ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tchar       final      interface    static      void\t\t\t ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tclass      finally    long         strictfp    volatile\t\t ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\tconst      float      native       super       while\t\t\t',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t_ (underscore)\t\t\t\t\t\t\t\t\t\t\t\t  ',
                            type: 'codeSpecExample'
                        },
                        'newline',
                        {
                            value: '\t'
                        },
                        {
                            value: '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t',
                            textStyle: 'italic',
                            type: 'codeSpecExample'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 80000,
                        appearDuration: 500,
                        object: {
                            width: 0,
                            height: 0,
                            origin: {
                                x: 1300,
                                y: 233
                            },
                            value: [
                                {
                                    value: 'abstract      continue   for\t   ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'new           switch     assert\t',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'default       if         package   ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'synchronized  boolean    do\t\t',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'goto          private    this\t  ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'break         double     implements',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'protected     throw      byte\t  ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'else          import     public\t',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'throws        case       enum\t  ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'instanceof    return     transient ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'catch         extends    int\t   ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'short         try        char\t  ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'final         interface  static\t',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'void          class      finally   ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'long          strictfp   volatile  ',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'const         float      native\t',
                                    type: 'codeSpecExample'
                                },
                                'newline',
                                {
                                    value: 'super         while      _\t\t ',
                                    type: 'codeSpecExample'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 107000,
                    appearDuration: 2000,
                    disappearTime: 113000,
                    disappearDuration: 2000
                }],
                object: {
                    value: [
                        {
                            value: '3.10.3. Boolean Literals',
                            type: 'paragraphTitle'
                        },
                        'newline',
                        'newline',
                        {
                            value: '\tThe boolean type has two values, represented by the boolean literals true and false, formed from ASCII letters.'
                        }
                    ],
                    origin: {
                        x: 1445, y: 285
                    },
                    width: 950,
                    height: 150,
                    fontSize: 18,
                    zIndex: 1
                }
            },
            {
                presenceParameters: [{
                    appearTime: 217000,
                    appearDuration: 6000
                }],
                object: {
                    value: {
                        text: 'Produced by\n\nOleg Stiplin',
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
                    appearTime: 218000,
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

import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'

export const NumberOfRemovedImports: LessonJsonType = {
    sound: require('./без названия 6.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 169000,
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
            startTime: 159000,
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
                    title: 'Given the following two class files, what is the maximum number of imports that can be ' +
                        'removed and have the code still compile?',
                    titleFontSize: 47,
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
                            codeText: `// Water.java
package aquarium;
public class Water { }

// Tank.java
package aquarium;
import java.lang.*;
import java.lang.System;
import aquarium.Water;
import aquarium.*;
public class Tank {
    public void print(Water water) {
    System.out.println(water); } }`,
                            codeFontSize: 25,
                            questionNumberingType: 'letters',
                            questionParamsFont: 'monospace',
                            questionParamsOptions: [
                                '0',
                                '1',
                                '2',
                                '3',
                                '4',
                                'Does not compile'
                            ],
                            questionParamsPosition: 'right',
                            questionParamsLineSpacing: 1.8,
                            questionParamsFontSize: 32
                        }
                    },
                    {
                        appearTime: 48000,
                        appearDuration: 200,
                        object: {
                            questionParamsStrikethroughOptions: [5]
                        }
                    },
                    {
                        appearTime: 99000,
                        appearDuration: 2000,
                        object: {
                            codeLinesNumbered: true,
                            language: 'java'
                        }
                    },
                    {
                        appearTime: 125000,
                        appearDuration: 1000,
                        disappearTime: 127500,
                        disappearDuration: 0,
                        object: {
                            codeSelectedLines: [1, 5]
                        }
                    },
                    {
                        appearTime: 128000,
                        appearDuration: 1000,
                        object: {
                            codeSelectedLines: [8, 9]
                        }
                    },
                    {
                        appearTime: 144000,
                        appearDuration: 1000,
                        object: {
                            codeSelectedLines: [6, 7, 8, 9]
                        }
                    },
                    {
                        appearTime: 155000,
                        appearDuration: 1000,
                        object: {
                            questionParamsStrikethroughOptions: [0, 1, 2, 3, 5]
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
                    appearTime: 55000,
                    appearDuration: 25000,
                    disappearTime: 97000,
                    disappearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1570, y: 185
                    },
                    width: 700,
                    height: 350,
                    fontSize: 18,
                    zIndex: 1,
                    value: [
                        {
                            value: 'Chapter 7. Packages and Modules',
                            type: 'paragraphTitle',
                            textColor: '#000000'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'Programs are organized as sets of packages. The members of a package '
                        },
                        {
                            value: '('
                        },
                        {
                            value: '§7.1',
                            type: 'link'
                        },
                        {
                            value: ')'
                        },
                        'newline',
                        {
                            value: 'are classes and interfaces, which are declared in compilation units of the package,'
                        },
                        'newline',
                        {
                            value: 'and subpackages, which may contain compilation units and subpackages of their'
                        },
                        'newline',
                        {
                            value: 'own.'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 84000,
                        appearDuration: 10000,
                        object: {
                            value: [
                                {
                                    value: 'Chapter 7. Packages and Modules',
                                    type: 'paragraphTitle',
                                    textColor: '#000000'
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'Programs are organized as sets of packages. The members of a package '
                                },
                                {
                                    value: '('
                                },
                                {
                                    value: '§7.1',
                                    type: 'link'
                                },
                                {
                                    value: ')'
                                },
                                'newline',
                                {
                                    value: 'are classes and interfaces, which are declared in compilation units of the package,'
                                },
                                'newline',
                                {
                                    value: 'and subpackages, which may contain compilation units and subpackages of their'
                                },
                                'newline',
                                {
                                    value: 'own.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '...'
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'Code in a compilation unit automatically has access to all classes and interfaces'
                                },
                                'newline',
                                {
                                    value: 'declared in its package and also automatically imports all of the '
                                },
                                {
                                    value: 'public',
                                    font: 'monospace'
                                },
                                {
                                    value: ' classes'
                                },
                                'newline',
                                {
                                    value: 'and interfaces declared in the predefined package '
                                },
                                {
                                    value: 'java.lang',
                                    font: 'monospace'
                                },
                                {
                                    value: '.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '...'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 159000,
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

import {LessonJsonType} from '../../../AnimationsJsonType'

// https://docs.oracle.com/javase/specs/
// https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.1.4
export const CliLegalEntryPointMethods: LessonJsonType = {
    sound: require('./../../Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 4000,
                    appearDuration: 1000,
                    disappearTime: 100000,
                    disappearDuration: 5000
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
                        duration: 1000,
                        type: {
                            questionnaire: {
                                lines: [4]
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
        highlightedText: [{
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
                weight: 10,
                strokeColor: 'primary',
                value: [
                    {
                        value: '12.1.4. Invoke Test.main',
                        textColor: '#FF0000',
                        textStyle: 'bold'
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
                fontSize: 24,
                zIndex: 1
            }
        }]
    }
}

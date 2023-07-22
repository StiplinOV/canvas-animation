import {LessonJsonType} from '../../AnimationsJsonType'

// https://docs.oracle.com/javase/specs/jls/se17/html/jls-12.html#jls-12.1.4
export const Demo: LessonJsonType = {
    sound: require('./../Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
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
                    appearTime: 1000,
                    appearDuration: 1000,
                    disappearTime: 30000,
                    disappearDuration: 5000
                }],
                selections: [
                    {
                        time: 15000,
                        duration: 2000,
                        type: {
                            code: {
                                substrings: [{
                                    from: 30,
                                    to: 50
                                }]
                            }
                        }
                    },
                    {
                        time: 20000,
                        duration: 2000,
                        type: {
                            code: {
                                substrings: [{
                                    from: 60,
                                    to: 70
                                }]
                            }
                        }
                    },
                    {
                        time: 25000,
                        duration: 1000,
                        type: {
                            questionnaire: {
                                lines: [1]
                            }
                        }
                    }],
                transformations: [
                    // {
                    //     appearTime: 5000,
                    //     appearDuration: 1000,
                    //     object: {
                    //         questionParamsOptions: ['', '', '', '', '', ''],
                    //         questionParamsFontSize: 25,
                    //         questionParamsPosition: 'down',
                    //     }
                    // },
                    {
                        appearTime: 7000,
                        appearDuration: 1000,
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
                            questionParamsFontSize: 35
                        }
                    },
                    {
                        appearTime: 10000,
                        appearDuration: 1000,
                        object: {
                            language: 'Java'
                        }
                    }
                ],
                object: {
                    title: 'Which of the following are legal entry point methods that can be run from the command line? (Choose all that apply.)',
                    titleFontSize: 50,
                    origin: {
                        x: 0,
                        y: 0
                    },
                    width: 1280,
                    height: 720
                }
            }
        ]
    }
}

import {LessonJsonType} from '../../../../AnimationsJsonType'
import {animationStyle} from '../../../../Animations'
import javase17docs from './javase17docs.png'
import img_1 from './img_1.png'
import {ElementType} from '../../../../animation/complex/array/ArrayElement'

export const GarbageCollection: LessonJsonType = {
    sound: require('./без названия 9_1.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 459000,
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
                x: 2560,
                y: 0
            },
            startTime: 92000,
            transformDuration: 0
        },
        {
            camera: {
                x: 2560,
                y: 750
            },
            startTime: 94000,
            transformDuration: 500
        },
        {
            camera: {
                x: 3200,
                y: 1110,
                zoom: 2
            },
            startTime: 96000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 2560,
                y: 0,
                zoom: 1
            },
            startTime: 99000,
            transformDuration: 2000
        },
        {
            camera: {
                x: 1280,
                y: 720,
                zoom: 1
            },
            startTime: 105000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 1440,
                zoom: 1
            },
            startTime: 139000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 2160,
                zoom: 1
            },
            startTime: 200000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 2560,
                y: 2160,
                zoom: 1
            },
            startTime: 239000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 1440,
                zoom: 1
            },
            startTime: 271000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 2160,
                zoom: 1
            },
            startTime: 287000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 0,
                zoom: 1
            },
            startTime: 309000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 2160,
                zoom: 1
            },
            startTime: 328000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 0,
                zoom: 1
            },
            startTime: 333000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 720,
                zoom: 1
            },
            startTime: 356000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 0,
                zoom: 1
            },
            startTime: 360000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 1440,
                zoom: 1
            },
            startTime: 370000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 0,
                zoom: 1
            },
            startTime: 384000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 1440,
                zoom: 1
            },
            startTime: 414000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 1280,
                y: 0,
                zoom: 1
            },
            startTime: 419000,
            transformDuration: 1000
        },
        {
            camera: {
                x: 0,
                y: 720
            },
            startTime: 448000,
            transformDuration: 1000
        }
    ],
    animations: {
        ellipse: [
            {
                presenceParameters: [{
                    appearTime: 96000,
                    appearDuration: 500
                }],
                object: {
                    fillColorOpacity: 0,
                    origin: {x: 3460, y: 1390},
                    strokeColor: animationStyle.selectedColor,
                    weight: 'bold',
                    width: 230,
                    height: 50,
                    zIndex: 23
                }
            },
            {
                presenceParameters: [{
                    appearTime: 217000,
                    appearDuration: 500
                }],
                object: {
                    fillColorOpacity: 0,
                    origin: {x: 1450, y: 2275},
                    strokeColor: animationStyle.selectedColor,
                    weight: 'bold',
                    width: 100,
                    height: 100,
                    zIndex: 23
                },
                transformations: [
                    {
                        appearTime: 230000,
                        appearDuration: 500,
                        object: {
                            origin: {x: 1600, y: 2525},
                            width: 400,
                            height: 650
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 235000,
                    appearDuration: 500
                }],
                object: {
                    fillColorOpacity: 0,
                    origin: {x: 2100, y: 2800},
                    strokeColor: animationStyle.selectedColor,
                    weight: 'bold',
                    width: 700,
                    height: 75,
                    zIndex: 23
                }
            }
        ],
        codeQuestionnaire: [
            {
                presenceParameters: [{
                    appearTime: 9000,
                    appearDuration: 0
                }],
                object: {
                    title: 'Which of the following statements about garbage collection are correct? (Choose all that apply.)',
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
                            codeLinesNumbered: true,
                            questionNumberingType: 'letters',
                            questionParamsOptions: [
                                [
                                    'Calling ',
                                    {
                                        value: 'System.gc()',
                                        font: 'monospace'
                                    },
                                    ' is guaranteed to free up memory by destroying objects eligible for garbage collection.'
                                ],
                                'Garbage collection runs on a set schedule.',
                                'Garbage collection allows the JVM to reclaim memory for other objects.',
                                'Garbage collection runs when your program has used up half the available memory.',
                                'An object may be eligible for garbage collection but never removed from the heap.',
                                'An object is eligible for garbage collection once no references to it are accessible in the program.',
                                [
                                    'Making a variable ',
                                    {
                                        value: 'final',
                                        font: 'monospace'
                                    },
                                    ' means its associated object will never be garbage collected.'
                                ]
                            ],
                            questionParamsLineSpacing: 2.5,
                            questionParamsFontSize: 26
                        }
                    },
                    {
                        appearTime: 312000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 333000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 337000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 346000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 348000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 360000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 362000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 386000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 388000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 405000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'success'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 407000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 5,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 418000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 5,
                                    backgroundColor: 'success'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 422000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 5,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 6,
                                    backgroundColor: 'warning'
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 439000,
                        appearDuration: 0,
                        object: {
                            questionnaireSelectedLines: [
                                {
                                    num: 0,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 1,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 2,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 3,
                                    backgroundColor: 'fail'
                                },
                                {
                                    num: 4,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 5,
                                    backgroundColor: 'success'
                                },
                                {
                                    num: 6,
                                    backgroundColor: 'fail'
                                }
                            ]
                        }
                    }
                ]
            }
        ],
        image: [
            {
                presenceParameters: [
                    {
                        appearTime: 0,
                        appearDuration: 0
                    }
                ],
                object: {
                    origin: {x: 2560, y: 0},
                    img: javase17docs
                }
            },
            {
                presenceParameters: [{
                    appearTime: 200000,
                    appearDuration: 0
                }],
                object: {
                    origin: {
                        x: 1280,
                        y: 2160
                    },
                    img: img_1
                }
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
                    appearTime: 107000,
                    appearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1280, y: 720
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 24,
                    zIndex: 10,
                    lineSpacing: 1.5,
                    value: [
                        {
                            value: '1 Introduction to Garbage Collection Tuning',
                            fontSize: 54
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
                            value: 'What Is a Garbage Collector?',
                            fontSize: 36
                        },
                        'newline',
                        'newline',
                        {
                            value: 'The garbage collector (GC) automatically manages the application\'s dynamic memory allocation requests.'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'A garbage collector performs automatic dynamic memory management through the following operations:'
                        },
                        'newline',
                        'newline',
                        {
                            value: '● Allocates from and gives back memory to the operating system.'
                        },
                        'newline',
                        {
                            value: '● Hands out that memory to the application as it requests it.'
                        },
                        'newline',
                        {
                            value: '● Determines which parts of that memory is still in use by the application.'
                        },
                        'newline',
                        {
                            value: '● Reclaims the unused memory for reuse by the application.'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 358000,
                        appearDuration: 1000,
                        object: {
                            value: [
                                {
                                    value: '1 Introduction to Garbage Collection Tuning',
                                    fontSize: 54
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
                                    value: 'What Is a Garbage Collector?',
                                    fontSize: 36
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'The garbage collector (GC) automatically manages the application\'s dynamic memory allocation requests.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'A garbage collector performs automatic dynamic memory management through the following operations:'
                                },
                                'newline',
                                'newline',
                                {
                                    value: '● Allocates from and gives back memory to the operating system.'
                                },
                                'newline',
                                {
                                    value: '● Hands out that memory to the application as it requests it.'
                                },
                                'newline',
                                {
                                    value: '● Determines which parts of that memory is still in use by the application.'
                                },
                                'newline',
                                {
                                    value: '● Reclaims the unused memory for reuse by the application.',
                                    backgroundTextColor: 'success'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 140000,
                    appearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 1280, y: 1440
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 24,
                    zIndex: 10,
                    lineSpacing: 1.5,
                    value: [
                        {
                            value: '3 Garbage Collector Implementation',
                            fontSize: 54
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
                            value: 'Generational Garbage Collection',
                            fontSize: 36
                        },
                        'newline',
                        'newline',
                        {
                            value: 'An object is considered garbage and its memory can be reused by the VM when it can no longer be reached from'
                        },
                        'newline',
                        {
                            value: 'any reference of any other live object in the running program.'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'A theoretical, most straightforward garbage collection algorithm iterates over every reachable object every time it'
                        },
                        'newline',
                        {
                            value: 'runs. Any leftover objects are considered garbage. The time this approach takes is proportional to the number of'
                        },
                        'newline',
                        {
                            value: 'live objects, which is prohibitive for large applications maintaining lots of live data.'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'The Java HotSpot VM incorporates a number of different garbage collection algorithms that all except ZGC use a'
                        },
                        'newline',
                        {
                            value: 'technique called generational collection. While naive garbage collection examines every live object in the heap'
                        },
                        'newline',
                        {
                            value: 'every time, generational collection exploits several empirically observed properties of most applications to minimize'
                        },
                        'newline',
                        {
                            value: 'the work required to reclaim unused (garbage) objects. The most important of these observed properties is the'
                        },
                        'newline',
                        {
                            value: 'weak generational hypothesis, which states that most objects survive for only a short period of time.'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 416000,
                        appearDuration: 0,
                        object: {
                            value: [
                                {
                                    value: '3 Garbage Collector Implementation',
                                    fontSize: 54
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
                                    value: 'Generational Garbage Collection',
                                    fontSize: 36
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'An object is considered garbage and its memory can be reused by the VM when it can no longer be reached from',
                                    backgroundTextColor: 'success'
                                },
                                'newline',
                                {
                                    value: 'any reference of any other live object in the running program.',
                                    backgroundTextColor: 'success'
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'A theoretical, most straightforward garbage collection algorithm iterates over every reachable object every time it'
                                },
                                'newline',
                                {
                                    value: 'runs. Any leftover objects are considered garbage. The time this approach takes is proportional to the number of'
                                },
                                'newline',
                                {
                                    value: 'live objects, which is prohibitive for large applications maintaining lots of live data.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'The Java HotSpot VM incorporates a number of different garbage collection algorithms that all except ZGC use a'
                                },
                                'newline',
                                {
                                    value: 'technique called generational collection. While naive garbage collection examines every live object in the heap'
                                },
                                'newline',
                                {
                                    value: 'every time, generational collection exploits several empirically observed properties of most applications to minimize'
                                },
                                'newline',
                                {
                                    value: 'the work required to reclaim unused (garbage) objects. The most important of these observed properties is the'
                                },
                                'newline',
                                {
                                    value: 'weak generational hypothesis, which states that most objects survive for only a short period of time.'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 272000,
                    appearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 0, y: 1440
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 24,
                    zIndex: 10,
                    lineSpacing: 1.5,
                    value: [
                        {
                            value: '4 Factors Affecting Garbage Collection Performance',
                            fontSize: 50
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
                            value: 'Heap Options Affecting Generation Size',
                            fontSize: 36
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
                            value: 'Some of the parameters are ratios of one part of the heap to another. For example, the parameter '
                        },
                        'newline',
                        {
                            value: '–XX:NewRatio',
                            font: 'monospace'
                        },
                        {
                            value: ' denotes the relative size of the old generation to the young generation.'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 372000,
                        appearDuration: 0,
                        object: {
                            value: [
                                {
                                    value: '4 Factors Affecting Garbage Collection Performance',
                                    fontSize: 50
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
                                    value: 'Heap Options Affecting Generation Size',
                                    fontSize: 36
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
                                    value: 'Some of the parameters are ratios of one part of the heap to another. For example, the parameter '
                                },
                                'newline',
                                {
                                    value: '–XX:NewRatio',
                                    font: 'monospace',
                                    backgroundTextColor: 'success'
                                },
                                {
                                    value: ' denotes the relative size of the old generation to the young generation.'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 289000,
                    appearDuration: 2000
                }],
                object: {
                    origin: {
                        x: 0, y: 2160
                    },
                    width: 1280,
                    height: 720,
                    fontSize: 24,
                    zIndex: 10,
                    lineSpacing: 1.5,
                    value: [
                        {
                            value: '10 Other Considerations',
                            fontSize: 50
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
                            value: 'Explicit Garbage Collection',
                            fontSize: 36
                        },
                        'newline',
                        'newline',
                        {
                            value: 'Another way that applications can interact with garbage collection is by calling full garbage collections explicitly'
                        },
                        'newline',
                        {
                            value: 'by using '
                        },
                        {
                            value: 'System.gc()',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        },
                        'newline',
                        'newline',
                        {
                            value: 'This can force a major collection to be done when it may not be necessary (for example, when a minor collection'
                        },
                        'newline',
                        {
                            value: 'would suffice), and so in general should be avoided. The performance effect of explicit garbage collections can'
                        },
                        'newline',
                        {
                            value: 'be measured by disabling them using the flag '
                        },
                        {
                            value: '-XX:+DisableExplicitGC',
                            font: 'monospace'
                        },
                        {
                            value: ', which causes the VM to ignore calls'
                        },
                        'newline',
                        {
                            value: 'to '
                        },
                        {
                            value: 'System.gc()',
                            font: 'monospace'
                        },
                        {
                            value: '.'
                        }
                    ]
                },
                transformations: [
                    {
                        appearTime: 330000,
                        appearDuration: 500,
                        object: {
                            value: [
                                {
                                    value: '10 Other Considerations',
                                    fontSize: 50
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
                                    value: 'Explicit Garbage Collection',
                                    fontSize: 36
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'Another way that applications can interact with garbage collection is by calling full garbage collections explicitly'
                                },
                                'newline',
                                {
                                    value: 'by using '
                                },
                                {
                                    value: 'System.gc()',
                                    font: 'monospace'
                                },
                                {
                                    value: '.'
                                },
                                'newline',
                                'newline',
                                {
                                    value: 'This can force a major collection to be done when it may not be necessary (for example, when a minor collection'
                                },
                                'newline',
                                {
                                    value: 'would suffice), and so in general should be avoided. The performance effect of explicit garbage collections can'
                                },
                                'newline',
                                {
                                    value: 'be measured by disabling them using the flag '
                                },
                                {
                                    value: '-XX:+DisableExplicitGC',
                                    font: 'monospace',
                                    backgroundTextColor: 'success'
                                },
                                {
                                    value: ', which causes the VM to ignore calls'
                                },
                                'newline',
                                {
                                    value: 'to '
                                },
                                {
                                    value: 'System.gc()',
                                    font: 'monospace'
                                },
                                {
                                    value: '.'
                                }
                            ]
                        }
                    }
                ]
            },
            {
                presenceParameters: [{
                    appearTime: 448000,
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
        ],
        array: [
            {
                presenceParameters: [{
                    appearTime: 240000,
                    appearDuration: 1000
                }],
                object: {
                    origin: {x: 2610, y: 2370},
                    diapasonTitles: [
                        {
                            from: 0,
                            to: 24,
                            title: 'Young'
                        },
                        {
                            from: 25,
                            to: 49,
                            title: 'Old'
                        }
                    ],
                    hideIndices: true,
                    values: [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                        2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                        2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                    ],
                    height: 300,
                    width: 1180,
                    indexTitle: ' ',
                    valueStyle: new Map<number, ElementType>([
                        [
                            0,
                            {
                                style: {
                                    backgroundColor: '#f3b9b9'
                                }
                            }
                        ],
                        [
                            1,
                            {
                                style: {
                                    backgroundColor: '#54a624'
                                }
                            }
                        ],
                        [
                            2,
                            {
                                style: {
                                    backgroundColor: '#ecdd92'
                                }
                            }
                        ],
                        [
                            3,
                            {
                                style: {
                                    backgroundColor: '#ffb200'
                                }
                            }
                        ]
                    ]),
                    elementStyle: {
                        strokeColor: animationStyle.backgroundColor
                    }
                },
                transformations: [
                    {
                        appearTime: 241000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 242000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 243000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 243000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 244000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 245000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
                                1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: 'Minor Collection',
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', null, null, null, null, null,
                                'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'
                            ]
                        }
                    },
                    {
                        appearTime: 246000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: ' ',
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                                'k', 'l', 'm'
                            ]
                        }
                    },
                    {
                        appearTime: 247000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 248000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 249000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 250000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 251000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
                                0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
                                0, 0, 1, 1, 1, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: 'Minor Collection',
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', 'f', 'g', null, 'i', null,
                                null, null, null, null, 'n', 'o', null, null, null, null,
                                null, null, 'p', 'q', 'r'
                            ]
                        }
                    },
                    {
                        appearTime: 252000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: ' ',
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'n', 'o',
                                'p', 'q', 'r'
                            ]
                        }
                    },
                    {
                        appearTime: 253000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 254000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 255000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 256000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 257000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
                                0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
                                0, 0, 1, 1, 1, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: 'Minor Collection',
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', 'f', null, null, null, null,
                                null, null, null, null, 's', null, null, null, null, null,
                                null, null, 't', 'u', 'w'
                            ]
                        }
                    },
                    {
                        appearTime: 258000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: ' ',
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', 'f', 's', 't', 'u', 'w'
                            ]
                        }
                    },
                    {
                        appearTime: 259000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            overrideValueIds: [
                                'a', 'b', 'c', 'd', 'e', null, null, null, null, null,
                                null, null, null, null, null, null, null, null, null, null,
                                null, null, null, null, null, null, null, null, null, null,
                                'f', 's', 't', 'u', 'w'
                            ]
                        }
                    },
                    {
                        appearTime: 260000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 261000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
                                1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
                                0, 0, 1, 0, 0, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 2, 2, 2, 2, 2,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: 'Minor Collection',
                            overrideValueIds: [
                                'a', 'b', 'c', null, 'e', 'x', 'y', 'z', '9', '!',
                                '@', null, '#', '$', null, '%', '^', null, '&', '*',
                                null, null, '1', null, null, '4', '5', '6', '7', '8',
                                'f', 's', 't', 'u', 'w'
                            ]
                        }
                    },
                    {
                        appearTime: 262000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: ' ',
                            overrideValueIds: [
                                'a', 'b', 'c', 'e', 'x', 'y', 'z', '9', '!', '@',
                                '#', '$', null, null, null, null, null, null, null, null,
                                null, null, null, null, null, '4', '5', '6', '7', '8',
                                'f', 's', 't', 'u', 'w', '%', '^', '&', '*', '1'
                            ]
                        }
                    },
                    {
                        appearTime: 263000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                                1, 1, 1, 1, 1, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ]
                        }
                    },
                    {
                        appearTime: 264000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 0, 0, 1, 0, 1, 1, 1,
                                1, 1, 0, 1, 0, 1, 1, 0, 1, 1,
                                0, 0, 0, 0, 1, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: 'Minor Collection',
                            overrideValueIds: [
                                'a', 'b', 'c', null, null, 'y', null, '9', '!', '@',
                                '#', '$', null, '(', null, ')', ':', null, ';', '"',
                                null, null, null, null, '<', '4', '5', '6', '7', '8',
                                'f', 's', 't', 'u', 'w', '%', '^', '&', '*', '1'
                            ]
                        }
                    },
                    {
                        appearTime: 265000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3
                            ],
                            indexTitle: ' ',
                            overrideValueIds: [
                                'a', 'b', 'c', 'y', '9', null, null, null, null, null,
                                null, null, null, null, null, null, null, null, null, null,
                                null, null, null, null, null, '4', '5', '6', '7', '8',
                                'f', 's', 't', 'u', 'w', '%', '^', '&', '*', '1',
                                '!', '@', '#', '$', '(', ')', ':', ';', '"', '<'
                            ]
                        }
                    },
                    {
                        appearTime: 266000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 0, 1, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 2, 3, 2, 3,
                                3, 3, 2, 2, 2, 3, 3, 2, 3, 3,
                                3, 3, 3, 2, 2, 2, 3, 3, 2, 3
                            ],
                            indexTitle: 'Major Collection',
                            overrideValueIds: [
                                'a', 'b', null, 'y', null, null, null, null, null, null,
                                null, null, null, null, null, null, null, null, null, null,
                                null, null, null, null, null, '4', null, '6', null, '8',
                                'f', 's', null, null, null, '%', '^', null, '*', '1',
                                '!', '@', '#', null, null, null, ':', ';', null, '<'
                            ]
                        }
                    },
                    {
                        appearTime: 267000,
                        appearDuration: 500,
                        object: {
                            values: [
                                1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                0, 0, 0, 0, 0, 3, 3, 3, 3, 3,
                                3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
                                2, 2, 2, 2, 2, 2, 2, 2, 2, 2
                            ],
                            indexTitle: ' ',
                            overrideValueIds: [
                                'a', 'b', 'y', null, null, null, null, null, null, null,
                                null, null, null, null, null, null, null, null, null, null,
                                null, null, null, null, null, '4', '6', '8', 'f', 's',
                                '%', '^', '*', '1', '!', '@', '#', ':', ';', '<'
                            ]
                        }
                    },
                    {
                        appearTime: 268000,
                        appearDuration: 500,
                        object: {
                            indexTitle: ' '
                        }
                    }
                ]
            }
        ]
    }
}

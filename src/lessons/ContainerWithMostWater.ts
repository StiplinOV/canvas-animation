import { LessonJsonType } from '../AnimationsJsonType'

export const ContainerWithMostWater: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [{
        startTime: 27000,
        transformDuration: 500,
        camera: {
            x: 100,
            y: 0
        }
    }, {
        startTime: 68000,
        transformDuration: 500,
        camera: {
            x: 0,
            y: 0
        }
    }],
    animations: {
        xyChart: [
            {
                presenceParameters: {
                    appears: [{
                        time: 0,
                        duration: 2000
                    }],
                    disappears: [{
                        time: 70000,
                        duration: 2000
                    }]
                },
                object: {
                    origin: {
                        x: 200,
                        y: 600
                    },
                    width: 900,
                    height: 500,
                    xScale: [
                        {
                            position: 1,
                            value: ''
                        },
                        {
                            position: 2,
                            value: ''
                        },
                        {
                            position: 3,
                            value: ''
                        },
                        {
                            position: 4,
                            value: ''
                        },
                        {
                            position: 5,
                            value: ''
                        },
                        {
                            position: 6,
                            value: ''
                        },
                        {
                            position: 7,
                            value: ''
                        },
                        {
                            position: 8,
                            value: ''
                        },
                        {
                            position: 9,
                            value: ''
                        }
                    ],
                    yScale: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    bars: [
                        {
                            x: 1,
                            y: 1
                        },
                        {
                            x: 2,
                            y: 8
                        },
                        {
                            x: 3,
                            y: 6
                        },
                        {
                            x: 4,
                            y: 2
                        },
                        {
                            x: 5,
                            y: 5
                        },
                        {
                            x: 6,
                            y: 4
                        },
                        {
                            x: 7,
                            y: 8
                        },
                        {
                            x: 8,
                            y: 3
                        },
                        {
                            x: 9,
                            y: 7
                        }
                    ]
                },
                transformations: [
                    {
                        time: 6000,
                        duration: 1000,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1,
                                    type: 'selected'
                                },
                                {
                                    x: 2,
                                    y: 8,
                                    zIndex: -2
                                },
                                {
                                    x: 3,
                                    y: 6,
                                    zIndex: -2
                                },
                                {
                                    x: 4,
                                    y: 2,
                                    type: 'selected'
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ],
                            backgroundSelectedRectangleAreas: [
                                {
                                    cornerPoints: [{
                                        x: 1,
                                        y: 1
                                    }, {
                                        x: 4,
                                        y: 0
                                    }],
                                    color: '#94CDEF'
                                }
                            ]
                        }
                    },
                    {
                        time: 9000,
                        duration: 1000,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8,
                                    type: 'selected'
                                },
                                {
                                    x: 3,
                                    y: 6,
                                    zIndex: -2
                                },
                                {
                                    x: 4,
                                    y: 2,
                                    zIndex: -2
                                },
                                {
                                    x: 5,
                                    y: 5,
                                    zIndex: -2
                                },
                                {
                                    x: 6,
                                    y: 4,
                                    zIndex: -2
                                },
                                {
                                    x: 7,
                                    y: 8,
                                    type: 'selected'
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ],
                            backgroundSelectedRectangleAreas: [
                                {
                                    cornerPoints: [{
                                        x: 2,
                                        y: 8
                                    }, {
                                        x: 7,
                                        y: 0
                                    }],
                                    color: '#94CDEF'
                                }
                            ]
                        }
                    },
                    {
                        time: 11000,
                        duration: 1000,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2,
                                    type: 'selected'
                                },
                                {
                                    x: 5,
                                    y: 5,
                                    zIndex: -2
                                },
                                {
                                    x: 6,
                                    y: 4,
                                    zIndex: -2
                                },
                                {
                                    x: 7,
                                    y: 8,
                                    zIndex: -2
                                },
                                {
                                    x: 8,
                                    y: 3,
                                    type: 'selected'
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ],
                            backgroundSelectedRectangleAreas: [
                                {
                                    cornerPoints: [{
                                        x: 4,
                                        y: 2
                                    }, {
                                        x: 8,
                                        y: 0
                                    }],
                                    color: '#94CDEF'
                                }
                            ]
                        }
                    },
                    {
                        time: 13000,
                        duration: 1000,
                        options: {
                            type: 'sequentially'
                        },
                        object: {
                            chartXRanges: [{
                                coords: [4, 8],
                                value: ''
                            }],
                            chartYRanges: [{
                                coords: [0, 2],
                                value: ''
                            }],
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2,
                                    type: 'selected',
                                    pointer: true
                                },
                                {
                                    x: 5,
                                    y: 5,
                                    zIndex: -2
                                },
                                {
                                    x: 6,
                                    y: 4,
                                    zIndex: -2
                                },
                                {
                                    x: 7,
                                    y: 8,
                                    zIndex: -2
                                },
                                {
                                    x: 8,
                                    y: 3,
                                    type: 'selected'
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ]
                            // backgroundSelectedRectangleAreas: []
                        }
                    },
                    {
                        time: 16000,
                        duration: 500,
                        object: {
                            chartXRanges: [],
                            chartYRanges: [],
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ],
                            backgroundSelectedRectangleAreas: []
                        }
                    },
                    {
                        time: 26000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1,
                                    type: 'selected',
                                    zIndex: 3
                                },
                                {
                                    x: 2,
                                    y: 8
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7,
                                    type: 'selected',
                                    zIndex: 3
                                }
                            ]
                        }
                    },
                    {
                        time: 27000,
                        duration: 500,
                        object: {
                            backgroundSelectedRectangleAreas: [
                                {
                                    cornerPoints: [{
                                        x: 1,
                                        y: 1
                                    }, {
                                        x: 9,
                                        y: 0
                                    }],
                                    color: '#94CDEF',
                                    zIndex: 2
                                }
                            ]
                        }
                    },
                    {
                        time: 28000,
                        duration: 500,
                        object: {
                            chartXRanges: [{
                                coords: [1, 9],
                                value: '8'
                            }],
                            chartYRanges: [{
                                coords: [0, 1],
                                value: '1'
                            }]
                        }
                    },
                    {
                        time: 29500,
                        duration: 500,
                        object: {
                            chartXRanges: [],
                            chartYRanges: []
                        }
                    },
                    {
                        time: 32000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1,
                                    type: 'selected',
                                    zIndex: 3,
                                    pointer: true
                                },
                                {
                                    x: 2,
                                    y: 8
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7,
                                    type: 'selected',
                                    zIndex: 3
                                }
                            ]
                        }
                    },
                    {
                        time: 42000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8,
                                    type: 'selected',
                                    zIndex: 3
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7,
                                    type: 'selected',
                                    zIndex: 3
                                }
                            ],
                            backgroundSelectedRectangleAreas: [
                                {
                                    cornerPoints: [{
                                        x: 2,
                                        y: 7
                                    }, {
                                        x: 9,
                                        y: 0
                                    }],
                                    color: '#94CDEF',
                                    zIndex: 2
                                }
                            ]
                        }
                    },
                    {
                        time: 44000,
                        duration: 500,
                        object: {
                            chartXRanges: [{
                                coords: [2, 9],
                                value: '7'
                            }],
                            chartYRanges: [{
                                coords: [0, 7],
                                value: '7'
                            }]
                        }
                    },
                    {
                        time: 47000,
                        duration: 500,
                        object: {
                            chartXRanges: [],
                            chartYRanges: []
                        }
                    },
                    {
                        time: 48000,
                        duration: 500,
                        object: {
                            backgroundSelectedRectangleAreas: []
                        }
                    },
                    {
                        time: 49000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8,
                                    type: 'selected',
                                    zIndex: 3
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7,
                                    type: 'selected',
                                    pointer: true,
                                    zIndex: 3
                                }
                            ]
                        }
                    },
                    {
                        time: 52000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8,
                                    type: 'selected',
                                    zIndex: 3
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8,
                                    type: 'selected',
                                    pointer: true,
                                    zIndex: 3
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ]
                        }
                    },
                    {
                        time: 55000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8,
                                    type: 'selected',
                                    zIndex: 3
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8,
                                    type: 'selected',
                                    zIndex: 3
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ],
                            chartXRanges: [{
                                coords: [2, 7],
                                value: '5'
                            }],
                            chartYRanges: [{
                                coords: [0, 8],
                                value: '8'
                            }],
                            backgroundSelectedRectangleAreas: [
                                {
                                    cornerPoints: [{
                                        x: 2,
                                        y: 8
                                    }, {
                                        x: 7,
                                        y: 0
                                    }],
                                    color: '#94CDEF',
                                    zIndex: 2
                                }
                            ]
                        }
                    },
                    {
                        time: 60000,
                        duration: 500,
                        object: {
                            chartXRanges: [],
                            chartYRanges: [],
                            backgroundSelectedRectangleAreas: []
                        }
                    },
                    {
                        time: 68000,
                        duration: 500,
                        object: {
                            bars: [
                                {
                                    x: 1,
                                    y: 1
                                },
                                {
                                    x: 2,
                                    y: 8
                                },
                                {
                                    x: 3,
                                    y: 6
                                },
                                {
                                    x: 4,
                                    y: 2
                                },
                                {
                                    x: 5,
                                    y: 5
                                },
                                {
                                    x: 6,
                                    y: 4
                                },
                                {
                                    x: 7,
                                    y: 8
                                },
                                {
                                    x: 8,
                                    y: 3
                                },
                                {
                                    x: 9,
                                    y: 7
                                }
                            ]
                        }
                    }
                ],
                selections: [{
                    time: 17000,
                    duration: 10000,
                    type: {
                        bars: 'allPairsInSequence'
                    }
                }, {
                    time: 34000,
                    duration: 500,
                    type: {
                        bars: [1]
                    }
                }, {
                    time: 39000,
                    duration: 500,
                    type: {
                        bars: [6]
                    }
                }, {
                    time: 65000,
                    duration: 500,
                    type: {
                        bars: [2, 5]
                    }
                }, {
                    time: 66000,
                    duration: 500,
                    type: {
                        bars: [3, 4]
                    }
                }]
            }
        ],
        text: [{
            presenceParameters: {
                appears: [{
                    time: 29000,
                    duration: 500
                }],
                disappears: [{
                    time: 70000,
                    duration: 500
                }]
            },
            object: {
                fontSize: 28,
                origin: {
                    x: 1200,
                    y: 200
                },
                value: '1 x 8 = 8',
                font: 'Courier New'
            },
            transformations: [{
                time: 30000,
                duration: 500,
                object: {
                    value: '1 x 8 = 8\n---------\nmax = 8'
                }
            }, {
                time: 46000,
                duration: 500,
                object: {
                    value: '1 x 8 = 8\n7 x 7 = 49'
                }
            }, {
                time: 47000,
                duration: 500,
                object: {
                    value: '1 x 8 = 8\n7 x 7 = 49\n----------\nmax = 49'
                }
            }, {
                time: 58000,
                duration: 500,
                object: {
                    value: '1 x 8 = 8\n7 x 7 = 49\n5 x 8 = 40\n----------\nmax = 49'
                }
            }, {
                time: 68000,
                duration: 500,
                object: {
                    origin: {
                        x: 570,
                        y: 650
                    },
                    value: 'max = 49'
                }
            }]
        }],
        highlightedText: [
            {
                presenceParameters: {
                    appears: [{
                        time: 73000,
                        duration: 10000
                    }]
                },
                object: {
                    origin: {
                        x: 200,
                        y: 50
                    },
                    fontSize: 22,
                    value: {
                        language: 'Java',
                        text: 'public int maxArea(int[] height) {\n' +
                                '    int result = 0;\n' +
                            '    int leftPointer = 0;\n' +
                            '    int rightPointer = height.length - 1;\n' +
                            '    int min = 0;\n' +
                            '    while (leftPointer < rightPointer) {\n' +
                            '        int leftHeight = height[leftPointer];\n' +
                            '        int rightHeight = height[rightPointer];\n' +
                            '        while (leftHeight <= min && leftPointer < rightPointer) {\n' +
                            '            leftPointer++;\n' +
                            '            leftHeight = height[leftPointer];\n' +
                            '        }\n' +
                            '        while (rightHeight <= min && leftPointer < rightPointer) {\n' +
                            '            rightPointer--;\n' +
                            '            rightHeight = height[rightPointer];\n' +
                            '        }\n' +
                            '        min = Math.min(leftHeight, rightHeight);\n' +
                            '        int area = min * (rightPointer - leftPointer);\n' +
                            '        if (area > result) {\n' +
                            '            result = area;\n' +
                            '        }\n' +
                            '    }\n' +
                            '    return result;\n' +
                            '}'
                    }
                }
            }
        ]
    }
}

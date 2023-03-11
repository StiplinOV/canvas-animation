import { LessonJsonType } from '../AnimationsJsonType'

export const ContainerWithMostWater: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        xyChart: [
            {
                object: {
                    origin: {
                        x: 200,
                        y: 600
                    },
                    width: 900,
                    height: 500,
                    xScale: [
                        {
                            position: 0,
                            value: ''
                        },
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
                    ],
                    barColor: '#000000'
                },
                transformations: [
                    {
                        time: 10000,
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
                                    selected: true
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
                                    selected: true
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
                                    color: '#94CDEF'
                                }
                            ]
                        }
                    }
                ],
                selections: [{
                    time: 5000,
                    duration: 4000,
                    selector: {
                        bars: 'all'
                    },
                    type: 'sequentially'
                }],
                presenceParameters: {
                    appearTime: 0,
                    appearDuration: 4000
                }
            }
        ]
    }
}

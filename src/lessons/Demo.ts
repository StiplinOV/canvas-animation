import { LessonJsonType } from '../AnimationsJsonType'

export const Demo: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        numberLine: [{
            presenceParameters: {
                appears: [{
                    time: 0,
                    duration: 3000
                }]
            },
            object: {
                origin: {
                    x: 100,
                    y: 500
                },
                width: 1000,
                scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
                fontSize: 15,
                ranges: [
                    {
                        coords: [1, 3],
                        layer: 0
                    },
                    {
                        coords: [1, 4],
                        layer: 1
                    },
                    {
                        coords: [2, 6],
                        layer: 2
                    },
                    {
                        coords: [4, 5],
                        layer: 0
                    },
                    {
                        coords: [8, 10],
                        layer: 0
                    },
                    {
                        coords: [15, 18],
                        layer: 0
                    }
                ]
            },
            transformations: [
                {
                    time: 4000,
                    duration: 500,
                    object: {
                        ranges: [
                            {
                                coords: [1, 4],
                                layer: 0
                            },
                            {
                                coords: [2, 6],
                                layer: 2
                            },
                            {
                                coords: [4, 5],
                                layer: 0
                            },
                            {
                                coords: [8, 10],
                                layer: 0
                            },
                            {
                                coords: [15, 18],
                                layer: 0
                            }
                        ]
                    }
                },
                {
                    time: 6000,
                    duration: 500,
                    object: {
                        ranges: [
                            {
                                coords: [1, 5],
                                layer: 0
                            },
                            {
                                coords: [2, 6],
                                layer: 2
                            },
                            {
                                coords: [8, 10],
                                layer: 0
                            },
                            {
                                coords: [15, 18],
                                layer: 0
                            }
                        ]
                    }
                },
                {
                    time: 8000,
                    duration: 500,
                    object: {
                        ranges: [
                            {
                                coords: [1, 6],
                                layer: 0
                            },
                            {
                                coords: [8, 10],
                                layer: 0
                            },
                            {
                                coords: [15, 18],
                                layer: 0
                            }
                        ]
                    }
                }
            ]
        }]
    }
}

import {LessonJsonType} from '../AnimationsJsonType'

export const NumberOfIslands: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        matrix: [{
            presenceParameters: [{appearTime: 0, appearDuration: 1000}],
            selections: [
                {
                    time: 2000,
                    duration: 1000,
                    type: {
                        elements: [
                            {
                                x: 0,
                                y: 0
                            },
                            {
                                x: 1,
                                y: 0
                            },
                            {
                                x: 0,
                                y: 1
                            },
                            {
                                x: 1,
                                y: 1
                            }
                        ]
                    }
                }
            ],
            object: {
                origin: {
                    x: 315,
                    y: 10
                },
                title: 'Number of Islands',
                values: [
                    [1, 1, 0, 0, 0],
                    [1, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 1]
                ],
                valueStyle: new Map([
                    [
                        0,
                        {
                            value: '0',
                            style: {
                                fontColor: '#FFFFFF',
                                backgroundColor: '#419ad9'
                            }
                        }
                    ],
                    [
                        1,
                        {
                            value: '1',
                            style: {
                                fontColor: '#000000',
                                backgroundColor: '#ead35a'
                            }
                        }
                    ]
                ]),
                height: 650
            }
        }]
    }
}

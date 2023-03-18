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
        graphDataStructure: [
            {
                presenceParameters: {
                   appearDuration: 1000,
                },
                object: {
                    origin: {
                        x: 100,
                        y: 100
                    },
                    edgeStyle: {
                        targetType: 'Arrow'
                    },
                    transpose: true,
                    vertices: [
                        { id: "1", label: "1" },
                        { id: "3", label: "3" },
                        { id: "4", label: "4" },
                        { id: "5", label: "5" },
                        { id: "6", label: "6" },
                        { id: "7", label: "7" },
                        { id: "8", label: "8" },
                        { id: "9", label: "9" },
                        { id: "10", label: "10" }
                    ],
                    edges: [
                        { sourceId: "1", targetId: "3"},
                        { sourceId: "3", targetId: "4"},
                        { sourceId: "4", targetId: "5"},
                        { sourceId: "6", targetId: "7"},
                        { sourceId: "7", targetId: "8"},
                        { sourceId: "8", targetId: "9"},
                        { sourceId: "9", targetId: "10"},
                    ]
                },
                transformations: [{
                    time: 2000,
                    duration: 1000,
                    object: {
                        vertices: [
                            { id: "1", label: "1" },
                            { id: "2", label: "2" },
                            { id: "3", label: "3" },
                            { id: "4", label: "4" },
                            { id: "5", label: "5" },
                            { id: "6", label: "6" },
                            { id: "7", label: "7" },
                            { id: "8", label: "8" },
                            { id: "9", label: "9" },
                            { id: "10", label: "10" }
                        ],
                        edges: [
                            { sourceId: "1", targetId: "2"},
                            { sourceId: "2", targetId: "3"},
                            { sourceId: "3", targetId: "4"},
                            { sourceId: "4", targetId: "5"},
                            { sourceId: "6", targetId: "7"},
                            { sourceId: "7", targetId: "8"},
                            { sourceId: "8", targetId: "9"},
                            { sourceId: "9", targetId: "10"},
                        ]
                    }
                }]
            }
        ],
        matrix: [{
            presenceParameters: {
                appearTime: 200000,
                appearDuration: 1000
            },
            selections: [
                {
                    time: 2000,
                    duration: 1000,
                    selector: {
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
                            },
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
                    [0, 0, 0, 1, 1],
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

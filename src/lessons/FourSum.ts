import { LessonJsonType } from '../AnimationsJsonType'

export const FourSum: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        array: [{
            presenceParameters: {
                appears: [{
                    time: 0,
                    duration: 1000,
                }]
            },
            object: {
                origin: {
                    x: 50,
                    y: 200
                },
                height: 150,
                width: 1180,
                hideIndices: true,
                values: [2, 2, 3, 4, -2, -5, 7, 7, 7, 7],
            },
            selections: [
                {
                    time: 3000,
                    duration: 500,
                    type: {
                        values: [4, 5, 6, 7]
                    }
                },
                {
                    time: 5000,
                    duration: 500,
                    type: {
                        values: [1, 2, 5, 6]
                    }
                },
                {
                    time: 7000,
                    duration: 500,
                    type: {
                        values: [0, 2, 3, 4]
                    }
                }
            ]
        }],
        //TODO в текст добавить подсвечение позиции
        highlightedText: [
            {
                presenceParameters: {
                    appears: [{
                        time: 11000,
                        duration: 500,
                    }],
                },
                object: {
                    origin: {
                        x: 50,
                        y: 400
                    },
                    fontSize: 48,
                    value: [
                        {
                            value: 'Restrictions:',
                            textStyle: 'normal',
                        },
                        'newline',
                        {
                            value: '1 <= nums.length <= 200\n',
                            textStyle: 'normal',
                        },
                        'newline',
                        {
                            value: '-10^9 <= nums[i] <= 10^9\n',
                            textStyle: 'normal',
                        },
                        'newline',
                        {
                            value: '-10^9 <= target <= 10^9',
                            textStyle: 'normal',
                        }
                    ]
                },
                transformations: [],
                selections: [{
                    time: 14000,
                    duration: 1000,
                    segmentIndex: 4
                }]
            }
        ],
        text: [
            {
                presenceParameters: {
                    appears: [{
                        time: 2000,
                        duration: 500,
                    }],
                    disappears: [{
                        time: 10000,
                        duration: 1000,
                    }]
                },
                object: {
                    origin: {
                        x: 50,
                        y: 400
                    },
                    fontSize: 64,
                    boxWidth: 1180,
                    horizontalAlign: 'center',
                    value: 'Target sum = 7'
                },
                selections: [
                    {
                        time: 3000,
                        duration: 2000
                    }
                ]

            },
            {
                presenceParameters: {
                    appears: [{
                        time: 4000,
                        duration: 500,
                    }],
                    disappears: [{
                        time: 10000,
                        duration: 1000,
                    }]
                },
                object: {
                    origin: {
                        x: 150,
                        y: 500
                    },
                    fontSize: 32,
                    boxWidth: 1180,
                    horizontalAlign: 'left',
                    value: '-2 + -5 +  7 +  7 = 7'
                },
                transformations: [{
                    time: 6000,
                    duration: 500,
                    object: {
                        value: '-2 + -5 +  7 +  7 = 7\n 2 +  3 + -5 +  7 = 7'
                    }
                }, {
                    time: 8000,
                    duration: 500,
                    object: {
                        value: '-2 + -5 +  7 +  7 = 7\n 2 +  3 + -5 +  7 = 7\n 2 +  3 +  4 + -2 = 7'
                    }
                }]
            },
            // {
            //     presenceParameters: {
            //         appears: [{
            //             time: 11000,
            //             duration: 500,
            //         }],
            //     },
            //     object: {
            //         origin: {
            //             x: 50,
            //             y: 550
            //         },
            //         fontSize: 48,
            //         value: "Restrictions\n1 <= nums.length <= 200\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9"
            //     },
            //     transformations: [{
            //         time: 12000,
            //         duration: 1000,
            //         object: {
            //             value: "Restrictions\n1 <= nums.length <= 200\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9"
            //         }
            //     }],
            //     selections: [{
            //         time: 13000,
            //         duration: 2000,
            //         position: [39, 63]
            //     }]
            // }
        ]
    }
}

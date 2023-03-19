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
        array: [
            // {
            //     presenceParameters: {
            //         appearDuration: 1000
            //     },
            //     object: {
            //         origin: {
            //             x: 100,
            //             y: 100
            //         },
            //         value: ['50', '32', '14', '14', '33', '33'],
            //         height: 200,
            //         title: 'Title',
            //         indexTitle: 'Index title'
            //     }
            // },
            {
                presenceParameters: {
                    appears: [{
                        time: 0,
                        duration: 1000
                    }]
                },
                object: {
                    origin: {
                        x: 100,
                        y: 400
                    },
                    value: ['50', '32', '14', '14', '33', '33'],
                    height: 200,
                    hideIndices: true,
                    title: 'Title',
                    indexTitle: 'Index title'
                },
                transformations: [
                    {
                        time: 3000,
                        duration: 500,
                        object: {
                            value: ['50', '32', '14', '14', '33'],
                        }
                    },
                    {
                        time: 4000,
                        duration: 500,
                        object: {
                            value: ['33', '50', '32', '14', '14', '33'],
                        }
                    }
                ]
            }
        ]
    }
}

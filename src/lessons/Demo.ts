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
                values: [1, 2, 3, 4, 5, 6],
            },
            selections: [
                {
                    time: 2000,
                    duration: 6000,
                    type: {
                        allNElementsInSequence: 4
                    }
                }
            ]
        }],
    }
}

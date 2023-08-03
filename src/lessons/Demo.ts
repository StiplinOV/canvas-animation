import {LessonJsonType} from '../AnimationsJsonType'
import imgg from './94132137-7d4fc100-fe7c-11ea-8512-69f90cb65e48.gif'

export const Demo: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        image: [
            {
                presenceParameters: [{
                    appearTime: 0,
                    appearDuration: 1000,
                    disappearTime: 20000,
                    disappearDuration: 5000
                }],
                object: {
                    img: imgg,
                    origin: {
                        x: 200,
                        y: 200
                    }
                },
                transformations: [{
                    appearTime: 4000,
                    appearDuration: 500,
                    object: {
                        origin: {
                            x: 0,
                            y: 0
                        }
                    }
                }, {
                    appearTime: 5000,
                    appearDuration: 500,
                    object: {
                        origin: {
                            x: 600,
                            y: 600
                        }
                    }
                }]
            }
        ]
    }
}

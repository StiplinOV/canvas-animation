import { LessonJsonType } from '../AnimationsJsonType'

const e = (): any => {
    const a = [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 1],
        [2, 6],
        [3, 6],
        [4, 6],
        [5, 6],
        [6, 7],
        [6, 8],
        [6, 9]
    ]
    for (let i = 1; i < 9; i++) {
        a.push([i, i])
    }
    return a.map(v => ({
        sourceId: `${v[0]}`,
        label: v[0] === v[1] ? 'label' : 'other',
        targetId: `${v[1]}`
    }))
}

export const Demo: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [{
        startTime: 1,
        camera: {
            x: 0,
            y: 50,
            zoom: 0.8
        }
    }],
    animations: {
        graphDataStructure: [{
            presenceParameters: {
                appearDuration: 0
            },
            object: {
                origin: {
                    x: 90,
                    y: 100
                },
                edgeStyle: {
                    sourceType: 'Arrow',
                    targetType: 'Arrow'
                },
                vertices: [
                    {
                        id: '1',
                        label: '1'
                    },
                    {
                        id: '2',
                        label: '2'
                    },
                    {
                        id: '3',
                        label: '3'
                    },
                    {
                        id: '4',
                        label: '4',
                        style: {
                            diameter: 100
                        }
                    },
                    {
                        id: '5',
                        label: '5'
                    },
                    {
                        id: '6',
                        label: '6'
                    },
                    {
                        id: '7',
                        label: '7'
                    },
                    {
                        id: '8',
                        label: '8'
                    },
                    {
                        id: '9',
                        label: '9'
                    }
                ],
                edges: []
            },
            transformations: [
                {
                    options: {
                        type: 'sequentially'
                    },
                    time: 0,
                    duration: 2000,
                    object: {
                        edges: e()
                    }
                }
            ]
        }]
    }
}

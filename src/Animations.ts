import p5Types from 'p5'
// import XYChartCanvasAnimationParams from './animation/complex/xychart/XYChartCanvasAnimationParams'
// import TextCanvasAnimationParams from './animation/simple/text/TextCanvasAnimationParams'
import CanvasAnimationParams from './animation/CanvasAnimationParams'
import TableCanvasAnimationParams from './animation/complex/table/TableCanvasAnimationParams'
// import CircleCanvasAnimationParams from './animation/simple/circle/CircleCanvasAnimationParams'
// import EllipseCanvasAnimationParams from './animation/simple/ellipse/EllipseCanvasAnimationParams'
// import ArrayCanvasAnimationParams from './animation/complex/array/ArrayCanvasAnimationParams'

export const canvasWidth = 1280
export const canvasHeight = 800
export const timeDivider = 1000000
export const timeMultiplier = 4
export const startTime = 40000

export const canvasAnimations: (p5: p5Types) => CanvasAnimationParams[] = (p5) => [
    // new TextCanvasAnimationParams({
    //     object: {
    //         value: 'Best Time to Buy and Sell Stock',
    //         origin: {x: 640, y: 400},
    //         horizontalAlign: 'center',
    //         verticalAlign: 'center',
    //         fontSize: 65
    //     },
    //     presenceParameters: {
    //         appearDuration: 2000
    //     }
    // }),
    // new ArrayCanvasAnimationParams({
    //     object: {
    //         origin: {x: 240, y: 600},
    //         value: ['7', '1', '5', '3', '6', '4'],
    //         height: 300,
    //         width: 800,
    //         title: 'Array of stock prices',
    //         indexTitle: 'Number of day',
    //         firstIndex: 1
    //     },
    //     presenceParameters: {
    //         appearTime: 5000,
    //         appearDuration: 4000,
    //         disappearTime: 35000,
    //         disappearDuration: 4000
    //     }
    // }, p5),
    // new XYChartCanvasAnimationParams({
    //     object: {
    //         origin: {x: 240, y: 1250},
    //         width: 800,
    //         height: 400,
    //         yAxisName: 'Price',
    //         xAxisName: 'Number of day',
    //         xScale: [0, 1, 2, 3, 4, 5, 6],
    //         yScale: [0, 1, 2, 3, 4, 5, 6, 7],
    //         chartPoints: [
    //             {x: 1, y: 7},
    //             {x: 2, y: 1},
    //             {x: 3, y: 5},
    //             {x: 4, y: 3},
    //             {x: 5, y: 6},
    //             {x: 6, y: 4}
    //         ],
    //         chartLines: [
    //             [{x: 1, y: 7}, {x: 2, y: 1}],
    //             [{x: 2, y: 1}, {x: 3, y: 5}],
    //             [{x: 3, y: 5}, {x: 4, y: 3}],
    //             [{x: 4, y: 3}, {x: 5, y: 6}],
    //             [{x: 5, y: 6}, {x: 6, y: 4}]
    //         ]
    //     },
    //     presenceParameters: {
    //         appearTime: 10000,
    //         appearDuration: 4000
    //     },
    //     selections: [
    //         {time: 15000, duration: 5000, type: 'sequentially', selector: {points: 'all'}},
    //         {time: 23000, duration: 500, selector: {points: [1]}},
    //         {time: 25000, duration: 500, selector: {points: [4]}},
    //         {time: 60000, duration: 500, selector: {points: [0]}},
    //         {time: 65000, duration: 500, selector: {yScaleValues: [7]}},
    //         {time: 87000, duration: 500, selector: {points: [1]}},
    //         {time: 92000, duration: 500, selector: {yScaleValues: [1]}}
    //     ],
    //     transformations: [
    //         {
    //             presenceParameters: {
    //                 appearTime: 21000,
    //                 appearDuration: 500
    //             },
    //             object: {
    //                 chartPoints: [
    //                     {x: 1, y: 7},
    //                     {point: {x: 2, y: 1}, text: 'Buy'},
    //                     {x: 3, y: 5},
    //                     {x: 4, y: 3},
    //                     {x: 5, y: 6},
    //                     {x: 6, y: 4}
    //                 ]
    //             }
    //         },
    //         {
    //             presenceParameters: {
    //                 appearTime: 22000,
    //                 appearDuration: 1000
    //             },
    //             object: {
    //                 chartPoints: [
    //                     {x: 1, y: 7},
    //                     {point: {x: 2, y: 1}, text: 'Buy'},
    //                     {x: 3, y: 5},
    //                     {x: 4, y: 3},
    //                     {point: {x: 5, y: 6}, text: 'Sell'},
    //                     {x: 6, y: 4}
    //                 ]
    //             }
    //         },
    //         {
    //             presenceParameters: {
    //                 appearTime: 27000,
    //                 appearDuration: 2000
    //             },
    //             object: {chartYRanges: [{yCoords: [1, 6], value: 'Profit is 5'}]}
    //         },
    //         {
    //             presenceParameters: {
    //                 appearTime: 35000,
    //                 appearDuration: 2000
    //             },
    //             object: {chartYRanges: []}
    //         },
    //         {
    //             presenceParameters: {
    //                 appearTime: 44000,
    //                 appearDuration: 2000
    //             },
    //             object: {
    //                 width: 1200
    //             }
    //         }
    //     ]
    // }, p5),
    // new TextCanvasAnimationParams({
    //     presenceParameters: {
    //         appearTime: 30000,
    //         appearDuration: 500,
    //         disappearTime: 35000,
    //         disappearDuration: 500
    //     },
    //     object: {
    //         origin: {x: 1050, y: 850},
    //         value: 'fee = 2',
    //         fontSize: 35
    //     }
    // }),
    // new TextCanvasAnimationParams({
    //     presenceParameters: {
    //         appearTime: 32000,
    //         appearDuration: 500,
    //         disappearTime: 35000,
    //         disappearDuration: 500
    //
    //     },
    //     object: {
    //         origin: {x: 1050, y: 900},
    //         value: 'cool down = 1',
    //         fontSize: 35
    //     }
    // }),
    // new TextCanvasAnimationParams({
    //     presenceParameters: {
    //         appearTime: 35000,
    //         appearDuration: 1000,
    //         disappearTime: 46000,
    //         disappearDuration: 1000
    //     },
    //     object: {
    //         verticalAlign: 'top',
    //         origin: {x: 1150, y: 950},
    //         value: '1) Buy',
    //         fontSize: 35
    //     },
    //     transformations: [{
    //         presenceParameters: {
    //             appearTime: 37000,
    //             appearDuration: 1000
    //         },
    //         object: {
    //             value: '1) Buy\n2) Sell'
    //         }
    //     }, {
    //         presenceParameters: {
    //             appearTime: 39000,
    //             appearDuration: 1000
    //         },
    //         object: {
    //             value: '1) Buy\n2) Sell\n3) Wait'
    //         }
    //     }, {
    //         presenceParameters: {
    //             appearTime: 41000,
    //             appearDuration: 1000
    //         },
    //         object: {
    //             value: '1) Buy\n2) Sell\n3) Wait\n4) Hold'
    //         }
    //     }]
    // }),
    new TableCanvasAnimationParams({
        presenceParameters: {
            appearTime: 44000,
            appearDuration: 2000
        },
        object: {
            origin: {x: 240, y: 1350},
            width: 1114.28,
            height: 300,
            fontSize: 30,
            verticalTitles: true,
            horizontalTitles: true,
            columnWidthProportions: [0.5, 1, 1, 1, 1, 1, 1],
            values: [
                ['', '1', '2', '3', '4', '5', '6'],
                ['Buy', '', '', '', '', '', ''],
                ['Sell', '', '', '', '', '', ''],
                ['Wait', '', '', '', '', '', ''],
                ['Hold', '', '', '', '', '', '']
            ]
        },
        selections: [
            {
                time: 50000,
                duration: 500,
                selector: {
                    rowTitles: 'all'
                }
            },
            {
                time: 55000,
                duration: 500,
                selector: {
                    colTitles: 'all'
                }
            },
            {
                time: 60000,
                duration: 500,
                selector: {
                    colTitles: [1]
                }
            },
            {
                time: 87000,
                duration: 500,
                selector: {
                    colTitles: [2]
                }
            },
            {
                time: 95000,
                duration: 500,
                selector: {
                    colTitles: [1],
                    rowTitles: [2],
                    values: [[2, 1]]
                }
            },
            {
                time: 99000,
                duration: 500,
                selector: {
                    colTitles: [1],
                    rowTitles: [3],
                    values: [[3, 1]]
                }
            }
        ],
        transformations: [
            {
                presenceParameters: {
                    appearTime: 65000,
                    appearDuration: 500
                },
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6'],
                        ['Buy', '-7', '', '', '', '', ''],
                        ['Sell', '', '', '', '', '', ''],
                        ['Wait', '', '', '', '', '', ''],
                        ['Hold', '', '', '', '', '', '']
                    ]
                }
            },
            {
                presenceParameters: {
                    appearTime: 68000,
                    appearDuration: 500
                },
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6'],
                        ['Buy', '-7', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', ''],
                        ['Wait', '', '', '', '', '', ''],
                        ['Hold', '', '', '', '', '', '']
                    ]
                }
            },
            {
                presenceParameters: {
                    appearTime: 71000,
                    appearDuration: 500
                },
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6'],
                        ['Buy', '-7', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', ''],
                        ['Hold', '', '', '', '', '', '']
                    ]
                }
            },
            {
                presenceParameters: {
                    appearTime: 74000,
                    appearDuration: 500
                },
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6'],
                        ['Buy', '-7', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', '']
                    ]
                }
            },
            {
                presenceParameters: {
                    appearTime: 77000,
                    appearDuration: 3500
                },
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6'],
                        ['Buy', '-7', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', ''],
                        ['Max', '', '', '', '', '', '']
                    ],
                    height: 360,
                    boldHorizontalLines: [4],
                    boldVerticalLines: [[5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6]]
                }
            },
            {
                presenceParameters: {
                    appearTime: 83000,
                    appearDuration: 500
                },
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6'],
                        ['Buy', '-7', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '']
                    ]
                }
            },
            {
                presenceParameters: {
                    appearTime: 85000,
                    appearDuration: 500
                },
                object: {
                    markedCells: [[2, 1], [3, 1]]
                }
            }
        ]
    }, p5)
]

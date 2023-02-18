import p5Types from 'p5'
import XYChartCanvasAnimationParams from './animation/complex/xychart/XYChartCanvasAnimationParams'
import TextCanvasAnimationParams from './animation/simple/text/TextCanvasAnimationParams'
import CanvasAnimationParams from './animation/CanvasAnimationParams'
import TableCanvasAnimationParams from './animation/complex/table/TableCanvasAnimationParams'
import ArrayCanvasAnimationParams from './animation/complex/array/ArrayCanvasAnimationParams'

export const canvasWidth = 1280
export const canvasHeight = 800
export const timeDivider = 1000000
export const timeMultiplier = 4
export const startTime = 0

export const canvasAnimations: (p5: p5Types) => CanvasAnimationParams[] = (p5) => [
    new TextCanvasAnimationParams({
        object: {
            value: 'Best Time to Buy and Sell Stock',
            origin: {x: 640, y: 400},
            horizontalAlign: 'center',
            verticalAlign: 'center',
            fontSize: 65
        },
        presenceParameters: {
            appearDuration: 2000
        }
    }),
    new ArrayCanvasAnimationParams({
        object: {
            origin: {x: 240, y: 600},
            value: ['7', '1', '5', '3', '6', '4'],
            height: 300,
            width: 800,
            title: 'Array of stock prices',
            indexTitle: 'Number of day',
            firstIndex: 1
        },
        presenceParameters: {
            appearTime: 5000,
            appearDuration: 4000,
            disappearTime: 35000,
            disappearDuration: 4000
        }
    }, p5),
    new XYChartCanvasAnimationParams({
        object: {
            origin: {x: 240, y: 1250},
            width: 800,
            height: 400,
            yAxisName: 'Price',
            xAxisName: 'Number of day',
            xScale: [0, 1, 2, 3, 4, 5, 6],
            yScale: [0, 1, 2, 3, 4, 5, 6, 7],
            chartPoints: [
                {x: 1, y: 7},
                {x: 2, y: 1},
                {x: 3, y: 5},
                {x: 4, y: 3},
                {x: 5, y: 6},
                {x: 6, y: 4}
            ],
            chartLines: [
                [{x: 1, y: 7}, {x: 2, y: 1}],
                [{x: 2, y: 1}, {x: 3, y: 5}],
                [{x: 3, y: 5}, {x: 4, y: 3}],
                [{x: 4, y: 3}, {x: 5, y: 6}],
                [{x: 5, y: 6}, {x: 6, y: 4}]
            ]
        },
        presenceParameters: {
            appearTime: 10000,
            appearDuration: 4000
        },
        selections: [
            {time: 15000, duration: 5000, type: 'sequentially', selector: {points: 'all'}},
            {time: 23000, duration: 500, selector: {points: [1]}},
            {time: 25000, duration: 500, selector: {points: [4]}},
            {time: 60000, duration: 500, selector: {points: [0]}},
            {time: 65000, duration: 500, selector: {yScaleValues: [7]}},
            {time: 87000, duration: 500, selector: {xScaleValues: [1]}},
            {time: 92000, duration: 500, selector: {yScaleValues: [1]}},
            {time: 123000, duration: 500, selector: {xScaleValues: [2]}},
            {time: 125000, duration: 500, selector: {yScaleValues: [1]}}
        ],
        transformations: [
            {
                time: 21000,
                duration: 500,
                object: {
                    chartPoints: [
                        {x: 1, y: 7},
                        {point: {x: 2, y: 1}, text: 'Buy'},
                        {x: 3, y: 5},
                        {x: 4, y: 3},
                        {x: 5, y: 6},
                        {x: 6, y: 4}
                    ]
                }
            },
            {
                time: 22000,
                duration: 1000,
                object: {
                    chartPoints: [
                        {x: 1, y: 7},
                        {point: {x: 2, y: 1}, text: 'Buy'},
                        {x: 3, y: 5},
                        {x: 4, y: 3},
                        {point: {x: 5, y: 6}, text: 'Sell'},
                        {x: 6, y: 4}
                    ]
                }
            },
            {
                time: 27000,
                duration: 2000,
                object: {chartYRanges: [{yCoords: [1, 5], value: 'Profit is 4'}]}
            },
            {
                time: 35000,
                duration: 2000,
                object: {chartYRanges: [{yCoords: [3, 6], value: 'Profit is 3'}]}
            },
            {
                time: 40000,
                duration: 2000,
                object: {chartYRanges: [{yCoords: [1, 6], value: 'Profit is 7'}]}
            },
            {
                time: 42000,
                duration: 2000,
                object: {chartYRanges: []}
            },
            {
                time: 44000,
                duration: 2000,
                object: {width: 1200}
            },
            {
                time: 113000,
                duration: 1000,
                object: {width: 905}
            }
        ]
    }, p5),
    new TextCanvasAnimationParams({
        presenceParameters: {
            appearTime: 30000,
            appearDuration: 500,
            disappearTime: 35000,
            disappearDuration: 500
        },
        object: {
            origin: {x: 1050, y: 850},
            value: 'fee = 2',
            fontSize: 35
        }
    }),
    new TextCanvasAnimationParams({
        presenceParameters: {
            appearTime: 32000,
            appearDuration: 500,
            disappearTime: 35000,
            disappearDuration: 500

        },
        object: {
            origin: {x: 1050, y: 900},
            value: 'cool down = 1',
            fontSize: 35
        }
    }),
    new TextCanvasAnimationParams({
        presenceParameters: {
            appearTime: 35000,
            appearDuration: 1000,
            disappearTime: 46000,
            disappearDuration: 1000
        },
        object: {
            verticalAlign: 'top',
            origin: {x: 1150, y: 950},
            value: '1) Buy',
            fontSize: 35
        },
        transformations: [{
            time: 37000,
            duration: 1000,
            object: {
                value: '1) Buy\n2) Sell'
            }
        }, {
            time: 39000,
            duration: 1000,
            object: {
                value: '1) Buy\n2) Sell\n3) Wait'
            }
        }, {
            time: 41000,
            duration: 1000,
            object: {
                value: '1) Buy\n2) Sell\n3) Wait\n4) Hold'
            }
        }]
    }),
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
                    rowTitles: [2]
                }
            },
            {
                time: 99000,
                duration: 500,
                selector: {
                    colTitles: [1],
                    rowTitles: [3]
                }
            },
            {
                time: 106000,
                duration: 500,
                selector: {
                    values: [[2, 1]]
                }
            },
            {
                time: 109000,
                duration: 500,
                selector: {
                    values: [[3, 1]]
                }
            },
            {
                time: 123000,
                duration: 500,
                selector: {
                    colTitles: [2]
                }
            },
            {
                time: 182000,
                duration: 10000,
                selector: {values: [[5, 7]]}
            }
        ],
        transformations: [
            {
                time: 65000,
                duration: 500,
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
                time: 68000,
                duration: 500,
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
                time: 71000,
                duration: 500,
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
                time: 74000,
                duration: 500,
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
                time: 77000,
                duration: 3500,
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
                time: 83000,
                duration: 500,
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
                time: 103000,
                duration: 1000,
                object: {
                    markedCells: [[2, 1], [3, 1]]
                },
                options: {
                    type: 'sequentially'
                }
            },
            {
                time: 111000,
                duration: 500,
                object: {markedCells: [[2, 1], [3, 1]]}
            },
            {
                time: 113000,
                duration: 1000,
                object: {
                    width: 1320,
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', ''],
                        ['Buy', '-7', '-1', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ],
                    boldVerticalLines: [6, [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6]],
                    columnWidthProportions: [0.5, 1, 1, 1, 1, 1, 1, 3.5]
                }
            },
            {
                time: 116000,
                duration: 1000,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', ''],
                        ['Sell', '-∞', '', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 118000,
                duration: 1000,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '', '', '', '', '', ''],
                        ['Wait', '0', '', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 120000,
                duration: 500,
                object: {markedCells: []}
            },
            {
                time: 128000,
                duration: 500,
                object: {markedCells: [[1, 1], [4, 1]]},
                options: {type: 'sequentially'}
            },
            {
                time: 132000,
                duration: 2000,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 137000,
                duration: 500,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '', '', '', '', '', ''],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ],
                    markedCells: []
                }
            },
            {
                time: 140000,
                duration: 500,
                object: {markedCells: [[2, 1], [3, 1]]},
                options: {type: 'sequentially'}
            },
            {
                time: 145000,
                duration: 2000,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '', '', '', '', '', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 148000,
                duration: 500,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '0', '', '', '', '', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '', '', '', '', '', ''],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 152000,
                duration: 500,
                object: {markedCells: [[1, 1], [4, 1]]},
                options: {type: 'sequentially'}
            },
            {
                time: 155000,
                duration: 2000,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '0', '', '', '', '', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '', '', '', '', '', 'Max(Buy[n-1], Hold[n-1])'],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 158000,
                duration: 500,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '0', '', '', '', '', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '-7', '', '', '', '', 'Max(Buy[n-1], Hold[n-1])'],
                        ['Max', '0', '', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 161000,
                duration: 500,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '', '', '', '', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '', '', '', '', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '0', '', '', '', '', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '-7', '', '', '', '', 'Max(Buy[n-1], Hold[n-1])'],
                        ['Max', '0', '0', '', '', '', '', '']
                    ]
                }
            },
            {
                time: 163000,
                duration: 500,
                object: {markedCells: []}
            },
            {
                time: 165000,
                duration: 10000,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '-1', '1', '-2', '5', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '4', '3', '7', '5', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '-7', '-6', '4', '4', '7', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '0', '0', '0', '1', '1', 'Max(Buy[n-1], Hold[n-1])'],
                        ['Max', '0', '0', '4', '4', '7', '7', '']
                    ]
                },
                options: {
                    type: 'sequentially',
                    renderValues: {
                        direction: 'upToDown',
                        immediacy: true
                    }
                }
            },
            {
                time: 180000,
                duration: 500,
                object: {
                    values: [
                        ['', '1', '2', '3', '4', '5', '6', 'n >= 2'],
                        ['Buy', '-7', '-1', '-1', '1', '-2', '5', 'Max(Sell[n-1], Wait[n-1]) - Price[n]'],
                        ['Sell', '-∞', '-6', '4', '3', '7', '5', 'Max(Buy[n-1], Hold[n-1]) + Price[n]'],
                        ['Wait', '0', '-7', '-6', '4', '4', '7', 'Max(Sell[n-1], Wait[n-1])'],
                        ['Hold', '-∞', '0', '0', '0', '1', '1', 'Max(Buy[n-1], Hold[n-1])'],
                        ['Max', '0', '0', '4', '4', '7', '7', 'MAX = 7']
                    ]
                }
            }
        ]
    }, p5),
    new TextCanvasAnimationParams({
        presenceParameters: {
            appearTime: 200000,
            appearDuration: 10000
        },
        object: {
            origin: {x: 400, y: 1850},
            verticalAlign: 'top',
            font: 'Courier New',
            fontSize: 20,
            value: 'public int maxProfit(int[] prices) {\n' +
                '\tif(prices.length == 1) {\n' +
                '\t\treturn 0;\n' +
                '\t}\n' +
                '\tint[] buy = new int[prices.length];\n' +
                '\tint[] sell = new int[prices.length];\n' +
                '\tint[] hold = new int[prices.length];\n' +
                '\tint[] wait = new int[prices.length];\n' +
                '\n' +
                '\tbuy[0] = - prices[0];\n' +
                '\tsell[0] = -500000;\n' +
                '\thold[0] = -500000;\n' +
                '\twait[0] = 0;\n' +
                '\n' +
                '\tfor (int i = 1; i < prices.length; i++) {\n' +
                '\t\tbuy[i] = Math.max(sell[i - 1], wait[i - 1]) - prices[i];\n' +
                '\t\tsell[i] = Math.max(buy[i - 1], hold[i - 1]) + prices[i];\n' +
                '\t\thold[i] = Math.max(hold[i - 1], buy[i - 1]);\n' +
                '\t\twait[i] = Math.max(wait[i - 1], sell[i  - 1]);\n' +
                '\t}\n' +
                '\n' +
                '\treturn Math.max(\n' +
                '\t\tMath.max(buy[prices.length - 1],\n' +
                '\t\tsell[prices.length - 1]),\n' +
                '\t\tMath.max(hold[prices.length - 1],\n' +
                '\t\twait[prices.length - 1])\n' +
                '\t);\n' +
                '}'
        }
    })
]

import {LessonJsonType} from '../AnimationsJsonType'

export const BestTimeToBuyAndSellStock: LessonJsonType = {
    sound: require('./Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [
        {
            startTime: 4000,
            transformDuration: 1000,
            camera: {
                x: 0,
                y: 350
            }
        },
        {
            startTime: 10000,
            transformDuration: 1000,
            camera: {
                x: 0,
                y: 580
            }
        },
        {
            startTime: 35000,
            transformDuration: 1000,
            camera: {
                x: 100,
                y: 700
            }
        },
        {
            startTime: 45000,
            transformDuration: 1000,
            camera: {
                x: 120,
                y: 860,
                zoom: 0.9
            }
        },
        {
            startTime: 77000,
            transformDuration: 1000,
            camera: {
                x: 60,
                y: 860,
                zoom: 0.85
            }
        },
        {
            startTime: 113000,
            transformDuration: 1000,
            camera: {
                x: 150,
                y: 860,
                zoom: 0.85
            }
        },
        {
            startTime: 190000,
            transformDuration: 1000,
            camera: {
                x: 150,
                y: 1850,
                zoom: 1
            }
        }
    ],
    animations: {
        text: [
            {
                object: {
                    value: 'Best Time to Buy and Sell Stock',
                    origin: {
                        x: 640,
                        y: 400
                    },
                    horizontalAlign: 'center',
                    verticalAlign: 'center',
                    fontSize: 65
                },
                presenceParameters: [{appearTime: 0, appearDuration: 2000}]
            },
            {
                presenceParameters: [{
                    appearTime: 30000,
                    appearDuration: 500,
                    disappearTime: 35000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1050,
                        y: 850
                    },
                    value: 'fee = 2',
                    fontSize: 35
                }
            },
            {
                presenceParameters: [{
                    appearTime: 32000,
                    appearDuration: 500,
                    disappearTime: 35000,
                    disappearDuration: 500
                }],
                object: {
                    origin: {
                        x: 1050,
                        y: 900
                    },
                    value: 'cool down = 1',
                    fontSize: 35
                }
            },
            {
                presenceParameters: [{
                    appearTime: 35000,
                    appearDuration: 1000,
                    disappearTime: 46000,
                    disappearDuration: 1000
                }],
                object: {
                    verticalAlign: 'top',
                    origin: {
                        x: 1150,
                        y: 950
                    },
                    value: '1) Buy',
                    fontSize: 35
                },
                transformations: [
                    {
                        appearTime: 37000,
                        appearDuration: 1000,
                        object: {
                            value: '1) Buy\n2) Sell'
                        }
                    },
                    {
                        appearTime: 39000,
                        appearDuration: 1000,
                        object: {
                            value: '1) Buy\n2) Sell\n3) Wait'
                        }
                    },
                    {
                        appearTime: 41000,
                        appearDuration: 1000,
                        object: {
                            value: '1) Buy\n2) Sell\n3) Wait\n4) Hold'
                        }
                    }
                ]
            }
        ],
        array: [
            {
                object: {
                    origin: {
                        x: 240,
                        y: 600
                    },
                    values: ['7', '1', '5', '3', '6', '4'],
                    height: 300,
                    width: 800,
                    title: 'Array of stock prices',
                    indexTitle: 'Number of day',
                    firstIndex: 1
                },
                presenceParameters: [{
                    appearTime: 5000,
                    appearDuration: 4000,
                    disappearTime: 35000,
                    disappearDuration: 4000
                }]
            }
        ],
        xyChart: [
            {
                object: {
                    origin: {
                        x: 240,
                        y: 1180
                    },
                    width: 800,
                    height: 350,
                    yAxisName: 'Price',
                    xAxisName: 'Number of day',
                    xScale: [0, 1, 2, 3, 4, 5, 6],
                    yScale: [0, 1, 2, 3, 4, 5, 6, 7],
                    chartPoints: [
                        {
                            x: 1,
                            y: 7
                        },
                        {
                            x: 2,
                            y: 1
                        },
                        {
                            x: 3,
                            y: 5
                        },
                        {
                            x: 4,
                            y: 3
                        },
                        {
                            x: 5,
                            y: 6
                        },
                        {
                            x: 6,
                            y: 4
                        }
                    ],
                    chartLines: [
                        [{
                            x: 1,
                            y: 7
                        }, {
                            x: 2,
                            y: 1
                        }],
                        [{
                            x: 2,
                            y: 1
                        }, {
                            x: 3,
                            y: 5
                        }],
                        [{
                            x: 3,
                            y: 5
                        }, {
                            x: 4,
                            y: 3
                        }],
                        [{
                            x: 4,
                            y: 3
                        }, {
                            x: 5,
                            y: 6
                        }],
                        [{
                            x: 5,
                            y: 6
                        }, {
                            x: 6,
                            y: 4
                        }]
                    ]
                },
                presenceParameters: [{appearTime: 10000, appearDuration: 4000}],
                selections: [
                    {
                        time: 15000,
                        duration: 5000,
                        type: {points: 'all'}
                    },
                    {
                        time: 23000,
                        duration: 500,
                        type: {points: [1]}
                    },
                    {
                        time: 25000,
                        duration: 500,
                        type: {points: [4]}
                    },
                    {
                        time: 60000,
                        duration: 500,
                        type: {points: [0]}
                    },
                    {
                        time: 65000,
                        duration: 500,
                        type: {yScaleValues: [7]}
                    },
                    {
                        time: 87000,
                        duration: 500,
                        type: {xScaleValues: [1]}
                    },
                    {
                        time: 92000,
                        duration: 500,
                        type: {yScaleValues: [1]}
                    },
                    {
                        time: 123000,
                        duration: 500,
                        type: {xScaleValues: [2]}
                    },
                    {
                        time: 125000,
                        duration: 500,
                        type: {yScaleValues: [1]}
                    }
                ],
                transformations: [
                    {
                        appearTime: 21000,
                        appearDuration: 500,
                        object: {
                            chartPoints: [
                                {
                                    x: 1,
                                    y: 7
                                },
                                {
                                    point: {
                                        x: 2,
                                        y: 1
                                    },
                                    text: 'Buy'
                                },
                                {
                                    x: 3,
                                    y: 5
                                },
                                {
                                    x: 4,
                                    y: 3
                                },
                                {
                                    x: 5,
                                    y: 6
                                },
                                {
                                    x: 6,
                                    y: 4
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 22000,
                        appearDuration: 1000,
                        object: {
                            chartPoints: [
                                {
                                    x: 1,
                                    y: 7
                                },
                                {
                                    point: {
                                        x: 2,
                                        y: 1
                                    },
                                    text: 'Buy'
                                },
                                {
                                    x: 3,
                                    y: 5
                                },
                                {
                                    x: 4,
                                    y: 3
                                },
                                {
                                    point: {
                                        x: 5,
                                        y: 6
                                    },
                                    text: 'Sell'
                                },
                                {
                                    x: 6,
                                    y: 4
                                }
                            ]
                        }
                    },
                    {
                        appearTime: 27000,
                        appearDuration: 2000,
                        object: {
                            chartYRanges: [{
                                from: 1,
                                to: 5,
                                title: 'Profit is 4'
                            }]
                        }
                    },
                    {
                        appearTime: 35000,
                        appearDuration: 2000,
                        object: {
                            chartYRanges: [{
                                from: 3,
                                to: 6,
                                title: 'Profit is 3'
                            }]
                        }
                    },
                    {
                        appearTime: 40000,
                        appearDuration: 2000,
                        object: {
                            chartYRanges: [{
                                from: 1,
                                to: 6,
                                title: 'Profit is 7'
                            }]
                        }
                    },
                    {
                        appearTime: 42000,
                        appearDuration: 2000,
                        object: {chartYRanges: []}
                    },
                    {
                        appearTime: 44000,
                        appearDuration: 2000,
                        object: {
                            width: 1200,
                            height: 300
                        }
                    },
                    {
                        appearTime: 113000,
                        appearDuration: 1000,
                        object: {width: 905}
                    }
                ]
            }
        ],
        table: [{
            presenceParameters: [{appearTime: 44000, appearDuration: 2000}],
            object: {
                origin: {
                    x: 240,
                    y: 1280
                },
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
                    type: {
                        rowTitles: 'all'
                    }
                },
                {
                    time: 55000,
                    duration: 500,
                    type: {
                        colTitles: 'all'
                    }
                },
                {
                    time: 60000,
                    duration: 500,
                    type: {
                        colTitles: [1]
                    }
                },
                {
                    time: 87000,
                    duration: 500,
                    type: {
                        colTitles: [2]
                    }
                },
                {
                    time: 95000,
                    duration: 500,
                    type: {
                        colTitles: [1],
                        rowTitles: [2]
                    }
                },
                {
                    time: 99000,
                    duration: 500,
                    type: {
                        colTitles: [1],
                        rowTitles: [3]
                    }
                },
                {
                    time: 106000,
                    duration: 500,
                    type: {
                        values: [[2, 1]]
                    }
                },
                {
                    time: 109000,
                    duration: 500,
                    type: {
                        values: [[3, 1]]
                    }
                },
                {
                    time: 123000,
                    duration: 500,
                    type: {
                        colTitles: [2]
                    }
                },
                {
                    time: 182000,
                    duration: 10000,
                    type: {values: [[5, 7]]}
                }
            ],
            transformations: [
                {
                    appearTime: 65000,
                    appearDuration: 500,
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
                    appearTime: 68000,
                    appearDuration: 500,
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
                    appearTime: 71000,
                    appearDuration: 500,
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
                    appearTime: 74000,
                    appearDuration: 500,
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
                    appearTime: 77000,
                    appearDuration: 3500,
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
                    appearTime: 83000,
                    appearDuration: 500,
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
                    appearTime: 103000,
                    appearDuration: 1000,
                    object: {
                        markedCells: [[2, 1], [3, 1]]
                    }
                    // options: {
                    //     type: 'sequentially'
                    // }
                },
                {
                    appearTime: 111000,
                    appearDuration: 500,
                    object: {markedCells: [[2, 1], [3, 1]]}
                },
                {
                    appearTime: 113000,
                    appearDuration: 1000,
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
                    appearTime: 116000,
                    appearDuration: 1000,
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
                    appearTime: 118000,
                    appearDuration: 1000,
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
                    appearTime: 120000,
                    appearDuration: 500,
                    object: {markedCells: []}
                },
                {
                    appearTime: 128000,
                    appearDuration: 500,
                    object: {markedCells: [[1, 1], [4, 1]]}
                    // options: {type: 'sequentially'}
                },
                {
                    appearTime: 132000,
                    appearDuration: 2000,
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
                    appearTime: 137000,
                    appearDuration: 500,
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
                    appearTime: 140000,
                    appearDuration: 500,
                    object: {markedCells: [[2, 1], [3, 1]]}
                    // options: {type: 'sequentially'}
                },
                {
                    appearTime: 145000,
                    appearDuration: 2000,
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
                    appearTime: 148000,
                    appearDuration: 500,
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
                    appearTime: 152000,
                    appearDuration: 500,
                    object: {markedCells: [[1, 1], [4, 1]]}
                    // options: {type: 'sequentially'}
                },
                {
                    appearTime: 155000,
                    appearDuration: 2000,
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
                    appearTime: 158000,
                    appearDuration: 500,
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
                    appearTime: 161000,
                    appearDuration: 500,
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
                    appearTime: 163000,
                    appearDuration: 500,
                    object: {markedCells: []}
                },
                {
                    appearTime: 165000,
                    appearDuration: 10000,
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
                        // type: 'sequentially',
                        renderValues: {
                            direction: 'upToDown',
                            immediacy: true
                        }
                    }
                },
                {
                    appearTime: 180000,
                    appearDuration: 500,
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
        }
        ],
        formattedText: [
            {
                presenceParameters: [{appearTime: 191000, appearDuration: 10000}],
                object: {
                    origin: {
                        x: 370,
                        y: 1900
                    },
                    fontSize: 22,
                    value: {
                        language: 'java',
                        text: 'public int maxProfit(int[] prices) {\n' +
                            '\n' +
                            '    int prevBuy = -prices[0];\n' +
                            '    int prevSell = MIN_VALUE;\n' +
                            '    int prevWaitAfterBuy = MIN_VALUE;\n' +
                            '    int prevWaitAfterNothing = 0;\n' +
                            '\n' +
                            '    for (int i = 1; i < prices.length; i++) {\n' +
                            '        int price = prices[i];\n' +
                            '        int buy = max(prevSell, prevWaitAfterNothing) - price;\n' +
                            '        int sell = max(prevBuy, prevWaitAfterBuy) + price;\n' +
                            '        int waitAfterBuy = max(prevWaitAfterBuy, prevBuy);\n' +
                            '        int waitAfterNothing = max(prevWaitAfterNothing, prevSell);\n' +
                            '        prevBuy = buy;\n' +
                            '        prevSell = sell;\n' +
                            '        prevWaitAfterBuy = waitAfterBuy;\n' +
                            '        prevWaitAfterNothing = waitAfterNothing;\n' +
                            '    }\n' +
                            '\n' +
                            '    return max(\n' +
                            '        max(prevBuy, prevSell),\n' +
                            '        max(prevWaitAfterBuy, prevWaitAfterNothing)\n' +
                            '    );\n' +
                            '}'
                    }
                }
            }
        ]
    }
}

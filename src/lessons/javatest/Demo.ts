import { LessonJsonType } from '../../AnimationsJsonType'

export const Demo: LessonJsonType = {
    sound: require('./../Lofi_Jazz_Cafe_Cozy_Evening.mp3'),
    canvasDimensions: {
        width: 1280,
        height: 720
    },
    endTime: 210000,
    cameras: [],
    animations: {
        codeQuestionnaire: [
            {
                presenceParameters: {
                    appears: [{
                        time: 1000,
                        duration: 1000
                    }],
                    disappears: [{
                        time: 9000,
                        duration: 1000
                    }]
                },
                selections: [{
                    time: 3000,
                    duration: 500,
                    type: {
                        code: {
                            substrings: [{
                                from: 30,
                                to: 50,
                            }]
                        }
                    }
                }],
                transformations: [{
                    appearTime: 5000,
                    appearDuration: 1000,
                    disappearTime: 5000,
                    disappearDuration: 1000,
                    object: {
                        codeText: "blablabla"
                    }
                }],
                object: {
                    questionParams: {
                        fontSize: 33,
                        options: ["1. FIRST", "2. SECOND", "3. THIRD"],
                        position: "right"
                    },
                    origin: {
                        x: 0,
                        y: 0
                    },
                    width: 1280,
                    height: 720,
                    codeFontSize: 22,
                    language: 'Java',
                    codeHighlightStyle: 'darcula',
                    codeText: 'public int maxProfit(int[] prices) {\n' +
                        '\n' +
                        '\tint prevBuy = -prices[0];\n' +
                        '\tint prevSell = MIN_VALUE;\n' +
                        '\tint prevWaitAfterBuy = MIN_VALUE;\n' +
                        '\tint prevWaitAfterNothing = 0;\n' +
                        '\n' +
                        '\tfor (int i = 1; i < prices.length; i++) {\n' +
                        '\t\tint price = prices[i];\n' +
                        '\t\tint buy = max(prevSell, prevWaitAfterNothing) - price;\n' +
                        '\t\tint sell = max(prevBuy, prevWaitAfterBuy) + price;\n' +
                        '\t\tint waitAfterNothing = max(prevWaitAfterNothing, prevSell);\n' +
                        '\t\tprevBuy = buy;\n' +
                        '\t\tprevSell = sell;\n' +
                        '\t\tprevWaitAfterBuy = waitAfterBuy;\n' +
                        '\t\tprevWaitAfterNothing = waitAfterNothing;\n' +
                        '\t}\n' +
                        '\n' +
                        '\treturn max(\n' +
                        '\t\tmax(prevBuy, prevSell),\n' +
                        '\t\tmax(prevWaitAfterBuy, prevWaitAfterNothing)\n' +
                        '\t);\n' +
                        '}'
                }
            }
        ],
        // highlightedText: [
        //     {
        //         presenceParameters: {
        //             appears: [{
        //                 time: 1000,
        //                 duration: 5000
        //             }],
        //             disappears: [{
        //                 time: 9000,
        //                 duration: 5000
        //             }]
        //         },
        //         selections: [
        //             {
        //                 time: 6000,
        //                 duration: 3000,
        //                 substrings: [{
        //                     from: 10,
        //                     to: 50
        //                 }, {
        //                     from: 80,
        //                     to: 150
        //                 }]
        //             }
        //         ],
        //         object: {
        //             origin: {
        //                 x: 10,
        //                 y: 10
        //             },
        //             width: 1000,
        //             height: 700,
        //             fontSize: 22,
        //             value: {
        //                 language: 'Java',
        //                 text: 'public int maxProfit(int[] prices) {\n' +
        //                     '\n' +
        //                     '\tint prevBuy = -prices[0];\n' +
        //                     '\tint prevSell = MIN_VALUE;\n' +
        //                     '\tint prevWaitAfterBuy = MIN_VALUE;\n' +
        //                     '\tint prevWaitAfterNothing = 0;\n' +
        //                     '\n' +
        //                     '\tfor (int i = 1; i < prices.length; i++) {\n' +
        //                     '\t\tint price = prices[i];\n' +
        //                     '\t\tint buy = max(prevSell, prevWaitAfterNothing) - price;\n' +
        //                     '\t\tint sell = max(prevBuy, prevWaitAfterBuy) + price;\n' +
        //                     '\t\tint waitAfterNothing = max(prevWaitAfterNothing, prevSell);\n' +
        //                     '\t\tprevBuy = buy;\n' +
        //                     '\t\tprevSell = sell;\n' +
        //                     '\t\tprevWaitAfterBuy = waitAfterBuy;\n' +
        //                     '\t\tprevWaitAfterNothing = waitAfterNothing;\n' +
        //                     '\t}\n' +
        //                     '\n' +
        //                     '\treturn max(\n' +
        //                     '\t\tmax(prevBuy, prevSell),\n' +
        //                     '\t\tmax(prevWaitAfterBuy, prevWaitAfterNothing)\n' +
        //                     '\t);\n' +
        //                     '}'
        //             },
        //         }
        //     }
        // ]
    }
}

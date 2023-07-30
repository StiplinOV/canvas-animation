import {Renderer} from 'highlight-ts'
import {HighlightedTextValueSegmentType} from './HighlightedTextCanvasAnimationParams'
import React from 'react'

type OutputType = {
    values: {
        segments: HighlightedTextValueSegmentType[]
        classes: string[]
    }[]
}

export default class HighlightedTextCanvasAnimationRenderer implements Renderer<OutputType> {

    private readonly style: Record<string, React.CSSProperties>

    constructor(style: Record<string, React.CSSProperties>) {
        this.style = style
    }

    text(chunkParam: string): OutputType {
        const chunks = chunkParam.split('\n')
        const result: OutputType = {
            values: []
        }
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i]
            result.values.push({
                segments: [{
                    value: chunk
                }],
                classes: []
            })
            if (i + 1 !== chunks.length) {
                result.values.push({
                    segments: ['newline'],
                    classes: []
                })
            }
        }
        return result
    }

    wrap(className: string, chunk: OutputType): OutputType {
        console.log(className)
        chunk.values.forEach(v => v.classes.unshift(className))
        return chunk
    }

    join(chunks: OutputType[]): OutputType {
        const result: OutputType = {
            values: []
        }
        chunks.forEach(c => {
            result.values.push(...c.values)
        })
        return result
    }

}

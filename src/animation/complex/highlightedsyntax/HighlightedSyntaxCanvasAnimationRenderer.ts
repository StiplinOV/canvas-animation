import {Renderer} from 'highlight-ts'
import {highlightedTextValueSegmentType} from '../../simple/highligtedtext/HighlightedTextCanvasAnimationParams'
import {THE_STYLE} from 'p5'
import {Property} from 'csstype'
import AnimationStyle from '../../../AnimationStyles'
import React from 'react'

export default class HighlightedSyntaxCanvasAnimationRenderer implements Renderer<highlightedTextValueSegmentType[]> {

    private readonly style: Record<string, React.CSSProperties>

    private readonly animationStyle: AnimationStyle

    constructor(style: Record<string, React.CSSProperties>, animationStyle: AnimationStyle) {
        this.style = style
        this.animationStyle = animationStyle
    }

    text(chunkParam: string): highlightedTextValueSegmentType[] {
        const properties: React.CSSProperties = this.style.hljs
        const chunks = chunkParam.split('\n')
        const result: highlightedTextValueSegmentType[] = []
        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i]
            result.push({
                value: chunk,
                textWeight: this.cssPropToTextWeight(properties.fontWeight),
                textColor: properties.color ?? this.animationStyle.fontColor,
                textStyle: this.cssPropToFontStyle(properties),
                backgroundTextColor: properties.backgroundColor
            })
            if (i + 1 !== chunks.length) {
                result.push('newline')
            }
        }
        return result
    }

    wrap(className: string, chunk: highlightedTextValueSegmentType[]): highlightedTextValueSegmentType[] {
        const properties: React.CSSProperties = {
            ...this.style.hljs,
            ...this.style[className]
        }
        return chunk.map((c): highlightedTextValueSegmentType => {
            if (c === 'newline') {
                return c
            }
            return {
                ...c,
                textColor: properties.color ?? this.animationStyle.fontColor,
                textStyle: this.cssPropToFontStyle(properties),
                textWeight: typeof properties.fontWeight === 'number' ? properties.fontWeight : undefined,
                backgroundTextColor: properties.backgroundColor
            }
        })
    }

    join(chunks: highlightedTextValueSegmentType[][]): highlightedTextValueSegmentType[] {
        return chunks.flatMap(c => c)
    }

    private cssPropToFontStyle(style: React.CSSProperties): THE_STYLE {
        if (style.fontWeight === 'bold') {
            return style.fontStyle === 'italic' ? 'bolditalic' : 'bold'
        }
        return style.fontStyle === 'italic' ? 'italic' : 'normal'
    }

    private cssPropToTextWeight(fontWeightParam?: Property.FontWeight): number | undefined {
        return typeof fontWeightParam === 'number' ? fontWeightParam : undefined
    }

}

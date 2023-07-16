import {Renderer} from 'highlight-ts'
import {HighlightedTextValueSegmentType} from './HighlightedTextCanvasAnimationParams'
import {THE_STYLE} from 'p5'
import {Property} from 'csstype'
import AnimationStyle from '../../../AnimationStyles'
import React from 'react'

export default class HighlightedTextCanvasAnimationRenderer implements Renderer<HighlightedTextValueSegmentType[]> {

    private readonly style: Record<string, React.CSSProperties>

    private readonly animationStyle: AnimationStyle

    private readonly syntaxHighlightingDisabled: boolean

    constructor(style: Record<string, React.CSSProperties>, animationStyle: AnimationStyle, syntaxHighlightingDisabled?: boolean) {
        this.style = style
        this.animationStyle = animationStyle
        this.syntaxHighlightingDisabled = syntaxHighlightingDisabled ?? false
    }

    text(chunkParam: string): HighlightedTextValueSegmentType[] {
        const properties: React.CSSProperties = this.style.hljs
        const chunks = chunkParam.split('\n')
        const result: HighlightedTextValueSegmentType[] = []
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

    wrap(className: string, chunk: HighlightedTextValueSegmentType[]): HighlightedTextValueSegmentType[] {
        let properties: React.CSSProperties = {
            ...this.style.hljs,
        }
        if (!this.syntaxHighlightingDisabled) {
            properties = {
                ...properties,
                ...this.style[className]
            }
        }
        return chunk.map((c): HighlightedTextValueSegmentType => {
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

    join(chunks: HighlightedTextValueSegmentType[][]): HighlightedTextValueSegmentType[] {
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

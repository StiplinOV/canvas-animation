import {JsonObjectParams, JsonParams, SelectionType} from "./JsonParams";
import {AnimationObjectParams, AnimationParams, Transformation} from "./AnimationParams";
import {PresenceParamType, toPresenceParamType} from "../common/Utils";
import {intervalContainsIntersections} from "../common/Alghoritm";
import {Point} from "../common/Point";
import {ObjectParams} from "../animation/CanvasAnimationParams";

export abstract class ObjectParamsConverter<T extends JsonObjectParams, W extends AnimationObjectParams, U = unknown, V extends SelectionType = SelectionType> {

    public convertJsonParamsToAnimationParams(jsonParams: JsonParams<T, U, V>): AnimationParams<W, U> {
        const presenceParam = toPresenceParamType(jsonParams.presenceParameters)
        const object: W = this.convertJsonObjectParamsToAnimationObjectParams(
            this.convertBaseJsonObjectParamsToAnimationObjectParams(jsonParams.object),
            jsonParams.object
        )
        this.checkPresenceParam(presenceParam)
        return {
            transformations: this.convertJsonParamTransformationsToAnimationParamTransformations(jsonParams),
            object: object,
            presenceParam,
            layout: jsonParams.layout ?? 'absolute',
            zeroObject: this.getZeroObject(object)
        }
    }

    private checkPresenceParam(presenceParam: PresenceParamType[]): void {
        if (intervalContainsIntersections(presenceParam.map(p => ({
            start: p.appearTime,
            end: p.disappearTime + p.disappearDuration
        })))) {
            throw new Error(`intervalContainsIntersections: ${JSON.stringify(presenceParam)}`)
        }
    }

    private convertJsonParamTransformationsToAnimationParamTransformations(jsonParams: JsonParams<T, U, V>): Transformation<W, U>[] {
        const object: W = this.convertJsonObjectParamsToAnimationObjectParams(
            this.convertBaseJsonObjectParamsToAnimationObjectParams(jsonParams.object),
            jsonParams.object
        )
        const result: Transformation<W, U>[] = jsonParams.transformations?.map(t => {
            return {
                object: this.convertJsonTransformObjectParamsToAnimationTransformObjectParams(t.object),
                presence: {
                    appearTime: t.appearTime ?? 0,
                    appearDuration: t.appearDuration ?? 0,
                    disappearTime: t.disappearTime ?? Number.POSITIVE_INFINITY,
                    disappearDuration: t.disappearDuration ?? 0
                },
                options: t.options
            }
        }) ?? []
        result.push(...this.convertSelectionsToTransformations(jsonParams.selections ?? []))
        result.push(...toPresenceParamType(jsonParams.presenceParameters).map(p => {
            return {
                object: object,
                presence: p
            }
        }))
        result.push(...toPresenceParamType(jsonParams.presenceParameters).map(p => {
            return {
                object: this.getZeroObject(object),
                presence: {
                    appearTime: p.disappearTime,
                    appearDuration: p.disappearDuration,
                    disappearTime: Number.POSITIVE_INFINITY,
                    disappearDuration: 0
                }
            }
        }))
        return result.sort((l, r) => {
            if (l.presence.appearTime === r.presence.appearTime) {
                return l.presence.appearDuration - r.presence.appearDuration
            }
            return l.presence.appearTime - r.presence.appearTime
        })
    }

    private convertBaseJsonObjectParamsToAnimationObjectParams(params: JsonObjectParams): AnimationObjectParams {
        return {
            ...params,
            weight: params.weight ?? null,
            zIndex: params.zIndex ?? 0,
            dashed: params.dashed ?? null,
            strokeColor: params.strokeColor ?? null,
            fillColor: params.fillColor ?? null,
            rotations: params.rotations ?? []
        }
    }

    private convertSelectionsToTransformations(selections: V[]): Transformation<W, U>[] {
        return selections.map(selection => ({
            object: this.convertSelectionToTransformationObject(selection),
            presence: {
                appearTime: selection.time,
                appearDuration: selection.duration / 2,
                disappearTime: selection.time + selection.duration / 2,
                disappearDuration: selection.duration / 2
            }
        }))
    }

    protected abstract convertSelectionToTransformationObject(selection: V): Partial<W>

    public getZeroObject(object: W): W {
        return {
            ...object,
            ...this.getZeroParams(),
            origin: this.getZeroObjectOrigin(object),
            zIndex: object.zIndex
        }
    }

    protected getZeroObjectOrigin(object: W): Point {
        return object.origin
    }

    protected abstract getZeroParams(): Omit<T, keyof ObjectParams>

    protected abstract convertJsonObjectParamsToAnimationObjectParams(animationObjectParams: AnimationObjectParams, jsonObjectParams: T): W

    protected abstract convertJsonTransformObjectParamsToAnimationTransformObjectParams(jsonObjectParams: Partial<T>): Partial<W>


}

import * as fabric from "fabric";

export type ActiveTool =
    'templates'
    | 'image'
    | 'text'
    | 'shapes'
    | 'ai'
    | 'settings'
    | 'draw'
    | 'fill'
    | 'stroke-color'
    | 'stroke-width'
    | 'font'
    | 'opacity'
    | 'remove-bg'
    | 'select'

export const FILL_COLOR = 'black'
export const STROKE_COLOR = 'black'
export const STROKE_WIDTH = 2


export const CIRCLE_OPTIONS = {
    radius: 50,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const SQUARE_OPTIONS = {
    width: 100,
    height: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const RECTANGLE_OPTIONS = {
    width: 100,
    height: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const DIAMOND_OPTIONS = {
    width: 100,
    height: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export const TRIANGLE_OPTIONS = {
    width: 100,
    height: 100,
    fill: FILL_COLOR,
    stroke: STROKE_COLOR,
    strokeWidth: STROKE_WIDTH,
}

export type BuildEditorProps = {
    canvas: fabric.Canvas
    fillColor: string
    setFillColor: (color: string) => void
    strokeColor: string
    setStrokeColor: (color: string) => void
    strokeWidth: number
    setStrokeWidth: (width: number) => void
}

export interface Editor {
    addCircle: () => void
    addSoftRectangle: () => void
    addRectangle: () => void
    addTriangle: () => void
    addDiamond: () => void
    changeFillColor: (color: string) => void
    changeStrokeColor: (color: string) => void
    changeStrokeWidth: (width: number) => void
    fillColor: string
    strokeColor: string
    strokeWidth: number
    canvas: fabric.Canvas
}

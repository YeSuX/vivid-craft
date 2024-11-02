import * as fabric from "fabric";
import * as material from "material-colors";

export const selectionDependentTools = [
    'fill',
    'stroke-color',
    'stroke-width',
    'font',
    'opacity',
    'remove-bg',
]

export const colors = [
    material.red['500'],
    material.pink['500'],
    material.purple['500'],
    material.deepPurple['500'],
    material.indigo['500'],
    material.blue['500'],
    material.teal['500'],
    material.green['500'],
    material.lightGreen['500'],
    material.lime['500'],
    material.yellow['500'],
    material.amber['500'],
    material.orange['500'],
    material.deepOrange['500'],
    material.brown['500'],
    material.grey['500'],
    material.blueGrey['500'],
    material.black,
    'transparent',
]

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
export const STROKE_DASH_ARRAY = []


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

export interface EditorHookProps {
    clearSelectionCallback?: () => void
}

export type BuildEditorProps = {
    canvas: fabric.Canvas
    selectedObject: fabric.Object[]
    fillColor: string
    setFillColor: (color: string) => void
    strokeColor: string
    setStrokeColor: (color: string) => void
    strokeWidth: number
    setStrokeWidth: (width: number) => void
    strokeDashArray: number[]
    setStrokeDashArray: (value: number[]) => void
}

export interface Editor {
    addCircle: () => void
    addSoftRectangle: () => void
    addRectangle: () => void
    addTriangle: () => void
    addDiamond: () => void
    bringToFront: () => void
    sendToBack: () => void
    changeFillColor: (color: string) => void
    changeStrokeColor: (color: string) => void
    changeStrokeWidth: (width: number) => void
    changeStrokeDashArray: (value: number[]) => void
    getActiveFillColor: () => string
    getActiveStrokeColor: () => string
    getActiveStrokeWidth: () => number
    getActiveStrokeDashArray: () => number[]
    canvas: fabric.Canvas
    selectedObject: fabric.Object[]
}

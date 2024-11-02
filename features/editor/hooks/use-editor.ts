import { STROKE_DASH_ARRAY } from './../types';
import { useCallback, useMemo, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, EditorHookProps, FILL_COLOR, RECTANGLE_OPTIONS, STROKE_COLOR, STROKE_WIDTH, TRIANGLE_OPTIONS } from "../types";
import { useCanvasEvents } from "./use-canvas-events";
import { isTextType } from "../utils";

const buildEditor = ({
    canvas,
    fillColor,
    setFillColor,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    selectedObject, // 添加 selectedObject 到参数列表
    strokeDashArray,
    setStrokeDashArray
}: BuildEditorProps): Editor => {

    const getWorkspace = () => {
        return canvas
            .getObjects()
            .find((object) => (object as fabric.Object & { name?: string }).name === "clip");
    };

    const center = (object: fabric.Object) => {
        const workspace = canvas.getObjects().find((obj) => (obj as fabric.Object & { name?: string }).name === 'clip')
        const center = workspace?.getCenterPoint()

        if (!center) return

        canvas._centerObject(object, center)
    }

    const addToCanvas = (object: fabric.Object) => {
        center(object)
        canvas.add(object)
        canvas.setActiveObject(object)
    }

    return {
        getActiveOpacity: () => {
            return canvas.getActiveObject()?.get('opacity') || 1
        },
        changeOpacity: (opacity: number) => {
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ opacity })
            })
            canvas.renderAll()
        },
        bringToFront: () => {
            canvas.getActiveObjects().forEach((obj) => {
                canvas.bringObjectForward(obj)
            })
            canvas.renderAll()
        },
        sendToBack: () => {
            canvas.getActiveObjects().forEach((obj) => {
                canvas.sendObjectBackwards(obj)
            })
            canvas.renderAll()

            const workspace = getWorkspace()
            if (workspace) {
                canvas.sendObjectToBack(workspace)
            }
        },
        changeFillColor: (color: string) => {
            setFillColor(color)
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ fill: color })
            })
            canvas.renderAll()
        },
        changeStrokeColor: (color: string) => {
            setStrokeColor(color)
            canvas.getActiveObjects().forEach((obj) => {
                if (isTextType(obj.type)) {
                    obj.set({ fill: color })
                    return
                }

                obj.set({ stroke: color })
            })
            canvas.renderAll()
        },
        changeStrokeWidth: (width: number) => {
            setStrokeWidth(width)
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ strokeWidth: width })
            })
            canvas.renderAll()
        },
        changeStrokeDashArray: (value: number[]) => {
            setStrokeDashArray(value)
            canvas.getActiveObjects().forEach((obj) => {
                obj.set({ strokeDashArray: value })
            })
            canvas.renderAll()
        },
        addCircle: () => {
            const circle = new fabric.Circle({
                ...CIRCLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(circle)
        },
        addSoftRectangle: () => {
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 20,
                ry: 20,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(rectangle)
        },
        addRectangle: () => {
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(rectangle)
        },
        addTriangle: () => {
            const triangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                angle: 0,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(triangle)
        },
        addDiamond: () => {
            const WIDTH = DIAMOND_OPTIONS.width
            const HEIGHT = DIAMOND_OPTIONS.height
            const diamond = new fabric.Polygon([
                new fabric.Point(0, HEIGHT / 2),
                new fabric.Point(WIDTH / 2, 0),
                new fabric.Point(WIDTH, HEIGHT / 2),
                new fabric.Point(WIDTH / 2, HEIGHT)
            ], {
                ...DIAMOND_OPTIONS,
                fill: fillColor,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                strokeDashArray: strokeDashArray
            })

            addToCanvas(diamond)
        },
        getActiveFillColor: () => {
            const selectedObject = canvas.getActiveObject()
            if (!selectedObject) {
                return fillColor
            }

            const value = selectedObject.get('fill') || fillColor

            // Currently, the value is always a string
            return value as string
        },
        getActiveStrokeColor: () => {
            const selectedObject = canvas.getActiveObject()
            if (!selectedObject) {
                return fillColor
            }

            const value = selectedObject.get('stroke') || strokeColor

            // Currently, the value is always a string
            return value as string
        },
        getActiveStrokeWidth: () => {
            const selectedObject = canvas.getActiveObject()
            if (!selectedObject) {
                return strokeWidth
            }
            return selectedObject.get('strokeWidth') || strokeWidth
        },
        getActiveStrokeDashArray: () => {
            const selectedObject = canvas.getActiveObject()
            if (!selectedObject) {
                return strokeDashArray
            }
            return selectedObject.get('strokeDashArray') || strokeDashArray
        },
        canvas,
        selectedObject // 确保 selectedObject 被正确返回
    }
}

export const useEditor = ({
    clearSelectionCallback
}: EditorHookProps) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)
    const [selectedObject, setSelectedObject] = useState<fabric.Object[]>([])

    const [fillColor, setFillColor] = useState<string>(FILL_COLOR)
    const [strokeColor, setStrokeColor] = useState<string>(STROKE_COLOR)
    const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH)
    const [strokeDashArray, setStrokeDashArray] = useState<number[]>(STROKE_DASH_ARRAY)


    useAutoResize({
        canvas,
        container
    })

    useCanvasEvents({
        canvas,
        setSelectedObject,
        clearSelectionCallback
    })

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({
                canvas,
                fillColor,
                setFillColor,
                strokeColor,
                setStrokeColor,
                strokeWidth,
                setStrokeWidth,
                selectedObject,
                strokeDashArray,
                setStrokeDashArray
            })
        }

        return undefined
    }, [canvas, fillColor, strokeColor, strokeWidth, selectedObject, strokeDashArray])

    // this is the function that will be used to initialize the editor
    const init = useCallback((
        {
            initialCanvas,
            initialContainer
        }: {
            initialCanvas: fabric.Canvas;
            initialContainer: HTMLDivElement;
        }
    ) => {
        const initialWorkspace = new fabric.Rect({
            width: 900,
            height: 1200,
            name: 'clip',
            fill: 'white',
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
                color: 'rgba(0,0,0,0.8)',
                blur: 5,
            })
        })

        initialCanvas.setWidth(initialContainer.offsetWidth)
        initialCanvas.setHeight(initialContainer.offsetHeight)

        initialCanvas.add(initialWorkspace)
        initialCanvas.centerObject(initialWorkspace)
        initialCanvas.clipPath = initialWorkspace

        setCanvas(initialCanvas)
        setContainer(initialContainer)
    }, [])

    return {
        init,
        editor
    };
};

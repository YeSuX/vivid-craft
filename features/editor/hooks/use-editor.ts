import { useCallback, useMemo, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./use-auto-resize";
import { BuildEditorProps, CIRCLE_OPTIONS, DIAMOND_OPTIONS, Editor, RECTANGLE_OPTIONS, TRIANGLE_OPTIONS } from "../types";

const buildEditor = ({
    canvas
}: BuildEditorProps): Editor => {

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
        addCircle: () => {
            const circle = new fabric.Circle({
                ...CIRCLE_OPTIONS
            })

            addToCanvas(circle)
            
        },
        addSoftRectangle: () => {
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS,
                rx: 20,
                ry: 20
            })

            addToCanvas(rectangle)
        },
        addRectangle: () => {
            const rectangle = new fabric.Rect({
                ...RECTANGLE_OPTIONS
            })

            addToCanvas(rectangle)
        },
        addTriangle: () => {
            const triangle = new fabric.Triangle({
                ...TRIANGLE_OPTIONS,
                angle: 0,
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
                ...DIAMOND_OPTIONS
            })

            addToCanvas(diamond)
        }
    }
}

export const useEditor = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)


    useAutoResize({
        canvas,
        container
    })

    const editor = useMemo(() => {
        if (canvas) {
            return buildEditor({ canvas })
        }

        return undefined
    }, [canvas])

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

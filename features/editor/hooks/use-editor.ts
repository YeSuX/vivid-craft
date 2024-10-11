import { useCallback, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "./use-auto-resize";

export const useEditor = () => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [container, setContainer] = useState<HTMLDivElement | null>(null)


    useAutoResize({
        canvas,
        container
    })

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
        console.log("init");

        // this is the function that will be used to initialize the editor
        // TODO: this can't work, need to find a way to set the cornerStyle to circle for all objects
        // fabric.Object.prototype.set({
        //     cornerColor: "#FFF",
        //     cornerStyle: "circle",
        //     borderColor: "#3b82f6",
        //     borderScaleFactor: 1.5,
        //     transparentCorners: false,
        //     borderOpacityWhenMoving: 1,
        //     cornerStrokeColor: "#3b82f6",
        // });


        const test = new fabric.Rect({
            width: 100,
            height: 100,
            fill: 'red',
            top: 100,
            left: 100,
        })

        test.cornerStyle = 'circle'

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



        initialCanvas.add(test)
        initialCanvas.centerObject(test)

        setCanvas(initialCanvas)
        setContainer(initialContainer)
    }, [])

    return {
        init,
    };
};

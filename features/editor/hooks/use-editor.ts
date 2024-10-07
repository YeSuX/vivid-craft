import { useCallback } from "react";
import * as fabric  from "fabric";

export const useEditor = () => {

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
        // TODO: add the ability to add custom controls to the editor
        fabric.Object.prototype.set({
            cornerColor:'red',
            cornerStyle:'circle',
            borderColor:'red',
            borderScaleFactor:2,
            transparentCorners:false,
            borderOpacityWhenMoving:0.8,
            cornerStrokeColor:'red',
        })

        const initialWorkspace = new fabric.Rect({
            width:900,
            height:1200,
            name:'clip',
            fill:'white',
            selectable:false,
            hasControls:false,
            shadow:new fabric.Shadow({
                color:'rgba(0,0,0,0.8)',
                blur:5,
            })
        })

        initialCanvas.setWidth(initialContainer.offsetWidth)
        initialCanvas.setHeight(initialContainer.offsetHeight)

        initialCanvas.add(initialWorkspace)
        initialCanvas.centerObject(initialWorkspace)
        initialCanvas.clipPath = initialWorkspace
        
        const test = new fabric.Rect({
            width:100,
            height:100,
            fill:'red',
            top:100,
            left:100,
        })
        
        initialCanvas.add(test)
        initialCanvas.centerObject(test)
    }, [])

    return {
        init,
    };
};

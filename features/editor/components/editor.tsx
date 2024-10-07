"use client"

import { useEffect, useRef } from "react"
import { useEditor } from "@/features/editor/hooks/use-editor"
import * as fabric from "fabric"

const Editor = () => {

    const { init } = useEditor()

    // this is the canvas that will be used to draw the shapes
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // this is the div that will be used to contain the canvas
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // this is the canvas that will be used to draw the shapes
        const canvas = new fabric.Canvas(canvasRef.current!,
            {
                // this option is used to control the position of the control buttons
                controlsAboveOverlay: true,
                // this option is used to control the stacking of the objects
                preserveObjectStacking: true,
            }
        )
        init(
            {
                initialCanvas: canvas,
                initialContainer: containerRef.current!
            }
        )

        // this is the cleanup function that will be used to destroy the canvas
        return () => {
            canvas.dispose()
        }
    }, [init])

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 h-full bg-muted" ref={containerRef}>
                <canvas className="" ref={canvasRef} />
            </div>
        </div>
    )
}
export default Editor
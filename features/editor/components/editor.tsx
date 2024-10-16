"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import * as fabric from "fabric"

import { useEditor } from "@/features/editor/hooks/use-editor"
import Navbar from "@/features/editor/components/navbar"
import Sidebar from "@/features/editor/components/sidebar"
import Toolbar from "@/features/editor/components/toolbar"
import Footer from "@/features/editor/components/footer"
import { ActiveTool } from "@/features/editor/types"
import ShapeSidebar from "@/features/editor/components/shape-sidebar"

const Editor = () => {
    const [activeTool, setActiveTool] = useState<ActiveTool>('select')


    const onChangeActiveTool = useCallback((tool: ActiveTool) => {
        if (tool === activeTool) {
            setActiveTool('select')
        }

        if (tool === 'draw') {
            // TODO: Enable draw mode
        }

        if (activeTool === 'draw') {
            // TODO: Disable draw mode
        }

        setActiveTool(tool)
    }, [activeTool])

    const { init, editor } = useEditor()

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
            <Navbar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
            <div className=" absolute h-[calc(100%-68px)] w-full top-[68px] flex">
                <Sidebar activeTool={activeTool} onChangeActiveTool={onChangeActiveTool} />
                <ShapeSidebar
                    activeTool={activeTool}
                    onChangeActiveTool={onChangeActiveTool}
                    editor={editor}
                />
                <main className=" bg-muted flex-1 overflow-auto relative flex flex-col">
                    <Toolbar />
                    <div className="flex-1 h-[calc(100%-124px)] bg-muted" ref={containerRef}>
                        <canvas className="" ref={canvasRef} />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    )
}
export default Editor
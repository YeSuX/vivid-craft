import { useEffect } from "react"
import * as fabric from "fabric"

interface UseCanvasEventsProps {
    canvas: fabric.Canvas | null
    setSelectedObject: (objects: fabric.Object[]) => void
}

export const useCanvasEvents = ({
    canvas,
    setSelectedObject
}: UseCanvasEventsProps) => {
    useEffect(() => {
        if (canvas) {
            canvas.on('selection:created', (event) => {
                console.log('selection:created', event)
                setSelectedObject(event.selected || [])
            })
            canvas.on('selection:updated', (event) => {
                console.log('selection:updated', event)
                setSelectedObject(event.selected || [])
            })
            canvas.on('selection:cleared', () => {
                console.log('selection:cleared')
                setSelectedObject([])
            })
        }

        return () => {
            canvas?.off('selection:created')
            canvas?.off('selection:updated')
            canvas?.off('selection:cleared')
        }
    }, [
        canvas,
        // Don't need for this, this is from setState
        setSelectedObject
    ])
}
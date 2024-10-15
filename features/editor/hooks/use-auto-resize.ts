import { Canvas } from "fabric"
import { useCallback, useEffect } from "react"
import * as fabric from "fabric"

interface UseAutoResizeProps {
    canvas: Canvas | null
    container: HTMLDivElement | null
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {

    const autoZoom = useCallback(() => {
        console.log("autoZoom");
        if (!canvas || !container) return

        const width = container.offsetWidth
        const height = container.offsetHeight

        canvas.setWidth(width);
        canvas.setHeight(height);

        const center = canvas.getCenterPoint()


        const zoomRatio = 0.85

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const localWorkspace = canvas.getObjects().find((obj) => obj.name === 'clip')

        const scale = fabric.util.findScaleToFit(localWorkspace!, {
            width: width,
            height: height,
        });

        const zoom = scale * zoomRatio

        canvas.setViewportTransform(fabric.iMatrix.concat() as fabric.TMat2D);
        canvas.zoomToPoint(new fabric.Point(center.x, center.y), zoom);

        if (!localWorkspace) return;

        const workspaceCenter = localWorkspace.getCenterPoint();
        const viewportTransform = canvas.viewportTransform;

        if (
            canvas.width === undefined ||
            canvas.height === undefined ||
            !viewportTransform
        ) {
            return;
        }

        viewportTransform[4] = canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

        viewportTransform[5] = canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

        canvas.setViewportTransform(viewportTransform);

        // (localWorkspace as fabric.Rect).clone((cloned: fabric.Rect) => {
        //     console.log('cloned',cloned);
            
        //     canvas.clipPath = cloned;
        //     canvas.requestRenderAll();
        // });

    }, [canvas, container])

    useEffect(() => {
        let resizeObserver: ResizeObserver | null = null

        if (canvas && container) {
            resizeObserver = new ResizeObserver(() => {
                autoZoom()
            })
            resizeObserver.observe(container)
        }

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect()
            }
        }
    }, [canvas, container, autoZoom])

    return { autoZoom }
}
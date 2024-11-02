import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState, useEffect, useMemo } from "react"

interface OpacitySidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    editor: Editor | undefined
}

const OpacitySidebar = ({ activeTool, onChangeActiveTool, editor }: OpacitySidebarProps) => {

    const initialValue = editor?.getActiveOpacity() || 1

    const selectedObject = useMemo(() => {
        return editor?.selectedObject[0]
    }, [editor?.selectedObject])

    const [opacity, setOpacity] = useState(initialValue)

    // const onClose = () => {
    //     onChangeActiveTool("select")
    // }

    const onChangeOpacity = (value: number) => {
        editor?.changeOpacity(value)
        setOpacity(value)
    }

    useEffect(() => {
        if (selectedObject) {
            setOpacity(selectedObject.get('opacity') || 1)
        }
    }, [selectedObject])

    return (
        <aside
            className={cn(
                " bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "opacity" ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Opacity" description="Select a opacity for your canvas" />
            <ScrollArea>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">Opacity</Label>
                    <Slider
                        value={[opacity]}
                        onValueChange={(values) => onChangeOpacity(values[0])}
                        max={1}
                        step={0.01}
                        min={0}
                    />
                </div>  
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default OpacitySidebar

import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface StrokeWidthSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    editor: Editor | undefined
}

const StrokeWidthSidebar = ({ activeTool, onChangeActiveTool, editor }: StrokeWidthSidebarProps) => {

    // const value = editor?.getActiveStrokeWidth() || STROKE_WIDTH

    // const onClose = () => {
    //     onChangeActiveTool("select")
    // }

    // const onChange = (value: number) => {
    //     editor?.changeStrokeWidth(value)
    // }

    return (
        <aside
            className={cn(
                " bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "stroke-width" ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Stroke options" description="Select a stroke width for your canvas" />
            <ScrollArea>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">Stroke width</Label>
                    <Slider />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default StrokeWidthSidebar

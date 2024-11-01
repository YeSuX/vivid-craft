import { cn } from "@/lib/utils"
import { ActiveTool, Editor, STROKE_DASH_ARRAY } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { STROKE_WIDTH } from "../types"
import { Button } from "@/components/ui/button"

interface StrokeWidthSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    editor: Editor | undefined
}

const StrokeWidthSidebar = ({ activeTool, onChangeActiveTool, editor }: StrokeWidthSidebarProps) => {

    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH
    const dashArrayValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY

    // const onClose = () => {
    //     onChangeActiveTool("select")
    // }

    const onChangeStrokeWidth = (value: number) => {
        editor?.changeStrokeWidth(value)
    }

    const onChangeStrokeType = (value: number[]) => {
        editor?.changeStrokeDashArray(value)
    }

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
                    <Slider
                        value={[widthValue]}
                        onValueChange={(values) => onChangeStrokeWidth(values[0])}
                    />
                </div>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">Stroke type</Label>
                    <Button 
                        variant={'secondary'}
                        size={'lg'}
                        className={cn(
                            "w-full h-16 justify-start text-left py-2 px-4",
                            dashArrayValue.length === 0 && 'border-2 border-blue-500'
                        )}
                        onClick={() => onChangeStrokeType([])}
                    >
                        <div 
                            className="w-full border-black rounded-full border-4"
                        ></div>
                    </Button>
                    <Button 
                        variant={'secondary'}
                        size={'lg'}
                        className={cn(
                            "w-full h-16 justify-start text-left py-2 px-4",
                            JSON.stringify(dashArrayValue) === JSON.stringify([5, 5]) && 'border-2 border-blue-500'
                        )}
                        onClick={() => onChangeStrokeType([5, 5])}
                    >
                        <div 
                            className="w-full border-black rounded-full border-4 border-dashed"
                        ></div>
                    </Button>
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default StrokeWidthSidebar

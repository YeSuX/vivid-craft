import { cn } from "@/lib/utils"
import { ActiveTool, Editor, FILL_COLOR } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool"
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa"
import { IoTriangle } from "react-icons/io5"
import { FaDiamond } from "react-icons/fa6"
import ColorPicker from "./color-picker"

interface FillColorSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    editor: Editor | undefined
}

const FillColorSidebar = ({ activeTool, onChangeActiveTool, editor }: FillColorSidebarProps) => {

    const value = editor?.fillColor || FILL_COLOR

    const onClose = () => {
        onChangeActiveTool("select")
    }

    const onChange = (value: string) => {
        editor?.changeFillColor(value)
    }

    return (
        <aside
            className={cn(
                " bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "fill" ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Fill color" description="Select a fill color for your canvas" />
            <ScrollArea>
                <div className="p-4 space-y-6">
                    <ColorPicker 
                        value={value}
                        onChange={onChange}                    
                    />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default FillColorSidebar
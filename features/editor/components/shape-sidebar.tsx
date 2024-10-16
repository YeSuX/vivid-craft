import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import ShapeTool from "./shape-tool"
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa"
import { IoTriangle } from "react-icons/io5"
import { FaDiamond } from "react-icons/fa6"

interface ShapeSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    editor: Editor | undefined
}

const ShapeSidebar = ({ activeTool, onChangeActiveTool, editor }: ShapeSidebarProps) => {
    return (
        <aside
            className={cn(
                " bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "shapes" ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Shapes" description="Select a shape to add to your canvas" />
            <ScrollArea>
                <div className="grid grid-cols-3 gap-4 p-4">
                    <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
                    <ShapeTool onClick={() => editor?.addSoftRectangle()} icon={FaSquare} />
                    <ShapeTool onClick={() => editor?.addRectangle()} icon={FaSquareFull} />
                    <ShapeTool onClick={() => editor?.addTriangle()} icon={IoTriangle} />
                    <ShapeTool onClick={() => editor?.addDiamond()} icon={FaDiamond} />
                </div>
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default ShapeSidebar
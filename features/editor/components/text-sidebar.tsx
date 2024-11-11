import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"

interface TextSidebarProps {
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
    editor: Editor | undefined
}

const TextSidebar = ({ activeTool, onChangeActiveTool, editor }: TextSidebarProps) => {

    // const onClose = () => {
    //     onChangeActiveTool("select")
    // }

    return (
        <aside
            className={cn(
                " bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
                activeTool === "text" ? 'visible' : 'hidden'
            )}
        >
            <ToolSidebarHeader title="Text" description="Add text to your canvas" />
            <ScrollArea>
                <div className="p-4 space-y-6 border-b">
                    <Label className="text-sm">Text</Label>
                    
                </div>  
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default TextSidebar
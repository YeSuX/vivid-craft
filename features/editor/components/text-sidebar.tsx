import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import ToolSidebarHeader from "./tool-sidebar-header"
import ToolSidebarClose from "./tool-sidebar-close"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

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
                    <Button 
                        onClick={() => editor?.addText('Textbox')}
                        className="w-full"
                    >
                        Add a textbox
                    </Button>
                    <Button 
                        onClick={() => editor?.addText('Heading', {
                            fontSize: 80,
                            fontWeight: 700,
                        })}
                        variant={'secondary'}
                        size={'lg'}
                        className="w-full"
                    >
                        <span className="font-bold">
                            Add a heading
                        </span>
                    </Button>
                    <Button 
                        onClick={() => editor?.addText('Subheading', {
                            fontSize: 40,
                            fontWeight: 500,
                        })}
                        variant={'secondary'}
                        size={'lg'}
                        className="w-full"
                    >
                        <span className="font-semibold">
                            Add a subheading
                        </span>
                    </Button>
                    <Button 
                        onClick={() => editor?.addText('Paragraph', {
                            fontSize: 20,
                            fontWeight: 400,
                        })}
                        variant={'secondary'}
                        size={'lg'}
                        className="w-full"
                    >
                        <span className="font-medium">
                            Paragraph
                        </span>
                    </Button>
                    
                </div>  
            </ScrollArea>
            <ToolSidebarClose onClick={() => onChangeActiveTool("select")} />
        </aside>
    )
}
export default TextSidebar
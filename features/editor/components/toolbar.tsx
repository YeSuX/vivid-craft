import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import Hint from "@/components/hint"

interface ToolbarProps {
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {

    const fillColor = editor?.fillColor

    if (editor?.selectedObject.length === 0) {
        return (
            <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
        )
    }

    return (
        <div className=" shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
            <div className="flex items-center justify-center h-full">
                <Hint label="Color" side="bottom" sideOffset={5}>
                    <Button
                        variant="ghost"
                        className={
                            cn(
                                activeTool === "fill" && "bg-gray-100"
                            )
                        }
                        onClick={() => onChangeActiveTool("fill")}
                        size={'icon'}
                    >
                        <div
                            className="rounded-sm size-4 border"
                            style={{
                                backgroundColor: fillColor
                            }}
                        >

                        </div>
                    </Button>
                </Hint>
            </div>
        </div>
    )
}
export default Toolbar
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ActiveTool, Editor } from "../types"
import Hint from "@/components/hint"
import { BsBorderWidth } from "react-icons/bs"
import { ArrowDown, ArrowUp } from "lucide-react"

interface ToolbarProps {
    editor: Editor | undefined
    activeTool: ActiveTool
    onChangeActiveTool: (tool: ActiveTool) => void
}

const Toolbar = ({ editor, activeTool, onChangeActiveTool }: ToolbarProps) => {

    const fillColor = editor?.getActiveFillColor()
    const strokeColor = editor?.getActiveStrokeColor()

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
            <div className="flex items-center justify-center h-full">
                <Hint label="Stroke color" side="bottom" sideOffset={5}>
                    <Button
                        variant="ghost"
                        className={
                            cn(
                                activeTool === 'stroke-color' && "bg-gray-100"
                            )
                        }
                        onClick={() => onChangeActiveTool('stroke-color')}
                        size={'icon'}
                    >
                        <div
                            className="rounded-sm size-4 border-2 bg-white"
                            style={{
                                borderColor: strokeColor
                            }}
                        >

                        </div>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center justify-center h-full">
                <Hint label="Stroke width" side="bottom" sideOffset={5}>
                    <Button
                        variant="ghost"
                        className={
                            cn(
                                activeTool === 'stroke-width' && "bg-gray-100"
                            )
                        }
                        onClick={() => onChangeActiveTool('stroke-width')}
                        size={'icon'}
                    >
                        <BsBorderWidth className="size-4"/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center justify-center h-full">
                <Hint label="Bring to front" side="bottom" sideOffset={5}>
                    <Button
                        variant="ghost"
                        onClick={() => editor?.bringToFront()}
                        size={'icon'}
                    >
                        <ArrowUp className="size-4"/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center justify-center h-full">
                <Hint label="Send to back" side="bottom" sideOffset={5}>
                    <Button
                        variant="ghost"
                        onClick={() => editor?.sendToBack()}
                        size={'icon'}
                    >
                        <ArrowDown className="size-4"/>
                    </Button>
                </Hint>
            </div>
        </div>
    )
}
export default Toolbar
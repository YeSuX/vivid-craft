import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ToolSidebarCloseProps {
    onClick: () => void
}

const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
    return (
        <Button onClick={onClick} variant="ghost" size="icon" className="absolute bg-white border-r border-y group rounded-r-xl flex items-center justify-center -right-[2.0rem] top-1/2 h-[70px] transform -translate-y-1/2 px-1 pr-2">
            <ChevronLeft className="size-4 text-black group-hover:opacity-75 transition" />
        </Button>
    )
}
export default ToolSidebarClose
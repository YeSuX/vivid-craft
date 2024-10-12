'use client'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import Logo from "@/features/editor/components/logo"
import { ChevronDown, MousePointerClick } from "lucide-react"
import { CiFileOn } from "react-icons/ci"

const Navbar = () => {
    return (
        <div className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
            <Logo />
            <div className=" w-full flex items-center h-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size='sm' variant='ghost'>
                            File
                            <ChevronDown className=" size-4 ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='start' className=" min-w-60">
                        <DropdownMenuItem
                            // TODO: Add functionality
                            onClick={() => { }}
                            className=" flex items-center gap-x-2">
                            <CiFileOn className=" size-6" />
                            <div>
                                <p>Open</p>
                                <p className=" text-xs text-muted-foreground">
                                    Open a JSON file
                                </p>
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Separator orientation='vertical' className=" mx-2"/>
                <Button variant='ghost' size={'icon'} onClick={()=>{}}>
                    <MousePointerClick className="size-4"/>
                </Button>
            </div>
        </div>
    )
}

export default Navbar
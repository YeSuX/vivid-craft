'use client'

import {
  LayoutTemplate,
  ImageIcon,
  Settings,
  Shapes,
  Sparkles,
  Type
} from "lucide-react"
import SidebarItem from "./sidebar-item"
import { ActiveTool } from "../types"

interface SidebarProps{
  activeTool: ActiveTool
  onChangeActiveTool: (tool: ActiveTool) => void
}

const Sidebar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <div className=" bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className=" flex flex-col">
        <SidebarItem icon={LayoutTemplate} label="Design" isActive={activeTool === 'templates'} onClick={() => { onChangeActiveTool('templates') }} />
        <SidebarItem icon={ImageIcon} label="Image" isActive={activeTool === 'image'} onClick={() => { onChangeActiveTool('image') }} />
        <SidebarItem icon={Type} label="Type" isActive={activeTool === 'text'} onClick={() => { onChangeActiveTool('text') }} />
        <SidebarItem icon={Shapes} label="Shapes" isActive={activeTool === 'shapes'} onClick={() => { onChangeActiveTool('shapes') }} />
        <SidebarItem icon={Sparkles} label="AI" isActive={activeTool === 'ai'} onClick={() => { onChangeActiveTool('ai') }} />
        <SidebarItem icon={Settings} label="Settings" isActive={activeTool === 'settings'} onClick={() => { onChangeActiveTool('settings') }} />
      </ul>
    </div>
  )
}
export default Sidebar
'use client'

import Logo from "@/features/editor/components/logo"

const Navbar = () => {
    return (
        <div className="w-full flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
            <Logo/>
        </div>
    )
}

export default Navbar
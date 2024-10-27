import { ChromePicker, CirclePicker } from "react-color"
import { colors } from "../types"
import { rgbaObjectToString } from "../utils"

interface ColorPickerProps {
    value: string
    onChange: (color: string) => void
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
    return <div className="w-full space-y-4">
        <ChromePicker
            color={value}
            onChange={(color)=>{
                const formattedColor = rgbaObjectToString(color.rgb)
                onChange(formattedColor)
            }}
            className="border rounded-lg"
        />
        <CirclePicker
            color={value}
            colors={colors}
            onChangeComplete={(color)=>{
                const formattedColor = rgbaObjectToString(color.rgb)
                onChange(formattedColor)
            }}
        />  
    </div>
}

export default ColorPicker
'use client'
import '../../app/globals.css'
import LightIcon from '../../../public/icons/light.svg'
import LightIconM from '../../../public/icons/light-m.svg'
import ToolsIcon from '../../../public/icons/tools.svg'
import ToolsIconM from '../../../public/icons/tools-m.svg' 
import ElectricIcon from '../../../public/icons/electric.svg'
import ElectricIconM from '../../../public/icons/electric-m.svg' 
import ControlIcon from '../../../public/icons/control.svg' 
import ControlIconM from '../../../public/icons/control-m.svg' 
import RepairIcom from '../../../public/icons/repair.svg' 
import RepairIcomM from '../../../public/icons/repair-m.svg' 
import DiagnosticsIcom from '../../../public/icons/diagnostics.svg' 
import DiagnosticsIcomM from '../../../public/icons/diagnostics-m.svg' 
import RadioIcon from '../../../public/icons/radio.svg' 
import RadioIconM from '../../../public/icons/radio-m.svg' 
import PersentIcon from '../../../public/icons/persent.svg' 
import PersentIconM from '../../../public/icons/persent-m.svg' 

const CategoryIcon = ({category = 'light', size = 's', bg = 'primary'}) => {

  const baseStyle = 'flex justify-center items-center rounded-2xl'

  const categories = {
    s: {
      light: <LightIcon />,
      tools: <ToolsIcon />,
      electric: <ElectricIcon />,
      control: <ControlIcon />,
      repair: <RepairIcom />,
      diagnostics: <DiagnosticsIcom />,
      radio: <RadioIcon />,
      discount: <PersentIcon />
    },
    m: {
      light: <LightIconM />,
      tools: <ToolsIconM />,
      electric: <ElectricIconM />,
      control: <ControlIconM />,
      repair: <RepairIcomM />,
      diagnostics: <DiagnosticsIcomM />,
      radio: <RadioIconM />,
      discount: <PersentIconM />
    }
  }

  const sizes = {
    s: 'w-[60px] h-[60px] p-[14px]',
    m: 'w-[100px] h-[100px] p-[18px]'
  }

  const background = {
    primary: 'bg-primary',
    bronze: 'bg-bronze'
  }

  const combined =`${baseStyle} ${sizes[size]} ${background[bg]}`.trim()

  return (
    <div className={combined}>
      <div className="rounded-2xl"></div>
      {categories[size][category]}
    </div>
  )
}

export default CategoryIcon
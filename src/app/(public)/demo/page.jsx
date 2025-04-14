import CardStateLabel from '@/components/commonUI/CardStateLable'
import BtnGost from '@/components/commonUI/BtnGost'
import BtnSolid from '@/components/commonUI/BtnSolid'
import CategoryIcon from '@/components/commonUI/CategoryIcon'
import DemoSection from '@/components/commonUI/DemoSection'

const DemoPage = () => {

  return (
    <div className='max-w-[900px] mx-auto'>
      <h1 className='text-2xl mb-8'>Demo Page</h1>
      <section className='mb-8'> 
        <h2 className='text-xl mb-2'>Gradients</h2>
        <div className='grid grid-cols-6 gap-4 h-40'>
          <div className='w-full h-full bg-primary'></div>
          <div className='w-full h-full bg-bronze'></div>
          <div className='w-full h-full bg-other-1'></div>
          <div className='w-full h-full bg-other-2'></div>
          <div className='w-full h-full bg-other-3'></div>
          <div className='w-full h-full bg-other-4'></div>
          </div>
      </section>
      <section>
        <h2 className='text-xl mb-4'>BtnSolid</h2>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col gap-2'>
            <BtnSolid size='xxl'>XXL BtnSolid</BtnSolid>
            <BtnSolid variant='bronze' size='xxl'>XXL BtnSolid</BtnSolid>
            <BtnSolid variant='green' size='xxl' >XXL BtnSolid</BtnSolid>
          </div>
          <div className='flex flex-col gap-2'>
            <BtnSolid size='m'>M BtnSolid</BtnSolid>
            <BtnSolid variant='bronze' size='m'>M BtnSolid</BtnSolid>
            <BtnSolid variant='green' size='m' >M BtnSolid</BtnSolid>
          </div>
          <div className='flex flex-col gap-2'>
            <BtnSolid size='s'>S BtnSolid</BtnSolid>
            <BtnSolid variant='bronze' size='s'>S BtnSolid</BtnSolid>
            <BtnSolid variant='green' size='s' >S BtnSolid</BtnSolid>
          </div>
        </div>
      </section>
      <section>
        <h2 className='text-xl mb-4'>BtnGost</h2>
        <div className='grid grid-cols-3 gap-4'>
          <div className='flex flex-col gap-2'>
            <BtnGost>BtnGost</BtnGost>
          </div>
          <div className='flex flex-col gap-2'>
            <BtnGost variant='outlined'>BtnGost Outlined</BtnGost>
          </div>
          <div className='flex flex-col gap-2'>
            <BtnGost variant='block'>BtnGost Block</BtnGost>
          </div>
        </div>
      </section>
      <DemoSection>
        <h2 className="text-xl mb-4">
          Buttons for cards
        </h2>
        <div className='flex gap-8'>
          <CardStateLabel size='m'/>
          <CardStateLabel size='m' variant='yellow' />
          <CardStateLabel size='m' variant='grey'/>
          <CardStateLabel />
          <CardStateLabel variant='yellow' />
          <CardStateLabel variant='grey'/>
        </div>
      </DemoSection>
      <section>
        <h2 className='text-xl mb-8'>
          Category Icons
        </h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className="grid grid-cols-4 gap-2">
            <CategoryIcon size='m' category='light' />
            <CategoryIcon size='m' category='tools' />
            <CategoryIcon size='m' category='electric' />
            <CategoryIcon size='m' category='control' />
            <CategoryIcon size='m' category='repair' />
            <CategoryIcon size='m' category='diagnostics' />
            <CategoryIcon size='m' category='radio' />
            <CategoryIcon size='m' category='persent' bg='bronze'/>
          </div>
          <div className="grid grid-cols-4">
            <CategoryIcon category='light' />
            <CategoryIcon category='tools' />
            <CategoryIcon category='electric' />
            <CategoryIcon category='control' />
            <CategoryIcon category='repair' />
            <CategoryIcon category='diagnostics'/>
            <CategoryIcon category='radio' />
            <CategoryIcon category='persent' bg='bronze' />
          </div>
        </div>
      </section>
    </div>
  )
}

export default DemoPage
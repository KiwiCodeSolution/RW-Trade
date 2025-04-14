'use client'

const DemoSection = ({children}) => {

  const handleAction = () => {
    alert('Click!')
  }
  return (
    <section className="my-8 border-b-sc-4">{children}</section>
  )
}

export default DemoSection
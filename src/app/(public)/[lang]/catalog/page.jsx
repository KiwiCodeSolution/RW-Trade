import AllItemsSection from "@/components/userUI/AllItemsSection"
import Breadcrumbs from "@/components/userUI/Breadcrumbs"
import CategoriesSection from "@/components/userUI/CategoriesSection"

const Catalog = () => {

  return (
    <div>
      <div className="user-container">
        {/* <Breadcrumbs /> */}
        <CategoriesSection />
        <AllItemsSection />
      </div>
    </div>
  )
}

export default Catalog

import { MainNav } from "./main-nav"
import StoreSwitcher from "./store-switcher"

export const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher />
        <div>
          This is a component navbar
        </div>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex items-center space-x-4">
          <div className="w-[30px] h-[30px] bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

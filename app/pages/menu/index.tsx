import NavBar from "@/app/components/NavBar"
import Search from "@/app/components/Search"
import Banner from './components/Banner'
import MeunWrap from './components/MeunWrap'
import './index.scss'
const MenuMain = () => {
  return <div className="menu-wrap">
      <NavBar />
      <Search />
      <Banner />
      <MeunWrap/>
  </div>
}
export default MenuMain
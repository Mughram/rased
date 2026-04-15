import HomeView from './HomeView'
import ShipmentsView from './ShipmentsView'
import MapMenuView from './MapMenuView'
import InfoView from './InfoView'

export default function ViewRouter({ activeTab, currentItem }) {
  switch (activeTab) {
    case 'shipments':
      return <ShipmentsView />
    case 'map':
      return <MapMenuView />
    case 'info':
      return <InfoView currentItem={currentItem} />
    case 'home':
    default:
      return <HomeView currentItem={currentItem} />
  }
}

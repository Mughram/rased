import { useEffect, useState } from 'react'
import AuthModal from './components/AuthModal'
import HeaderBar from './components/HeaderBar'
import LoadingScreen from './components/LoadingScreen'
import MobileNav from './components/MobileNav'
import Sidebar from './components/Sidebar'
import ViewRouter from './components/views/ViewRouter'
import { items } from './data/appData'

const FIRST_VISIT_KEY = 'rased-auth-seen'
const LOADING_DELAY_MS = 1000

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [authMode, setAuthMode] = useState('signin')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const currentItem = items.find((item) => item.id === activeTab) ?? items[0]

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false)
    }, LOADING_DELAY_MS)

    const hasSeenAuth = window.localStorage.getItem(FIRST_VISIT_KEY)

    if (!hasSeenAuth) {
      setShowAuthModal(true)
    }

    return () => window.clearTimeout(loadingTimer)
  }, [])

  function handleCloseAuth() {
    window.localStorage.setItem(FIRST_VISIT_KEY, 'true')
    setShowAuthModal(false)
  }

  return (
    <main dir="rtl" className="min-h-screen bg-[#1f211d] text-white">
      <section className="mx-auto min-h-screen w-full max-w-[1440px] px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-8">
        <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-5 lg:flex-row lg:items-stretch">
          <Sidebar
            items={items}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          <div className="flex min-w-0 flex-1 flex-col">
            <HeaderBar currentItem={currentItem} />

            <section className="mt-5 flex-1 rounded-[32px] border border-white/8 bg-[#2b2d28] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.18)] sm:p-8 lg:p-10">
              <ViewRouter activeTab={activeTab} currentItem={currentItem} />
            </section>
          </div>
        </div>
      </section>

      <MobileNav
        items={items}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {showAuthModal ? (
        <AuthModal
          mode={authMode}
          onModeChange={setAuthMode}
          onClose={handleCloseAuth}
        />
      ) : null}

      {isLoading ? <LoadingScreen /> : null}
    </main>
  )
}

export default App

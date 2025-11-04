import React, { useState } from 'react'
import {
  Menu,
  X,
  ChevronDown,
  Lock,
  LayoutGrid,
  MessageSquare,
  PanelLeft,
  Sparkle,
} from 'lucide-react'
import { Button } from '../ui/button'

interface EditorNavbarProps {
  projectName?: string
  documentTitle?: string
  isPinned?: boolean
  onTogglePin?: () => void
}

const NavBar: React.FC<EditorNavbarProps> = ({
  projectName = 'Godfather',
  documentTitle: _documentTitle = 'Untitled Doc',
  isPinned: _isPinned = false,
  onTogglePin: _onTogglePin,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className="bg-background border-secondary text-primary relative z-50">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-4 w-4" />
            </Button>

            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded">
              <span className="font-medium text-sm leading-[20px]">
                {projectName}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-primary-gray" />
            </button>

            {/* Draft and Board buttons - hidden on mobile */}
            <div className="hidden md:flex items-center gap-1">
              <Button variant="outline">
                <Lock className="h-3.5 w-3.5" />
                <span>Draft</span>
              </Button>
              <Button>
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Board</span>
              </Button>
              <div className="w-px h-3 bg-secondary-border" />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="text-primary">
              <MessageSquare className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="text-primary">
              <PanelLeft className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" className="text-primary">
              <Sparkle className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-secondary z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-secondary">
          <span className="font-medium text-sm">{projectName}</span>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary"
            onClick={closeMobileMenu}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={closeMobileMenu}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>Draft</span>
          </Button>
          <Button className="w-full justify-start" onClick={closeMobileMenu}>
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Board</span>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NavBar

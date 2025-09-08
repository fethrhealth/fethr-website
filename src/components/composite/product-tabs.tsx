'use client'

import React, { useState, useRef } from 'react'
import { 
  AppHeader, 
  AppSidebar, 
  ContentToolbar, 
  SelectionBar, 
  ThreePanelLayout, 
  TabBar 
} from '@/components/product-layout'
import { MonitorTable } from '@/components/composite/monitor'
import { TablesGrid } from '@/components/composite/tables'
import { 
  WorkflowCanvas, 
  WorkflowStep, 
  WorkflowConnector, 
  WorkflowRunsPanel,
  AIChatPanel 
} from '@/components/composite/workflow'
import { useProductAnimations } from '@/hooks/use-product-animations'

interface Tab {
  id: string
  label: string
}

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const tabs: Tab[] = [
    { id: 'monitor', label: 'Monitor' },
    { id: 'workflows', label: 'Workflows' },
    { id: 'tables', label: 'Tables' },
    { id: 'ai', label: 'AI' }
  ]

  const {
    animationStates,
    progress,
    setIsAutoPlaying: setAnimationAutoPlay
  } = useProductAnimations({
    activeTab,
    autoPlay: isAutoPlaying,
    cycleDuration: 5000
  })

  const handleTabClick = (index: number) => {
    if (index === activeTab) return
    
    setActiveTab(index)
    setIsAutoPlaying(false)
    setAnimationAutoPlay(false)
  }

  // Navigation configuration for sidebar
  const getNavigationSections = () => {
    const monitoringSection = {
      title: 'Monitoring',
      items: [
        {
          id: 'monitor',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 4.75h14a1.25 1.25 0 0 1 1.25 1.25v10a1.25 1.25 0 0 1-1.25 1.25H5A1.25 1.25 0 0 1 3.75 16V6a1.25 1.25 0 0 1 1.25-1.25Z" />
              <path d="M7 10v4" />
              <path d="M12 8v6" />
              <path d="M17 9v5" />
              <path d="M8 20h8" />
            </svg>
          ),
          label: 'Monitor',
          active: activeTab === 0
        },
        {
          id: 'logs',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
          ),
          label: 'Logs',
          active: false
        }
      ]
    }

    const toolsSection = {
      title: 'Tools & Analytics',
      items: [
        {
          id: 'tables',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.9707 15.3494L20.9707 15.355M20.9405 9.61588H2.99699M8.77661 9.61588V21.1367M20.9405 5.85547V19.1367C20.9405 20.2413 20.0451 21.1367 18.9405 21.1367H4.99699C3.89242 21.1367 2.99699 20.2413 2.99699 19.1367V5.85547C2.99699 4.7509 3.89242 3.85547 4.99699 3.85547H18.9405C20.0451 3.85547 20.9405 4.7509 20.9405 5.85547Z" />
            </svg>
          ),
          label: 'Tables',
          active: activeTab === 2
        },
        {
          id: 'workflows',
          icon: (
            <svg width="14" height="14" fill="#75777C" viewBox="0 0 16 16">
              <path fillRule="evenodd" clipRule="evenodd" d="M5 2C5 1.44772 4.55228 1 4 1H2C1.44772 1 1 1.44772 1 2V4C1 4.55228 1.44772 5 2 5H4C4.55228 5 5 4.55228 5 4V2Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M6 4.24988C6.15698 4.45881 6.25 4.71854 6.25 5V11C6.25 12.5188 7.48122 13.75 9 13.75H10V12.25H9C8.30964 12.25 7.75 11.6904 7.75 11V8.45015C8.12503 8.64186 8.54989 8.75 9 8.75H10V7.25H9C8.30964 7.25 7.75 6.69036 7.75 6V5C7.75 3.83401 7.02434 2.8375 6 2.43747V4.24988Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M11 7C11 6.44772 11.4477 6 12 6H14C14.5523 6 15 6.44772 15 7V9C15 9.55229 14.5523 10 14 10H12C11.4477 10 11 9V7Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M11 12C11 11.4477 11.4477 11 12 11H14C14.5523 11 15 11.4477 15 12V14C15 14.5523 14.5523 15 14 15H12C11.4477 15 11 14.5523 11 14V12Z" />
            </svg>
          ),
          label: 'Workflows',
          active: activeTab === 1
        }
      ]
    }

    const billingSection = {
      title: 'Billing',
      items: [
        {
          id: 'usage',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75777C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="M7 11.207a.5.5 0 0 1 .146-.353l2-2a.5.5 0 0 1 .708 0l3.292 3.292a.5.5 0 0 0 .708 0l4.292-4.292a.5.5 0 0 1 .854.353V16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1z" />
            </svg>
          ),
          label: 'Usage',
          active: false
        }
      ]
    }

    return [monitoringSection, toolsSection, billingSection]
  }

  // Applied filters configuration
  const getAppliedFilters = () => {
    if (activeTab === 0) { // Monitor
      return [{
        type: 'status',
        operator: 'is' as const,
        values: [{ value: 'stopped', displayName: 'Stopped', statusType: 'stopped' as const }],
        onRemove: () => console.log('Remove status filter')
      }]
    }
    return []
  }

  const renderTabContent = () => {
    const currentTab = tabs[activeTab]
    
    switch (currentTab.id) {
      case 'monitor':
        return (
          <ThreePanelLayout
            leftPanel={
              <AppSidebar
                visible={true}
                companyName="Fethr Health"
                navigationSections={getNavigationSections()}
              />
            }
            leftPanelVisible={true}
          >
            <AppHeader
              title="Monitor"
              environment="development"
            />
            <ContentToolbar
              searchPlaceholder="Search Connectors"
              appliedFilters={getAppliedFilters()}
              onClearAllFilters={() => console.log('Clear all filters')}
            />
            <MonitorTable monitorAnimationPhase={animationStates.monitorPhase} />
          </ThreePanelLayout>
        )

      case 'workflows':
        return (
          <ThreePanelLayout
            leftPanel={
              <AppSidebar
                visible={true}
                companyName="Fethr Health" 
                navigationSections={getNavigationSections()}
              />
            }
            leftPanelVisible={true}
            rightPanel={<WorkflowRunsPanel runs={workflowRuns} />}
            rightPanelVisible={animationStates.workflowPhase === 'sidebar-entering' || animationStates.workflowPhase === 'steps-fading-in' || animationStates.workflowPhase === 'running'}
            rightPanelExiting={animationStates.workflowPhase === 'sidebar-exiting'}
          >
            <AppHeader
              title="Patient data automation pipeline"
              breadcrumb={{
                title: 'Workflows',
                icon: (
                  <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g stroke="#75777C" strokeWidth="1.1" strokeLinecap="round">
                      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round" />
                      <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round" />
                      <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8" />
                    </g>
                  </svg>
                )
              }}
              environment="development"
            />
            <WorkflowCanvas currentRun="Run #70">
              {/* Workflow steps content would go here */}
              <div className="absolute left-1/2 top-[68px] -translate-x-1/2">
                <WorkflowStep
                  title="Record command"
                  description="Trigger on a Company"
                  icon={<div className="w-5 h-5 bg-blue-100 rounded" />}
                  badge={{ text: 'Records' }}
                  status="running"
                />
              </div>
            </WorkflowCanvas>
          </ThreePanelLayout>
        )

      case 'tables':
        return (
          <ThreePanelLayout
            leftPanel={
              <AppSidebar
                visible={true}
                companyName="Fethr Health"
                navigationSections={getNavigationSections()}
              />
            }
            leftPanelVisible={true}
          >
            <AppHeader
              title="Tables"
              environment="development"
            />
            <ContentToolbar
              searchPlaceholder="Search Tables"
              onClearAllFilters={() => console.log('Clear all filters')}
            />
            <TablesGrid tablesAnimationPhase={animationStates.tablesPhase} />
          </ThreePanelLayout>
        )

      case 'ai':
        return (
          <ThreePanelLayout
            leftPanel={
              <AppSidebar
                visible={true}
                companyName="Fethr Health"
                navigationSections={getNavigationSections()}
              />
            }
            leftPanelVisible={true}
            rightPanel={
              <div className="flex flex-col h-full">
                <AppHeader
                  title="AI Assistant"
                  showHelp={false}
                  showNotifications={false}
                  showAI={false}
                />
                <AIChatPanel
                  visible={animationStates.aiPhase === 'ai-running' || animationStates.aiPhase === 'workflow-steps-appearing'}
                  exiting={animationStates.aiPhase === 'sidebar-exiting'}
                />
              </div>
            }
            rightPanelVisible={animationStates.aiPhase === 'ai-running' || animationStates.aiPhase === 'workflow-steps-appearing'}
            rightPanelExiting={animationStates.aiPhase === 'sidebar-exiting'}
          >
            <AppHeader
              title="AI Interface Builder"
              breadcrumb={{
                title: 'Workflows',
                icon: (
                  <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <g stroke="#75777C" strokeWidth="1.1" strokeLinecap="round">
                      <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round" />
                      <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round" />
                      <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8" />
                    </g>
                  </svg>
                )
              }}
              environment="development"
            />
            <WorkflowCanvas currentRun="AI Building...">
              {/* AI workflow steps would go here */}
            </WorkflowCanvas>
          </ThreePanelLayout>
        )

      default:
        return null
    }
  }

  // Mock workflow runs data
  const workflowRuns = [
    { id: '70', runNumber: 70, status: 'executing' as const, isCurrentRun: true },
    { id: '69', runNumber: 69, status: 'completed' as const, nodeCount: 15, completedTime: 'just now' }
  ]

  return (
    <section className="relative border-subtle-stroke border-t bg-gradient-to-b from-[#FDFDFD] to-white-100">
      <div className="container grid grid-cols-12">
        <div className="relative col-span-12 pb-7 lg:col-[2/-2]">
          <svg width="1" height="100%" className="text-subtle-stroke -left-px absolute">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>
          <svg width="1" height="100%" className="text-subtle-stroke -right-px absolute">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round" />
          </svg>
          
          <div className="relative">
            <TabBar
              tabs={tabs}
              activeTab={activeTab}
              progress={progress}
              showProgress={isAutoPlaying}
              onTabClick={handleTabClick}
            />

            <div className="mt-8">
              <div className="relative w-[calc(100vw-2rem)] -mx-[calc((100vw-100%)/2)] max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
                <div className="isolate">
                  <div className="w-full overflow-hidden border border-default-stroke bg-white-100 outline-4 outline-default-stroke/20 shadow-[0px_2px_6px_0px_rgba(28,40,64,0.06),0px_6px_20px_-2px_rgba(28,40,64,0.08)] h-[320px] rounded-l-xl border-y border-l sm:rounded-xl sm:border lg:h-[640px] lg:rounded-lg pointer-events-none select-none">
                    {renderTabContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductTabs
'use client'

import React, { useState, useEffect, useRef } from 'react';
import {
  ProductTabBar,
  WorkflowSidebar,
  WorkflowHeader,
  WorkflowToolbar,
  WorkflowCanvas,
  WorkflowStep,
  WorkflowConnector,
  WorkflowRunsSidebar
} from './workflow';

import {
  TablesFilters,
  TablesHeader,
  TablesContent as TablesDataContent // Rename the import to avoid conflict
} from './tables';

interface Tab {
  id: string;
  label: string;
}

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [workflowAnimationPhase, setWorkflowAnimationPhase] = useState<'hidden' | 'sidebar-entering' | 'steps-fading-in' | 'running' | 'sidebar-exiting'>('hidden');
  const [tablesAnimationPhase, setTablesAnimationPhase] = useState<'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'>('hidden');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const tabs: Tab[] = [
    { id: 'monitor', label: 'Monitor' },
    { id: 'workflows', label: 'Workflows' },
    { id: 'tables', label: 'Tables' },
    { id: 'ai', label: 'AI' }
  ];

  const CYCLE_DURATION = 5000;

  // Step states for workflow animation
  const [stepStates, setStepStates] = useState({
    trigger: 'inactive',
    research: 'inactive',
    switch: 'inactive'
  });

  // Auto-playing logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / CYCLE_DURATION) * 100, 100);
      
      setProgress(newProgress);
      
      if (elapsed >= CYCLE_DURATION) {
        setActiveTab((prev) => (prev + 1) % tabs.length);
        startTimeRef.current = currentTime;
      }
    };

    startTimeRef.current = Date.now();
    setProgress(0);
    
    intervalRef.current = setInterval(updateProgress, 16);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeTab, isAutoPlaying, tabs.length]);

  // Tables animations
  useEffect(() => {
    if (activeTab === 2) {
      // Start content fade-in at 0.5s
      setTimeout(() => {
        setTablesAnimationPhase('content-fading-in');
      }, 500);
      
      // Content becomes fully visible at 1s
      setTimeout(() => {
        setTablesAnimationPhase('visible');
      }, 1000);
      
      // At 4.5s, begin fade out phase
      setTimeout(() => {
        setTablesAnimationPhase('content-fading-out');
      }, 4500);
    } else {
      setTablesAnimationPhase('hidden');
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [activeTab]);

  // Workflow animations
  useEffect(() => {
    if (activeTab === 1) {
      // Start immediately with right sidebar coming in (1.25 seconds)
      setWorkflowAnimationPhase('sidebar-entering');
      
      // At 0.25s, workflow steps start fading in (1s transition, complete at 1.25s)
      setTimeout(() => {
        setWorkflowAnimationPhase('steps-fading-in');
      }, 250);
      
      // At 1.25s, step animations begin
      setTimeout(() => {
        setWorkflowAnimationPhase('running');
      }, 1250);
      
      // At 4.5s, begin fade out phase
      setTimeout(() => {
        setWorkflowAnimationPhase('sidebar-exiting');
      }, 4500);
    } else {
      setWorkflowAnimationPhase('hidden');
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    }

    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [activeTab]);

  // Step animation logic - precise timing
  useEffect(() => {
    if (workflowAnimationPhase === 'running') {
      // 1.25s-3.75s: First step runs and completes (2.5 seconds)
      setStepStates(prev => ({ ...prev, trigger: 'running' }));
      
      setTimeout(() => {
        // 3.75s: First step completes
        setStepStates(prev => ({ ...prev, trigger: 'completed' }));
        
        // 3.75s-4s: Arrow animation (0.25 seconds)
        setTimeout(() => {
          // 4s: Second step starts running (but won't complete - only 0.5s before fade out)
          setStepStates(prev => ({ ...prev, research: 'running' }));
        }, 250); // 0.25s for arrow animation
        
      }, 2500); // 2.5s for first step to complete
      
    } else {
      setStepStates({
        trigger: 'inactive',
        research: 'inactive',
        switch: 'inactive'
      });
    }
  }, [workflowAnimationPhase]);

  const handleTabClick = (index: number) => {
    // Don't do anything if clicking on the currently active tab
    if (index === activeTab) {
      return;
    }
    
    setActiveTab(index);
    // Don't stop auto-playing, just reset the progress from this tab
    setProgress(0);
    
    // Clear current intervals and restart from the clicked tab
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    // Restart the cycle from the clicked tab
    startTimeRef.current = Date.now();
  };

  // Navigation items for sidebar
  const navigationItems = [
    {
      icon: (
        <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M8.5 12.13c-.306.521-.863.87-1.5.87a1.741 1.741 0 0 1-1.5-.87M3.219 4.826v1.556a4.961 4.961 0 0 1-.908 2.86v0a.728.728 0 0 0 .595 1.149h8.188c.591 0 .936-.666.595-1.148v0a4.961 4.961 0 0 1-.908-2.861V4.826M10.781 4.826C10.781 2.713 9.088 1 7 1S3.219 2.713 3.219 4.826" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      ),
      label: 'Notifications',
      active: false
    },
    {
      icon: (
        <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
          <g stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round">
            <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round"></rect>
            <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round"></rect>
            <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8"></path>
          </g>
        </svg>
      ),
      label: 'Workflows',
      active: true
    },
    {
      icon: (
        <svg width="14" height="14" fill="none">
          <g stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2.5"></rect>
            <path d="m4.75 7.045.277.439c.425.67.637 1.006.91 1.124a.96.96 0 0 0 .746.006c.275-.113.492-.446.927-1.11L9.25 5"></path>
          </g>
        </svg>
      ),
      label: 'Tasks',
      active: false
    },
    {
      icon: (
        <svg width="14" height="14" fill="none">
          <rect x="1" y="2" width="12" height="10" rx="2.5" stroke="#5C5E63" strokeWidth="1.1"></rect>
          <path d="m3.1 4.6.51.535C5.164 6.765 5.94 7.58 6.925 7.59c.984.01 1.778-.787 3.368-2.382L10.9 4.6" stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round"></path>
        </svg>
      ),
      label: 'Emails',
      active: false
    },
    {
      icon: (
        <svg width="14" height="14" fill="none">
          <g stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1.5" y="1.5" width="11" height="11" rx="2.5"></rect>
            <path d="M4.462 5.308v4.23M7 4.462v5.076M9.538 7v2.538"></path>
          </g>
        </svg>
      ),
      label: 'Reports',
      active: false
    }
  ];

  const recordItems = [
    { label: 'Companies', color: 'bg-blue-500' },
    { label: 'People', color: 'bg-blue-500' },
    { label: 'Deals', color: 'bg-blue-500' },
    { label: 'Workspaces', color: 'bg-blue-500' }
  ];

  const workflowRuns = [
    { id: '70', runNumber: 70, status: 'executing' as const, isCurrentRun: true },
    { id: '69', runNumber: 69, status: 'completed' as const, nodeCount: 15, completedTime: 'just now' },
    { id: '68', runNumber: 68, status: 'completed' as const, nodeCount: 11, completedTime: '2 min ago' },
    { id: '67', runNumber: 67, status: 'completed' as const, nodeCount: 11, completedTime: '3 min ago' },
    { id: '66', runNumber: 66, status: 'completed' as const, nodeCount: 16, completedTime: '5 min ago' },
    { id: '65', runNumber: 65, status: 'completed' as const, nodeCount: 14, completedTime: '6 min ago' }
  ];

  const sidebarVisible = activeTab === 1; // Always visible when workflows tab is active
  const rightSidebarVisible = workflowAnimationPhase === 'sidebar-entering' || workflowAnimationPhase === 'steps-fading-in' || workflowAnimationPhase === 'running';
  const rightSidebarExiting = workflowAnimationPhase === 'sidebar-exiting';
  const workflowVisible = activeTab === 1; // Always visible when workflows tab is active
  const workflowStepsVisible = workflowAnimationPhase === 'steps-fading-in' || workflowAnimationPhase === 'running';
  const workflowStepsExiting = workflowAnimationPhase === 'sidebar-exiting';

  return (
    <section className="relative border-subtle-stroke border-t bg-gradient-to-b from-[#FDFDFD] to-white-100">
      <div className="container grid grid-cols-12">
        <div className="relative col-span-12 pb-7 lg:col-[2/-2]">
          <svg width="1" height="100%" className="text-subtle-stroke -left-px absolute">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round"></line>
          </svg>
          <svg width="1" height="100%" className="text-subtle-stroke -right-px absolute">
            <line x1="0.5" y1="0" x2="0.5" y2="100%" stroke="currentColor" strokeDasharray="4 6" strokeLinecap="round"></line>
          </svg>
          
          <div className="relative">
            <ProductTabBar
              tabs={tabs}
              activeTab={activeTab}
              progress={progress}
              isAutoPlaying={isAutoPlaying}
              onTabClick={handleTabClick}
            />

            <div className="mt-8">
              {activeTab === 0 && <MonitorContent />}
              {activeTab === 1 && (
                <WorkflowsContent 
                  sidebarVisible={sidebarVisible}
                  rightSidebarVisible={rightSidebarVisible}
                  workflowVisible={workflowVisible}
                  navigationItems={navigationItems}
                  recordItems={recordItems}
                  workflowRuns={workflowRuns}
                  stepStates={stepStates}
                  workflowAnimationPhase={workflowAnimationPhase}
                />
              )}
              {activeTab === 2 && <TablesTabContent tablesAnimationPhase={tablesAnimationPhase} />}
              {activeTab === 3 && <AIContent />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Individual tab content components
const MonitorContent = () => (
  <div className="p-6">
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Monitor Content</h3>
      <p className="text-accent-foreground">Real-time healthcare monitoring dashboard will be displayed here.</p>
    </div>
  </div>
);

interface WorkflowsContentProps {
  sidebarVisible: boolean;
  rightSidebarVisible: boolean;
  workflowVisible: boolean;
  navigationItems: any[];
  recordItems: any[];
  workflowRuns: any[];
  stepStates: any;
  workflowAnimationPhase: 'hidden' | 'sidebar-entering' | 'steps-fading-in' | 'running' | 'sidebar-exiting';
}

const WorkflowsContent: React.FC<WorkflowsContentProps> = ({
  sidebarVisible,
  rightSidebarVisible,
  workflowVisible,
  navigationItems,
  recordItems,
  workflowRuns,
  stepStates,
  workflowAnimationPhase
}) => {
  const workflowStepsVisible = workflowAnimationPhase === 'steps-fading-in' || workflowAnimationPhase === 'running';
  const workflowStepsExiting = workflowAnimationPhase === 'sidebar-exiting';
  const rightSidebarExiting = workflowAnimationPhase === 'sidebar-exiting';

  return (
    <div className="relative w-[calc(100vw-2rem)] -mx-[calc((100vw-100%)/2)] max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
      <div className="isolate">
        <div className="w-full overflow-hidden border border-default-stroke bg-white-100 outline-4 outline-default-stroke/20 shadow-[0px_2px_6px_0px_rgba(28,40,64,0.06),0px_6px_20px_-2px_rgba(28,40,64,0.08)] h-[320px] rounded-l-xl border-y border-l sm:rounded-xl sm:border lg:h-[640px] lg:rounded-lg pointer-events-none select-none">
          
          <div className="relative grid h-full w-full lg:grid-cols-[237px_1fr_300px]">
            
            <WorkflowSidebar
              visible={sidebarVisible}
              companyName="Fethr Health"
              activeItem="workflows"
            />

            <div className="flex flex-col">
              <WorkflowHeader
                title="Patient data automation pipeline"
                breadcrumb={{
                  parentTitle: 'Workflows',
                  parentIcon: (
                    <svg className="size-[14px]" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <g stroke="#75777C" strokeWidth="1.1" strokeLinecap="round">
                        <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1.5" strokeLinejoin="round"></rect>
                        <rect x="8" y="8" width="4.5" height="4.5" rx="2.25" strokeLinejoin="round"></rect>
                        <path d="M2.5 8v1A2.5 2.5 0 0 0 5 11.5h1M11.5 6V5A2.5 2.5 0 0 0 9 2.5H8"></path>
                      </g>
                    </svg>
                  )
                }}
                visible={workflowVisible}
              />

              <WorkflowToolbar
                activeView="runs"
                runCount={70}
                isLive={true}
                visible={workflowVisible}
              />

              <WorkflowCanvas
                currentRun="Run #70"
                visible={workflowVisible}
              >
                <div className={`
                  absolute left-1/2 top-[68px] -translate-x-1/2 w-fit transition-all duration-1000
                  ${workflowStepsVisible ? 'opacity-100 translate-y-0' : 
                    workflowStepsExiting ? 'opacity-0 -translate-y-8' : 
                    'opacity-0 translate-y-8'}
                `}>
                  <div className="relative grid grid-cols-[151px_151px_26px_151px_151px_26px_151px_151px] grid-rows-[80px_70px_80px_70px_80px_88px_80px]">
                    
                    {/* Step 1: Trigger */}
                    <div className="col-span-2 col-start-4">
                      <div className="flex items-center border-[#E6E7EA] bg-[#FBFBFB] gap-x-1 rounded-t-[10px] border-x border-t pt-[3px] pr-2 pb-1 pl-[7px] absolute bottom-full left-0">
                        <svg className="size-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r=".75" fill="#75777C"></circle>
                          <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></circle>
                          <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></circle>
                        </svg>
                        <span className="font-medium text-[#75777C] text-[12px] leading-4">Trigger</span>
                      </div>
                      
                      <WorkflowStep
                        title="Record command"
                        description="Trigger on a Company"
                        icon={(
                          <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF"></rect>
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" stroke="#D6E5FF"></rect>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.693 4.786H11.308c.582 0 1.049 0 1.426.03.389.032.726.1 1.038.258.497.253.901.658 1.155 1.155.158.311.225.649.257 1.037.03.378.03.845.03 1.427v.45a.5.5 0 0 1-1 0v-.429c0-.608 0-1.034-.027-1.366-.026-.327-.076-.518-.151-.665a1.643 1.643 0 0 0-.718-.718c-.147-.075-.339-.125-.665-.152-.332-.027-.759-.027-1.367-.027H8.715c-.609 0-1.035 0-1.367.027-.326.027-.518.077-.665.152-.309.157-.56.409-.718.718-.075.147-.125.338-.151.665-.027.332-.028.758-.028 1.366v2.572c0 .608 0 1.034.028 1.367.026.326.076.517.151.664.158.31.409.56.718.718.147.075.339.125.665.152.332.027.758.027 1.367.027H10a.5.5 0 1 1 0 1H8.693c-.582 0-1.049 0-1.426-.03-.389-.032-.726-.099-1.038-.258a2.643 2.643 0 0 1-1.155-1.155c-.158-.311-.225-.649-.257-1.037-.03-.378-.03-.845-.03-1.427V8.693c0-.582 0-1.049.03-1.427.032-.388.099-.726.257-1.037A2.643 2.643 0 0 1 6.23 5.074c.312-.159.65-.226 1.038-.257.377-.031.844-.031 1.426-.031Zm-.537 1.958H8.364c.148 0 .287 0 .405.01.127.01.272.034.416.107.204.104.369.27.472.472.074.145.098.29.109.417.01.118.01.257.01.405V8.363c0 .148 0 .287-.01.405-.01.128-.035.272-.109.417a1.08 1.08 0 0 1-.472.472c-.144.073-.289.097-.416.108-.118.01-.257.01-.405.01H8.155c-.148 0-.288 0-.405-.01a1.093 1.093 0 0 1-.417-.108 1.08 1.08 0 0 1-.472-.472 1.093 1.093 0 0 1-.108-.417c-.01-.118-.01-.257-.01-.405V8.155c0-.148 0-.287.01-.405.01-.127.035-.272.108-.417a1.08 1.08 0 0 1 .472-.472c.144-.073.29-.097.417-.108.117-.01.257-.01.405-.01ZM7.78 7.756a.08.08 0 0 0-.024.025.453.453 0 0 0-.006.05c-.006.072-.007.17-.007.341v.174c0 .17 0 .269.007.34a.453.453 0 0 0 .006.051.08.08 0 0 0 .024.025.453.453 0 0 0 .051.006c.072.006.17.006.34.006h.175c.17 0 .268 0 .34-.006a.453.453 0 0 0 .051-.006.08.08 0 0 0 .024-.025.453.453 0 0 0 .007-.05c.006-.072.006-.17.006-.34v-.175c0-.17 0-.269-.006-.34a.453.453 0 0 0-.007-.051.08.08 0 0 0-.024-.025.453.453 0 0 0-.05-.006 4.796 4.796 0 0 0-.341-.006h-.174c-.171 0-.269 0-.34.006a.453.453 0 0 0-.052.006Zm-.537 2.76a.5.5 0 0 0 0 1h3.614a.5.5 0 0 0 0-1H7.244Zm-.5 2.24a.5.5 0 0 1 .5-.5h2.328a.5.5 0 1 1 0 1H7.244a.5.5 0 0 1-.5-.5Zm5.351-.084 1.154-1.234v.928c0 .39.316.706.705.706h.41l-1.298 1.294v-.989a.706.706 0 0 0-.706-.705h-.265Zm2.154-1.98c0-.64-.784-.949-1.222-.481l-2.125 2.273a.706.706 0 0 0 .515 1.188h.65v1.404c0 .628.759.943 1.203.5l2.303-2.3a.706.706 0 0 0-.498-1.204h-.826v-1.38Z" fill="#407FF2"></path>
                          </svg>
                        )}
                        badge={{ text: 'Records' }}
                        status={stepStates.trigger}
                      />
                    </div>

                    {/* Connector 1 */}
                    <WorkflowConnector
                      type="vertical"
                      status={stepStates.trigger === 'completed' ? 'active' : 'inactive'}
                      animate={true}
                    />

                    {/* Step 2: Research record */}
                    <div className="col-span-2 col-start-4 row-start-3">
                      <WorkflowStep
                        title="Research record"
                        description="Determine funding stage of company"
                        icon={(
                          <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x=".5" y=".5" width="19" height="19" rx="4.5" stroke="#232529" strokeOpacity=".08"></rect>
                            <g fill="#9162F9">
                              <path d="M14.75 10V8.45c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874c-.428-.218-.988-.218-2.108-.218h-3.1c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874c-.218.428-.218.988-.218 2.108v3.1c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.428.218.988.218 2.108.218H10" stroke="#9162F9" strokeLinecap="round"/>
                              <rect x="7.149" y="7.15" width="2.1" height="2.1" rx=".6" stroke="#9162F9" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M7.15 11.05H9.5M7.15 12.85H9" stroke="#9162F9" strokeLinecap="round"/>
                              <path fillRule="evenodd" clipRule="evenodd" d="M11.5 12.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Zm1.25-2.25a2.25 2.25 0 1 0 1.198 4.155l.698.699a.5.5 0 0 0 .708-.707l-.699-.7A2.25 2.25 0 0 0 12.75 10.5Z"/>
                            </g>
                          </svg>
                        )}
                        badge={{ 
                          text: 'Agent',
                          icon: (
                            <svg className="size-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M10.235 10.456a1.766 1.766 0 1 0-.002-3.53 1.766 1.766 0 0 0 .002 3.53ZM1.765 5.497a1.766 1.766 0 1 0-.001-3.531 1.766 1.766 0 0 0 .001 3.531ZM5.911 2.613a1.306 1.306 0 1 0 0-2.612 1.306 1.306 0 0 0 0 2.612ZM1.765 10.003a1.306 1.306 0 1 0-.001-2.612 1.306 1.306 0 0 0 0 2.612ZM5.948 7.39a1.175 1.175 0 1 0-.001-2.35 1.175 1.175 0 0 0 0 2.35ZM5.912 12a.925.925 0 1 0-.001-1.85.925.925 0 0 0 0 1.85ZM10.077 4.677a.925.925 0 1 0-.001-1.85.925.925 0 0 0 0 1.85Z" fill="#565B60"/>
                            </svg>
                          ),
                          bgColor: 'border-[#CDD7DE] bg-[#D9E6EF]',
                          textColor: 'text-[#565B60]',
                          borderColor: 'border-[#CDD7DE]'
                        }}
                        status={stepStates.research}
                      />
                    </div>

                    {/* Connector 2 */}
                    <div className="-translate-x-1/2 absolute top-0 left-0 col-start-5 row-start-4 row-end-5 h-[71px] w-3">
                      <WorkflowConnector
                        type="vertical"
                        status={stepStates.research === 'completed' ? 'active' : 'inactive'}
                        animate={true}
                      />
                    </div>

                    {/* Step 3: Switch */}
                    <div className="col-span-2 col-start-4 row-start-5">
                      <WorkflowStep
                        title="Switch"
                        description="No description"
                        icon={(
                          <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#FFEBEB"></rect>
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" stroke="#FFDCDB"></rect>
                            <g clipPath="url(#a)" stroke="#FF6D6B" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M13.428 13v-2.571c0-.947-.767-1.715-1.714-1.715v0A1.714 1.714 0 0 1 10 7V5.286M13.428 13l-1.286-1.286M13.428 13l1.286-1.286M6.572 13v-2.571c0-.947.767-1.715 1.714-1.715v0C9.233 8.714 10 7.947 10 7V5.286M6.572 13l1.286-1.286M6.572 13l-1.286-1.286M10 14.714V5.286m0 9.428 1.285-1.285M10 14.714 8.714 13.43"></path>
                            </g>
                          </svg>
                        )}
                        badge={{ text: 'Conditions' }}
                        status={stepStates.switch}
                      />
                    </div>

                    {/* Branch Connectors */}
                    <WorkflowConnector type="branch-left" status="inactive" label="Condition 1" />
                    <WorkflowConnector type="branch-right" status="inactive" label="Condition 3" />
                    <WorkflowConnector type="branch-down" status="inactive" label="Condition 2" />
                    
                  </div>
                </div>
              </WorkflowCanvas>
            </div>

            <div className={`
              relative hidden h-full overflow-hidden lg:flex lg:flex-col border-[#EEEFF1] border-l bg-white-100 transition-all duration-1000 ease-out
              ${rightSidebarVisible ? 'translate-x-0 opacity-100' : 
                rightSidebarExiting ? 'translate-x-full opacity-0' : 
                'translate-x-full opacity-0'}
            `}>
              <WorkflowRunsSidebar
                visible={true}
                runs={workflowRuns}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const TablesTabContent = ({ tablesAnimationPhase }: { tablesAnimationPhase: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out' }) => (
  <div className="relative w-[calc(100vw-2rem)] -mx-[calc((100vw-100%)/2)] max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
    <div className="isolate">
      <div className="w-full overflow-hidden border border-default-stroke bg-white-100 outline-4 outline-default-stroke/20 shadow-[0px_2px_6px_0px_rgba(28,40,64,0.06),0px_6px_20px_-2px_rgba(28,40,64,0.08)] h-[320px] rounded-l-xl border-y border-l sm:rounded-xl sm:border lg:h-[640px] lg:rounded-lg pointer-events-none select-none">
        <div className="relative flex h-full w-full">
          <div className="w-[237px] shrink-0">
            <WorkflowSidebar
              visible={true}
              companyName="Fethr Health"
              activeItem="tables"
            />
          </div>
          <div className="flex flex-col h-full flex-1 min-w-0">
            <TablesHeader />
            <div className="flex-1 flex flex-col overflow-hidden">
              <TablesFilters />
              <TablesDataContent tablesAnimationPhase={tablesAnimationPhase} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AIContent = () => (
  <div className="p-6">
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">AI Content</h3>
      <p className="text-accent-foreground">AI-powered healthcare automation features will be displayed here.</p>
    </div>
  </div>
);

export default ProductTabs;
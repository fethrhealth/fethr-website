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
  WorkflowRunsSidebar,
  AISidebar,
  AIStep
} from './workflow';

import {
  TablesFilters,
  TablesHeader,
  TablesContent as TablesDataContent
} from './tables';

import {
  MonitorContent
} from './monitor';

interface Tab {
  id: string;
  label: string;
}

const ProductTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [previousTab, setPreviousTab] = useState<number>();
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [workflowAnimationPhase, setWorkflowAnimationPhase] = useState<'hidden' | 'sidebar-entering' | 'steps-fading-in' | 'running' | 'sidebar-exiting'>('running');
  const [tablesAnimationPhase, setTablesAnimationPhase] = useState<'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'>('hidden');
  const [monitorAnimationPhase, setMonitorAnimationPhase] = useState<'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out'>('hidden');
  const [aiAnimationPhase, setAiAnimationPhase] = useState<'hidden' | 'sidebar-entering' | 'ai-running' | 'workflow-steps-appearing' | 'sidebar-exiting'>('hidden');
  const [aiBuild, setAiBuild] = useState(false);
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

  // AI step states
  const [aiStepStates, setAiStepStates] = useState({
    trigger: 'inactive',
    transform: 'inactive',
    deliver: 'inactive'
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
        setProgress(0);
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

  // Monitor animations
  useEffect(() => {
    if (activeTab === 0) {
      setTimeout(() => {
        setMonitorAnimationPhase('content-fading-in');
      }, 500);

      setTimeout(() => {
        setMonitorAnimationPhase('visible');
      }, 1000);

      setTimeout(() => {
        setMonitorAnimationPhase('content-fading-out');
      }, 4500);
    } else {
      setMonitorAnimationPhase('hidden');
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

  // Tables animations
  useEffect(() => {
    if (activeTab === 2) {
      setTimeout(() => {
        setTablesAnimationPhase('content-fading-in');
      }, 500);

      setTimeout(() => {
        setTablesAnimationPhase('visible');
      }, 1000);

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
      setWorkflowAnimationPhase('sidebar-entering');

      // First phase: Sidebar enters (0.25s)
      setTimeout(() => {
        setWorkflowAnimationPhase('steps-fading-in');
      }, 250);

      // Second phase: Start running animations (0.5s after steps fade in)
      setTimeout(() => {
        setWorkflowAnimationPhase('running');
      }, 250);

      // Final phase: Exit (4.5s total duration)
      setTimeout(() => {
        setWorkflowAnimationPhase('sidebar-exiting');
      }, 5000);
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

  // AI animations with proper timing
  useEffect(() => {
    if (activeTab === 3) { // AI tab    
      // Start with a delay before showing AI running
      setTimeout(() => {
        setAiAnimationPhase('ai-running');
      }, 500); // 1s delay before starting

      setTimeout(() => {
        setAiBuild(true);
      }, 1300);

      // Listen for chat message shown event
      const handleChatShown = () => {
        // Wait 1.5 seconds after chat message appears
        setTimeout(() => {
          setAiAnimationPhase('workflow-steps-appearing');
        }, 500);
      };

      window.addEventListener('chatMessageShown', handleChatShown);

      // Begin fade out phase at 4.5s
      setTimeout(() => {
        setAiAnimationPhase('sidebar-exiting');
      }, 5000);

      return () => {
        window.removeEventListener('chatMessageShown', handleChatShown);
      };
    } else {
      console.log('Setting AI animation phase to hidden');
      setAiAnimationPhase('hidden');
      setAiBuild(false);
    }
  }, [activeTab]);

  // Step animation logic - sequential animations
  useEffect(() => {
    if (workflowAnimationPhase === 'running') {
      // Start first step border animation
      setTimeout(() => {
        setStepStates(prev => ({ ...prev, trigger: 'running' }));
      }, 250);

      // After 2s, complete first step
      setTimeout(() => {
        setStepStates(prev => ({ ...prev, trigger: 'completed' }));
      }, 2300);

      // Start second step after 2.5s
      setTimeout(() => {
        setStepStates(prev => ({ ...prev, research: 'running' }));
      }, 2500);

      // Complete second step after its 2s animation
      setTimeout(() => {
        setStepStates(prev => ({ ...prev, research: 'completed' }));
      }, 4500);

    } else {
      setStepStates({
        trigger: 'inactive',
        research: 'inactive',
        switch: 'inactive'
      });
    }
  }, [workflowAnimationPhase]);

  // AI Step animation logic - Faster, smoother timing
  useEffect(() => {
    if (aiAnimationPhase === 'workflow-steps-appearing') {
      // First step appears immediately
      setAiStepStates(prev => ({ ...prev, trigger: 'inactive' }));

      // Second step appears after 0.3s
      setTimeout(() => {
        setAiStepStates(prev => ({ ...prev, transform: 'inactive' }));
      }, 500);

      // Third step appears after 0.6s
      setTimeout(() => {
        setAiStepStates(prev => ({ ...prev, deliver: 'inactive' }));
      }, 1000);

    } else if (aiAnimationPhase === 'sidebar-exiting') {
      // 3s-3.5s: Everything fades out
      console.log(`[${new Date().toISOString()}] All steps fading out`);
      setAiStepStates({
        trigger: 'inactive',
        transform: 'inactive',
        deliver: 'inactive'
      });
    } else {
      console.log(`[${new Date().toISOString()}] Resetting AI step states to inactive`);
      setAiStepStates({
        trigger: 'inactive',
        transform: 'inactive',
        deliver: 'inactive'
      });
    }
  }, [aiAnimationPhase]);

  const handleTabClick = (index: number) => {
    if (index === activeTab) {
      return;
    }

    console.log('Tab clicked:', index, tabs[index]?.label);
    setProgress(0);
    setActiveTab(index);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    startTimeRef.current = Date.now();
  };

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
    }
  ];

  const workflowRuns = [
    { id: '70', runNumber: 70, status: 'executing' as const, isCurrentRun: true },
    { id: '69', runNumber: 69, status: 'completed' as const, nodeCount: 15, completedTime: 'just now' }
  ];

  const sidebarVisible = activeTab === 1 || activeTab === 3;
  const rightSidebarVisible = workflowAnimationPhase === 'sidebar-entering' || workflowAnimationPhase === 'steps-fading-in' || workflowAnimationPhase === 'running';
  const rightSidebarExiting = workflowAnimationPhase === 'sidebar-exiting';
  const workflowVisible = activeTab === 1;
  const workflowStepsVisible = workflowAnimationPhase === 'steps-fading-in' || workflowAnimationPhase === 'running';
  const workflowStepsExiting = workflowAnimationPhase === 'sidebar-exiting';

  // AI specific visibility states - sidebar is immediately visible
  const aiSidebarVisible = activeTab === 3 && (aiAnimationPhase === 'ai-running' || aiAnimationPhase === 'workflow-steps-appearing');
  const aiSidebarExiting = aiAnimationPhase === 'sidebar-exiting';
  const aiWorkflowVisible = activeTab === 3;
  const aiWorkflowStepsVisible = aiAnimationPhase === 'workflow-steps-appearing' || aiAnimationPhase === 'sidebar-exiting';
  const aiWorkflowStepsExiting = aiAnimationPhase === 'sidebar-exiting';

  return (
    <section className="relative border-subtle-stroke border-t bg-gradient-to-b from-[#FDFDFD] to-white-100">
      <div className="container grid grid-cols-12">
        <div className="relative col-span-12 pb-7">
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
              previousTab={previousTab}
              progress={progress}
              isAutoPlaying={isAutoPlaying}
              onTabClick={handleTabClick}
            />

            <div className="mt-8">
              {activeTab === 0 && <MonitorTabContent monitorAnimationPhase={monitorAnimationPhase} />}
              {activeTab === 1 && (
                <WorkflowsContent
                  sidebarVisible={sidebarVisible}
                  rightSidebarVisible={rightSidebarVisible}
                  workflowVisible={workflowVisible}
                  navigationItems={navigationItems}
                  workflowRuns={workflowRuns}
                  stepStates={stepStates}
                  workflowAnimationPhase={workflowAnimationPhase}
                />
              )}
              {activeTab === 2 && <TablesTabContent tablesAnimationPhase={tablesAnimationPhase} />}
              {activeTab === 3 && (
                <AITabContent
                  sidebarVisible={sidebarVisible}
                  aiSidebarVisible={aiSidebarVisible}
                  aiSidebarExiting={aiSidebarExiting}
                  aiWorkflowVisible={aiWorkflowVisible}
                  aiWorkflowStepsVisible={aiWorkflowStepsVisible}
                  aiWorkflowStepsExiting={aiWorkflowStepsExiting}
                  aiStepStates={aiStepStates}
                  aiAnimationPhase={aiAnimationPhase}
                  aiBuild={aiBuild}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Monitor Tab Content Component
const MonitorTabContent = ({ monitorAnimationPhase }: { monitorAnimationPhase: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out' }) => (
  <div className="relative w-full max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
    <div className="isolate">
      <div className="w-full overflow-hidden border border-default-stroke bg-white-100 outline-4 outline-default-stroke/20 shadow-[0px_2px_6px_0px_rgba(28,40,64,0.06),0px_6px_20px_-2px_rgba(28,40,64,0.08)] h-[320px] rounded-l-xl border-y border-l sm:rounded-xl sm:border lg:h-[640px] lg:rounded-lg pointer-events-none select-none">
        <div className="relative flex h-full w-full">
          <div className="w-[237px] shrink-0">
            <WorkflowSidebar
              visible={true}
              companyName="Fethr Health"
              activeItem="monitor"
            />
          </div>
          <div className="flex flex-col h-full flex-1 min-w-0">
            <MonitorContent monitorAnimationPhase={monitorAnimationPhase} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Individual tab content components
interface WorkflowsContentProps {
  sidebarVisible: boolean;
  rightSidebarVisible: boolean;
  workflowVisible: boolean;
  navigationItems: any[];
  workflowRuns: any[];
  stepStates: any;
  workflowAnimationPhase: 'hidden' | 'sidebar-entering' | 'steps-fading-in' | 'running' | 'sidebar-exiting';
}

const WorkflowsContent: React.FC<WorkflowsContentProps> = ({
  sidebarVisible,
  rightSidebarVisible,
  workflowVisible,
  navigationItems,
  workflowRuns,
  stepStates,
  workflowAnimationPhase
}) => {
  const workflowStepsVisible = workflowAnimationPhase === 'steps-fading-in' || workflowAnimationPhase === 'running';
  const workflowStepsExiting = workflowAnimationPhase === 'sidebar-exiting';
  const rightSidebarExiting = workflowAnimationPhase === 'sidebar-exiting';

  return (
    <div className="relative w-full max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
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

                    <div className="relative col-span-2 col-start-4">
                      <div className="flex items-center border-[#E6E7EA] bg-[#FBFBFB] gap-x-1 rounded-t-[10px] border-x border-t pt-[3px] pr-2 pb-1 pl-[7px] absolute bottom-full left-0">
                        <svg className="size-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r=".75" fill="#75777C"></circle>
                          <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></circle>
                          <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></circle>
                        </svg>
                        <span className="font-medium text-[#75777C] text-[12px] leading-4">Trigger</span>
                      </div>

                      <WorkflowStep
                        title="Fetch a patient"
                        description="Search for a patient in eClinicalWorks"
                        icon={(
                          <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF"></rect>
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" stroke="#D6E5FF"></rect>
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.693 4.786H11.308c.582 0 1.049 0 1.426.03.389.032.726.1 1.038.258.497.253.901.658 1.155 1.155.158.311.225.649.257 1.037.03.378.03.845.03 1.427v.45a.5.5 0 0 1-1 0v-.429c0-.608 0-1.034-.027-1.366-.026-.327-.076-.518-.151-.665a1.643 1.643 0 0 0-.718-.718c-.147-.075-.339-.125-.665-.152-.332-.027-.759-.027-1.367-.027H8.715c-.609 0-1.035 0-1.367.027-.326.027-.518.077-.665.152-.309.157-.56.409-.718.718-.075.147-.125.338-.151.665-.027.332-.028.758-.028 1.366v2.572c0 .608 0 1.034.028 1.367.026.326.076.517.151.664.158.31.409.56.718.718.147.075.339.125.665.152.332.027.758.027 1.367.027H10a.5.5 0 1 1 0 1H8.693c-.582 0-1.049 0-1.426-.03-.389-.032-.726-.099-1.038-.258a2.643 2.643 0 0 1-1.155-1.155c-.158-.311-.225-.649-.257-1.037-.03-.378-.03-.845-.03-1.427V8.693c0-.582 0-1.049.03-1.427.032-.388.099-.726.257-1.037A2.643 2.643 0 0 1 6.23 5.074c.312-.159.65-.226 1.038-.257.377-.031.844-.031 1.426-.031Zm-.537 1.958H8.364c.148 0 .287 0 .405.01.127.01.272.034.416.107.204.104.369.27.472.472.074.145.098.29.109.417.01.118.01.257.01.405V8.363c0 .148 0 .287-.01.405-.01.128-.035.272-.109.417a1.08 1.08 0 0 1-.472.472c-.144.073-.289.097-.416.108-.118.01-.257.01-.405.01H8.155c-.148 0-.288 0-.405-.01a1.093 1.093 0 0 1-.417-.108 1.08 1.08 0 0 1-.472-.472 1.093 1.093 0 0 1-.108-.417c-.01-.118-.01-.257-.01-.405V8.155c0-.148 0-.287.01-.405.01-.127.035-.272.108-.417a1.08 1.08 0 0 1 .472-.472c.144-.073.29-.097.417-.108.117-.01.257-.01.405-.01ZM7.78 7.756a.08.08 0 0 0-.024.025.453.453 0 0 0-.006.05c-.006.072-.007.17-.007.341v.174c0 .17 0 .269.007.34a.453.453 0 0 0 .006.051.08.08 0 0 0 .024.025.453.453 0 0 0 .051.006c.072.006.17.006.34.006h.175c.17 0 .268 0 .34-.006a.453.453 0 0 0 .051-.006.08.08 0 0 0 .024-.025.453.453 0 0 0 .007-.05c.006-.072.006-.17.006-.34v-.175c0-.17 0-.269-.006-.34a.453.453 0 0 0-.007-.051.08.08 0 0 0-.024-.025.453.453 0 0 0-.05-.006 4.796 4.796 0 0 0-.341-.006h-.174c-.171 0-.269 0-.34.006a.453.453 0 0 0-.052.006Zm-.537 2.76a.5.5 0 0 0 0 1h3.614a.5.5 0 0 0 0-1H7.244Zm-.5 2.24a.5.5 0 0 1 .5-.5h2.328a.5.5 0 1 1 0 1H7.244a.5.5 0 0 1-.5-.5Zm5.351-.084 1.154-1.234v.928c0 .39.316.706.705.706h.41l-1.298 1.294v-.989a.706.706 0 0 0-.706-.705h-.265Zm2.154-1.98c0-.64-.784-.949-1.222-.481l-2.125 2.273a.706.706 0 0 0 .515 1.188h.65v1.404c0 .628.759.943 1.203.5l2.303-2.3a.706.706 0 0 0-.498-1.204h-.826v-1.38Z" fill="#407FF2"></path>
                          </svg>
                        )}
                        badge={{ text: 'EHR' }}
                        status={stepStates.trigger}
                      />
                    </div>

                    <WorkflowConnector
                      type="vertical"
                      status={stepStates.trigger === 'completed' ? 'active' : 'inactive'}
                      animate={true}
                    />

                    <div className="col-span-2 col-start-4 row-start-3">
                      <WorkflowStep
                        title="Make API Call"
                        description="Send data to iClinic"
                        icon={(
                          <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF"></rect>
                            <rect x=".5" y=".5" width="19" height="19" rx="5.5" stroke="#D6E5FF"></rect>
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.5 6.65269C4.5 5.38215 5.5396 4.34521 6.8125 4.34521H13.1875C14.4607 4.34521 15.5 5.38278 15.5 6.65271V8.60771C15.5 8.85063 15.3054 9.04521 15.0625 9.04521C14.8196 9.04521 14.625 8.85063 14.625 8.60771V6.65271C14.625 5.86723 13.9766 5.22021 13.1875 5.22021H6.8125C6.0232 5.22021 5.375 5.86781 5.375 6.65269V11.9039C5.375 12.4512 5.6257 12.9158 6.0231 13.2087C6.25171 13.3683 6.30182 13.6751 6.1409 13.9025C5.97997 14.1299 5.67104 14.1796 5.44243 14.02C4.82422 13.5682 4.5 12.8989 4.5 11.9039V6.65269Z" fill="#9162F9"></path>
                            <path d="M12.6584 9.69172C12.7734 9.56718 12.9632 9.55582 13.0871 9.67258L15.9265 12.3541C15.9348 12.3616 15.9424 12.3697 15.9494 12.378C16.0084 12.4511 16.001 12.5581 15.9305 12.6199L13.091 15.2833C13.046 15.3237 12.9885 15.35 12.9277 15.35C12.7988 15.35 12.6948 15.2436 12.6948 15.11L12.6956 14.1753C11.463 14.0405 8.375 13.6841 8.375 13.4986C8.375 13.3625 9.62778 13.1517 12.6944 12.8585L12.6948 11.95C12.6948 11.8788 12.7189 11.8088 12.6584 9.69172Z" fill="#9162F9"></path>
                          </svg>
                        )}
                        badge={{
                          text: 'API',
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#565B60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="7" height="7" x="14" y="3" rx="1" />
                              <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
                            </svg>
                          ),
                          bgColor: 'border-[#CDD7DE] bg-[#D9E6EF]',
                          textColor: 'text-[#565B60]',
                          borderColor: 'border-[#CDD7DE]'
                        }}
                        status={stepStates.research}
                        delay={true}
                      />
                    </div>
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

interface AITabContentProps {
  sidebarVisible: boolean;
  aiSidebarVisible: boolean;
  aiSidebarExiting: boolean;
  aiWorkflowVisible: boolean;
  aiWorkflowStepsVisible: boolean;
  aiWorkflowStepsExiting: boolean;
  aiStepStates: any;
  aiAnimationPhase: string;
  aiBuild: boolean;
}

const AITabContent: React.FC<AITabContentProps> = ({
  sidebarVisible,
  aiSidebarVisible,
  aiSidebarExiting,
  aiWorkflowVisible,
  aiWorkflowStepsVisible,
  aiWorkflowStepsExiting,
  aiStepStates,
  aiBuild
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>

      <div className="relative w-full max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
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
                  title="AI Interface Builder"
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
                  visible={aiWorkflowVisible}
                />

                <WorkflowToolbar
                  activeView="runs"
                  runCount={1}
                  isLive={true}
                  visible={aiWorkflowVisible}
                />

                {aiBuild && <WorkflowCanvas
                  currentRun="AI Building..."
                  visible={aiWorkflowVisible}
                >
                  <div className={`
                    absolute left-1/2 top-[68px] -translate-x-1/2 w-fit transition-all duration-1000
                    ${aiWorkflowStepsVisible ? 'opacity-100 translate-y-0' :
                      aiWorkflowStepsExiting ? 'opacity-0 -translate-y-8' :
                        'opacity-0 translate-y-8'}
                  `}>
                    <div className="relative grid grid-cols-[151px_151px_26px_151px_151px_26px_151px_151px] grid-rows-[80px_70px_80px_70px_80px_88px_80px]">
                      <div className="col-span-2 col-start-4">
                        <div className="flex items-center border-[#E6E7EA] bg-[#FBFBFB] gap-x-1 rounded-t-[10px] border-x border-t pt-[3px] pr-2 pb-1 pl-[7px] absolute bottom-full left-0">
                          <svg className="size-3" width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r=".75" fill="#75777C"></circle>
                            <circle cx="6" cy="6" r="5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></circle>
                            <circle cx="6" cy="6" r="2.5" stroke="#75777C" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></circle>
                          </svg>
                          <span className="font-medium text-[#75777C] text-[12px] leading-4">Trigger</span>
                        </div>

                        <AIStep
                          title="Incoming Epic Orders"
                          description="Receive HL7 ORM Messages from Epic"
                          icon={(
                            <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5EEFF"></rect>
                              <rect x=".5" y=".5" width="19" height="19" rx="5.5" stroke="#D6E5FF"></rect>
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.693 4.786H11.308c.582 0 1.049 0 1.426.03.389.032.726.1 1.038.258.497.253.901.658 1.155 1.155.158.311.225.649.257 1.037.03.378.03.845.03 1.427v.45a.5.5 0 0 1-1 0v-.429c0-.608 0-1.034-.027-1.366-.026-.327-.076-.518-.151-.665a1.643 1.643 0 0 0-.718-.718c-.147-.075-.339-.125-.665-.152-.332-.027-.759-.027-1.367-.027H8.715c-.609 0-1.035 0-1.367.027-.326.027-.518.077-.665.152-.309.157-.56.409-.718.718-.075.147-.125.338-.151.665-.027.332-.028.758-.028 1.366v2.572c0 .608 0 1.034.028 1.367.026.326.076.517.151.664.158.31.409.56.718.718.147.075.339.125.665.152.332.027.758.027 1.367.027H10a.5.5 0 1 1 0 1H8.693c-.582 0-1.049 0-1.426-.03-.389-.032-.726-.099-1.038-.258a2.643 2.643 0 0 1-1.155-1.155c-.158-.311-.225-.649-.257-1.037-.03-.378-.03-.845-.03-1.427V8.693c0-.582 0-1.049.03-1.427.032-.388.099-.726.257-1.037A2.643 2.643 0 0 1 6.23 5.074c.312-.159.65-.226 1.038-.257.377-.031.844-.031 1.426-.031Z" fill="#407FF2"></path>
                            </svg>
                          )}
                          badge={{ text: 'HL7' }}
                          status={aiStepStates.trigger}
                          delay={0}
                        />
                      </div>

                      <WorkflowConnector
                        type="vertical"
                        status="inactive"
                        animate={true}
                        delay={0.5}
                      />

                    <div className="col-span-2 col-start-4 row-start-3">
                      <AIStep
                        title="Map Data"
                        description="Map data from Epic to Cerner"
                        icon={(
                          <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <rect x=".5" y=".5" width="19" height="19" rx="4.5" stroke="#232529" strokeOpacity=".08"></rect>
                            <g fill="#9162F9">
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.66516 3.76748C9.15605 3.51489 9.73139 3.52916 10.2104 3.85035L16.85 7.99674C17.5302 8.42636 17.5439 9.44869 16.8767 9.89591L10.2847 13.9533C9.72516 14.3198 9.02486 14.3198 8.46533 13.9533L1.87323 9.89591C1.20611 9.44869 1.21983 8.42636 1.90006 7.99674L8.54011 3.85035L8.66516 3.76748ZM9.68915 5.08817C9.45805 4.95266 9.18721 4.93879 8.94725 5.04285L8.82668 5.08817L3.04934 8.89704L8.70364 12.379C9.00339 12.5561 9.37279 12.5561 9.67254 12.379L15.3252 8.89704L9.68915 5.08817Z"></path>
                              <path fillRule="evenodd" clipRule="evenodd" d="M16.1306 13.596C16.4251 13.4304 16.7653 13.5416 16.9442 13.8062C17.1229 14.0707 16.9793 14.3809 16.6848 14.5465L10.0085 18.0866C9.44918 18.4502 8.74904 18.4502 8.18972 18.0866L1.51355 14.5465L1.45489 14.5535C1.1748 14.3934 1.07461 14.095 1.23104 13.8062C1.38753 13.5175 1.71619 13.4011 2.00783 13.5096L2.06876 13.596L8.74494 17.1354L8.90844 17.208C9.28502 17.3402 9.70617 17.3196 10.0691 17.1354L16.1306 13.596Z"></path>
                            </g>
                          </svg>
                        )}
                        badge={{
                          text: 'Transform',
                          bgColor: 'border-[#CDD7DE] bg-[#D9E6EF]',
                          textColor: 'text-[#565B60]',
                          borderColor: 'border-[#CDD7DE]'
                        }}
                        status={aiStepStates.transform}
                        delay={1}
                      />
                    </div>

                      <div className="-translate-x-1/2 absolute top-0 left-0 col-start-5 row-start-4 row-end-5 h-[71px] w-3 ml-1">
                        <WorkflowConnector
                          type="vertical"
                          status="inactive"
                          animate={true}
                          delay={1.2}
                        />
                      </div>

                      <div className="col-span-2 col-start-4 row-start-5">
                        <AIStep
                          title="Outbound Orders to Cerner"
                          description="Send outbound HL7 ORM messages to Cerner"
                          icon={(
                            <svg className="size-5" width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <rect x=".5" y=".5" width="19" height="19" rx="5.5" fill="#E5F7FF"></rect>
                              <rect x=".5" y=".5" width="19" height="19" rx="5.5" stroke="#CCF0FF"></rect>
                              <g clipPath="url(#a)" stroke="#2DD4BF" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 10l3 3 5-5" />
                                <circle cx="10" cy="10" r="7" />
                              </g>
                            </svg>
                          )}
                          badge={{ text: 'EHR' }}
                          status={aiStepStates.deliver}
                          delay={1.5}
                        />
                      </div>
                    </div>
                  </div>
                </WorkflowCanvas>}
              </div>

              <AISidebar
                visible={aiSidebarVisible}
                exiting={aiSidebarExiting}
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const TablesTabContent = ({ tablesAnimationPhase }: { tablesAnimationPhase: 'hidden' | 'content-fading-in' | 'visible' | 'content-fading-out' }) => (
  <div className="relative w-full max-w-none p-1 max-sm:pr-0 [mask-image:linear-gradient(to_bottom,black,black_65%,transparent_100%)]">
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

export default ProductTabs;
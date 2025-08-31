'use client'

import React from 'react';

interface WorkflowRun {
  id: string;
  runNumber: number;
  status: 'executing' | 'completed';
  nodeCount?: number;
  completedTime?: string;
  isCurrentRun?: boolean;
}

interface WorkflowRunsSidebarProps {
  visible: boolean;
  runs: WorkflowRun[];
}

export const WorkflowRunsSidebar: React.FC<WorkflowRunsSidebarProps> = ({
  visible,
  runs
}) => {
  const getStatusIcon = (status: string, isCurrentRun: boolean = false) => {
    if (status === 'executing' || isCurrentRun) {
      return (
        <svg className="animate-spin" width="18" height="18" fill="none">
          <rect x=".5" y=".5" width="17" height="17" rx="8.5" fill="#F4F5F6"></rect>
          <rect x=".5" y=".5" width="17" height="17" rx="8.5" stroke="#E6E7EA"></rect>
          <path d="M5 9a4 4 0 1 0 4-4" stroke="#75777C" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      );
    }
    
    return (
      <svg width="18" height="18" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16Zm3.152-9.636a.6.6 0 1 0-1.004-.657L9.181 9.71c-.252.384-.418.636-.558.813-.14.176-.2.205-.212.21a.48.48 0 0 1-.374-.003c-.012-.005-.072-.035-.209-.213a12.33 12.33 0 0 1-.544-.822l-.377-.595a.6.6 0 1 0-1.014.642l.377.595.015.024c.226.357.417.66.592.887.178.232.39.457.685.584.416.18.888.183 1.307.01.296-.122.512-.344.694-.573.178-.225.374-.524.606-.878l.015-.023 1.968-3.005Z" fill="#0FC27B"></path>
      </svg>
    );
  };

  const getNodeCountBadge = (nodeCount: number) => (
    <span className="font-medium text-[12px] leading-4 border-[#EEEFF1] bg-[#F4F5F6] text-[#5C5E63] rounded-lg border px-[5px] py-px flex items-center gap-x-[4px] pr-[6px] pl-[3px]">
      <svg width="12" height="12" fill="none">
        <path d="M4.875 1.15a2.25 2.25 0 0 1 2.25 0L9.638 2.6a2.25 2.25 0 0 1 1.125 1.949v2.902A2.25 2.25 0 0 1 9.638 9.4l-2.513 1.45a2.25 2.25 0 0 1-2.25 0L2.362 9.4A2.25 2.25 0 0 1 1.237 7.45V4.549A2.25 2.25 0 0 1 2.362 2.6l2.513-1.45Z" stroke="#5C5E63" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <span className="text-[#5C5E63]">{nodeCount}</span>
    </span>
  );

  return (
    <div className={`
      relative hidden h-full overflow-hidden lg:flex lg:flex-col border-[#EEEFF1] border-l bg-white-100 transition-transform duration-[1250ms] ease-out
      ${visible ? 'translate-x-0' : 'translate-x-full'}
    `}>
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Runs List */}
        {runs.map((run, index) => (
          <div key={run.id} className="border-[#EEEFF1] border-b px-0.5 py-0.5">
            <div className={`flex items-center gap-x-2 rounded-md px-3.5 pt-2.5 pb-[9px] ${
              run.isCurrentRun ? 'bg-[#FBFBFB]' : ''
            }`}>
              {getStatusIcon(run.status, run.isCurrentRun)}
              <span className="font-medium text-[14px] leading-5 tracking-[-0.28px] w-[58px]">
                Run #{run.runNumber}
              </span>
              {run.nodeCount && getNodeCountBadge(run.nodeCount)}
              <span className="font-medium text-[12px] leading-4 flex-1 text-right text-[#75777C]">
                {run.status === 'executing' ? 'Executing' : `Completed ${run.completedTime}`}
              </span>
            </div>
          </div>
        ))}

        {/* Overview Section */}
        <div className="border-[#EEEFF1] border-t px-3 pt-[5px] pb-3 mt-auto">
          <span className="font-medium text-[12px] leading-4 ml-1 text-[#75777C]">Overview</span>
          <div className="mt-1.5 grid grid-cols-2 gap-2">
            {/* Completed */}
            <div className="relative flex flex-col rounded-xl border bg-white-100 px-[11px] py-[9px] bg-[linear-gradient(263deg,rgba(15,194,123,0.08)_6.86%,rgba(15,194,123,0.02)_96.69%)] border-[#E7F6EF]">
              <div className="absolute top-[9px] right-[11px]">
                <svg width="14" height="14" fill="none">
                  <g opacity=".6" stroke="#075A39" strokeWidth="1.1">
                    <path d="m4.75 7.295.277.439c.425.67.637 1.006.91 1.124a.96.96 0 0 0 .746.006c.275-.113.492-.446.927-1.11L9.25 5.25" strokeLinecap="round" strokeLinejoin="round"></path>
                    <circle cx="7" cy="7" r="5.5"></circle>
                  </g>
                </svg>
              </div>
              <div className="flex items-end">
                <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] font-display text-[#095A39]">69</span>
              </div>
              <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">Completed</span>
            </div>

            {/* Failed */}
            <div className="relative flex flex-col rounded-xl border bg-white-100 px-[11px] py-[9px] bg-[linear-gradient(263deg,rgba(255,109,107,0.08)_6.86%,rgba(255,109,107,0.02)_96.69%)] border-[#FEE7E7]">
              <div className="absolute top-[9px] right-[11px]">
                <svg width="14" height="14" fill="none">
                  <g opacity=".6" stroke="#772322" strokeWidth="1.1">
                    <circle cx="7" cy="7" r="5.5"></circle>
                    <path d="M9 5 5 9M9 9 5 5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </g>
                </svg>
              </div>
              <div className="flex items-end">
                <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] font-display text-[#772322]">0</span>
              </div>
              <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">Failed</span>
            </div>

            {/* In Progress */}
            <div className="relative flex flex-col rounded-xl border border-[#EEEFF1] bg-white-100 px-[11px] py-[9px]">
              <div className="absolute top-[9px] right-[11px]">
                <svg width="14" height="14" fill="none">
                  <path d="M1.5 7A5.5 5.5 0 1 0 7 1.5" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className="flex items-end">
                <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] font-display text-[#232529]">1</span>
              </div>
              <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">In progress</span>
            </div>

            {/* Avg Runtime */}
            <div className="relative flex flex-col rounded-xl border border-[#EEEFF1] bg-white-100 px-[11px] py-[9px]">
              <div className="absolute top-[9px] right-[11px]">
                <svg width="14" height="14" fill="none">
                  <circle cx="7" cy="7" r="5.75" stroke="#9FA1A7" strokeWidth="1.1" strokeLinejoin="round"></circle>
                  <path d="M7.066 3.904v2.115a.885.885 0 0 1-.884.885H4.566" stroke="#9FA1A7" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <div className="flex items-end">
                <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] font-display text-[#232529]">18</span>
                <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] mb-[1px] ml-[5px] inline-block text-[#9FA1A7]">seconds</span>
                <div className="mb-[3px] ml-[6px]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1" y="1" width="12" height="12" rx="4" fill="#DDF9E4"></rect>
                    <rect x="1" y="1" width="12" height="12" rx="4" stroke="#C7F4D3"></rect>
                    <path d="M7 4.33268L7 9.66602M7 9.66602L9 7.76125M7 9.66602L5 7.76125" stroke="#0B935D" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
              <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">Avg. runtime</span>
            </div>

            {/* Credits Consumed */}
            <div className="relative m-[0.5px] flex flex-col rounded-[14px] border border-[#EEEFF1] p-[11px] col-span-2">
              <div className="absolute top-[11px] right-[11px] rounded-md p-1 shadow-[0px_0px_2px_0px_#E0E0E0,0px_2px_4px_-2px_rgba(24,39,75,0.02),0px_4px_4px_-2px_rgba(24,39,75,0.06)]">
                <svg width="12" height="12" fill="none">
                  <g stroke="#5C5E63" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m1.16 8.248.836.13a1.216 1.216 0 0 1 1.011 1.298l-.061.862a.616.616 0 0 0 .337.597l.618.304a.59.59 0 0 0 .667-.102l.62-.587a1.176 1.176 0 0 1 1.623 0l.62.587a.589.589 0 0 0 .667.102l.62-.305a.613.613 0 0 0 .336-.595l-.062-.863a1.216 1.216 0 0 1 1.011-1.298l.835-.13a.605.605 0 0 0 .495-.47l.152-.683a.619.619 0 0 0-.246-.643l-.697-.488a1.24 1.24 0 0 1-.36-1.617l.42-.75a.625.625 0 0 0-.05-.688l-.428-.548a.592.592 0 0 0-.644-.204l-.808.253a1.189 1.189 0 0 1-1.462-.72L6.9.888A.6.6 0 0 0 6.341.5l-.684.002a.6.6 0 0 0-.558.39l-.301.794a1.188 1.188 0 0 1-1.465.725l-.841-.264a.592.592 0 0 0-.647.205l-.424.549a.625.625 0 0 0-.047.69l.43.751A1.24 1.24 0 0 1 1.45 5.97l-.688.483a.62.62 0 0 0-.246.642l.152.683c.055.246.25.433.494.47Z"></path>
                    <path d="M7.198 4.803a1.693 1.693 0 1 1-2.394 2.394 1.693 1.693 0 0 1 2.394-2.394Z"></path>
                  </g>
                </svg>
              </div>
              <div className="flex items-end">
                <span className="font-semibold text-[18px] leading-6 tracking-[-0.36px] text-[#232529]">896</span>
                <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] mb-[1.5px] ml-[5px] inline-block text-[#9FA1A7]">credits consumed</span>
              </div>
              <span className="font-medium text-[11px] leading-4 tracking-[-0.22px] text-[#75777C]">1,000 included</span>
              <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-[#F4F5F6]">
                <div className="h-full rounded-full bg-[#0EB472] transition-[width] duration-300 ease-linear" style={{width: '89.6%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
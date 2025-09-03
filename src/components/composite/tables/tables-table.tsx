'use client'

import React, { useMemo } from 'react'

interface RaceMapping {
  id: string
  standard: string
  cerner: string
  epic: string
  eclinicalworks: string
  athena: string
}

const raceMappings: RaceMapping[] = [
  {
    id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
    standard: 'American Indian or Alaska Native',
    cerner: 'AI/AN',
    epic: 'AMIND',
    eclinicalworks: 'NAT_AM',
    athena: '01'
  },
  {
    id: 'b2c3d4e5-f6g7-8901-2345-678901bcdefg',
    standard: 'Asian',
    cerner: 'ASN',
    epic: 'ASIAN',
    eclinicalworks: 'ASIAN',
    athena: '02'
  },
  {
    id: 'c3d4e5f6-g7h8-9012-3456-789012cdefgh',
    standard: 'Black or African American',
    cerner: 'BLA',
    epic: 'AFAM',
    eclinicalworks: 'AFAM',
    athena: '03'
  },
  {
    id: 'd4e5f6g7-h8i9-0123-4567-890123defghi',
    standard: 'Native Hawaiian or Other Pacific Islander',
    cerner: 'PI',
    epic: 'PAC_ISL',
    eclinicalworks: 'PAC_ISL',
    athena: '04'
  },
  {
    id: 'e5f6g7h8-i9j0-1234-5678-901234efghij',
    standard: 'White',
    cerner: 'WHT',
    epic: 'Caucasian',
    eclinicalworks: 'Caucasian',
    athena: '05'
  },
  {
    id: 'f6g7h8i9-j0k1-2345-6789-012345fghijk',
    standard: 'Other Race',
    cerner: 'OTH',
    epic: 'OTHER',
    eclinicalworks: 'OTHER',
    athena: '99'
  },
  {
    id: 'g7h8i9j0-k1l2-3456-7890-123456ghijkl',
    standard: 'Declined to Answer',
    cerner: 'UNK',
    epic: 'UNK',
    eclinicalworks: 'Patient Refused',
    athena: 'DTA'
  },
  {
    id: 'h8i9j0k1-l2m3-4567-8901-234567hijklm',
    standard: 'Multiple Race',
    cerner: 'MUL',
    epic: 'MULTI',
    eclinicalworks: 'MULTI',
    athena: '06'
  },
  {
    id: 'i9j0k1l2-m3n4-5678-9012-345678ijklmn',
    standard: 'Hispanic or Latino',
    cerner: 'HIS',
    epic: 'HISPANIC',
    eclinicalworks: 'LATINO',
    athena: '07'
  },
  {
    id: 'j0k1l2m3-n4o5-6789-0123-456789jklmno',
    standard: 'Not Hispanic or Latino',
    cerner: 'NON',
    epic: 'NON_HISP',
    eclinicalworks: 'NON_LATINO',
    athena: '08'
  },
  {
    id: 'k1l2m3n4-o5p6-7890-1234-567890klmnop',
    standard: 'Unknown Race',
    cerner: 'UNK',
    epic: 'UNKNOWN',
    eclinicalworks: 'UNKNOWN',
    athena: '09'
  },
  {
    id: 'l2m3n4o5-p6q7-8901-2345-678901lmnopq',
    standard: 'Unavailable',
    cerner: 'UNA',
    epic: 'UNAVAIL',
    eclinicalworks: 'UNAVAIL',
    athena: '10'
  },
  {
    id: 'm3n4o5p6-q7r8-9012-3456-789012mnopqr',
    standard: 'Prefer Not to Disclose',
    cerner: 'PND',
    epic: 'PREFER_NOT',
    eclinicalworks: 'NO_DISCLOSE',
    athena: '11'
  }
]

const columns = [
  {
    key: 'id',
    label: 'id',
    type: 'uuid',
    isPrimaryKey: true
  },
  {
    key: 'standard',
    label: 'standard race',
    type: 'text',
    isPrimaryKey: false
  },
  {
    key: 'cerner',
    label: 'Cerner',
    type: 'text',
    isPrimaryKey: false
  },
  {
    key: 'epic',
    label: 'Epic',
    type: 'text',
    isPrimaryKey: false
  },
  {
    key: 'eclinicalworks',
    label: 'eClinicalWorks',
    type: 'text',
    isPrimaryKey: false
  },
  {
    key: 'athena',
    label: 'Athena',
    type: 'text',
    isPrimaryKey: false
  }
]

export function TablesContent() {
  // Calculate optimal column widths based on content
  const columnWidths = useMemo(() => {
    const baseWidths = {
      checkbox: 65,
      id: 320,
      standard: 300, // Increased for longer race names
      cerner: 150,   // Updated per request
      epic: 150,     // Updated per request
      eclinicalworks: 180, // Updated per request
      athena: 180    // Updated per request
    };

    // Calculate total width
    const totalWidth = Object.values(baseWidths).reduce((sum, width) => sum + width, 0);
    
    return {
      ...baseWidths,
      totalWidth
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Table Container */}
      <div 
        className="flex-1 overflow-x-auto overflow-y-auto bg-white" 
        style={{ minWidth: `${columnWidths.totalWidth}px` }}
      >
        <div style={{ width: `${columnWidths.totalWidth}px` }}>
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <div className="flex" style={{ height: '35px' }}>
              {/* Checkbox column */}
              <div 
                className="flex items-center justify-center border-r border-gray-200 shrink-0"
                style={{ width: `${columnWidths.checkbox}px` }}
              >
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              
              {columns.map((column, index) => {
                const widthKey = column.key as keyof typeof columnWidths;
                const width = columnWidths[widthKey] || 120;

                return (
                  <div 
                    key={column.key}
                    className={`flex items-center justify-between px-3 py-2 border-r border-gray-200 ${
                      index === columns.length - 1 ? 'border-r-0' : ''
                    } bg-gray-50 shrink-0`}
                    style={{ width: `${width}px` }}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {column.isPrimaryKey && (
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="text-green-600 shrink-0"
                        >
                          <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"></path>
                          <path d="m21 2-9.6 9.6"></path>
                          <circle cx="7.5" cy="15.5" r="5.5"></circle>
                        </svg>
                      )}
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-medium text-xs text-gray-900 uppercase tracking-wider whitespace-nowrap">
                          {column.label}
                        </span>
                        <span className="text-gray-500 font-normal text-xs normal-case whitespace-nowrap">
                          {column.type}
                        </span>
                      </div>
                    </div>
                    <button className="opacity-50 flex items-center justify-center p-1 hover:bg-gray-200 rounded transition-colors shrink-0">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white">
            {raceMappings.map((mapping) => (
              <div key={mapping.id} className="flex hover:bg-gray-50" style={{ height: '48px' }}>
                {/* Checkbox column */}
                <div 
                  className="flex items-center justify-center px-3 py-3 border-r border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.checkbox}px` }}
                >
                  <div className="w-4 h-4 border border-gray-200 rounded hover:border-gray-300 transition-colors"></div>
                </div>

                {/* ID column */}
                <div 
                  className="flex items-center px-3 py-3 border-r border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.id}px` }}
                >
                  <span className="font-mono text-xs text-gray-700 whitespace-nowrap overflow-hidden">
                    {mapping.id}
                  </span>
                </div>

                {/* Standard Race column */}
                <div 
                  className="flex items-center px-3 py-3 border-r border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.standard}px` }}
                >
                  <span className="text-sm text-gray-900 whitespace-nowrap overflow-hidden">
                    {mapping.standard}
                  </span>
                </div>

                {/* Cerner column */}
                <div 
                  className="flex items-center px-3 py-3 border-r border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.cerner}px` }}
                >
                  <span className="text-sm text-gray-900 whitespace-nowrap overflow-hidden">
                    {mapping.cerner}
                  </span>
                </div>

                {/* Epic column */}
                <div 
                  className="flex items-center px-3 py-3 border-r border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.epic}px` }}
                >
                  <span className="text-sm text-gray-900 whitespace-nowrap overflow-hidden">
                    {mapping.epic}
                  </span>
                </div>

                {/* eClinicalWorks column */}
                <div 
                  className="flex items-center px-3 py-3 border-r border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.eclinicalworks}px` }}
                >
                  <span className="text-sm text-gray-900 whitespace-nowrap overflow-hidden">
                    {mapping.eclinicalworks}
                  </span>
                </div>

                {/* Athena column */}
                <div 
                  className="flex items-center px-3 py-3 border-b border-gray-100 bg-white shrink-0"
                  style={{ width: `${columnWidths.athena}px` }}
                >
                  <span className="text-sm text-gray-900 whitespace-nowrap overflow-hidden">
                    {mapping.athena}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
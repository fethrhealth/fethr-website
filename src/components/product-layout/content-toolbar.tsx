'use client'

import React from 'react'
import { ActionButton, FilterChip, ToolbarDivider, SearchInput } from '../product-ui'
import type { FilterOperator } from '../product-ui'

interface FilterValue {
  value: string
  displayName?: string
  statusType?: any
}

interface AppliedFilter {
  type: string
  operator: FilterOperator
  values: FilterValue[]
  onRemove?: () => void
}

interface ContentToolbarProps {
  showFilter?: boolean
  showSort?: boolean
  showRefresh?: boolean
  showSearch?: boolean
  searchPlaceholder?: string
  appliedFilters?: AppliedFilter[]
  onFilterClick?: () => void
  onSortClick?: () => void
  onRefreshClick?: () => void
  onSearchChange?: (value: string) => void
  onClearAllFilters?: () => void
  className?: string
}

export const ContentToolbar: React.FC<ContentToolbarProps> = ({
  showFilter = true,
  showSort = true,
  showRefresh = true,
  showSearch = true,
  searchPlaceholder = "Search Connectors",
  appliedFilters = [],
  onFilterClick,
  onSortClick,
  onRefreshClick,
  onSearchChange,
  onClearAllFilters,
  className
}) => {
  return (
    <div className={`border-b border-gray-200 bg-white ${className}`}>
      <div className="flex items-center gap-2 p-3">
        {/* Filter button */}
        {showFilter && (
          <ActionButton 
            variant="filter" 
            size="sm"
            onClick={onFilterClick}
          >
            <span className="ml-2 text-xs">Filter</span>
          </ActionButton>
        )}

        {/* Sort button */}
        {showSort && (
          <ActionButton 
            variant="sort" 
            size="sm"
            onClick={onSortClick}
          >
            <span className="ml-2 text-xs">Sort</span>
          </ActionButton>
        )}

        {/* Divider */}
        {(showFilter || showSort) && (showRefresh || appliedFilters.length > 0) && (
          <ToolbarDivider />
        )}

        {/* Refresh Button */}
        {showRefresh && (
          <button 
            onClick={onRefreshClick}
            className="flex items-center gap-2 px-2.5 py-1 text-xs bg-white text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors h-[26px]"
          >
            <ActionButton variant="refresh" size="sm" className="w-auto h-auto p-0 border-0 bg-transparent hover:bg-transparent" />
            <span>Refresh</span>
          </button>
        )}

        {/* Divider */}
        {showRefresh && appliedFilters.length > 0 && (
          <ToolbarDivider />
        )}

        {/* Applied Filters */}
        {appliedFilters.map((filter, index) => (
          <FilterChip
            key={index}
            type={filter.type}
            operator={filter.operator}
            values={filter.values}
            onRemove={filter.onRemove}
          />
        ))}

        {/* Clear All button */}
        {appliedFilters.length > 0 && (
          <button 
            onClick={onClearAllFilters}
            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded transition-colors"
          >
            <span>Clear All</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2.96967 2.96967C3.26256 2.67678 3.73744 2.67678 4.03033 2.96967L8 6.939L11.9697 2.96967C12.2626 2.67678 12.7374 2.67678 13.0303 2.96967C13.3232 3.26256 13.3232 3.73744 13.0303 4.03033L9.061 8L13.0303 11.9697C13.2966 12.2359 13.3208 12.6526 13.1029 12.9462L13.0303 13.0303C12.7374 13.3232 12.2626 13.3232 11.9697 13.0303L8 9.061L4.03033 13.0303C3.73744 13.3232 3.26256 13.3232 2.96967 13.0303C2.67678 12.7374 2.67678 12.2626 2.96967 11.9697L6.939 8L2.96967 4.03033C2.7034 3.76406 2.6792 3.3474 2.89705 3.05379L2.96967 2.96967Z" />
            </svg>
          </button>
        )}

        {/* Spacer to push search to the right */}
        <div className="flex-1" />

        {/* Search */}
        {showSearch && (
          <SearchInput
            placeholder={searchPlaceholder}
            onChange={onSearchChange}
            size="sm"
          />
        )}
      </div>
    </div>
  )
}
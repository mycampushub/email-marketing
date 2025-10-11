import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, X, Calendar, Tag as TagIcon, 
  Users, Mail, TrendingUp, SortAsc, SortDesc
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: (order: 'asc' | 'desc') => void;
  filters: {
    status?: FilterOption[];
    tags?: FilterOption[];
    segments?: FilterOption[];
    dateRange?: boolean;
  };
  activeFilters: {
    status?: string[];
    tags?: string[];
    segments?: string[];
    dateFrom?: Date;
    dateTo?: Date;
  };
  onFilterChange: (filterType: string, values: any) => void;
  onClearFilters: () => void;
  placeholder?: string;
  sortOptions?: Array<{ value: string; label: string }>;
}

export const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  placeholder = "Search...",
  sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'created', label: 'Date Created' },
    { value: 'updated', label: 'Last Updated' }
  ]
}) => {
  const [dateFrom, setDateFrom] = useState<Date | undefined>(activeFilters.dateFrom);
  const [dateTo, setDateTo] = useState<Date | undefined>(activeFilters.dateTo);

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.status?.length) count += activeFilters.status.length;
    if (activeFilters.tags?.length) count += activeFilters.tags.length;
    if (activeFilters.segments?.length) count += activeFilters.segments.length;
    if (activeFilters.dateFrom || activeFilters.dateTo) count += 1;
    return count;
  };

  const handleDateRangeChange = () => {
    onFilterChange('dateRange', { from: dateFrom, to: dateTo });
  };

  const renderFilterBadges = () => {
    const badges = [];
    
    activeFilters.status?.forEach(status => {
      badges.push(
        <Badge key={`status-${status}`} variant="secondary" className="flex items-center gap-1">
          Status: {status}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onFilterChange('status', activeFilters.status?.filter(s => s !== status) || [])}
          />
        </Badge>
      );
    });

    activeFilters.tags?.forEach(tag => {
      badges.push(
        <Badge key={`tag-${tag}`} variant="secondary" className="flex items-center gap-1">
          Tag: {tag}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onFilterChange('tags', activeFilters.tags?.filter(t => t !== tag) || [])}
          />
        </Badge>
      );
    });

    activeFilters.segments?.forEach(segment => {
      badges.push(
        <Badge key={`segment-${segment}`} variant="secondary" className="flex items-center gap-1">
          Segment: {segment}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onFilterChange('segments', activeFilters.segments?.filter(s => s !== segment) || [])}
          />
        </Badge>
      );
    });

    if (activeFilters.dateFrom || activeFilters.dateTo) {
      const dateText = activeFilters.dateFrom && activeFilters.dateTo 
        ? `${format(activeFilters.dateFrom, 'MMM d')} - ${format(activeFilters.dateTo, 'MMM d')}`
        : activeFilters.dateFrom 
          ? `From ${format(activeFilters.dateFrom, 'MMM d')}`
          : `Until ${format(activeFilters.dateTo!, 'MMM d')}`;
      
      badges.push(
        <Badge key="daterange" variant="secondary" className="flex items-center gap-1">
          {dateText}
          <X 
            className="h-3 w-3 cursor-pointer" 
            onClick={() => onFilterChange('dateRange', { from: undefined, to: undefined })}
          />
        </Badge>
      );
    }

    return badges;
  };

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
            data-voice-context="Search through items by name, content, or any field"
          />
        </div>

        <div className="flex items-center space-x-2">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                Sort: {sortOptions.find(opt => opt.value === sortBy)?.label || 'Default'}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSortOrderChange(sortOrder === 'asc' ? 'desc' : 'asc')}>
                {sortOrder === 'asc' ? <SortDesc className="h-4 w-4 mr-2" /> : <SortAsc className="h-4 w-4 mr-2" />}
                {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1.5 py-0.5 text-xs">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Filters
                {getActiveFilterCount() > 0 && (
                  <Button variant="ghost" size="sm" onClick={onClearFilters}>
                    Clear all
                  </Button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {/* Status Filter */}
              {filters.status && (
                <>
                  <DropdownMenuLabel className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Status
                  </DropdownMenuLabel>
                  {filters.status.map(option => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={activeFilters.status?.includes(option.value) || false}
                      onCheckedChange={(checked) => {
                        const current = activeFilters.status || [];
                        const updated = checked 
                          ? [...current, option.value]
                          : current.filter(s => s !== option.value);
                        onFilterChange('status', updated);
                      }}
                    >
                      {option.label}
                      {option.count && <span className="ml-auto text-xs text-muted-foreground">({option.count})</span>}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}

              {/* Tags Filter */}
              {filters.tags && (
                <>
                  <DropdownMenuLabel className="flex items-center">
                    <TagIcon className="h-4 w-4 mr-2" />
                    Tags
                  </DropdownMenuLabel>
                  {filters.tags.map(option => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={activeFilters.tags?.includes(option.value) || false}
                      onCheckedChange={(checked) => {
                        const current = activeFilters.tags || [];
                        const updated = checked 
                          ? [...current, option.value]
                          : current.filter(t => t !== option.value);
                        onFilterChange('tags', updated);
                      }}
                    >
                      {option.label}
                      {option.count && <span className="ml-auto text-xs text-muted-foreground">({option.count})</span>}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}

              {/* Segments Filter */}
              {filters.segments && (
                <>
                  <DropdownMenuLabel className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Segments
                  </DropdownMenuLabel>
                  {filters.segments.map(option => (
                    <DropdownMenuCheckboxItem
                      key={option.value}
                      checked={activeFilters.segments?.includes(option.value) || false}
                      onCheckedChange={(checked) => {
                        const current = activeFilters.segments || [];
                        const updated = checked 
                          ? [...current, option.value]
                          : current.filter(s => s !== option.value);
                        onFilterChange('segments', updated);
                      }}
                    >
                      {option.label}
                      {option.count && <span className="ml-auto text-xs text-muted-foreground">({option.count})</span>}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                </>
              )}

              {/* Date Range Filter */}
              {filters.dateRange && (
                <div className="p-2">
                  <DropdownMenuLabel className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </DropdownMenuLabel>
                  <div className="space-y-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          {dateFrom ? format(dateFrom, 'MMM d, yyyy') : 'From date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single" 
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          {dateTo ? format(dateTo, 'MMM d, yyyy') : 'To date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button size="sm" className="w-full" onClick={handleDateRangeChange}>
                      Apply Date Range
                    </Button>
                  </div>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {renderFilterBadges()}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};
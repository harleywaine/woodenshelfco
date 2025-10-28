'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ProductFilters } from '@/lib/types/product';
import { X, Filter } from 'lucide-react';

interface ProductFiltersProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  woodTypes: { id: string; name: string }[];
  finishes: { id: string; name: string }[];
  brackets: { id: string; name: string }[];
}

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  woodTypes,
  finishes,
  brackets,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof ProductFilters, value: string | number | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== undefined);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between"
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 bg-walnut-700 text-cream text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter(v => v !== undefined).length}
              </span>
            )}
          </span>
          <X className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Filters */}
      <div className={`lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filters</CardTitle>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-walnut-700 hover:text-walnut-800"
                >
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Wood Type */}
            <div>
              <Select
                label="Wood Type"
                value={filters.wood_type || ''}
                onChange={(e) => handleFilterChange('wood_type', e.target.value || undefined)}
                options={[
                  { value: '', label: 'All Wood Types' },
                  ...woodTypes.map(type => ({ value: type.id, label: type.name }))
                ]}
              />
            </div>

            {/* Finish */}
            <div>
              <Select
                label="Finish"
                value={filters.finish || ''}
                onChange={(e) => handleFilterChange('finish', e.target.value || undefined)}
                options={[
                  { value: '', label: 'All Finishes' },
                  ...finishes.map(finish => ({ value: finish.id, label: finish.name }))
                ]}
              />
            </div>

            {/* Bracket Style */}
            <div>
              <Select
                label="Bracket Style"
                value={filters.bracket || ''}
                onChange={(e) => handleFilterChange('bracket', e.target.value || undefined)}
                options={[
                  { value: '', label: 'All Bracket Styles' },
                  ...brackets.map(bracket => ({ value: bracket.id, label: bracket.name }))
                ]}
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Price Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.min_price || ''}
                  onChange={(e) => handleFilterChange('min_price', e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.max_price || ''}
                  onChange={(e) => handleFilterChange('max_price', e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field text-sm"
                />
              </div>
            </div>

            {/* Length Range */}
            <div>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                Length (inches)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.min_length || ''}
                  onChange={(e) => handleFilterChange('min_length', e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.max_length || ''}
                  onChange={(e) => handleFilterChange('max_length', e.target.value ? Number(e.target.value) : undefined)}
                  className="input-field text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

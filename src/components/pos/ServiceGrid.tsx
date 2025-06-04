'use client';

import React, { useState } from 'react';
import { POSService } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Clock, Tag } from 'lucide-react';
import { formatCurrency } from '@/utils';
import { cn } from '@/utils';

interface ServiceGridProps {
  services: POSService[];
  onAddToCart: (service: POSService) => void;
}

const categoryLabels = {
  basic: 'Basic Services',
  premium: 'Premium Services',
  deluxe: 'Deluxe Services',
  addon: 'Add-on Services',
};

const categoryColors = {
  basic: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
  premium: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
  deluxe: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20',
  addon: 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20',
};

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(services.map(service => service.category)));
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.category === selectedCategory);

  const servicesByCategory = categories.reduce((acc, category) => {
    acc[category] = services.filter(service => service.category === category);
    return acc;
  }, {} as Record<string, POSService[]>);
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-1 sm:gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
          className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
        >
          All Services
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 capitalize"
          >
            <span className="hidden sm:inline">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </span>
            <span className="sm:hidden capitalize">
              {category}
            </span>
          </Button>
        ))}
      </div>

      {/* Services Grid */}
      {selectedCategory === 'all' ? (
        // Show by category when viewing all
        <div className="space-y-6 sm:space-y-8">
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 capitalize">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {servicesByCategory[category].map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Show filtered services
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {filteredServices.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ServiceCardProps {
  service: POSService;
  onAddToCart: (service: POSService) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onAddToCart }) => {
  return (
    <Card className={cn(
      'border-2 hover:shadow-lg transition-all duration-200 cursor-pointer group h-full',
      categoryColors[service.category]
    )}>
      <CardContent className="p-3 sm:p-4 h-full">
        <div className="flex flex-col h-full">
          {/* Service Header */}
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 line-clamp-1">
                {service.name}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {service.description}
              </p>
            </div>
            <div
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full ml-2 flex-shrink-0"
              style={{ backgroundColor: service.color }}
            />
          </div>

          {/* Service Details */}
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>{service.duration} min</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-3 h-3 mr-1" />
              <span className="capitalize hidden sm:inline">{service.category}</span>
              <span className="capitalize sm:hidden">{service.category.slice(0, 4)}</span>
            </div>
          </div>

          {/* Price and Add Button */}
          <div className="flex items-center justify-between mt-auto gap-2">
            <div className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              {formatCurrency(service.price)}
            </div>
            <Button
              size="sm"
              onClick={() => onAddToCart(service)}
              className="group-hover:scale-105 transition-transform duration-200 text-xs sm:text-sm px-2 sm:px-3"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              <span className="hidden sm:inline">Add</span>
              <span className="sm:hidden">+</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

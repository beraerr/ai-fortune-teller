'use client';

import { useState, useRef } from 'react';

interface CrossSpreadLayoutProps {
  selectedCards: number[];
  onCardSelect: (cardIndex: number) => void;
  onRevealCards: () => void;
  isReading?: boolean;
  maxCards?: number;
}

// Card back component with mystical design
const TarotCardBack = ({ 
  size = 'md',
  isInDeck = false,
  isSelected = false,
  onClick,
  style
}: { 
  size?: 'sm' | 'md' | 'lg';
  isInDeck?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}) => {
  const sizeClasses = {
    sm: 'w-16 h-24',
    md: 'w-20 h-28',
    lg: 'w-24 h-36'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        relative rounded-lg overflow-hidden cursor-pointer
        transition-all duration-300 flex-shrink-0
        ${isSelected ? 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/30 scale-105' : ''}
        ${isInDeck ? 'hover:-translate-y-2 hover:z-10' : ''}
      `}
      onClick={onClick}
      style={style}
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        {/* Starry background effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${10 + (i * 7) % 80}%`,
                left: `${15 + (i * 13) % 70}%`,
                opacity: 0.3 + (i % 3) * 0.2
              }}
            />
          ))}
        </div>
      </div>

      {/* Ornate border frame */}
      <div className="absolute inset-1.5 border border-slate-500/50 rounded-md">
        {/* Corner decorations */}
        <svg className="absolute top-0 left-0 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 8 L2 2 L8 2" />
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </svg>
        <svg className="absolute top-0 right-0 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M22 8 L22 2 L16 2" />
          <circle cx="22" cy="2" r="1" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M2 16 L2 22 L8 22" />
          <circle cx="2" cy="22" r="1" fill="currentColor" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M22 16 L22 22 L16 22" />
          <circle cx="22" cy="22" r="1" fill="currentColor" />
        </svg>

        {/* Decorative diamond lines on sides */}
        <div className="absolute left-1/2 top-2 -translate-x-1/2">
          <svg className="w-2 h-2 text-slate-400" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0 L8 6 L6 12 L4 6 Z" />
          </svg>
        </div>
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2">
          <svg className="w-2 h-2 text-slate-400" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0 L8 6 L6 12 L4 6 Z" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1 -translate-y-1/2">
          <svg className="w-2 h-2 text-slate-400" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0 L8 6 L6 12 L4 6 Z" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-1 -translate-y-1/2">
          <svg className="w-2 h-2 text-slate-400" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 0 L8 6 L6 12 L4 6 Z" />
          </svg>
        </div>

        {/* Center star pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-slate-500/60" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M24 8 L26 20 L38 24 L26 28 L24 40 L22 28 L10 24 L22 20 Z" />
            <circle cx="24" cy="24" r="3" fill="currentColor" opacity="0.3" />
            <path d="M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24" strokeWidth="0.3" />
          </svg>
        </div>

        {/* Moon crescents */}
        <svg className="absolute top-3 right-3 w-2 h-2 text-slate-400/50" viewBox="0 0 12 12" fill="currentColor">
          <path d="M8 2 A4 4 0 1 0 8 10 A3 3 0 1 1 8 2" />
        </svg>
        <svg className="absolute bottom-3 left-3 w-2 h-2 text-slate-400/50" viewBox="0 0 12 12" fill="currentColor">
          <path d="M4 2 A4 4 0 1 1 4 10 A3 3 0 1 0 4 2" />
        </svg>
      </div>
    </div>
  );
};

// Empty slot component
const EmptySlot = ({ 
  isHorizontal = false,
  label 
}: { 
  isHorizontal?: boolean;
  label?: string;
}) => {
  const baseClasses = isHorizontal ? 'w-28 h-20' : 'w-20 h-28';
  
  return (
    <div className={`${baseClasses} relative`}>
      <div className={`
        absolute inset-0 rounded-lg
        border-2 border-dashed border-slate-400/40
        bg-slate-100/50
      `}>
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

const CrossSpreadLayout = ({
  selectedCards,
  onCardSelect,
  onRevealCards,
  isReading = false,
  maxCards = 5
}: CrossSpreadLayoutProps) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const totalCards = 78;

  // Slot positions: top, left, center, right, bottom
  const slotOrder = ['top', 'left', 'center', 'right', 'bottom'];

  const handleDeckCardClick = (cardIndex: number) => {
    if (selectedCards.includes(cardIndex)) {
      // Deselect - remove from selected
      onCardSelect(cardIndex);
    } else if (selectedCards.length < maxCards) {
      // Select - add to next available slot
      onCardSelect(cardIndex);
    }
  };

  const getCardForSlot = (slotIndex: number) => {
    return selectedCards[slotIndex] !== undefined ? selectedCards[slotIndex] : null;
  };

  return (
    <div className="w-full bg-slate-100 rounded-xl p-8">
      {/* Title */}
      <div className="text-center mb-6">
        <p className="text-slate-600 tracking-widest text-sm">
          WYBIERZ {maxCards} KART
        </p>
      </div>

      {/* Cross Layout */}
      <div className="flex flex-col items-center gap-3 mb-10">
        {/* Top slot */}
        <div>
          {getCardForSlot(0) !== null ? (
            <TarotCardBack 
              size="md" 
              isSelected={true}
              onClick={() => onCardSelect(selectedCards[0])}
            />
          ) : (
            <EmptySlot />
          )}
        </div>

        {/* Middle row: left, center (horizontal), right */}
        <div className="flex items-center gap-3">
          {/* Left slot */}
          <div>
            {getCardForSlot(1) !== null ? (
              <TarotCardBack 
                size="md"
                isSelected={true}
                onClick={() => onCardSelect(selectedCards[1])}
              />
            ) : (
              <EmptySlot />
            )}
          </div>

          {/* Center slot (horizontal card) */}
          <div>
            {getCardForSlot(2) !== null ? (
              <div className="transform rotate-90">
                <TarotCardBack 
                  size="md"
                  isSelected={true}
                  onClick={() => onCardSelect(selectedCards[2])}
                />
              </div>
            ) : (
              <EmptySlot isHorizontal={true} />
            )}
          </div>

          {/* Right slot */}
          <div>
            {getCardForSlot(3) !== null ? (
              <TarotCardBack 
                size="md"
                isSelected={true}
                onClick={() => onCardSelect(selectedCards[3])}
              />
            ) : (
              <EmptySlot />
            )}
          </div>
        </div>

        {/* Bottom slot */}
        <div>
          {getCardForSlot(4) !== null ? (
            <TarotCardBack 
              size="md"
              isSelected={true}
              onClick={() => onCardSelect(selectedCards[4])}
            />
          ) : (
            <EmptySlot />
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="max-w-xs mx-auto mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-500">Wybrano:</span>
          <span className="text-sm font-medium text-slate-700">{selectedCards.length} / {maxCards}</span>
        </div>
        <div className="w-full bg-slate-300 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${(selectedCards.length / maxCards) * 100}%` }}
          />
        </div>
      </div>

      {/* Deck of cards */}
      <div className="relative">
        <div 
          ref={deckRef}
          className="overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-1 px-4" style={{ width: 'max-content' }}>
            {[...Array(totalCards)].map((_, i) => {
              const isSelected = selectedCards.includes(i);
              const isDisabled = selectedCards.length >= maxCards && !isSelected;
              
              return (
                <div 
                  key={i}
                  style={{ marginLeft: i === 0 ? 0 : '-24px' }}
                >
                  <TarotCardBack
                    size="md"
                    isInDeck={true}
                    isSelected={isSelected}
                    onClick={() => !isDisabled && handleDeckCardClick(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-slate-100 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-slate-100 to-transparent pointer-events-none" />
      </div>

      {/* Reveal button */}
      <div className="text-center mt-6">
        <button
          className={`
            px-8 py-3 rounded-lg font-medium text-white transition-all duration-300
            ${selectedCards.length === maxCards && !isReading
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg transform hover:scale-105'
              : 'bg-slate-400 cursor-not-allowed'
            }
          `}
          onClick={onRevealCards}
          disabled={selectedCards.length !== maxCards || isReading}
        >
          {isReading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Odkrywam karty...</span>
            </div>
          ) : (
            'Odkryj karty'
          )}
        </button>
        
        {selectedCards.length < maxCards && (
          <p className="text-sm text-slate-500 mt-2">
            Wybierz {maxCards - selectedCards.length} {maxCards - selectedCards.length === 1 ? 'kartę więcej' : 'karty więcej'}
          </p>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CrossSpreadLayout;


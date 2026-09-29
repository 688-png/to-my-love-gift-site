import React, { useState } from 'react';
import { useRomantic } from '../context/RomanticContext';
import { BucketListItem } from '../config/romantic-content';
import {
  Check,
  Plus,
  Trash2,
  Compass,
  Home,
  Plane,
  Palette,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const categoryLabels: Record<BucketListItem['category'], { label: string; icon: React.ElementType }> = {
  adventure: { label: 'Adventure', icon: Compass },
  cozy: { label: 'Cozy & Home', icon: Home },
  travel: { label: 'Dream Travel', icon: Plane },
  creative: { label: 'Creative & Fun', icon: Palette },
};

export const BucketList: React.FC = () => {
  const { bucketList, toggleBucketItem, addBucketItem, removeBucketItem } = useRomantic();

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BucketListItem['category']>('adventure');
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const total = bucketList.length;
  const completedCount = bucketList.filter(item => item.completed).length;
  const progressPercent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const handleToggle = (item: BucketListItem) => {
    toggleBucketItem(item.id);
    if (!item.completed) {
      try {
        confetti({
          particleCount: 50,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#B94F68', '#702D40', '#F3E1E5', '#B18A45'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addBucketItem(newTitle.trim(), newCategory);
    setNewTitle('');
    setIsAdding(false);
  };

  const filteredItems = bucketList.filter(item => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <section id="bucketlist" className="py-24 px-4 sm:px-6 bg-[#F3E1E5]/20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase text-[#B94F68] font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#B94F68]" />
            <span>Someday &amp; Forever</span>
            <span aria-hidden="true">·</span>
            <span>Shared Dreams</span>
          </div>
          <h2 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl text-[#702D40] font-normal tracking-tight mb-4">
            Our Bucket List
          </h2>
          <p className="text-base text-[#705E64] font-normal leading-relaxed mb-6">
            Adventures to chase, slow mornings to savor, and milestones to cross off hand-in-hand.
          </p>

          {/* Progress Bar & Status */}
          <div className="max-w-md mx-auto bg-white/90 border border-[#E5CCD2] rounded-2xl p-4 shadow-2xs mb-8">
            <div className="flex items-center justify-between text-xs text-[#702D40] font-medium mb-2">
              <span>Our Adventure Progress</span>
              <span className="tabular-nums font-semibold">
                {completedCount} of {total} cherished ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#F3E1E5] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B94F68] to-[#702D40] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Filter Segmented Controls & Add Activity CTA */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 p-1 bg-white border border-[#E5CCD2] rounded-xl">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#702D40] text-white shadow-2xs'
                    : 'text-[#705E64] hover:text-[#702D40]'
                }`}
              >
                All ({total})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filter === 'pending'
                    ? 'bg-[#702D40] text-white shadow-2xs'
                    : 'text-[#705E64] hover:text-[#702D40]'
                }`}
              >
                To Dream ({total - completedCount})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filter === 'completed'
                    ? 'bg-[#702D40] text-white shadow-2xs'
                    : 'text-[#705E64] hover:text-[#702D40]'
                }`}
              >
                Cherished ({completedCount})
              </button>
            </div>

            <button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#702D40] hover:bg-[#8F354F] text-white rounded-full text-xs font-medium transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bucket Item</span>
            </button>
          </div>
        </div>

        {/* Add Item Drawer Form */}
        {isAdding && (
          <form
            onSubmit={handleCreate}
            className="mb-8 p-6 bg-white border border-[#E5CCD2] rounded-2xl shadow-sm"
          >
            <h4 className="font-serif-heading text-lg text-[#702D40] mb-3">Add a Shared Dream</h4>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="text"
                placeholder="e.g. Learn to salsa dance together in the living room"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5CCD2] text-sm focus:outline-none focus:border-[#702D40]"
                autoFocus
              />
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as BucketListItem['category'])}
                className="px-3 py-2.5 rounded-xl border border-[#E5CCD2] text-xs text-[#302329] bg-white focus:outline-none focus:border-[#702D40]"
              >
                <option value="adventure">Adventure</option>
                <option value="cozy">Cozy &amp; Home</option>
                <option value="travel">Dream Travel</option>
                <option value="creative">Creative &amp; Fun</option>
              </select>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-1.5 text-xs text-[#705E64] hover:text-[#702D40]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-[#702D40] hover:bg-[#8F354F] text-white text-xs font-medium rounded-full"
              >
                Save to Bucket List
              </button>
            </div>
          </form>
        )}

        {/* List of Bucket Items */}
        <div className="space-y-3">
          {filteredItems.map(item => {
            const catInfo = categoryLabels[item.category] || categoryLabels.adventure;
            const CategoryIcon = catInfo.icon;

            return (
              <div
                key={item.id}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start sm:items-center justify-between gap-4 ${
                  item.completed
                    ? 'bg-white/60 border-[#E5CCD2]/60 opacity-85'
                    : 'bg-white border-[#E5CCD2] hover:border-[#B94F68] shadow-xs hover:shadow-sm'
                }`}
              >
                {/* Left check button & Title */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1">
                  <button
                    onClick={() => handleToggle(item)}
                    aria-label={`Mark "${item.title}" as ${item.completed ? 'uncompleted' : 'completed'}`}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer shrink-0 mt-0.5 sm:mt-0 ${
                      item.completed
                        ? 'bg-[#702D40] border-[#702D40] text-white'
                        : 'border-[#B94F68] hover:bg-[#F3E1E5]/40 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-1">
                    <span
                      className={`text-sm sm:text-base leading-snug block transition-all ${
                        item.completed
                          ? 'line-through text-[#302329]/50'
                          : 'text-[#302329] font-normal'
                      }`}
                    >
                      {item.title}
                    </span>

                    {/* Unboxed category and completion metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#705E64] mt-1">
                      <span className="flex items-center gap-1 text-[#B94F68]">
                        <CategoryIcon className="w-3 h-3" />
                        <span>{catInfo.label}</span>
                      </span>
                      {item.completed && item.completedDate && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#702D40]">Cherished in {item.completedDate}</span>
                        </>
                      )}
                      {item.notes && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="italic text-[#702D40]/80 font-editorial">
                            &ldquo;{item.notes}&rdquo;
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeBucketItem(item.id)}
                  aria-label={`Delete "${item.title}"`}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-[#705E64] hover:text-red-600 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

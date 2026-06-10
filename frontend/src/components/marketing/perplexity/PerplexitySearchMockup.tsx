import {
  Search,
  Plus,
  Mic,
  ChevronDown,
  ArrowRight,
  Compass,
  LayoutGrid,
  TrendingUp,
} from 'lucide-react';
import { BRAND } from '@/lib/brand';
import {
  perplexityNavItems,
  perplexityHistoryItems,
  perplexitySuggestedQueries,
  perplexitySearchPlaceholder,
} from '@/lib/marketing/perplexityContent';

const suggestionIcons = {
  compass: Compass,
  grid: LayoutGrid,
  chart: TrendingUp,
} as const;

/** Perplexity-style two-pane search shell — cream canvas, achromatic, no shadows */
export function PerplexitySearchMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`perplexity-mockup ${className}`} aria-hidden>
      {/* Sidebar rail */}
      <aside className="perplexity-sidebar">
        <div className="perplexity-sidebar-search">
          <Search size={16} strokeWidth={1.5} />
          <span>Search</span>
        </div>

        <nav className="perplexity-nav-list" aria-label="Discovery navigation">
          {perplexityNavItems.map((item) => (
            <div
              key={item.id}
              className={`perplexity-nav-item${item.active ? ' perplexity-nav-item-active' : ''}`}
            >
              <span className="h-4 w-4 rounded-full border border-[#d4d2cc]" />
              {item.label}
            </div>
          ))}
        </nav>

        <div>
          <p className="perplexity-sidebar-heading">History</p>
          <p className="perplexity-caption mt-1">Recent and active threads will appear here.</p>
          <div className="mt-2">
            {perplexityHistoryItems.map((title) => (
              <p key={title} className="perplexity-history-item">
                {title}
              </p>
            ))}
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="perplexity-main">
        <p className="text-center text-sm font-medium text-[#27251e]">{BRAND.platform}</p>

        <div className="perplexity-search-input">
          <div className="perplexity-search-placeholder" role="textbox" aria-readonly>
            {perplexitySearchPlaceholder}
          </div>
          <div className="perplexity-search-toolbar">
            <div className="perplexity-search-toolbar-left">
              <button type="button" className="perplexity-icon-btn" tabIndex={-1} aria-hidden>
                <Plus size={16} strokeWidth={1.5} />
              </button>
              <span className="perplexity-source-pill">
                <span className="h-3 w-3 rounded-full border border-[#d4d2cc]" />
                {BRAND.platform}
              </span>
            </div>
            <div className="perplexity-search-toolbar-right">
              <span className="perplexity-model-selector">
                Model
                <ChevronDown size={14} strokeWidth={1.5} />
              </span>
              <button type="button" className="perplexity-icon-btn" tabIndex={-1} aria-hidden>
                <Mic size={16} strokeWidth={1.5} />
              </button>
              <button type="button" className="perplexity-submit-btn" tabIndex={-1} aria-hidden>
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        <div className="perplexity-suggestions">
          {perplexitySuggestedQueries.map((query) => {
            const Icon = suggestionIcons[query.icon];
            return (
              <div key={query.id} className="perplexity-suggestion-card">
                <div className="perplexity-suggestion-card-header">
                  <Icon size={16} strokeWidth={1.5} />
                  {query.label}
                </div>
                <div className="perplexity-suggestion-preview">
                  <div className="perplexity-suggestion-bar perplexity-suggestion-bar-medium" />
                  <div className="perplexity-suggestion-bar perplexity-suggestion-bar-short" />
                  <div className="perplexity-suggestion-bar" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

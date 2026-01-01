"use client"

import { useMemo, useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, X, Filter } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useItemList, useItemCategories } from "@/hooks/use-pokemon"
import { ALL_ITEM_POCKETS } from "@/lib/pokeapi"
import { ITEM_POCKET_COLORS, ITEM_POCKET_LABELS } from "@/types/pokemon"
import type { ItemPocket, ItemListItem } from "@/types/pokemon"

interface Filters {
  search: string
  pockets: ItemPocket[]
  categories: string[]
}

export default function ItemsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useItemList()
  const { data: categories } = useItemCategories()
  const [filters, setFilters] = useState<Filters>({
    search: "",
    pockets: [],
    categories: [],
  })
  const [showFilters, setShowFilters] = useState(false)

  // Infinite scroll observer
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useEffect(() => {
    const element = loadMoreRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
      rootMargin: "200px",
    })
    observer.observe(element)

    return () => observer.disconnect()
  }, [handleObserver])

  // Flatten all items from pages
  const allItems = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page.items)
  }, [data])

  // Get categories filtered by selected pockets
  const availableCategories = useMemo(() => {
    if (!categories) return []
    if (filters.pockets.length === 0) return categories
    return categories.filter((c) => filters.pockets.includes(c.pocket))
  }, [categories, filters.pockets])

  // Apply filters client-side
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        if (!item.name.toLowerCase().includes(searchLower)) {
          return false
        }
      }

      // Pocket filter
      if (filters.pockets.length > 0 && !filters.pockets.includes(item.pocket)) {
        return false
      }

      // Category filter
      if (filters.categories.length > 0) {
        const itemCat = item.category.toLowerCase().replace(/\s+/g, "-")
        if (!filters.categories.includes(itemCat)) {
          return false
        }
      }

      return true
    })
  }, [allItems, filters])

  const activeFilterCount = filters.pockets.length + filters.categories.length

  const togglePocket = (pocket: ItemPocket) => {
    setFilters((prev) => ({
      ...prev,
      pockets: prev.pockets.includes(pocket)
        ? prev.pockets.filter((p) => p !== pocket)
        : [...prev.pockets, pocket],
      // Clear category filters when pocket changes
      categories: [],
    }))
  }

  const toggleCategory = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const clearFilters = () => {
    setFilters({ search: "", pockets: [], categories: [] })
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Search & Filter Controls */}
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-6 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search items..."
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {filters.search && (
              <button
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="size-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-muted transition-colors",
              showFilters && "bg-muted"
            )}
          >
            <Filter className="size-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="p-4 border rounded-lg space-y-4">
            {/* Pockets */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Pocket</Label>
                {filters.pockets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, pockets: [], categories: [] }))}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1">
                {ALL_ITEM_POCKETS.map((pocket) => (
                  <PocketFilterButton
                    key={pocket}
                    pocket={pocket}
                    selected={filters.pockets.includes(pocket)}
                    onClick={() => togglePocket(pocket)}
                  />
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Category</Label>
                {filters.categories.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setFilters((prev) => ({ ...prev, categories: [] }))}
                    className="text-xs text-muted-foreground hover:text-foreground"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={cn(
                      "px-3 py-1 text-xs border rounded-full transition-colors",
                      filters.categories.includes(cat.id)
                        ? "bg-foreground text-background border-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
                {availableCategories.length === 0 && (
                  <span className="text-xs text-muted-foreground">
                    {categories ? "Select a pocket to see categories" : "Loading categories..."}
                  </span>
                )}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto mb-4">
        <p className="text-xs text-muted-foreground">
          {isLoading ? (
            "Loading items..."
          ) : (
            <>
              Showing {filteredItems.length} items
              {data && allItems.length < data.pages[0].count && (
                <> (loaded {allItems.length} of {data.pages[0].count})</>
              )}
            </>
          )}
        </p>
      </div>

      {/* Items List */}
      <div className="max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        {isLoading ? (
          <ItemsListSkeleton />
        ) : (
          <>
            <div className="border rounded-lg overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[40px,1fr,100px,120px,80px] gap-2 px-4 py-2 bg-muted text-xs text-muted-foreground font-medium">
                <span />
                <span>Name</span>
                <span>Pocket</span>
                <span>Category</span>
                <span className="text-right">Cost</span>
              </div>

              {/* Rows */}
              {filteredItems.map((item) => (
                <ItemRow key={item.id} item={item} />
              ))}

              {filteredItems.length === 0 && !isLoading && (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  No items found matching your filters
                </div>
              )}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={loadMoreRef} className="py-4">
              {isFetchingNextPage && (
                <div className="flex justify-center">
                  <div className="animate-spin size-5 border-2 border-muted border-t-foreground rounded-full" />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Components
// ============================================================================

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
      {children}
    </span>
  )
}

function PocketFilterButton({
  pocket,
  selected,
  onClick,
}: {
  pocket: ItemPocket
  selected: boolean
  onClick: () => void
}) {
  const color = ITEM_POCKET_COLORS[pocket]
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-[10px] px-2 py-0.5 uppercase tracking-wider rounded transition-all",
        selected ? "ring-2 ring-offset-1 ring-offset-background" : "opacity-60 hover:opacity-100"
      )}
      style={{
        backgroundColor: `${color}20`,
        color,
        // @ts-expect-error - CSS custom property for Tailwind ring color
        "--tw-ring-color": color,
      }}
    >
      {ITEM_POCKET_LABELS[pocket]}
    </button>
  )
}

function ItemRow({ item }: { item: ItemListItem }) {
  const color = ITEM_POCKET_COLORS[item.pocket]
  const slug = item.name.toLowerCase().replace(/\s+/g, "-")

  return (
    <Link
      href={`/items/${slug}`}
      className="grid grid-cols-[40px,1fr,100px,120px,80px] gap-2 px-4 py-2 text-sm border-t hover:bg-muted/50 transition-colors items-center"
    >
      <div className="size-8 relative">
        {item.sprite ? (
          <Image
            src={item.sprite}
            alt={item.name}
            fill
            className="object-contain pixelated"
            unoptimized
          />
        ) : (
          <div className="size-8 bg-muted rounded" />
        )}
      </div>
      <span className="font-medium truncate">{item.name}</span>
      <span
        className="text-[10px] px-1.5 py-0.5 uppercase tracking-wider rounded self-center w-fit"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {ITEM_POCKET_LABELS[item.pocket]}
      </span>
      <span className="text-xs text-muted-foreground truncate">{item.category}</span>
      <span className="text-right tabular-nums text-muted-foreground">
        {item.cost > 0 ? `₽${item.cost.toLocaleString()}` : "—"}
      </span>
    </Link>
  )
}

function ItemsListSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-[40px,1fr,100px,120px,80px] gap-2 px-4 py-2 bg-muted">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-[40px,1fr,100px,120px,80px] gap-2 px-4 py-2 border-t items-center"
        >
          <Skeleton className="size-8 rounded" />
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-12 ml-auto" />
        </div>
      ))}
    </div>
  )
}

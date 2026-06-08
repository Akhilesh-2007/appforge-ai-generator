'use client';

import React, { useState, useMemo } from 'react';
import { TableConfig } from '@/types/schema';
import { cn } from '@/lib/utils';
import { EmptyState } from '@/components/shared/EmptyState';
import { ChevronUp, ChevronDown, Search, ChevronLeft, ChevronRight } from 'lucide-react';

export function DynamicTable({ title, columns, data, className }: TableConfig) {
  const cols = useMemo(() => columns ?? [], [columns]);
  const rows = useMemo(() => data ?? [], [data]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Derive columns if not provided
  const effectiveCols = useMemo(() => {
    if (cols.length > 0) return cols;
    if (rows.length > 0) return Object.keys(rows[0]);
    return [];
  }, [cols, rows]);

  // Handle Sort Toggle
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // 1. Search Filtering
  const filteredRows = useMemo(() => {
    if (!searchTerm.trim()) return rows;
    const term = searchTerm.toLowerCase();
    return rows.filter((row) =>
      effectiveCols.some((col) =>
        String(row[col] ?? '').toLowerCase().includes(term)
      )
    );
  }, [rows, effectiveCols, searchTerm]);

  // 2. Sorting
  const sortedRows = useMemo(() => {
    if (!sortKey) return filteredRows;
    const sorted = [...filteredRows].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA === undefined || valA === null) return 1;
      if (valB === undefined || valB === null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      }

      return sortDirection === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    return sorted;
  }, [filteredRows, sortKey, sortDirection]);

  // 3. Pagination
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedRows.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedRows, currentPage]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / itemsPerPage));

  if (effectiveCols.length === 0 && rows.length === 0) {
    return <EmptyState title="No table data" description="Add columns and data to render the table." />;
  }

  return (
    <div className={cn('rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col', className)}>
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-zinc-900/10">
        {title && (
          <h3 className="text-sm font-semibold text-white/80">{title}</h3>
        )}
        
        {/* Search Field */}
        <div className="relative max-w-xs w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page
            }}
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
          />
        </div>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {effectiveCols.map((col, i) => {
                const isSorted = sortKey === col;
                return (
                  <th
                    key={i}
                    onClick={() => handleSort(col)}
                    className="px-5 py-3 text-left text-xs font-semibold text-white/50 uppercase tracking-wider cursor-pointer hover:bg-white/5 select-none transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col}</span>
                      {isSorted ? (
                        sortDirection === 'asc' ? <ChevronUp size={12} className="text-indigo-400" /> : <ChevronDown size={12} className="text-indigo-400" />
                      ) : (
                        <ChevronUp size={12} className="text-white/20 opacity-0 hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={effectiveCols.length} className="px-5 py-8 text-center text-xs text-white/30">
                  No match records found
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                >
                  {effectiveCols.map((col, colIdx) => {
                    const cellValue = row[col];
                    const isStatus = col.toLowerCase() === 'status';
                    return (
                      <td key={colIdx} className="px-5 py-3.5 text-xs text-white/70">
                        {isStatus ? (
                          <span className={cn(
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border',
                            String(cellValue).toLowerCase() === 'active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : String(cellValue).toLowerCase() === 'on leave'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-white/5 text-white/50 border-white/10'
                          )}>
                            {String(cellValue ?? '—')}
                          </span>
                        ) : (
                          String(cellValue ?? '—')
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {sortedRows.length > itemsPerPage && (
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-white/10 bg-zinc-900/5">
          <span className="text-[11px] text-white/40">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedRows.length)} of {sortedRows.length} entries
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-white/5 border border-white/10 text-white/60 disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-[11px] text-white/80 px-2 font-mono">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded bg-white/5 border border-white/10 text-white/60 disabled:opacity-30 cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

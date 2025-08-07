'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';

interface PaginationProps {
    currentPage: number;
    totalResults: number;
    resultsPerPage: number;
}

export function Pagination({ currentPage, totalResults, resultsPerPage }: PaginationProps) {
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const createPageLink = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const getVisiblePages = (): (number | string)[] => {
        const delta = 2;
        const range: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
            return range;
        }

        range.push(1);

        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);
        if (start > 2) {
            range.push('...');
        }

        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        if (end < totalPages - 1) {
            range.push('...');
        }

        range.push(totalPages);

        return range;
    };

    return (
        <nav aria-label="Pagination" className="flex justify-center space-x-2 my-4">
            <Link href={createPageLink(currentPage - 1)} passHref legacyBehavior>
                <Button disabled={currentPage <= 1} aria-disabled={currentPage <= 1} aria-label="Previous page">
                    Previous
                </Button>
            </Link>

            {getVisiblePages().map((page, index) =>
                page === '...' ? (
                    <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-400 select-none">
                        ...
                    </span>
                ) : (
                    <Link key={page} href={createPageLink(Number(page))} passHref legacyBehavior>
                        <Button
                            variant={page === currentPage ? 'default' : 'outline'}
                            aria-current={page === currentPage ? 'page' : undefined}
                            aria-label={`Page ${page}`}
                        >
                            {page}
                        </Button>
                    </Link>
                )
            )}

            <Link href={createPageLink(currentPage + 1)} passHref legacyBehavior>
                <Button disabled={currentPage >= totalPages} aria-disabled={currentPage >= totalPages} aria-label="Next page">
                    Next
                </Button>
            </Link>
        </nav>
    );
}

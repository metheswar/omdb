'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SmartCloseButton() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleClose = () => {
        if (typeof window !== 'undefined') {
            const hasHistory = window.history.length > 1;
            const currentSearchParams = searchParams.toString();

            if (currentSearchParams && hasHistory) {
                router.back();
            } else {
                const homeUrl = currentSearchParams ? `/?${currentSearchParams}` : '/';
                router.push(homeUrl);
            }
        }
    };

    return (
        <button
            onClick={handleClose}
            aria-label="Close movie details and go back"
            className="text-gray-400 hover:text-gray-200 transition"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    );
}

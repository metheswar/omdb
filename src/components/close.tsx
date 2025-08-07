
'use client';
import { useRouter } from 'next/navigation';

export default function ClientCloseButton() {

    const router = useRouter();

    const handleClose = () => {
        if (typeof window !== 'undefined') {
            const referrer = document.referrer;
            const hasHistory = window.history.length > 1;

            if (hasHistory && referrer && referrer.includes(window.location.origin)) {
                router.back();
            } else {
                router.push('/');
            }
        } else {
            router.push('/');
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
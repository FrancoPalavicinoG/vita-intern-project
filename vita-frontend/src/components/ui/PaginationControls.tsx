import React from 'react';

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    goToPage: (page: number) => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
    currentPage,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
}) => {
    if (totalPages <= 1) {
        return null; 
    }
    
    const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        {/* Botón Previous */}
        <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition
            ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Anterior
        </button>

        {/* Números de página */}
        <div className="flex gap-2">
            {pagesArray.map((page) => (
            <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-md font-medium transition
                ${currentPage === page
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
            >
                {page}
            </button>
            ))}
        </div>

        {/* Botón Next */}
        <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition
            ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
        >
            Siguiente
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
        </div>
    );
};

export default PaginationControls;
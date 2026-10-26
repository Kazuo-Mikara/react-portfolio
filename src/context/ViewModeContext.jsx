import React, { createContext, useContext, useState, useEffect } from "react";

const ViewModeContext = createContext();

export const useViewMode = () => {
    const context = useContext(ViewModeContext);
    if (!context) {
        throw new Error("useViewMode must be used within a ViewModeProvider");
    }
    return context;
};

export const ViewModeProvider = ({ children }) => {
    const [viewMode, setViewModeState] = useState(() => {
        const saved = localStorage.getItem("portfolio_view_mode");
        return saved === "full" ? "full" : "compact";
    });

    const [isModalOpen, setIsModalOpen] = useState(() => {
        // Automatically prompt on first visit if user hasn't made an explicit choice
        return !localStorage.getItem("portfolio_view_mode");
    });

    const selectMode = (mode) => {
        setViewModeState(mode);
        localStorage.setItem("portfolio_view_mode", mode);
        setIsModalOpen(false);
    };

    const toggleMode = () => {
        const next = viewMode === "compact" ? "full" : "compact";
        selectMode(next);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ViewModeContext.Provider
            value={{
                viewMode,
                isCompact: viewMode === "compact",
                isFull: viewMode === "full",
                isModalOpen,
                selectMode,
                toggleMode,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ViewModeContext.Provider>
    );
};

export default ViewModeContext;

import { createContext,useState } from "react";

const SearchContext = createContext(
    {
        searchTerm: "",
        setSearchTerm: () => {}
    }
);

const SearchContextProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchContext, SearchContextProvider };
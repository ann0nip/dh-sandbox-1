import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define el tipo del contexto
type MyContextType = {
    data: string;
    updateData: (newData: string) => void;
};

// Crea el contexto
const MyContext = createContext<MyContextType | undefined>(undefined);

// Crea el proveedor de contexto
interface MyContextProviderProps {
    children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
    children,
}) => {
    const [data, setData] = useState<string>('DATA ULTRA SECRETA');

    // Define las funciones o estados que deseas compartir en el contexto
    const updateData = (newData: string) => {
        setData(newData);
    };

    // Puedes incluir cualquier otra lógica o estado necesario en el proveedor

    return (
        <MyContext.Provider value={{ data, updateData }}>
            {children}
        </MyContext.Provider>
    );
};

// Create a custom hook for accessing the context
export const useMyContext = (): MyContextType => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};

export default MyContext;

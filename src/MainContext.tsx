import { createContext } from "react";

export interface IMainContext {
    ip: string;
    setIp: (ip: string) => void;
    loading: Boolean;
    setLoading: (loading: Boolean) => void;
    command: number[];
    setCommand: (command: number[]) => void;
}

export const MainContext = createContext<IMainContext>({} as IMainContext)
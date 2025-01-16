import { atom } from "recoil";
import { INotes, IUser } from "../types/types";

export const loadingAtom = atom<boolean>({
    key:"loadingAtom",
    default:false
})


export const errorAtom = atom<string|null>({
    key:"errorAtom",
    default:null
})


export const userAtom = atom<IUser | null>({
    key:"userAtom",
    default:null
})

export const notesAtom = atom<INotes[]>({
    key:"notesAtom",
    default:[]
})

export const authAtom = atom<boolean>({
    key:"authAtom",
    default:false
})
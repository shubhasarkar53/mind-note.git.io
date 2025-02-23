import { atom } from "recoil";
import { INotes, IUser, Note } from "../types/types";

export const loadingAtom = atom<boolean>({
    key:"loadingAtom",
    default:false
})
export const appLoadingAtom = atom<boolean>({
    key:"appLoadingAtom",
    default:false
})
export const modalAtom = atom<boolean>({
    key:"modalAtom",
    default:false
})
export const shareModalAtom = atom<boolean>({
    key:"shareModalAtom",
    default:false
})


export const errorAtom = atom<string|null>({
    key:"errorAtom",
    default:null
})
export const shareErrorAtom = atom<string|null>({
    key:"shareErrorAtom",
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

export const sharedNoteAtom = atom<INotes>({
    key:"sharedNoteAtom",
    default:{}
})
export const sharableLinkAtom = atom<string|null>({
    key:"sharableLinkAtom",
    default:null
})


//new 

export const notesState = atom<Note[]>({
    key: 'notesState',
    default: []
  });
import {create} from "zustand";
import { ModalDataForm } from "./interface/modal.interface";
export const ModalDataStore = create<ModalDataForm>((...args) => {
    const [set,get] = args;
    return{
        data:{count:0},
        setdata(newData){
            set({data:newData});
        },
    };
});
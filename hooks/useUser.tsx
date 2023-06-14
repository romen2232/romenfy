/* eslint-disable react-hooks/exhaustive-deps */
import {User} from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import {UserDetail} from "@/types";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetail: UserDetail | null;
    isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props{
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    }= useSessionContext()

    const user=useSupaUser();
    const accessToken=session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData]=useState(false);
    //TODO cambiar any por UserDetail pero no funciona xd
    const [userDetail, setUserDetail]=useState<any>(null);

    const getUserDetail = async ()=>{
        const {data, error}=await supabase.from("profiles").select("*").single();
        if(error){
            console.error(error);
        }
        return {data, error};
    }

    useEffect(()=>{
        if(user && !isLoadingData && !userDetail){
            setIsLoadingData(true);
            getUserDetail().then(({data, error})=>{
                if(error){
                    console.error(error);
                }else if(data){
                    setUserDetail(data);
                }
                setIsLoadingData(false);
            });
        }else if(!user&&!isLoadingUser&&!isLoadingData){
            setUserDetail(null);
        }
    }, [user, isLoadingData, userDetail, isLoadingUser, getUserDetail]);

    const value={
        accessToken,
        user,
        userDetail,
        isLoading: isLoadingUser || isLoadingData
    };

    return <UserContext.Provider value={value} {...props} />;
}

export const useUser=()=>{
    const context=useContext(UserContext);
    if(context===undefined){
        throw new Error("useUser must be use within MyUserContextProvider");
    }
    return context;
}
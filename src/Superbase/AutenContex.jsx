import { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import supabase from "./Conexion";

const AutenContext = createContext();

export const AutenContextProvider = ({children}) =>{
    const navegate = useNavigate();
    const [user,setUser] = useState([]);
    async function signInWithGoogle() {
        try{
            const {data, error } = await supabase.auth.signInWithOAuth({
                provider:"google",
            });
            if(error) throw new Error("A ocurrio un error durantela autenticacion");
            return data;
        }catch(error){
            console.log(error);
        };
    }

    async function signout() {
        const {error}  = await supabase.auth.signOut();
        if(error) throw new Error("A ocurrio un error durante el cierre de sesion");
    }

    useEffect(()=> {
        const {data:autenticacion} = supabase.auth.onAuthStateChange(async ( event,session)=>{
            console.log("Superbase seccion: ",event);
            if(session==null){
                navegate("/login",{replace:true})
            }
            else{
                //Aqui guardamos los metados de la persona que se regitro con google 
                setUser(session?.user.user_metadata);
                //Aqui se ve los datos que trae el odjeto de google
                console.log("prueba del usuario : " , session?.user.user_metadata)
                navegate("/",{replace:true})
            }
        });
        return ()=>{
            autenticacion.subscription;
        }
    },[]);

    return (
       <AutenContext.Provider value={{ signInWithGoogle, signout, user }}>
            {children}
        </AutenContext.Provider>

    )
}

export const UserAuth = (()=>
    {
        return useContext(AutenContext)
    }
)
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "./Conexion";

const AutenContext = createContext();

export const AutenContextProvider = ({children}) =>{
    
    const [Userid,setUserID] = useState(null);
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
      const { data: autenticacion } = supabase.auth.onAuthStateChange(async (event,session)=>{
          setUser(session?.user.user_metadata);
          insertarUsuario(session?.user.user_metadata, setUserID);
          console.log("prueba del usuario : " , session?.user.user_metadata);
          const idUsuario = localStorage.getItem("Id_Usuario");
          setUserID(idUsuario);

      });
          return ()=>{
              autenticacion.subscription;
          }
      },[]);

    return (
       <AutenContext.Provider value={{ signInWithGoogle, signout, user, Userid}}>
            {children}
        </AutenContext.Provider>

    )
}

export const UserAuth = (()=>
    {
        return useContext(AutenContext)
    }
)


async function insertarUsuario(user,setUserID) {
  if (!user?.email) return null; // evita errores si no hay usuario

  // 1️⃣ Revisar si ya existe
  const { data: usuarioExistente, error: errorSelect } = await supabase
    .from("Usuarios")
    .select("*")
    .eq("Correo_Electronico", user.email)
    .single();

  if (errorSelect && errorSelect.code !== "PGRST116") {
    console.error("❌ Error al buscar usuario:", errorSelect);
    return null;
  }

  if (usuarioExistente) {
    console.log("⚠️ El usuario ya existe:", usuarioExistente);

    setUserID(usuarioExistente.Id);
    
    // 👉 guardamos en localStorage el id del usuario insertado
    localStorage.setItem("Id_Usuario", usuarioExistente.Id);

    return usuarioExistente.Id; // devolvemos el id
  }

  // 2️⃣ Insertar nuevo usuario
  const { data, error: errorInsert } = await supabase
    .from("Usuarios")
    .insert([
      {
        Correo_Electronico: user.email,
        Nombre: user.full_name,
        Telefono: user.phone || null,
        Website: null,
        Calendar_Url: null,
        Logo: user.avatar_url || null,
      },
    ])
    .select()
    .single(); // ✅ para que devuelva solo un objeto

  if (errorInsert) {
    console.error("❌ Error insertando usuario:", errorInsert);
    return null;
  } else {
    console.log("✅ Usuario insertado:", data);

    // 👉 guardamos en localStorage el id del usuario insertado
    localStorage.setItem("Id_Usuario", data.Id);

    return data.id; // devolvemos id insertado
  }
}


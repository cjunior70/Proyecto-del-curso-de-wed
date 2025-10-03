import { useEffect, useState } from "react";
import  Conexion  from "../Superbase/Conexion";
import { UserAuth } from "../Superbase/AutenContex";
import Cartas from "./Cartas";
import Contenido_modal from "./Modal";
import { Outlet } from "react-router-dom";

export default function Work(){

  const [Galeria, setGaleria] = useState([]);
  const [Id_Carta, SetId_Carta] = useState(null);

  const {Userid} = UserAuth();

  console.log("Id del usuario: " + Userid);

  useEffect(() => {
    async function getGaleria() {

      if (!Userid) {
        console.warn("⚠️ No hay Userid aún, no se hace la consulta");
        return;
      }

      // consulta con JOIN entre Coleccion y Galeria
      const { data, error } = await Conexion
        .from("Coleccion")
        .select(`
          Id,   
          Id_Usuario,           
          Titulo,
          Descripcion,
          Galeria (
            Id,
            Titulo,
            Url_Contenido,
            Id_Coleccion
          ),
          Usuarios: Coleccion_Id_Usuario_fkey (
          Id,
          Nombre,
          Imagen
          )
        `)
        .eq("Id_Usuario", Userid); // 👈 filtra las colecciones de este usuario

      if (error) {
        console.error("❌ Error:", error.message);
      } else {
          console.log("✅ Colecciones con sus imágenes:", data);
        setGaleria(data);
      }
    }

    getGaleria();
  }, [Userid]);


    return(
        <>
              {/* Cartas */}
                    <section className="d-flex justify-content-center flex-wrap flex-column align-items-center w-100">
                      <section className="p-3 d-flex flex-wrap justify-content-start w-100">
                        {Galeria.map((item) => (
                          <section className="col-3 p-2 margen " key={item.Id} >
                            {/* {console.log(item.id)}
                            {console.log(Id_Carta)} */}
                             <Cartas item={item} SetId_Carta={SetId_Carta} />
                          </section>
                        ))}
                      </section>
                    </section>
            
                    {Id_Carta !== null && (
                        <section className="modal d-block m-1">
                          <section className="modal-dialog modal-fullscreen" style={{height:"92%", width: "99%"}}>
                            <section className="modal-content">
                              <section className="modal-header ">
                                <button
                                  type="button"
                                  className="btn-close"
                                  onClick={() => SetId_Carta(null)}
                                ></button>
                              </section>
                              <section className="modal-body">
                                <Contenido_modal data={Galeria.find((item) => item.Id === Id_Carta)} />
                              </section>
                            </section>
                          </section>
                        </section>
                    )}
        </>
    )
}
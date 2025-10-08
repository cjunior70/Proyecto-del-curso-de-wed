import { useEffect, useState } from "react";
import Cartas from "./Cartas";
import Conexion from "../Superbase/Conexion";
import { UserAuth } from "../Superbase/AutenContex";
import Contenido_modal from "./Modal";

export default function MisFavoritos() {
  const [Galeria, setGaleria] = useState([]);
  const [Id_Carta, SetId_Carta] = useState(null);
  const { Userid } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Userid) return;

    const fetchFavoritos = async () => {
      try {
        const { data: likes, error: errorLikes } = await Conexion
          .from("Likes")
          .select("Id_Coleccion")
          .eq("Id_Usuario", Userid);

        if (errorLikes) throw errorLikes;

        const coleccionesIds = likes.map(l => l.Id_Coleccion);

        if (coleccionesIds.length === 0) {
          setGaleria([]);
          setLoading(false);
          return;
        }

        const { data: coleccionesData, error: errorColecciones } = await Conexion
          .from("Coleccion")
          .select(`
            *,
            Usuarios(*),
            Galeria(*),
            Likes(*)
          `)
          .in("Id", coleccionesIds);

        if (errorColecciones) throw errorColecciones;

        setGaleria(coleccionesData);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error obteniendo favoritos:", err);
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [Userid]);

//   if (loading) return <p>Cargando favoritos...</p>;
//   if (Galeria.length === 0) return <p>No tienes colecciones con like aún.</p>;

  return (
    <>
      {/* Cartas */}
      <section className="d-flex justify-content-center flex-wrap flex-column align-items-center w-100">
        <section className="p-3 d-flex flex-wrap justify-content-start w-100">
          {Galeria.map((item) => (
            <section className="col-3 p-2 margen" key={item.Id}>
              <Cartas item={item} SetId_Carta={SetId_Carta} />
            </section>
          ))}
        </section>
      </section>

      {/* Modal */}
      {Id_Carta !== null && (
        <section className="modal d-block m-1">
          <section
            className="modal-dialog modal-fullscreen border border-black rounded-4"
            style={{ height: "92%", width: "99%" }}
          >
            <section className="modal-content">
              <section className="modal-header">
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
  );
}

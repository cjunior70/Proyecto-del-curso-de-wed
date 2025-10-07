import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Conexion from "../../Superbase/Conexion";
import Cartas from "../../Componentes/Cartas";
import Contenido_modal from "../../Componentes/Modal";

export default function Buscar() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [Id_Carta, SetId_Carta] = useState(null); // 👈 estado para el modal

  useEffect(() => {
    if (!query) return;

    const buscarDatos = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await Conexion
          .from("Coleccion")
          .select(`
            Id,
            Id_Usuario,
            Titulo,
            Descripcion,
            Usuarios: Coleccion_Id_Usuario_fkey (
              Id,
              Nombre,
              Imagen
            ),
            Galeria (
              Id,
              Titulo,
              Url_Contenido,
              Id_Coleccion
            ),
            Likes (
              Id,
              Id_Usuario,
              Id_Coleccion
            )
          `)
          .ilike("Titulo", `%${query}%`);

        if (error) throw error;
        setResultados(data);
      } catch (err) {
        console.error("Error al consultar Supabase:", err);
        setError("No se pudo obtener la información 😔");
      } finally {
        setLoading(false);
      }
    };

    buscarDatos();
  }, [query]);

  // Bloquear scroll al abrir modal (igual que en Principal)
  useEffect(() => {
    if (Id_Carta !== null) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [Id_Carta]);

  return (
    <section className="container mt-4 border p-2">
      <h2 className="mb-3">Resultados de la búsqueda</h2>

      {loading && <p>Cargando datos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && query && (
        <>
          <p>
            🔍 Mostrando resultados para:{" "}
            <strong style={{ color: "#007bff" }}>{query}</strong>
          </p>

          {resultados.length > 0 ? (
            <section className="d-flex justify-content-center flex-wrap flex-column align-items-center w-100">
              <section className="p-3 d-flex flex-wrap justify-content-start w-100">
                {resultados.map((item) => (
                  <section className="col-3.5 p-1 margen" key={item.Id}>
                    <Cartas item={item} SetId_Carta={SetId_Carta} />
                  </section>
                ))}
              </section>
            </section>
          ) : (
            <>    
                <section >
                    <p>No se encontraron coincidencias.</p>
                </section>
            </>
          )}
        </>
      )}

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
                <Contenido_modal
                  data={resultados.find((item) => item.Id === Id_Carta)}
                />
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  );
}

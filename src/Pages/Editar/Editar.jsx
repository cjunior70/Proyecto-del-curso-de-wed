import { useLocation } from "react-router-dom";
import { useState } from "react";
import Conexion from "../../Superbase/Conexion";
import { UserAuth } from "../../Superbase/AutenContex";

export default function Editar() {
  const location = useLocation();
  const { data } = location.state || {};

  // Estados locales para edición
  const [tituloColeccion, setTituloColeccion] = useState(data?.Titulo || "");
  const [descripcion, setDescripcion] = useState(data?.Descripcion || "");
  const [imagenUrl, setImagenUrl] = useState(data?.Galeria?.[0]?.Url_Contenido || "");
  const [tituloImagen, setTituloImagen] = useState(data?.Galeria?.[0]?.Titulo || "");

  // Estado para controlar el GIF de carga
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    try {
      setLoading(true); // ⬅️ Activamos el GIF de carga

      // 1️⃣ Actualizar la colección
      const { error: errorColeccion } = await Conexion
        .from("Coleccion")
        .update({
          Titulo: tituloColeccion,
          Descripcion: descripcion,
        })
        .eq("Id", data.Id)
        .select();

      if (errorColeccion) throw errorColeccion;

      // 2️⃣ Actualizar la galería
      const { error: errorGaleria } = await Conexion
        .from("Galeria")
        .update({
          Url_Contenido: imagenUrl,
          Titulo: tituloImagen,
        })
        .eq("Id", data.Galeria[0].Id);

      if (errorGaleria) throw errorGaleria;

      alert("Colección actualizada correctamente ✅");
      window.history.back();
    } catch (err) {
      console.error("Error al actualizar:", err.message);
      alert("Hubo un error al actualizar ❌");
    } finally {
      setLoading(false); // ⬅️ Desactivamos el GIF de carga
    }
  };

  return (
    <section className="container mt-5">
      <section className="d-flex col-11 gap-3 justify-content-between position-absolute">
        <button className="btn btn-light px-4" onClick={() => window.history.back()}>
          Cancelar
        </button>

        <button className="btn btn-dark px-4" onClick={handleGuardar} disabled={loading}>
          {loading ? (
            <img
              src="https://i.gifer.com/ZZ5H.gif"
              alt="Cargando..."
              width="20"
              height="20"
            />
          ) : (
            "Guardar Cambios"
          )}
        </button>
      </section>

      <section>
        <h2 className="mb-4 text-center">Editar Colección</h2>
      </section>

      <section>
        {data?.Usuarios && (
          <section className="d-flex align-items-center mb-4">
            <img
              src={data.Usuarios.Imagen}
              alt={data.Usuarios.Nombre}
              className="rounded-circle me-3 shadow"
              width="50"
              height="50"
            />
            <h5 className="mb-0">{data.Usuarios.Nombre}</h5>
          </section>
        )}

        <section className="mb-4 text-center">
          <img
            src={imagenUrl}
            alt="Vista previa"
            width="300"
            className="rounded shadow mb-3"
          />
          <input
            type="text"
            className="form-control w-75 mx-auto"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="URL de la imagen"
          />
        </section>

        <section className="mb-3">
          <label className="form-label fw-bold">Título de la colección</label>
          <input
            type="text"
            className="form-control"
            value={tituloColeccion}
            onChange={(e) => setTituloColeccion(e.target.value)}
          />
        </section>

        <section className="mb-3">
          <label className="form-label fw-bold">Descripción</label>
          <textarea
            className="form-control"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </section>

        <section className="mb-3">
          <label className="form-label fw-bold">Título de la imagen</label>
          <input
            type="text"
            className="form-control"
            value={tituloImagen}
            onChange={(e) => setTituloImagen(e.target.value)}
          />
        </section>
      </section>
    </section>
  );
}

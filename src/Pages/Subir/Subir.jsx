import { Link } from "react-router-dom"
import "../Subir/Subir.css"
import { useRef, useState } from "react";
import  Conexion  from "../../Superbase/Conexion";


export default function Subir() {
  const fileInputRef = useRef(null);
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);

  const subirArchivo = async () => {
  if (!archivo) return;

  const { data, error } = await Conexion.storage
  .from("Imagnes")
  .upload(`/${archivo.name}`, archivo, {
    cacheControl: "3600",
    upsert: false
  });

if (error) {
  console.error("❌ Error al subir archivo:", error.message);
} else {
  // Obtenemos la URL pública
  const { publicUrl } = Conexion.storage
    .from("Imagnes")
    .getPublicUrl(`/${archivo.name}`).data;

  console.log("✅ URL pública:", publicUrl);

  // ✅ Aquí guardas directamente la URL en la tabla Galeria
  const { data: dbData, error: dbError } = await Conexion
    .from("Galeria")
    .insert([{ url: publicUrl, nombre: archivo.name }]);

  if (dbError) console.error("❌ Error guardando en tabla:", dbError);
  else console.log("✅ Guardado en tabla:", dbData);
}

};

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setPreview(URL.createObjectURL(file)); // 👈 creamos vista previa
    }
  };

  return (
    <>
      <section className="w-100 " style={{ height: "52.6vw" }}>
        <section className="d-flex flex-column w-100 h-25 align-items-center justify-content-around">
          <section className="d-flex justify-content-between w-75">
            <section className="w-25">
              <button className="btn btn-light">
                <Link to={"/"}>Cancel</Link>
              </button>
            </section>
            <section className="w-25 d-flex justify-content-between">
              <button className="btn btn-secondary">Save as draft</button>
              <button onClick={subirArchivo} className="btn btn-dark">Continue</button>
            </section>
          </section>
          <section>
            <h1>What have you been working on ¿?</h1>
          </section>
        </section>

        {/* 📂 Zona de carga */}
        <section
          className="d-flex flex-column h-75 w-100 align-items-center justify-content-center"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <section
            className="w-75 h-75 d-flex flex-column align-items-center justify-content-center"
            style={{ border: "3px dashed red", padding: "20px" }}
          >
            <section className="d-flex flex-column align-items-center justify-content-center">
              {preview ? (
                // ✅ mostramos la imagen seleccionada
                <img
                  src={preview}
                  alt="Vista previa"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <>
                  <img
                    className="w-25"
                    src="https://cdn.dribbble.com/assets/packs/media/assets/images/picture-placeholder-663241b1d5d22ee9abbe41bf9dd724df.png"
                    alt=""
                  />
                  <h5>Drag and drop an image, or Browse</h5>
                  <p>
                    Minimum 1600px width recommended. Max 10MB each (20MB for
                    videos)
                  </p>
                </>
              )}
            </section>
            <section className="d-flex align-items-center justify-content-center">
              <ul>
                <li>High resolution images (png, jpg, gif)</li>
                <li>High resolution images (png, jpg, gif)</li>
              </ul>
              <ul>
                <li>High resolution images (png, jpg, gif)</li>
                <li>Only upload media you own the rights to</li>
              </ul>
            </section>
          </section>
        </section>

        {/* 🔥 input oculto */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </section>
    </>
  );
}

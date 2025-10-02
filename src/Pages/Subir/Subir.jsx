import { Link, Navigate, useNavigate } from "react-router-dom"
import "../Subir/Subir.css"
import { useRef, useState } from "react";
import  Conexion  from "../../Superbase/Conexion";
import { UserAuth } from "../../Superbase/AutenContex";

  

export default function Subir() {
  
  const {Userid} = UserAuth();

  const fileInputRef = useRef(null);
  const [archivo, setArchivo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // 🚀 Recuperamos el usuario logueado
  console.log("Id del usuario : " + Userid )

  const subirArchivo = async () => {
  if (!archivo) return;

  setCargando(true); // inicia loader

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

      // 1️⃣ Crear la colección (si necesitas crearla)
      const { data: coleccionData, error: coleccionError } = await Conexion
        .from("Coleccion")
        .insert([
          {
            Id_Usuario: Userid,   // 👈 el usuario dueño de la colección
            Titulo: "Mi nueva colección",
            Descripcion: "Colección creada automáticamente",
          },
        ])
        .select()
        .single();

    if (coleccionError) {
      console.error("❌ Error creando colección:", coleccionError);
      return;
    }

    console.log("✅ Colección creada:", coleccionData);

    // 2️⃣ Guardar el archivo en la galería asociado a esa colección
    const { data: galeriaData, error: galeriaError } = await Conexion
      .from("Galeria")
      .insert([
        {
          Id_Coleccion: coleccionData.Id_Coleccion, // 👈 el ID que devolvió la colección
          Titulo: archivo.name,
          Url_Contenido: publicUrl,
        },
      ])
      .select()
      .single();

    if (galeriaError) {
      console.error("❌ Error guardando en galería:", galeriaError);
    } else {
      console.log("✅ Guardado en galería:", galeriaData);
      setCargando(false);
      alert("Archivo subido correctamente");
      navigate("/"); // 👈 redirige a principal
    }

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
        <section className="d-flex flex-column w-100 h-25 align-items-center justify-content-between p-3">
          <section className="d-flex justify-content-between w-75 ">
            <section className="w-25">
              <button className="btn btn-light">
                <Link to={"/"}>Cancel</Link>
              </button>
            </section>
            <section className="w-25 d-flex justify-content-between">
              <button onClick={subirArchivo}  className="btn btn-secondary" disabled={cargando} style={{ minWidth: "120px" }}>
                {cargando ? (
                              <img
                                src="https://i.gifer.com/ZZ5H.gif" // 🔄 gif loader (puedes cambiarlo)
                                alt="Cargando..."
                                style={{ width: "25px", height: "25px" }}
                              />
                            ) : (
                              "Subir Contenido"
                            )}
              </button>
              <button className="btn btn-dark">Continue</button>
            </section>
          </section>
          <section className="d-flex flex-column h-50 w-75 align-items-center">
            {
              preview ? (
                  <>
                    <form action="" className="w-100 h-100 " >
                      <input type="text" className="titulo w-100 h-100 border border-top-0 fs-3 text" placeholder="Ingrese un titulo para la coleccion"  />
                    </form>
                  </>
              ) :( 
                
                <h1>What have you been working on ¿?</h1>
              )
            }
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
            style={{ border: "2px dashed #C2C0C0", padding: "30px" }}
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

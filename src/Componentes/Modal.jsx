import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Conexion from "../Superbase/Conexion.js";

export default function Contenido_modal({ data }) {
    const [Megusta, SetMegusta] = useState(0);
    const [Guardar, setGuardar] = useState(0);
    const location = useLocation();

    console.log("esta es lo que tra :", JSON.stringify(data, null, 2));

    // Estado para controlar el GIF de carga
    const [loading, setLoading] = useState(false);

    const handleEliminar = async () => {
        const confirmar = window.confirm(
            "¿Estás seguro que deseas eliminar esta colección? Esta acción no se puede deshacer."
        );
        if (!confirmar) return;

        try {
            setLoading(true); // Mostrar GIF de carga

            const paths = data.Galeria.map(item => {
                const url = new URL(item.Url_Contenido);
                const path = url.pathname.split("/Imagnes/")[1];
                return decodeURIComponent(path); // ← importante
            }).filter(Boolean);

            if (paths.length > 0) {
                const { error: errorStorage } = await Conexion.storage
                    .from("Imagnes")
                    .remove(paths);

                if (errorStorage) console.error("Error eliminando del storage:", errorStorage);
            }


            // 2️⃣ Eliminar registros de la galería asociados
            const { error: errorGaleria } = await Conexion
                .from("Galeria")
                .delete()
                .eq("Id_Coleccion", data.Id);

            if (errorGaleria) throw errorGaleria;

            // 3️⃣ Eliminar la colección
            const { error: errorColeccion } = await Conexion
                .from("Coleccion")
                .delete()
                .eq("Id", data.Id);

            if (errorColeccion) throw errorColeccion;

            alert("Colección eliminada correctamente ✅");
            window.history.back();
        } catch (err) {
            console.error("Error al eliminar:", err.message);
            alert("Hubo un error al eliminar ❌");
        } finally {
            setLoading(false); // Ocultar GIF
        }
    };




    return (
        <section className="d-flex align-items-start w-100 justify-content-center">
            {/* Parte izquierda con título, usuario e imágenes */}
            <section className="p-3 w-75" >
                {/* Título */}
                <section className="mb-3">
                    <h3 className="fw-bold">{data.Titulo}</h3>
                </section>

                {/* Usuario */}
                <section className="d-flex align-items-center mb-3 justify-content-between">
                    <section className="d-flex align-items-center w-75">
                        <img
                            src={data.Usuarios?.Imagen || "https://via.placeholder.com/50"}
                            alt={data.Usuarios?.Nombre || "Usuario"}
                            className="rounded-circle me-2"
                            width="40"
                            height="40"
                            onError={(e) => {
                                e.currentTarget.src =
                                    "https://images.icon-icons.com/1539/PNG/512/3289576-insectionidual-man-people-person_107097.png";
                            }}
                        />
                        <p className="m-0 fw-semibold">{data.Usuarios?.Nombre || "Usuario desconocido"}</p>
                    </section>

                    {/* Botones (me gusta, guardar, contacto) */}
                    <section className="d-flex gap-2">
                        {/* ❤️ Like */}
                        <button
                            className="rounded-5 bg-white border-0 d-flex justify-content-center align-items-center"
                            onClick={() => SetMegusta(Megusta === 1 ? 0 : 1)}
                            style={{ width: "50px", height: "40px" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill={Megusta === 1 ? "#ea4c89" : "none"}
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20.8 4.6c-1.5-1.4-3.8-1.4-5.3 0l-.5.5-.5-.5c-1.5-1.4-3.8-1.4-5.3 0s-1.5 3.7 0 5.1l5.8 5.8 5.8-5.8c1.5-1.4 1.5-3.7 0-5.1z" />
                            </svg>
                        </button>

                        {/* 📌 Guardar */}
                        <button
                            className="rounded-5 bg-white border-0 d-flex justify-content-center align-items-center"
                            onClick={() => setGuardar(Guardar === 1 ? 0 : 1)}
                            style={{ width: "50px", height: "40px" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill={Guardar === 1 ? "#007bff" : "none"}
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M6 2a2 2 0 0 0-2 2v18l8-4 8 4V4a2 2 0 0 0-2-2z" />
                            </svg>
                        </button>

                        {/* ✉ Contacto */}
                        <button className="rounded-4 p-1 bg-black text-white">
                            Get in touch
                        </button>
                    </section>
                </section>

                {/* Galería */}
                <section className="row">
                    {data.Galeria?.map((img) => (
                        <section className="w-100 mb-3" key={img.Id}>
                            <section className="card border-0 shadow-sm">
                                <img
                                    src={img.Url_Contenido}
                                    alt={img.Titulo}
                                    className="card-img-top rounded-3"
                                />
                                <section className="card-body p-2 text-center">
                                    <p className="small text-truncate">{data.Descripcion}</p>
                                </section>
                            </section>
                        </section>
                    ))}
                </section>
            </section>

            {/* Parte derecha con los 3 botones grandes */}
            <section className="d-flex flex-column p-3 gap-2 ">
                <button className="btn btn-light">
                    <img src="https://images.icon-icons.com/1524/PNG/512/commentdiscussion_106382.png" width="30" />
                </button>
                <button className="btn btn-light">
                    <img src="https://images.icon-icons.com/1946/PNG/512/1904676-arrow-backup-cloud-hosting-storage-up-upload_122526.png" width="30" />
                </button>
                <button className="btn btn-light">
                    <img src="https://images.icon-icons.com/1812/PNG/512/4213426-about-description-help-info-information-notification_115427.png" width="32" />
                </button>
                {location.pathname === "/Cuenta/Work" && (
                    <>
                        <Link to="/Editar"  state={{data}} className="btn btn-light" style={{position:"relative", top:"5vw"}}>
                            <img src="https://images.icon-icons.com/2098/PNG/512/edit_icon_128873.png" alt="Editar" width="30" />
                        </Link>
                        <button 
                            className="btn btn-danger px-4"
                            style={{position:"relative", top:"8vw"}}
                            onClick={handleEliminar}
                            disabled={loading}
                            >
                            {loading ? (
                                <img src="https://i.gifer.com/ZZ5H.gif" alt="Cargando..." width="30" height="30" />
                            ) : (
                                <>
                                    Eliminar <br /> Colección
                                </> 
                            )}
                        </button>
                    </>
                )}

            </section>
        </section>
    );
}

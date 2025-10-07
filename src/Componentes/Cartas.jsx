import { useState } from "react";
import Conexion from "../Superbase/Conexion";
import { UserAuth } from "../Superbase/AutenContex";
import { useNavigate } from "react-router-dom";

export default function Cartas({ item, SetId_Carta }) {
  const [Megusta, SetMegusta] = useState(false);
  const [LikeId, setLikeId] = useState(null);
  const { Userid } = UserAuth();
  const navigate = useNavigate();

  const handleLike = async () => {
    const nuevoEstado = !Megusta; // ← alternamos entre true y false
    SetMegusta(nuevoEstado);

    alert("Este es id ide :" + Userid);

    // 👇 si no hay usuario, muestra alerta y redirige
    if (!Userid) {
      alert("⚠️ Para usar esta opción debes iniciar sesión o registrarte.");
      navigate("/Login"); // 👈 redirige a la ruta de login
      return;
    }

    if (nuevoEstado) {
      // ❤️ Si es true → insertar like
      try {
        const { data, error } = await Conexion
          .from("Likes")
          .insert([
            {
              Id_Usuario: Userid,
              Id_Coleccion: item.Id,
            },
          ])
          .select()
          .single();

        if (error) {
          console.error("❌ Error insertando like:", error);
        } else {
          alert(`💖 Te ha gustado la colección con ID: ${item.Id}`);
          setLikeId(data.Id);
        }
      } catch (err) {
        console.error("🚨 Error inesperado:", err);
      }
    } else {
      // 💔 Si es false → eliminar like
      try {
        const { error } = await Conexion
          .from("Likes")
          .delete()
          .eq("Id", LikeId)
          .select();

        if (error) {
          console.error("⚠️ Error eliminando like:", error);
        } else {
          console.log(`💔 Like eliminado (Id: ${LikeId})`);
          setLikeId(null);
        }
      } catch (err) {
        console.error("🚨 Error al eliminar like:", err);
      }
    }
  };

  return (
    <div className="card rounded-3 m-1 h-100" style={{ border: "1px solid #ccc" }}>
      <section
        className="h-75"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ cursor: "pointer" }}
        onClick={() => SetId_Carta(item.Id)}
      >
        <img
          src={item.Galeria[0]?.Url_Contenido || "https://via.placeholder.com/200"}
          alt={item.Galeria[0]?.Titulo || "Sin imagen"}
          className="rounded-3 w-100 h-100 card-img-top"
        />
      </section>

      <div className="card-body h-25 w-100 d-flex justify-content-between align-items-center">
        <section className="d-flex w-50 align-items-center justify-content-evenly">
          <img
            style={{ width: 30, height: 30 }}
            className="rounded-circle"
            src={item.Usuarios?.Imagen || "https://via.placeholder.com/50"}
            alt=""
            onError={(e) => {
              e.currentTarget.src =
                "https://images.icon-icons.com/1539/PNG/512/3289576-individual-man-people-person_107097.png";
            }}
          />
          <p style={{ width: "10vw", height: "2vw" }}>{item.Usuarios?.Nombre}</p>
        </section>

        <section className="d-flex w-50">
          <section className="d-flex w-50 align-items-center justify-content-center">
            <button
              className="rounded-5 justify-content-center bg-white border border-0 align-items-center d-flex"
              onClick={handleLike}
              style={{ width: "50px", height: "40px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2vw"
                height="2vw"
                viewBox="5 -5 20 30"
                fill={Megusta ? "#ea4c89" : "none"} // ← ahora usamos boolean
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.8 4.6c-1.5-1.4-3.8-1.4-5.3 0l-.5.5-.5-.5c-1.5-1.4-3.8-1.4-5.3 0s-1.5 3.7 0 5.1l5.8 5.8 5.8-5.8c1.5-1.4 1.5-3.7 0-5.1z" />
              </svg>
            </button>
            <p className="w-75" style={{ position: "relative", top: "0.5vw" }}>
              20k
            </p>
          </section>

          <section className="d-flex w-50 align-items-center">
            <img
              style={{
                width: "2vw",
                height: "2vw",
                position: "relative",
                left: "1vw",
              }}
              src="https://images.icon-icons.com/1660/PNG/512/3844476-eye-see-show-view-watch_110339.png"
              alt=""
            />
            <p style={{ position: "relative", top: "0.5vw", left: "1.3vw" }}>20k</p>
          </section>
        </section>
      </div>
    </div>
  );
}

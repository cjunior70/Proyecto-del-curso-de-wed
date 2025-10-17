import { useState } from "react";

export default function Account () {
  // Estados del perfil
  const [nombre, setNombre] = useState("Carlos Junior Gaviria Marquez");
  const [ubicacion, setUbicacion] = useState("Valledupar, Colombia");
  const [bio, setBio] = useState("");
  const [trabajos, setTrabajos] = useState([]);
  const [educacion, setEducacion] = useState([]);
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [website, setWebsite] = useState("");
  const [calendar, setCalendar] = useState("");
  const [foto, setFoto] = useState(null);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const agregarTrabajo = () => setTrabajos([...trabajos, { puesto: "", empresa: "", desde: "", hasta: "" }]);
  const agregarEducacion = () => setEducacion([...educacion, { institucion: "", titulo: "", desde: "", hasta: "" }]);

  const handleGuardar = () => {
    // Aquí puedes mandar los datos a tu backend
    const perfil = { nombre, ubicacion, bio, trabajos, educacion, email, telefono, website, calendar, foto };
    console.log("Perfil guardado:", perfil);
    alert("Perfil guardado correctamente ✅");
  };

  return (
    <div className="container p-4">
      <h2>Editar Perfil</h2>

      {/* Foto y nombre */}
      <section className="mb-4 d-flex align-items-center gap-3">
        <div>
          <img
            src={foto || "https://via.placeholder.com/100"}
            alt="Perfil"
            className="rounded-circle"
            width="100"
            height="100"
          />
          <input type="file" accept="image/*" onChange={handleFotoChange} className="form-control mt-2" />
        </div>
        <div>
          <label>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" />
          <label>Ubicación</label>
          <input type="text" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="form-control" />
        </div>
      </section>

      {/* Biografía */}
      <section className="mb-4">
        <label>Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="form-control"
          maxLength={1024}
          placeholder="Breve descripción para tu perfil"
        />
        <small>{bio.length}/1024</small>
      </section>

      {/* Historial laboral */}
      <section className="mb-4">
        <h4>Work History</h4>
        {trabajos.map((job, i) => (
          <div key={i} className="mb-2">
            <input
              type="text"
              placeholder="Puesto"
              value={job.puesto}
              onChange={(e) => {
                const nuevosTrabajos = [...trabajos];
                nuevosTrabajos[i].puesto = e.target.value;
                setTrabajos(nuevosTrabajos);
              }}
              className="form-control mb-1"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={job.empresa}
              onChange={(e) => {
                const nuevosTrabajos = [...trabajos];
                nuevosTrabajos[i].empresa = e.target.value;
                setTrabajos(nuevosTrabajos);
              }}
              className="form-control mb-1"
            />
            <input
              type="text"
              placeholder="Desde"
              value={job.desde}
              onChange={(e) => {
                const nuevosTrabajos = [...trabajos];
                nuevosTrabajos[i].desde = e.target.value;
                setTrabajos(nuevosTrabajos);
              }}
              className="form-control mb-1"
            />
            <input
              type="text"
              placeholder="Hasta"
              value={job.hasta}
              onChange={(e) => {
                const nuevosTrabajos = [...trabajos];
                nuevosTrabajos[i].hasta = e.target.value;
                setTrabajos(nuevosTrabajos);
              }}
              className="form-control"
            />
          </div>
        ))}
        <button className="btn btn-outline-primary mt-2" onClick={agregarTrabajo}>+ Add a job</button>
      </section>

      {/* Educación */}
      <section className="mb-4">
        <h4>Education</h4>
        {educacion.map((edu, i) => (
          <div key={i} className="mb-2">
            <input
              type="text"
              placeholder="Institución"
              value={edu.institucion}
              onChange={(e) => {
                const nuevaEdu = [...educacion];
                nuevaEdu[i].institucion = e.target.value;
                setEducacion(nuevaEdu);
              }}
              className="form-control mb-1"
            />
            <input
              type="text"
              placeholder="Título"
              value={edu.titulo}
              onChange={(e) => {
                const nuevaEdu = [...educacion];
                nuevaEdu[i].titulo = e.target.value;
                setEducacion(nuevaEdu);
              }}
              className="form-control mb-1"
            />
            <input
              type="text"
              placeholder="Desde"
              value={edu.desde}
              onChange={(e) => {
                const nuevaEdu = [...educacion];
                nuevaEdu[i].desde = e.target.value;
                setEducacion(nuevaEdu);
              }}
              className="form-control mb-1"
            />
            <input
              type="text"
              placeholder="Hasta"
              value={edu.hasta}
              onChange={(e) => {
                const nuevaEdu = [...educacion];
                nuevaEdu[i].hasta = e.target.value;
                setEducacion(nuevaEdu);
              }}
              className="form-control"
            />
          </div>
        ))}
        <button className="btn btn-outline-primary mt-2" onClick={agregarEducacion}>+ Add education</button>
      </section>

      {/* Contacto */}
      <section className="mb-4">
        <h4>Contact Details</h4>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
        <label>Phone Number</label>
        <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="form-control" />
        <label>Website</label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="form-control" />
        <label>Calendar URL</label>
        <input type="text" value={calendar} onChange={(e) => setCalendar(e.target.value)} className="form-control" />
      </section>

      <button className="btn btn-success" onClick={handleGuardar}>Save Profile</button>
    </div>
  );
}

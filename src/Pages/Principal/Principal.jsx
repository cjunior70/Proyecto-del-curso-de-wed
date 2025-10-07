import "./Principal.css";
import { useState, useEffect } from "react";
import Cartas from "../../Componentes/Cartas";
import Contenido_modal from "../../Componentes/Modal";
import  Conexion  from "../../Superbase/Conexion";
import { UserAuth } from "../../Superbase/AutenContex";
import { useNavigate } from "react-router-dom";

export default function Principal() {

  //Esto es para llamar a la funcion y traer el parametro que necesitamos, en este caso todo el metadatos del usuario
  const {User} = UserAuth();

  const [Galeria, setGaleria] = useState([]);
  const [Filtro, setFiltro] = useState(false);
  const [Id_Carta, SetId_Carta] = useState(null);

    //Estado de las opciones para poder saber el estado de las opciones
  const [opciones,Setopciones] = useState(1);

  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Bloquear scroll al abrir modal (igual que en Principal)
  useEffect(() => {
    if (Id_Carta !== null) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [Id_Carta]);


  useEffect(()=> {
    async function getGaleria() {

      // consulta con JOIN entre Coleccion y Galeria (de todos los usuarios)
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
      `);

      if (error) console.error("❌ Error:", error.message);
      else{
        // console.log("✅ Datos de Usuarios:", data);
         setGaleria(data);
      }
    } 

    getGaleria();
  }, [] )

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/Buscar?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <> 
      <main>
        {/* Primera parte */}
        <section className="row d-flex align-items-center justify-content-around p-4">
          <section className="col-6 principal_grupo_1 grupo_1 p-4">
            <article className="parte_1 ">
              <h1>
                Discover the <br /> World’s Top Designers
              </h1>
              <p>
                Explore work from the most talented and accomplished <br />
                designers ready to take on your next project
              </p>
            </article>

            <section className="parte_2 principal_grupo_2 w-100">
                <section className=" grupo_1_botones p-3 w-100 d-flex justify-content-strat">
                    <button type="button" className= { opciones ==1 ? "btn col-2 btn-secondary " : "btn col-2 " } style={{width:"8vw"}}  onClick={()=> Setopciones(1) }>
                          <img
                              src="https://images.icon-icons.com/1993/PNG/512/frame_gallery_image_images_photo_picture_pictures_icon_123209.png"
                              alt=""
                          />
                          <p>Shots</p>
                      </button>
                    <button type="button" className={ opciones ==2  ? "btn col-2 btn-secondary " : "btn col-2 " } style={{width:"8vw"}} onClick={()=> Setopciones(2) }>
                        <img
                            src="https://images.icon-icons.com/3256/PNG/512/group_team_people_icon_205855.png"
                            alt=""
                        />
                        <p>Designers</p>
                    </button>
                    <button type="button" className={ opciones ==3 ? "btn col-2 btn-secondary " : "btn col-2 " } style={{width:"8vw"}} onClick={()=> Setopciones(3) } >
                        <img
                            src="https://images.icon-icons.com/2622/PNG/512/book_icon_158035.png"
                            alt=""
                        />
                        <p>Services</p>
                    </button>
                </section>
                
                <section className="grupo_3_principal">
                    <form className="d-flex barra_de_busqueda p-1" role="search" onSubmit={handleSearch}>
                          <input
                              className="form-control me-2 barra"
                              type="search"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder={
                                opciones == 1 ? "what type od desing are you interested in ¿?"
                                : opciones == 2 ? "What type of desingner do you need ¿?"
                                : opciones == 3 ? "What do you need desingned ¿?"
                                : "Default placeholder"
                              }
                              aria-label="Search"
                          />
                        <button className="boton_de_busqueda grupo_3_principal_button btn" type="submit">
                            <img src="https://images.icon-icons.com/2469/PNG/512/magnifier_magnifying_glass_icon_149435.png" alt="" />
                        </button>
                    </form>
                </section>

                <section className="d-flex opciones grupo_4_principal justify-content-around m-2">
                  <section className="d-flex opciones_texto">
                    <h4>Popular: </h4>
                  </section>
                  {
                    opciones == 1 && 
                    <section className="grupo_4_opciones d-flex opciones_populares justify-content-around">
                    <a href="">dashboard</a>
                    <a href="">landig page</a>
                    <a href="">e-commerce</a>
                    <a href="">logo</a>
                    <a href="">card</a>
                  </section>
                  }

                  {
                    opciones == 2 && 
                    <section className="grupo_4_opciones d-flex opciones_populares justify-content-around">
                    <a href="">App desing</a>
                    <a href="">landing page</a>
                    <a href="">wed design</a>
                    <a href="">dashboard</a>
                  </section>
                  }

                  {
                    opciones == 3 && 
                    <section className="grupo_4_opciones d-flex opciones_populares justify-content-around">
                    <a href="">branding</a>
                    <a href="">logo desing</a>
                    <a href="">mobile app</a>
                    <a href="">ilustration</a>
                    <a href="">animation</a>
                  </section>
                  }
                </section>

            </section>
          </section>

          <section className="video col-6 grupo_2 p-2">
            <video
              src="https://cdn.dribbble.com/uploads/64271/original/97acb3d0a0a7b92e0c0038b1568a59fd.mp4?1753183788"
              autoPlay
              loop
              muted
            />
          </section>
        </section>

        <section>
            <section className="d-flex justify-content-around w-100 align-self-center ">
                {/* Opcion princial con dos unicas opciones */}
                <section >
                  <li className="nav-item dropdown border p-2 rounded-2" style={{ listStyle: "none", padding: 0, margin: 0  }}>
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Popular
                    </a>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="https://dribbble.com/shots/popular" target="_blank" >Popular</a></li>
                      <li><a className="dropdown-item" href="https://dribbble.com/shots/recent" target="_blank">New & Noteworthy</a></li>
                    </ul>
                  </li>
                </section>

                {/*Categorias  */}
                <section className="w-75  align-self-center justify-content-around " >
                  <ul  style={{ listStyle: "none", padding: 0, margin: 0 , gap: "20px", }} className="d-flex justify-content-around">
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/">Discorver</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/animation">Animation</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/branding">Branding</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/illustration">Illustrarion</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/mobile">Mobile</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/print">Print</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/product-design">Product Desing</a> </li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/typography">Typography</a></li>
                    <li><a target="_blank" href="https://dribbble.com/shots/popular/web-design">Wed Desing</a></li>
                  </ul>
                </section>

                <button onClick={()=>setFiltro(!Filtro)} style={{width:130,height: 43}} className="d-flex justify-content-evenly align-items-center align-self-center rounded-4 bg-light border-white">
                  <img style={{ width: 40 , padding: 0, margin: 0 }} src="https://images.icon-icons.com/3403/PNG/512/each_new_category_icon_215653.png" alt="" placeholder="" />
                  <p style={{height:20}}>Filters</p>
                </button>

            </section>

          {/* Cunado el boton filter se el de click acvitar o mostrar esto */}
          <section>
              {
                Filtro == 1 && (
                    <form action="" className="d-flex justify-content-around">
                    <section>
                      <label htmlFor="">Tags</label>
                      <input type="text" />
                    </section>

                    <section>
                      <label htmlFor="">Color</label>
                      <input type="color" />
                    </section>

                    <li className="nav-item dropdown border p-2 rounded-2" style={{ listStyle: "none", padding: 0, margin: 0  }}>
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Timeframe
                      </a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="" target="_blank" >Now</a></li>
                        <li><a className="dropdown-item" href="" target="_blank">This Past week</a></li>
                        <li><a className="dropdown-item" href="" target="_blank">This Past Month</a></li>
                        <li><a className="dropdown-item" href="" target="_blank">This Past Year</a></li>
                        <li><a className="dropdown-item" href="" target="_blank">All Time</a></li>
                      </ul>
                    </li>
                </form>
                )
              }
          </section>

        </section>

          {/* Cartas */}
        <section className="d-flex justify-content-center flex-wrap flex-column align-items-center w-100">
          <section className="p-3 d-flex flex-wrap justify-content-start w-100">
            {Galeria.map((item) => (
              <section className="col-3 p-2 margen " key={item.Id} >
                {/* {console.log(item)} */}
                {/* {console.log(Id_Carta)} */}
                 <Cartas item={item} SetId_Carta={SetId_Carta} />
              </section>
            ))}
          </section>
        </section>

        {Id_Carta !== null && (
            <section className="modal d-block m-1">
              <section className="modal-dialog modal-fullscreen border border-black rounded-4" style={{height:"92%", width: "99%"}}>
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


        {/* Carusel */}
        <section></section>
      </main>
    </>
  );
}

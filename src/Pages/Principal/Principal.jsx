import "./Principal.css";
import { useState } from "react";

export default function Principal() {

  const [opciones,Setopciones] = useState(1);

  return (
    <>
      <main>
        {/* Primera parte */}
        <section className="row d-flex align-items-center justify-content-around p-4">
          <section className="col-6 grupo_1 p-4">
            <article className="parte_1 ">
              <h1>
                Discover the <br /> World’s Top Designers
              </h1>
              <p>
                Explore work from the most talented and accomplished <br />
                designers ready to take on your next project
              </p>
            </article>

            <section className="parte_2">
                <section className="row p-3">
                    <button type="button" className={ opciones ==1 ? "btn col-2 btn-secondary " : "btn col-2 " }  onClick={()=> Setopciones(1) }>
                        <img
                            src="https://images.icon-icons.com/1993/PNG/512/frame_gallery_image_images_photo_picture_pictures_icon_123209.png"
                            alt=""
                        />
                        <p>Shots</p>
                    </button>
                    <button type="button" className={ opciones ==2  ? "btn col-2 btn-secondary " : "btn col-2 " } onClick={()=> Setopciones(2) }>
                        <img
                            src="https://images.icon-icons.com/3256/PNG/512/group_team_people_icon_205855.png"
                            alt=""
                        />
                        <p>Designers</p>
                    </button>
                    <button type="button" className={ opciones ==3 ? "btn col-2 btn-secondary " : "btn col-2 " } onClick={()=> Setopciones(3) } >
                        <img
                            src="https://images.icon-icons.com/2622/PNG/512/book_icon_158035.png"
                            alt=""
                        />
                        <p>Services</p>
                    </button>
                </section>
                
                <section className="m-2 p-2">
                    <form className="d-flex barra_de_busqueda" role="search">
                        <input
                            class="form-control me-2 barra"
                            type="search"
                            placeholder={
                              opciones == 1 ? "what type od desing are you interested in ¿?"
                              : opciones == 2 ? "What type of desingner do you need ¿?"
                              : opciones == 3 ? "What do you need desingned ¿?"
                              : "Default placeholder"
                            }
                            aria-label="Search"
                        />
                        <button className="boton_de_busqueda btn" type="submit">
                            <img src="https://images.icon-icons.com/2469/PNG/512/magnifier_magnifying_glass_icon_149435.png" alt="" />
                        </button>
                    </form>
                </section>

                <section className="d-flex opciones justify-content-around p-2">
                  <section className="d-flex opciones_texto">
                    <h4>Popular :</h4>
                  </section>
                  {
                    opciones == 1 && 
                    <section className=" d-flex opciones_populares justify-content-around">
                    <a href="">dashboard</a>
                    <a href="">landig page</a>
                    <a href="">e-commerce</a>
                    <a href="">logo</a>
                    <a href="">card</a>
                  </section>
                  }

                  {
                    opciones == 2 && 
                    <section className=" d-flex opciones_populares justify-content-around">
                    <a href="">App desing</a>
                    <a href="">landing page</a>
                    <a href="">wed design</a>
                    <a href="">dashboard</a>
                  </section>
                  }

                  
                  {
                    opciones == 3 && 
                    <section className=" d-flex opciones_populares justify-content-around">
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

          <section className="col-6 grupo_2 p-2">
            <video
              src="https://cdn.dribbble.com/uploads/64271/original/97acb3d0a0a7b92e0c0038b1568a59fd.mp4?1753183788"
              autoPlay
              loop
              muted
            />
          </section>
        </section>

        {/* Categorias */}
        <section></section>

        {/* Cartas */}
        <section></section>

        {/* Carusel */}
        <section></section>
      </main>
    </>
  );
}

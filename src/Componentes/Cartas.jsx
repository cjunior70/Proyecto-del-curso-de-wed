import { useState } from "react";

export default function Cartas({item,  SetId_Carta}){

      //Estado de las opciones para poder saber el estado de las opciones
      const [Megusta,SetMegusta] = useState(0);

    return(
        <>
        <div className="card rounded-3 m-1 h-100 "  style={{border: "1px solid #ccc"}}   key={item.id}>
            <section className="h-75"data-bs-toggle="modal" data-bs-target="#exampleModal" style={{cursor:"pointer"}} onClick={()=> SetId_Carta(item.id)}  >
                <img src={item.Url_Contenido} className="rounded-3 w-100 h-100 card-img-top" alt="..."/>
            </section>
            

            {/* Esto es para tener en cuenta el nombre de la coleccion */}
            {/* <h5 className="card-title"> {item.Titulo} </h5> */}

            <div className="card-body h-25 w-100 d-flex justify-content-between">

                {/* logo y nombre */}
                <section className='w-50 d-flex align-items-center justify-content-evenly'>
                    <img style={{width:40, height:40}} src="https://tse2.mm.bing.net/th/id/OIP.Ow5rcUh78URQNNRu710CCQHaHT?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
                    <p>juancho polo</p>
                </section>

                {/* like y vistas */}
                <section className='d-flex w-50'>
                    <section className='d-flex w-50 align-items-center'>
                        <button className="rounded-5 justify-content-center bg-white border border-0 align-items-center d-flex " onClick={()=>  SetMegusta(Megusta == 1 ? 0 : 1)} style={{ width: "50px", height: " 40px" }}>
                             <svg
                                xmlns="https://images.icon-icons.com/3681/PNG/512/feedback_like_heart_favorite_love_icon_229088.png"
                                width="50"
                                height="50"
                                viewBox="5 -5 20 30"
                                fill={Megusta == 1 ? "#ea4c89" : "none"}  // Relleno verde si Megusta=1
                                stroke="black"                          // Borde siempre verde
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20.8 4.6c-1.5-1.4-3.8-1.4-5.3 0l-.5.5-.5-.5c-1.5-1.4-3.8-1.4-5.3 0s-1.5 3.7 0 5.1l5.8 5.8 5.8-5.8c1.5-1.4 1.5-3.7 0-5.1z"/>
                            </svg>          
                        </button>
                        <p>20 k</p>
                    </section>
                    <section className='d-flex w-50 align-items-center'>
                        <img style={{width:35,height:35}} src="https://images.icon-icons.com/1660/PNG/512/3844476-eye-see-show-view-watch_110339.png" alt="" />
                        <p>20 k</p>
                    </section>
                </section>
            </div>
        </div>
        
        
        </>
    );
}
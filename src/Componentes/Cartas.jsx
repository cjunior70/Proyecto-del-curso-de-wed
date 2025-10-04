import { useState } from "react";

export default function Cartas({item,  SetId_Carta}){

      //Estado de las opciones para poder saber el estado de las opciones
      const [Megusta,SetMegusta] = useState(0);

        // console.log("esta es lo que tra :", JSON.stringify(item, null, 2));


    return(
        <>
        <div className="card rounded-3 m-1 h-100 "  style={{border: "1px solid #ccc"}}   key={item.id}>
            <section className="h-75"data-bs-toggle="modal" data-bs-target="#exampleModal" style={{cursor:"pointer"}} onClick={()=> SetId_Carta(item.Id)}  >
                <img src={item.Galeria[0]?.Url_Contenido || "https://via.placeholder.com/200"}
                    alt={item.Galeria[0]?.Titulo || "Sin imagen"}
                    className="rounded-3 w-100 h-100 card-img-top"/>
            </section>

            {/* Esto es para tener en cuenta el nombre de la coleccion */}
            {/* <h5 className="card-title"> {item.Titulo} </h5>
            
            <img 
                src={item.Galeria[0]?.Url_Contenido || "https://via.placeholder.com/200"} 
                alt={item.Galeria[0]?.Titulo || "Sin imagen"} 
                className="rounded-3 w-100 h-100 card-img-top"
            /> */}

            <div className="card-body h-25 w-100 d-flex justify-content-between align-items-center">

                {/* logo y nombre */}
                <section className=' d-flex w-50 align-items-center justify-content-evenly'>
                    <img style={{width:30, height:30}} className="rounded-circle" src={item.Usuarios?.Imagen || "https://via.placeholder.com/50"} alt="" 
                        onError={(e) => {
                            e.currentTarget.src = "https://images.icon-icons.com/1539/PNG/512/3289576-individual-man-people-person_107097.png";
                        }}
                    />
                    <p style={{ width:"10vw", height:"2vw"}} >{item.Usuarios?.Nombre}</p>
                </section>

                {/* like y vistas */}
                <section className='d-flex w-50'>
                    <section className='d-flex w-50 align-items-center justify-content-center align-items-center'>
                        <button className=" rounded-5 justify-content-center bg-white border border-0 align-items-center d-flex " onClick={()=>  SetMegusta(Megusta == 1 ? 0 : 1)} style={{ width: "50px", height: " 40px" }} >
                             <svg
                                xmlns="https://images.icon-icons.com/3681/PNG/512/feedback_like_heart_favorite_love_icon_229088.png"
                                width="2vw"
                                height="2vw"
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
                        <p className="w-75 " style={{position:"relative", top:"0.5vw"}} > 20 k</p>
                    </section>
                    <section className='d-flex w-50 align-items-center'>
                        <img style={{width:"2vw",height:"2vw", position:"relative", left:"1vw"}} src="https://images.icon-icons.com/1660/PNG/512/3844476-eye-see-show-view-watch_110339.png" alt="" />
                        <p style={{position:"relative", top:"0.5vw", left:"1.3vw"}}  > 20 k</p>
                    </section>
                </section>
            </div>
        </div>
        
        
        </>
    );
}
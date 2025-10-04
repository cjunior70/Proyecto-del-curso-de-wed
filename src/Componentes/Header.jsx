import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../Superbase/AutenContex";

export default function Header(){

    const {user,signout } = UserAuth();

    console.log("datos del usaurio :  " , user)
    
    return(
        <>
            <section className="d-flex justify-content-between general m-2 align-items-center">
                <section className="w-50 d-flex justify-content-between p-1 ">
                    <figure className="logo col-1 w-25 imagen">
                        <Link to={"/"}><img src={logo} alt=""/></Link>
                    </figure>
                    <section className="d-flex justify-content-around barra_de_menu  w-75 align-items-center">
                        <section className="dropdown barra_de_menu">
                            <a href="" className="dropdown-text">Menu &#9662; </a>
                            <ul className="dropdown-menu barra_de_menu">
                                <section>
                                    <li><a href="" className="dropdown-item">Popular</a></li>
                                    <li><a href="" className="dropdown-item">New and Noteworthy</a></li>
                                </section>
                                <section>
                                    <li><a href="" className="dropdown-item">Wed Desing</a></li>
                                    <li><a href="" className="dropdown-item">Product Desing</a></li>
                                    <li><a href="" className="dropdown-item">Branding</a></li>
                                    <li><a href="" className="dropdown-item">Animation</a></li>
                                    <li><a href="" className="dropdown-item">Illustration</a></li>
                                    <li><a href="" className="dropdown-item">Mobile</a></li>
                                    <li><a href="" className="dropdown-item">Typography</a></li>
                                    <li><a href="" className="dropdown-item">Print</a></li>
                                </section>
                            </ul>
                        </section>
                        <section className="dropdown barra_de_menu">
                            <a href="" className="dropdown-text">Find Talent &#9662;</a>
                            <ul className="dropdown-menu">
                                <li><a href="" className="dropdown-item">Get Matched Now</a></li>
                                <li><a href=""  className="dropdown-item">Browse Profile</a></li>
                                <li><a href=""  className="dropdown-item">Purcharse Services</a></li>
                                <li><a href=""  className="dropdown-item">Hire Fractional Talent</a></li>
                                <li><a href=""  className="dropdown-item">Post a Full-Time-Job</a></li>
                            </ul>
                        </section>
                        <section className="dropdown barra_de_menu">
                            <a href="" className="dropdown-text">Get Hired &#9662;</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item">Update to Pro</a></li>
                                <li><a className="dropdown-item">Advertise</a></li>
                                <li><a className="dropdown-item">Full-Time Jobs</a></li>
                            </ul>
                        </section>
                        <section className="barra_de_menu">
                            <a href="">Blog </a>
                        </section>
                    </section>
                </section>

                {
                    !user || (Array.isArray(user) && user.length === 0) ? (
                        <section className="d-grid gap-2 d-md-flex justify-content-md-end w-25 h-25">
                            <Link to="/Login" className="btn btn-outline-secondary rounded-4 border-0 text-dark">Sign up</Link> 
                            <Link to="/Login" className="btn btn-outline-dark rounded-4 bg-black text-white">Login In</Link>
                        </section>
                    ) : (
                        <section 
                            className="d-flex align-items-center justify-content-between "  
                            style={{ width: "35%"}}
                            >
                            {/* Botones */}
                            <section 
                                className="d-flex menu_de_usuario justify-content-around align-items-center flex-grow-1"  
                            >
                                <button className="btn btn btn-secondary rounded-4 barra_de_menu"  > Upgrade to Pro </button>
                                <button className="btn border-light-subtle rounded-4 barra_de_menu"> <Link to="/Subir" >+ Share Work </Link> </button>
                                <button className="btn border-0 p-1">
                                <img 
                                    src="https://images.icon-icons.com/488/PNG/512/messages_47711.png" 
                                    alt="messages" 
                                    style={{ width: "24px", height: "24px" }} 
                                />
                                </button>
                                <button className="btn border-0 p-1">
                                <img 
                                    src="https://images.icon-icons.com/1993/PNG/512/alarm_alert_attention_bell_clock_notification_ring_icon_123203.png" 
                                    alt="bell" 
                                    style={{ width: "24px", height: "24px" }} 
                                />
                                </button>
                            </section>

                           {/* Avatar con dropdown */}
                            <section className="dropdown ms-3">
                                <section 
                                    className="d-flex menu_de_usuario align-items-center justify-content-center dropdown-toggle"  
                                    style={{ 
                                    width: "50px", 
                                    height: "50px", 
                                    borderRadius: "50%", 
                                    overflow: "hidden", 
                                    cursor: "pointer" 
                                    }}
                                    id="avatarDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                   {user.avatar_url && (
                                        <img 
                                            src={user.avatar_url}
                                            alt="Avatar de usuario"
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            onError={(e) => {
                                            e.currentTarget.src = "https://images.icon-icons.com/1539/PNG/512/3289576-individual-man-people-person_107097.png";
                                            }}
                                        />
                                    )}

                                </section>

                                {/* Menú de opciones */}
                                <ul className="dropdown-menu menu_de_usuario dropdown-menu-end">
                                    <li><Link to="/Cuenta/Work" >Perfil</Link> </li>
                                    <li><Link to="/Configuracion" >Configuración</Link> </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={signout}> <Link to={"/"} >Cerrar sesión</Link> </button></li>
                                </ul>
                            </section>

                        </section>

                    )
                }

                
            </section>
        </>
    )
}
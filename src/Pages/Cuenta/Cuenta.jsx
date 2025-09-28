import { UserAuth } from "../../Superbase/AutenContex"
import "../Cuenta/Cuenta.css"
import Work from "../../Componentes/Work";
import { Link, Outlet } from "react-router-dom";

export default function Cuenta(){

    const {user } = UserAuth();

    return(
        <>

            <section>
                <section className="d-flex flex-column align-items-center">
                    <section className="d-flex w-100 justify-content-center">
                        <figure>
                            <img src={user.avatar_url} alt="" className="rounded-circle"  />
                        </figure>
                        <section>
                            <h2>{user.full_name} </h2>
                            <p>Valledupar,Colmbia</p>
                        </section>
                    </section>
                    <section className="d-flex justify-content-around" style={{width:"40%"}}>
                        <button className="btn btn-light"  >Edit Profile</button>
                        <button className="btn btn-dark ">Upgrade to Pro</button>
                        <button className="btn btn-light">...</button>
                        <button className="btn btn-info ">Limited Account</button>
                    </section>
                </section>
                <section></section>
            </section>

            <section>
                <section className="d-flex justify-content-around align-items-center m-2">
                    <section className="w-50 ">
                        <ul className="d-flex justify-content-around align-items-center list-unstyled">
                            <li><Link to="Work">Work</Link></li>
                            <li><Link to="Services">Services</Link></li>
                            <li><Link to="Boosted">Boosted Shots</Link></li>
                            <li><Link to="Collections">Collections</Link></li>
                            <li><Link to="Liked">Liked Shots</Link></li>
                            <li><Link to="About">About</Link></li>
                        </ul>
                    </section>

                    <section className="w-25 justify-content-around ">
                        <button> Recent shots</button>
                        <button> Customizer Order </button>
                    </section>
                </section>
                <section>
                    <Outlet/>
                </section>
            </section>

        </>
    )
}
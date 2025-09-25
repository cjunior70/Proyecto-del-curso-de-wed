import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../Superbase/AutenContex";

export default function Header(){

    return(
        <>
            <section className="d-flex justify-content-between m-2 align-items-center">
                <section className="w-50 d-flex justify-content-between p-1 ">
                    <figure className="logo col-1 w-25">
                        <img src={logo} alt=""/>
                    </figure>
                    <section className="d-flex justify-content-around w-75 align-items-center">
                        <section className="dropdown">
                            <a href="" className="dropdown-text">Menu &#9662; </a>
                            <ul className="dropdown-menu">
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
                        <section className="dropdown">
                            <a href="" className="dropdown-text">Find Talent &#9662;</a>
                            <ul className="dropdown-menu">
                                <li><a href="" className="dropdown-item">Get Matched Now</a></li>
                                <li><a href=""  className="dropdown-item">Browse Profile</a></li>
                                <li><a href=""  className="dropdown-item">Purcharse Services</a></li>
                                <li><a href=""  className="dropdown-item">Hire Fractional Talent</a></li>
                                <li><a href=""  className="dropdown-item">Post a Full-Time-Job</a></li>
                            </ul>
                        </section>
                        <section className="dropdown">
                            <a href="" className="dropdown-text">Get Hired &#9662;</a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item">Update to Pro</a></li>
                                <li><a className="dropdown-item">Advertise</a></li>
                                <li><a className="dropdown-item">Full-Time Jobs</a></li>
                            </ul>
                        </section>
                        <section>
                            <a href="">Blog </a>
                        </section>
                    </section>
                </section>
                <section className="d-grid gap-2 d-md-flex justify-content-md-end w-25 h-25">
                    <Link to="/Login" className="btn btn-outline-secondary rounded-4 border-0 text-dark" >Sing up</Link> 
                    <Link to="/Login" className="btn btn-outline-dark rounded-4 bg-black text-white"> Login In</Link>
                </section>
            </section>
        </>
    )
}
import { UserAuth } from "../../Superbase/AutenContex";
import video from "../../assets/Video_Fondo.mp4"
import logo from "../../assets/logo.png";


export default function Login(){

    const {signInWithGoogle} = UserAuth();

    return(
        <>
            <section className="d-flex" style={{height:"52.6vw" }}>
                <section className="w-75 h-100 d-flex flex-column align-items-center" >
                    <section className=" w-100 m-2">
                        <img src={logo} alt="" style={{width:"15%"}} />
                    </section>
                    <section className="h-75 w-50 d-flex flex-column justify-content-evenly align-items-center h-50"     >
                            <section className="w-50 d-flex flex-column align-items-center" >
                                <img src="https://cdn.dribbble.com/assets/favicon-192x192-d70ad402693bdd1a8460da7f9f3c590e817da7369c5287789ac968cf6947d214.png" alt=""  style={{width:"30%"}}/>
                                <h3>Welcome Back</h3>
                                <p>or</p>
                            </section>
                            <form action="" className="d-flex flex-column h-25 w-50 justify-content-evenly" >
                                {/* Botón Google en vez del primer input */}
                                <button
                                    type="button"
                                    onClick={signInWithGoogle}
                                    style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "10px",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    backgroundColor: "#fff",
                                    cursor: "pointer",
                                    }}
                                >
                                    <img
                                    src="https://developers.google.com/identity/images/g-logo.png"
                                    alt="Google logo"
                                    style={{ width: "20px", height: "20px" }}
                                    />
                                    Continuar con Google
                                </button>

                                <input type="text" name="" id="" placeholder="Entrer Email or Username" />
                                <button>Continue</button>
                            </form>
                            <section className="d-flex flex-column align-items-center ">
                                <p>By continuing, you agree to our Terms and Privacy Policy.</p>
                                <p>Don't have an account? Sign up</p>
                            </section>
                    </section>
                </section>
                <section className="w-25 h-100 d-flex flex-column justify-content-evenly fondo_grupo_2" >
                    <section>
                        <h1>Wix Studio</h1>
                        <h3>Design high-end sities <br /> with full creative control</h3>
                        <a href="https://es.wix.com/studio?utm_campaign=pa_media_buying_studio_brnd_9%2F25_dribbble%5Esign-in&experiment_id=%5Einspiration%5E%5Ehigh-end-design">Start Now</a>
                    </section>
                    <section className="h-50 d-flex align-items-center">
                        <video 
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            controls={false}  // oculta los controles
                            className="video-background w-100 h-100 "
                            />
                    </section>

                </section>
            </section>
        </>
    )
}
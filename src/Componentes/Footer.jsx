import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <>
      <section style={{position:"relative", top:"1vw", width:"100%"}}>
        <section className="d-flex row d-flex justify-content-evenly align-items-center" style={{position:"relative", top:"1vw"}}>
          <figure className="logo col-1">
            <img src={logo} alt="" />
          </figure>
          <nav className="col-7 d-flex justify-content-evenly align-items-center">
            <a href="">For designers</a>
            <a href="">Hire talent</a>
            <a href="">Insiration</a>
            <a href="">Advertising</a>
            <a href="">Blog</a>
            <a href="">About</a>
            <a href="">Careers</a>
            <a href="">Support</a>
          </nav>
          <figure className="col-2 redes_sociales d-flex justify-content-evenly align-items-center">
            <a href="">
              <img
                src="https://tse2.mm.bing.net/th/id/OIP.fLLxpVX6r5qdMb3vN-_2vgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://tse1.mm.bing.net/th/id/OIP.dqw_X9ZuXFZFTTKzl-CQNwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://th.bing.com/th/id/R.593224dc229c9f73cd2917851b6ef77b?rik=NjYV7ns3lffYVA&pid=ImgRaw&r=0"
                alt=""
              />
            </a>
            <a href="">
              <img
                src="https://th.bing.com/th/id/OIP.G3EVnPFz9XciDyut1feYUgHaHw?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt=""
              />
            </a>
          </figure>
        </section>

        <section className="row d-flex justify-content-between p-2 ">
          <section className="col-4 d-flex ">
            <p className="text-secondary">@2025 Dribble</p>
            <ul className="list-unstyled d-flex justify-content-evenly w-75">
              <li>
                <a className="text-secondary" href="">Terms</a>
              </li>
              <li>
                <a className="text-secondary" href="">Privacy</a>
              </li>
              <li>
                <a className="text-secondary" href="">Cookies</a>
              </li>
            </ul>
          </section>
          <section className="col-4 d-flex">
            <ul className="list-unstyled d-flex justify-content-evenly w-100">
              <li>
                <a className="text-secondary" href="">Jobs</a>
              </li>
              <li>
                <a className="text-secondary" href="">Designers</a>
              </li>
              <li>
                <a className="text-secondary" href="">Freelancers</a>
              </li>
              <li>
                <a className="text-secondary" href="">Tags</a>
              </li>
              <li>
                <a className="text-secondary" href="">Places</a>
              </li>
              <li>
                <a className="text-secondary" href="">Resources</a>
              </li>
            </ul>
          </section>
        </section>
      </section>
    </>
  );
}

export default function Contenido_modal({data}){
    return(
        <>
            <section>
                <h3>{data.Titulo}</h3>
            </section>

            {console.log(data)}

           <section>
                <section>
                    <img src="" alt="" />
                    <p></p>
                </section>
                <section>
                    <button></button>
                    <button></button>
                    <button></button>
                </section>
           </section>

           <section>
                <section>
                    <img src={data.Url_Contenido} alt="" />
                </section>
                <section>
                    <button></button>
                    <button></button>
                    <button></button>
                </section>
           </section>

        </>
    )
}
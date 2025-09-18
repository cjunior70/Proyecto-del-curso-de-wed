export default function Cartas({item}){
    return(
        <>
        <div className="card rounded-3 h-100 m-1" key={item.id}>
            <img src={item.Url_Contenido} className="w-100 h-50 card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title"> {item.Titulo} </h5>
                <section>
                    <img src="" alt="" />
                    <p></p>
                </section>
                <section>
                    <section>
                        <img src="" alt="" />
                        <p></p>
                    </section>
                    <section>
                        <img src="" alt="" />
                        <p></p>
                    </section>
                </section>
            </div>
        </div>
        </>
    );
}
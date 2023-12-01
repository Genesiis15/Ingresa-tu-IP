
export const Card = ({ title, description, img }) => {
    return (
        <div className="card mb-3  col-12 col-md-6" >
            <div className="row  g-0  d-flex">
                <div className="col-3 col-md-2">
                    <img src={img} className="img-fluid rounded-start" alt={title} />
                </div>
                <div className="col-9 col-md-10">
                    <div className="card-body">
                        <h5 className="card-title text-secondary ">{title}</h5>
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

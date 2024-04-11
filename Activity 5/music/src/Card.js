import React from 'react'; 

//create each card as its own component.
const Card = (props) => {
    return (
        <div className="card" style={{width: '12rem'}}>
            <img src={ props.imgURL } alt="title"/>
            <div className="card-body">
                <h5 className="card-title">{ props.albumTitle }</h5>
                <p className="card-text">{ props.albumDescription }</p>
                <a href="#" className="btn btn-primary">{ props.buttonText }</a>
            </div>
        </div>
    )
}
export default Card;
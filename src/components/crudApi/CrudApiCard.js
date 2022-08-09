import React from "react";
import star from "../../assets/ico/star.svg";
import heart from "../../assets/ico/heart.svg";
import heartFill from "../../assets/ico/heartFill.svg";
import eye from "../../assets/ico/eye.svg";
import edit from "../../assets/ico/edit.svg";
import del from "../../assets/ico/delete.svg";
import { serviceApi } from "../../services/serviceApi";
import { Link } from "react-router-dom";
import { AuthService } from "../../services/AuthService";

const CrudApiCard = ({ card }) => {
  let { name, img, id, likesCount } = card;
  let api = serviceApi();

  const like = async () => {
    api.like(id);

    //TODO: USE VIRTUAL DOM
    window.location.reload();
  };

  const deleteCard = (e) => {
    e.preventDefault();
    api
      .destroy(id)
      .then((res) => {
        alert(res.data.msg);
        //TODO: USE VIRTUAL DOM
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ct-card">
      <div className="ct-card-img">
        <img className="img-card" src={img} alt={name} />
      </div>
      <div className="ct-card-info">
        <div className="ct-icons">
          <div className="ct-icons-like">
            {/* <button className="bt-ico">
              <img className="img-ico" src={star} alt="star value button" />
            </button> */}
            <button className="bt-ico" onClick={() => like()}>
              <img
                className="img-ico"
                src={card.liked ? heartFill : heart}
                alt="love button"
              />
            </button>
            {/* <button className="bt-ico">
              <img className="img-ico" src={eye} alt="show button" />
            </button> */}
            <span>{likesCount}</span>
          </div>

          <div className="ct-icons-modify">
            {AuthService.isAuthor(card) && (
              <>
                <Link className="bt-ico" to={`/crud-api-edit-form/${id}`}>
                  <img className="img-ico" src={edit} alt="edit button" />
                </Link>

                <button className="bt-ico" onClick={deleteCard}>
                  <img className="img-ico" src={del} alt="delete button" />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="ct-txt">
          <h6 className="txt-card-title">{name}</h6>
          <p className="txt-card-user">{card.author.username}</p>
        </div>
      </div>
    </div>
  );
};

export default CrudApiCard;

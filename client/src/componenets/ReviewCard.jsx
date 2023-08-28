import React from "react";
import { useAppContext } from "../context/appContext";

const ReviewCard = ({
  users: { name },
  title,
  comment,
  rating,
  userId,
  _id,
}) => {
  const { user, deleteReview, setEditReview } = useAppContext();
  return (
    <article className="card w-full  mx-auto border">
      <div className="card-body">
        <h1 className="text-2xl font-bold">
          {name.firstName}
          &nbsp;
          {name.lastName}
        </h1>
        <h3 className="font-bold">{rating} ⭐</h3>
        <h2 className="card-title">{title}</h2>
        <p className="">{comment}</p>
        <div className="card-actions justify-end">
          {user._id === userId || user.role === "admin" ? (
            <>
              <button
                className="btn btn-error"
                type="button"
                onClick={() => deleteReview(_id)}
              >
                Delete
              </button>
              {user._id === userId ? (
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => {
                    setEditReview(_id);
                    window.my_modal_1.showModal();
                  }}
                >
                  Edit
                </button>
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;

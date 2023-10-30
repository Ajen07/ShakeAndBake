import React, { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewContainer = () => {
  const { reviews } = useAppContext();
  return (
    <section className="mt-8 flex flex-col gap-y-6">
      {reviews.length > 0 &&
        reviews?.map((review) => {
          const { user, comment, rating, title ,_id } = review;
          return (
            <ReviewCard
              users={user}
              comment={comment}
              rating={rating}
              title={title}
              key={review._id}
              userId={user._id}
              _id={_id}
            />
          );
        })}
    </section>
  );
};

export default ReviewContainer;

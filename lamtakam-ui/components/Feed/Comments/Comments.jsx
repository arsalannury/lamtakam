import Image from "next/image";
import React, { useState } from "react";
import { Col, Container } from "react-bootstrap";
import styles from "./comments.module.scss";
import ResponseComment from "./ResponseComment";

const Comments = ({
  comment,
  // createComment,
  // setCommentName,
  // setCommentText,
  // commentText,
  // commentName,
}) => {
  // const [isResponse, setIsResponse] = useState(false);

  return (
    <>
      <Col xl={5} className={styles.columnComment}>
        <div className={styles.commentImage}>
          <div className={styles.topSection}>
            <Image width={40} height={40} src={comment.created_by_image} />
            <span>{comment.created_by}</span>
          </div>

          <div>
            <span className={styles.createdAt}>
              {new Date(comment.created_at).toLocaleString("fa-ir")}
            </span>
          </div>
        </div>
        <p
          style={{
            background: "#ddd",
          }}
          className={styles.commentContent}
        >
          {comment.content}
        </p>
        {/* <button
          onClick={() => {
            setIsResponse((prev) => !prev);
            setCommentName("");
            setCommentText("");
          }}
          className={styles.responseCommentBtn}
        >
          پاسخ به دیدگاه...
        </button> */}
      </Col>
      {/* {isResponse ? (
        <Container>
          <ResponseComment
            commentId={comment._id}
            createComment={createComment}
            setCommentName={setCommentName}
            setCommentText={setCommentText}
            commentText={commentText}
            commentName={commentName}
          />
        </Container>
      ) : null} */}
    </>
  );
};

export default Comments;

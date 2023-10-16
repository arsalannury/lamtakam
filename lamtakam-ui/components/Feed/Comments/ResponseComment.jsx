import React, {useState} from 'react'
import { Button, Form } from 'react-bootstrap';

const ResponseComment = ({
  setCommentName,
  setCommentText,
  commentText,
  commentName,
  createComment,
  commentId,
}) => {
  return (
    <>
      <Form.Group className="col-xl-6 m-3 p-2 ">
        <Form.Control
          value={commentName}
          onChange={(event) => setCommentName(event.target.value)}
          size="sm"
          type="text"
          className="mb-4 "
          placeholder="نام و نام خانوادگی"
        />

        <Form.Control
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          as="textarea"
          name="comment"
          rows={3}
          className="m-2 "
          placeholder="متن "
        />
      </Form.Group>
      <div className="mb-4 d-flex align-items-end justify-content-end col-xl-6">
        <Button
          disabled={
            commentName.trim().length <= 0 || commentText.trim().length <= 0
          }
          onClick={() => {createComment()}}
          variant="outline-success"
        >
          ذخیره پاسخ
        </Button>
      </div>
    </>
  );
};

export default ResponseComment
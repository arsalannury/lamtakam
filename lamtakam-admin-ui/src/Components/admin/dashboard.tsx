import React from "react";
import {
  Col,
  Container,
  Row,
  Badge,
  Spinner,
  Table,
  Button,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { commentStatusMessages } from "../../helpers/index";
import "../../styles/dashboardStyles.scss";
import CommentsCount from "../Charts/CommentsCount";

const Dashboard: React.FC<any> = () => {
  const [navLink, setNavLink] = useState<string>("accepted");
  const [data, setCommentData] = useState<any[]>([]);
  const [selectedRow, setSelectedRow] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
  const [sendCommentsLoading, setSendCommentsLoading] =
    useState<boolean>(false);

  const getCommentsByStatus = async (state: string | null) => {
    try {
      setCommentsLoading(true);
      const fetchComments = await fetch(
        `http://127.0.0.1:8000/comments?status=${state}`
      );
      const result = await fetchComments.json();
      setCommentData(result.data);
      setCommentsLoading(false);
    } catch (error: any) {
      setCommentsLoading(false);
      throw error.message;
    }
  };

  const acceptComments = async () => {
    try {
      setSendCommentsLoading(true);
      await fetch("http://127.0.0.1:8000/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedRow),
      });
      setSendCommentsLoading(false);
      getCommentsByStatus("notAccepted");
    } catch (error) {
      setSendCommentsLoading(false);
      throw error;
    }
  };

  const handleSelectRows = (commentObject: any) => {
    const instanceOfState = [...selectedRow];
    instanceOfState.push(commentObject);
    setSelectedRow(instanceOfState);
  };

  const handleUnSelectRows = (commentObject: any) => {
    const instanceOfState = [...selectedRow];
    const findIndexOfSelectedObject = selectedRow.findIndex(
      (row) => row._id === commentObject._id
    );
    if (findIndexOfSelectedObject !== -1) {
      instanceOfState.splice(findIndexOfSelectedObject, 1);
      setSelectedRow(instanceOfState);
    }
  };

  const handleDeleteComment = async () => {
    try {
      setSendCommentsLoading(true);
      await fetch("http://127.0.0.1:8000/comments", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedRow),
      });
      setSendCommentsLoading(false);
      getCommentsByStatus("notAccepted");
    } catch (error) {
      setSendCommentsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    getCommentsByStatus("accepted");
    return () => {};
  }, []);

  const renderComments = () => {
    if (data && data.length > 0) {
      return (
        <>
          {commentsLoading || sendCommentsLoading ? (
            <div className="commentsLoadingSpinnerStyle">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <Table className="tableComments table-sm me-2">
                <thead>
                  <tr>
                    <th className="th">ردیف</th>
                    <th className="th">تعیین وضعیت</th>
                    <th className="th">زمان ایجاد</th>
                    <th className="th">ایجاد کننده</th>
                    <th className="th">متن دیدگاه</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((comment, index) => (
                    <>
                      <tr>
                        <td className="td">{index + 1}</td>
                        <td className="td">
                          {comment.status === "notAccepted" ? (
                            <input
                              onInput={(event: any) => {
                                event.target.checked
                                  ? handleSelectRows(comment)
                                  : handleUnSelectRows(comment);
                              }}
                              className="checkbox"
                              type="checkbox"
                            />
                          ) : (
                            <Badge bg="success">
                              {commentStatusMessages(comment.status)}
                            </Badge>
                          )}
                        </td>
                        <td className="td">
                          {new Date(comment.created_at).toLocaleString("fa-ir")}
                        </td>
                        <td className="td">{comment.created_by}</td>
                        <td className="tdLast">{comment.content}</td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
              {navLink === "notAccepted" && (
                <div className="sendSelectedRowsStyle">
                  <Button
                    onClick={() => acceptComments()}
                    disabled={selectedRow && selectedRow.length <= 0}
                    size="sm"
                    variant="outline-success"
                  >
                    تایید موارد انتخاب شده
                  </Button>
                  <Button
                    onClick={() => handleDeleteComment()}
                    disabled={selectedRow && selectedRow.length <= 0}
                    size="sm"
                    variant="outline-success"
                  >
                    حذف موارد انتخاب شده
                  </Button>
                </div>
              )}
            </>
          )}
        </>
      );
    }
    return <p className="noComment"> دیدگاهی برای نمایش وجود ندارد</p>;
  };

  return (
    <>
      <Container className="dashContainer" fluid>
        <Row className="justify-content-start position-relative">
          <Col xl={6}>
            <Tabs
              id="controlled-tab-example"
              activeKey={"key"}
              onSelect={(k) => getCommentsByStatus(k)}
              className="mb-3 p-3"
            >
              <Tab disabled eventKey="comments" title="نظرات کاربران"></Tab>
              <Tab className="" eventKey="accepted" title="تایید شده"></Tab>
              <Tab className="" eventKey="noAaccepted" title="تایید نشده"></Tab>
            </Tabs>
            {renderComments()}
          </Col>
          <Col
            className="d-flex align-items-center justify-content-center"
            xl={6}
          >
            <CommentsCount />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;

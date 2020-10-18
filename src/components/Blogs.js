import React from 'react';
import { withRouter } from "react-router";
import { useParams } from 'react-router-dom';
function Blogs(props) {
    const handleClick = (blogId) => {
        console.log("Blog Id", blogId);
        props.history.push(`/blogs/${blogId}`);
    }
    const handleBack = () => {
        props.history.push(`/home`);
    }
    let { blogId } = useParams();
    if (blogId !== undefined) {
        return (<div>
            <h1>Blog</h1>
            {props.blogs.filter((blog) => blog.id === parseInt(blogId)).map((sBlog) => {
                return (<div key={sBlog.id} >
                    <dl className="singleblog">
                        <dt>Id</dt>
                        <dd>{sBlog.id}</dd>
                        <dt>Customer Id</dt>
                        <dd>{sBlog.userId}</dd>
                        <dt>Title</dt>
                        <dd>{sBlog.title}</dd>
                        <dt>Description</dt>
                        <dd>{sBlog.body}</dd>
                    </dl>
                </div>);
            })}
            <button onClick={() => handleBack()}>Back</button>
        </div>);
    }
    else {
        return (<div className="blogs">
            {props.blogs.map((blog) => {
                return (<div key={blog.id}>
                    <button className="blogbtn" onClick={() => handleClick(blog.id)}>{blog.title}</button>
                </div>);
            })}
        </div>);
    }
}
export default withRouter(Blogs);
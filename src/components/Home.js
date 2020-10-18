import React, { useState } from 'react';
import Users from './Users';
import Blogs from './Blogs';
function Home(props) {
    const [filtered, setFiltered] = useState(props.users);
    const [searchOption, setSearchOption] = useState('user');
    const handleChange = (e) => {
        // Variable to hold the original version of the list
        let currentList = [];
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {
            if (searchOption === 'user')
                currentList = props.users;
            else if (searchOption === 'title')
                currentList = props.blogs;
            else
                currentList = newBlogs;
            newList = currentList.filter(item => {
                let lc = '';
                if (searchOption === 'user')
                    lc = item.name.toLowerCase();
                else if (searchOption === 'title')
                    lc = item.title.toLowerCase();
                else {
                    lc = item.author.toLowerCase();
                }

                const filter = e.target.value.toLowerCase();

                return lc.includes(filter);
            });
        } else {
            // If the search bar is empty, set newList to original task list
            newList = filtered;
        }
        // Set the filtered state based on what our rules added to newList
        setFiltered(newList);
    }
    const setSearch = (event) => {
        console.log(event.target.value);
        if (event.target.value === 'user') {
            setFiltered(props.users);
            setSearchOption('user');
        }
        else {
            setFiltered(props.blogs);
            if (event.target.value === 'author') {
                setSearchOption('author');
            }
            else {
                setSearchOption('title');
            }
        }
    }
    let newBlogs = props.blogs.map((blog) => {
        const res = props.users.filter((user) => (user.id === blog.userId))
        return Object.assign({}, blog, { author: res[0].name })
    })
    const handleLogout = () => {
        props.setAuthedUser(null);
    }
    return (<div>
        <h1> Users/Blogs</h1>
        {console.log("filtered", filtered)}
        <div className="search" onChange={(e) => setSearch(e)}>
            <input type="radio" value="user" name="gender" defaultChecked="checked" /> User Name
            <input type="radio" value="author" name="gender" /> Blog Author
            <input type="radio" value="title" name="gender" /> Blog Title
            <button onClick={() => handleLogout()}>Logout</button>
        </div>
        <input type="text" className="sinput" onChange={(e) => handleChange(e)} placeholder="Search..." />
        <div className="usersblogs">
            <Users users={searchOption === 'user' ? filtered : props.users} />
            <Blogs blogs={(searchOption === 'title' || searchOption === 'author') ? filtered : props.blogs} />
        </div>
    </div>);
}
export default Home;


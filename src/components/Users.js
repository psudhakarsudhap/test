import React from 'react';

function Users(props) {
    return (<div className="users">
        {console.log(props.users)}
        {props.users.map((user) => {
            return (<div key={user.id}>{user.name}</div>);
        })}
    </div>);
}
export default Users;
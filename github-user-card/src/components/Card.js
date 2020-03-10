import React from "react";

const Card = ({ user }) => {
    return (
        <div className="card">
            <img src={user.avatar_url} alt={user.name} />
            <div className="user-info">
                <h2>{user.name}</h2>
                <h3>{user.login}</h3>
                <p>{`Location:  ${user.location}`}</p>
                <p>Profile: <a href={user.html_url}>{user.html_url}</a></p>
                <p>Followers: {user.followers}</p>
                <p>Following: {user.following}</p>
                <p>{`Bio: ${user.bio}`}</p>
            </div>
        </div>
    );
}

export default Card;
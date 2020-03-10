import React from "react";
import Card from "./Card";

const CardList = ({ userData, followersData }) => {
    return (
        <div className="card-list">
            <div className="user-list">
                <Card user={userData} />
            </div>
            <div className="followers-list">
                {followersData.map(follower => <Card key={follower.id} user={follower} />)}
            </div>
        </div>
    )
}

export default CardList;
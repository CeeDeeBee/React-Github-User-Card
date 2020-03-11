import React from "react";
import Card from "./Card";
import "./CardList.css";

const CardList = ({ userData, followersData }) => {
    return (
        <div className="card-list">
            <Card user={userData} />
            {followersData.map(follower => <Card key={follower.id} user={follower} />)}
        </div>
    )
}

export default CardList;
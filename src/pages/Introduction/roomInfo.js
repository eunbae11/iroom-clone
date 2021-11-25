import React from "react";
import "./roomInfo.css";
import { dbService } from "../../firebase";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";

export default function RoomInfos(RoomNum) {

    const [RoomInfo, setRoomInfos] = useState([""]);
    useEffect(()=>{
     const getRoomInfo = async () => {
        const q = query(collection(dbService, "roomInfo"), where("max", "==", RoomNum));
        const querySnapshot = await getDocs(q);
        let RoomInfo = [];
        querySnapshot.forEach((doc) => {
               RoomInfo.push(doc.data())
        })
            return {
            RoomInfo
        }
      }
        getRoomInfo().then(data => setRoomInfos(data));
    }, [RoomNum])

    let roomName = "";
    let roomInfo1 = "";
    let roomInfo2 = "";
    let roomInfo3 = "";

    if(RoomInfo.RoomInfo !== undefined)
        {
            roomName = RoomInfo.RoomInfo[0].roomName;
            roomInfo1 = RoomInfo.RoomInfo[0].roomInfo1;
            roomInfo2 = RoomInfo.RoomInfo[0].roomInfo2;
            roomInfo3 = RoomInfo.RoomInfo[0].roomInfo3;
        } 

    return(
        <div className="bgContainer">
            <img className="bgImage" src={require('../Introduction/images/1.jpg').default} alt=""/>
        <div className="container">
            <div className="infoBox">
                <h1>{roomName}</h1><br/>
                <h2>{roomInfo1}</h2><br/><br/><br/>
                <div>1️⃣ &nbsp;{roomInfo2}</div><br/><br/><br/>
                <div>2️⃣ &nbsp;{roomInfo3}</div><br/>
            </div>
            <div className="iconBox1">
                <i class="far fa-clock"></i>
                <i class="fas fa-desktop"></i>
                <i class="fas fa-users"></i>
                <i class="fas fa-wifi"></i>
            </div>
            <div className="iconBox2">
                <span>24 hour access</span>
                <span>Fully Equiped</span>
                <span>Up to 4 Number of People</span>
                <span>Free WIFI</span>
            </div>

            <div className="btnToIntro">
            <Link to="/intro">Go Back</Link>
            </div>
        </div>
        </div>
    );
    }
    
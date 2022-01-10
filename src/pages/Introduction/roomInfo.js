import React from "react";
import "./roomInfo.css";
import { dbService } from "../../firebase";
import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { collection, query, where, getDocs } from "firebase/firestore";


export default function RoomInfos() {
    const [timer, setTimer] = useState(false);
    useEffect(() => {
        setTimeout(() =>{
            setTimer(true);
        }, 1000);
    }, [])

    const a = useParams();

    const [RoomInfo, setRoomInfos] = useState([""]);
    useEffect(()=>{
     const getRoomInfo = async () => {
        const q = query(collection(dbService, "roomInfo"), where("max", "==", parseInt(a.roomNum)));
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
    }, [a.roomNum])

    console.log(timer);
    
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
        <div className={timer ? "bgContainer mountedBgContainer" : "bgContainer"}>
            <img className="bgImage" src={require(`../Introduction/images/${a.roomNum}.jpg`).default} alt=""/>
        <div className={timer ? "container mountedContainer" : "container"}>
            <div className="infoBox">
                <h1>{roomName}</h1><br/>
                <h2>{roomInfo1}</h2><br/><br/><br/>
                <div>1️⃣ &nbsp;{roomInfo2}</div><br/><br/><br/>
                <div>2️⃣ &nbsp;{roomInfo3}</div><br/>
            </div>
            <div className="iconBox1">
                <i className="far fa-clock"></i>
                <i className="fas fa-desktop"></i>
                <i className="fas fa-users"></i>
                <i className="fas fa-wifi"></i>
            </div>
            <div className="iconBox2">
                <span>24 hour access</span>
                <span>Fully Equiped</span>
                <span>Up to {a.roomNum} Number of People</span>
                <span>Free WIFI</span>
            </div>

            <div className="btnContainer">
                <button className="btnToIntro">
                    <Link to="/intro">Go Back</Link>
                </button> 
            </div>
            </div>
            </div>
    );
    }
    

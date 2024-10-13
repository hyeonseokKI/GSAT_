import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";

function Profile() {
    let { userId } = useParams();
    
    let [tab, setTab] = useState(0);

    return (
        <>
        <section id='content'>
            <h1>
                프로필임
            </h1>
        
        </section>
        <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}}eventKey="link0">내 GSAT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">알림</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}}eventKey="link2">프로필</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}}eventKey="link3">설정</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent2 탭 = {tab }></TabContent2>

        </>
    );
}
function TabContent2(props){
    let [fade, setFade] = useState('');
    useEffect(()=>{
        let Timer = setTimeout(()=>{
            setFade('end');
        },50)
        // setFade('end');
        return ()=>{
            clearTimeout(Timer);
            setFade('')}

    },[props.탭]);

    return (
        <div className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.탭]}
        </div>
)
    }
export default Profile;

import React from 'react'
// import Active from './Active'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import Modal from './Modal';
// import axios from 'axios';

// import ProfileModal from './ProfileModal';

const Navbar = ({event,userData}) => {
    // const settings = {
    //     dots: false,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 4,
    //     slidesToScroll: 3
    //   };
     
     
    //   console.log(userData)
    return (

        <>
            <div className="container-fluid p-0">
                <div className=" d-flex justify-content-between align-items-center px-3 pt-3">
                    <h3 className="text-dark">Chats</h3>
                    <span  data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img className="rounded-circle" width="50" src={userData?.image} alt="" />
                    </span>
                   <Modal userData={userData}/>
                </div>

                <div className="mt-4 text-center">
                <input onClick={()=> event(true)} className="search-input" placeholder="Search New user" type="text" /><br />
                </div>
                {/* <div className=" mt-1">
                <Slider {...settings}>
                <div className="mt-4">
                        <Active/>
                    </div>
                    <div className="mt-4">
                        <Active/>
                    </div>
                    <div className="mt-4">
                        <Active/>
                    </div>
                    <div className="mt-4">
                        <Active/>
                    </div>
                    <div className="mt-4">
                        <Active/>
                    </div>
                   
                 </Slider>
                </div> */}
            </div>
        </>
    )
}

export default Navbar

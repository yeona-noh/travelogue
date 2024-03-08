import React from 'react'
import axios from 'axios'
import './previewcards.css'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'

//랜덤 블로그 포스트 불러오기
//블로그 포스트에 할당된 아이디를 랜덤으로 불러와서 이미지 카드 슬라이드로 진열

function Previewcards() {

    const previewPost = async () => {
        const res = await axios.get("htttp://localhost:5001/")
    }

    const handleLeft = () => {
        var slider = document.getElementById('slide')
        slider.scrollLeft = slider.scrollLeft + 500
    }

    const handleRight = () => {
        var slider = document.getElementById('slide')
        slider.scrollLeft = slider.scrollLeft - 500
    }

  return (
    <div className='previewCard-container'>
        <div className='arrows left-arrow'>
            <button onClick={handleLeft}><MdChevronLeft /></button>
        </div>
        <div id='slide' className='slide-container'>

            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>
            <div className='each-card'>
                <img src='../img/photoexample3.jpg'></img>
                <div className='card-description'>
                    <p className='card-title'>place</p>
                </div>
            </div>

        </div>
        <div className='arrows right-arrow'>
            <button onClick={handleRight}><MdChevronRight /></button>
        </div>
    </div>
  )
}

export default Previewcards

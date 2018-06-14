import React from 'react'
import Slider from 'react-slick'
import { itemService } from '../../../services'

import { Link } from 'react-router-dom';

export class Carousel extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            list:null
        }
    }

    componentDidMount(){
        itemService.getRandom(6)
            .catch(err=>{
                console.log(err)
            })
            .then(response=>{
                this.setState({list:response.data})
            });
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay:true,
            draggable:false,
            centerPadding:"20px",
        }
        
        let listItems=null
        if(this.state.list){

            listItems = this.state.list.reverse().map((item, index) => {
                return <Link key={index} to={"/item/" + item.id}><div style={{backgroundImage:`url("${item.image}")`,
                backgroundPosition:"center",
                backgroundSize: "cover",
                width:"auto",
                height:"300px",}}></div></Link>                 
            });
        }

        return (
            <Slider {...settings}>
                {listItems}
            </Slider>
        )
    }
}
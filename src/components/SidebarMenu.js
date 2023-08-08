import { useState, useEffect } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { getAllCategory } from '../services/category-service';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function SidebarMenu(props) {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        getAllCategory().then(data => {
            // console.log(data);
            setCategoryList(data);
        }).catch(error => {
            console.log(error);
            toast.error("Error in loading categories")
        })
    }, []);

    const activeStyle = {
        backgroundColor: '#3b416280',
        border: '0px'
    }

    return (
        <div>
            <ListGroup>
                <ListGroupItem
                    active={props.catId == null}
                    tag={Link}
                    to={"/feed"}
                    action={true}
                    className='shadow'
                    style={props.catId == null ? activeStyle : {}}
                >
                    All Posts</ListGroupItem>
                {categoryList.map(c => {
                    return <ListGroupItem
                        active={props.catId == c.catId}
                        tag={Link}
                        to={"/category/" + c.catId}
                        key={c.catId}
                        action={true}
                        className='shadow'
                        style={props.catId == c.catId ? activeStyle : {}}
                    >
                        {c.catTitle}</ListGroupItem>
                })}
            </ListGroup>
        </div>
    )
}

export default SidebarMenu
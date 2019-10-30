import React, { Component } from 'react';
import { CardColumns , Card , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ComponentCard extends Component{
    render(){
        const { onDelete, onUpdate , data } = this.props
        let resultFetch = []
        if(data.data !== undefined){
            resultFetch = data.data
        }
        const CardData = () => {
            return resultFetch.map((key,index) => {
                const { product_id , dispengnm , dispnm , parentdispno } = key
                return (
                    <Card key={index}>
                        <Card.Img variant="top" src="1_react.png"/>
                            <Card.Body>
                                <Card.Title>{dispnm}</Card.Title>
                                {dispengnm}
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted" >
                                    <Button onClick={() => onDelete(product_id)} 
                                        className="btn btn-danger">Delete
                                    </Button>
                                </small>
                                <small className="text-muted" >
                                    <Button 
                                        onClick={() => onUpdate({ product_id , dispengnm , dispnm , parentdispno })} 
                                        className="btn btn-warning">Update
                                    </Button>
                                </small>
                            </Card.Footer>
                    </Card>
                ) 
            })
        }

        return(
            <div>
                <CardColumns>
                    <CardData/>
                </CardColumns>
            </div>
        );
    }

}
export default ComponentCard
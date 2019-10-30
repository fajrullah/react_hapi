import React, { Component } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Modal , Button} from 'react-bootstrap';
import ComponentButton from './componentButton';
import ComponentCard from './componentCard';

const baseUrl = 'http://localhost:3000/'

class ComponentFetch extends Component{
    constructor(props){
        super(props)
        this.state = {
            apikey : '',
            url : '',
            data : [],
            loading : false,
            show : '',
            dataSaved : [],
            handleClose : false,
            showModal : false,
            formData : { 
                product_id : '', 
                dispengnm : '' , 
                dispnm : '' , 
                parentdispno : ''
            }
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeUpdate = this.onChangeUpdate.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this) 
        this.handeSaveAPI = this.handeSaveAPI.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    }
    handleShow(){
        this.setState({
            showModal : true
        })
    }
    handleClose(){
        this.setState({
            showModal : false
        })
    }
    componentDidMount(){
        this.getDataProduct()
    }
    onUpdate = ({ product_id , dispengnm , dispnm , parentdispno }) => {
        this.setState({
            formData : {
                product_id , dispengnm , dispnm , parentdispno
            }
        })
        this.handleShow()
    }
    onDelete = (id) => {
        axios.delete(baseUrl + 'product',{ data: {id}})
        .then(result => {
            this.getDataProduct()
            alert(`status : ${result.status}`)
            return result
        })
    }
    onChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    onChangeUpdate = (event) => {
        this.setState({
            formData : {
                ...this.state.formData,
                [event.target.name] : event.target.value
            }
        })
    }
    onSubmitUpdate = (event) => {
        event.preventDefault();
        const { formData } = this.state
        const { ...rest } = formData
        console.log({...rest})
        axios.put(baseUrl + 'product',{...rest})
        .then(result => {
            this.getDataProduct()
            this.handleClose()
            alert(`status : ${result.status}`)
            return result
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        const { apikey , url } = this.state
        this.setState({
            loading : true
        })
        this.handleFetchAPI({ apikey , url })
    }
    handeSaveAPI = (event) => {
        const urlHapi = baseUrl + 'insert_database'
        const { data } = this.state
        axios.post(urlHapi,{
            data : data
        }).then(result => result)
          .then(this.getDataProduct())
          .catch(err => {
            this.setState({
                loading : false,
            })
        })
    }
    handleFetchAPI = ({apikey , url}) => {
        const urlHapi = baseUrl + 'fetch_elevenia'
        axios.post(urlHapi,{
            uri : url,
            apikey : apikey
        }).then(result => {
            const fetchFull = result.data['ns2:categorys']['ns2:category']
            const data = fetchFull.slice(1,20)
            const show = JSON.stringify(data)
            this.setState({
                data,
                show,
                loading : false,
            })
        }).catch(err => {
            this.setState({
                loading : false,
            })
        })
    }
    getDataProduct(){
        axios.get(baseUrl + 'product')
             .then(dataSaved => this.setState({dataSaved}))
    }
    render(){
        const { apikey , url , loading , show, dataSaved , showModal , formData } = this.state
        const { product_id , dispengnm , dispnm , parentdispno } = formData
        console.log()
        const isEnable = show === '' ? true : false
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div>API KEY : 
                    <br></br>
                        <input onChange={this.onChange} placeholder="API KEY HERE" name="apikey" value={apikey} type="text"/>
                    <br></br>
                    <br></br>
                    this API scrap using : http://api.elevenia.co.id/rest/cateservice/category
                    </div>
                    <div>URL 
                        <input onChange={this.onChange} placeholder="URL HERE" name="url" value={url} type="text"/>
                    </div>
                    { loading ?  <div>loading...</div> : <Button type="submit">FETCH</Button>}
                  </form>

                <ComponentButton show = {isEnable} onClick = {this.handeSaveAPI}/>

                <SyntaxHighlighter language="javascript">
                    {show}
                </SyntaxHighlighter>

                <ComponentCard data = {dataSaved} onDelete={this.onDelete} onUpdate={this.onUpdate}/>

                <Modal show={showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={this.onSubmitUpdate}>
                                <br></br>ID:
                                <input name = "product_id" defaultValue={product_id}/>
                                <br></br>Display Name : 
                                <input name = "dispengnm" onChange={this.onChangeUpdate} value={dispengnm} type="text"/>
                                <br></br>Display Name :
                                <input name = "dispnm" onChange={this.onChangeUpdate} value={dispnm}/>
                                <br></br>No :
                             
                                <input name="parentdispno" onChange={this.onChangeUpdate} value={parentdispno}/>
                                <br></br>
                                <Button variant="primary" type="submit">
                                    Save Changes
                                </Button>
                            </form>
 
                        </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default ComponentFetch
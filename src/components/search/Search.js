import React from 'react'
import axios from 'axios'

import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ImageResults from '../image-results/ImageResults'
class Search extends React.Component{
    constructor(){
        super()
        this.state = {
            searchText: '',
            amount: 15,
            apiurl: 'https://pixabay.com/api/',
            apiKey: '15734059-b34514b9882b2a10bf97283fb',
            images: []
        }
    }

    handleTextChange = (e) =>{
        this.setState({[e.target.name]: e.target.value}, () => {
            axios.get(`${this.state.apiurl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`)
            .then(response=>{
                this.setState({images: response.data.hits})
            })
             .catch(err=>console.log(err))
        })
    }
    handleAmountChange = (e, index, value) =>{
        this.setState({amount: value})
    }
    render(){
        console.log(this.state.images)
        return(
            <div>
                <TextField 
                name ='searchText'
                value={this.state.searchText}
                onChange={this.handleTextChange}
                floatingLabelText = 'search for images'
                fullWidth = {true}
                />
                <SelectField
                name='amount'
                floatingLabelText='Amount'
                value={this.state.amount}
                onChange={this.handleAmountChange}
                >
                <MenuItem value={5} primaryText='5'/>
                <MenuItem value={10} primaryText='10'/>
                <MenuItem value={15} primaryText='15'/>
                <MenuItem value={30} primaryText='30'/>
                <MenuItem value={50} primaryText='50'/>
                </SelectField>
                <br/>
                
                    {this.state.images.length > 0 ? (
                        <ImageResults images={this.state.images} />
                      ) : null}
                
            </div>
        )
    }
}
export default Search
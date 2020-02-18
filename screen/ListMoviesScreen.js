import React from 'react';
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { TextInput } from 'react-native-gesture-handler';
import FilmItem from '../Component/FilmItem';


class ListMoviesScreen extends React.Component{
    constructor(props)
    {
        super(props)
        this.page=0
        this.totalPages=0
        this.recherche=""
        this.state={
            films: [],
            isLoading:false
        }
    }

    static navigationOptions = {
        title: "Listes des films",
    };

    _surSaisie = (text) => {
        this.recherche = text;
    }

    _loadFilms() {

        if (this.recherche.length > 0)
        {
            this.setState({ isLoading : true })
            getFilmsFromApiWithSearchedText(this.recherche, this.page+1).then(data => {
                //console.log(data)
                this.page = data.page
                this.totalPages = data.total_pages
                console.log('total_pages : ' + data.total_pages)
                this.setState({
                        films: [ ...this.state.films, ...data.results ],
                        isLoading:false,
                })
                console.log("total page " + this.totalPages);
            })

        }
    }

    _displayLoading(){
        if (this.state.isLoading){
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }

    _searchFilms(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            fims:[]
        }, () => {
            //console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " nombre de page " + this.state.films.length)
            this._loadFilms()
        })

    }
    

    render(){
        return(
            <View style={ styles.container }>
                <Text>Liste des films : </Text>
                <TextInput
                    onChangeText={ (text) => this._surSaisie(text)}
                    style={styles.chp_saisie}
                    placeholder="Titre du film"
                    onSubmitEditing={()=>this._searchFilms()}
                />
                <Button style={{ height:50}} title="Rechercher" onPress={() => this._searchFilms() } />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString() }
                    renderItem={({item})=> <FilmItem film={item}/>}
                    onEndReachThreashold={0.5}
                    onEndReached={() => {
                        console.log(this.page + " " + this.totalPages)
                        if (this.page < this.totalPages){
                            this._loadFilms()
                        }
                        console.log("onEndReached")
                    }}
                />
                {this._displayLoading() }
            </View>
        )       
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    chp_saisie:{
        marginLeft:5,
        marginRight:5,
        height:50,
        borderColor: '#000000',
        borderWidth:1,
        paddingLeft: 5,
    },
})

export default ListMoviesScreen;
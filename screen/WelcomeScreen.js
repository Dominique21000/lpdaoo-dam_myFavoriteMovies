import React from 'react';
import { View, Text, Image, StyleSheet }  from 'react-native';
import { render } from 'react-dom';
import { Button } from 'react-native-elements';

class WelcomeScreen extends React.Component{
    constructor(props){
        super(props)
        
        this.nom = this.props.navigation.getParam('nom')
        this.prenom = this.props.navigation.getParam('prenom')
    }
    static navigationOptions = {
        title: "Bienvenue",
    };

    
    render(){
        console.log("nom = " + this.nom)
        const { navigate} = this.props.navigation
        return (
            <View style={ styles.container }>
                <View style={styles.container_titre}>
                    <Text style={ styles.title}>Bonjour { this.prenom } { this.nom },{ '\n'}
                    Bienvenue dans l'application, { '\n' }
                    </Text>
                </View>
                <Button
                    title="Voir la liste des favoris"
                    buttonStyle={styles.btn_listFavour}

                />
                <Button
                    title="Ajout d'un favoris"
                    buttonStyle={styles.btn_addFavour}
                    onPress={ () => navigate('ListeMovies')}
                />                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
    },

    container_titre:{
        alignItems:"center",
    },  

    title:{
        color:'blue',
        fontWeight:'bold',
        fontSize:20,
    },

    btn_listFavour:{
        marginBottom:10,
    },

    btn_addFavour:{
        marginTop:10
    },

})


export default WelcomeScreen;
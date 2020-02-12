import React from 'react';
import { View, Text, Image, StyleSheet }  from 'react-native';
import { Button } from 'react-native-elements';
import { db_creation } from '../Class/DataBase'; 

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        
    }
    static navigationOptions = {
        title: "Accueil",
    };
    
    render(){
        
        // creation of the database
        const { navigate } = this.props.navigation;
        db_creation();

        return(
            <View style={styles.container}>
                <Text style={ styles.text_begin}>Bienvenue dans l'appli</Text>
                <Text style={ styles.title}>My Favorite Movies</Text>
                <Text style={ styles.text_end}>(l'appli de gestion{ '\n' } de vos films préférés)</Text>
                <Button
                    title="S'inscrire ?"
                    onPress={ () => navigate('Inscription')}
                    buttonStyle={styles.btn_sinscrire}
                    titleStyle={ styles.btn_sinscrire_texte}
                />
                <Button
                    title="Se connecter ?"
                    onPress={ () => navigate('Connexion')}
                    buttonStyle={styles.btn_seconnecter}
                    titleStyle={ styles.btn_seconnecter_texte}

                />
            </View>
        )
    }  
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:"center",
        justifyContent:"center",
    },

    text_begin:{
       fontSize:25,
       color:"black",

    },

    title:{
        fontSize:33,
        fontWeight:"bold",
        fontStyle:"italic",
        color:"blue",
    },

    text_end:{
        fontSize:25,
        color:"black",
    },

    btn_sinscrire:{
        marginTop:20,
        width:200,
        backgroundColor:"blue",
    },

    btn_sinscrire_texte:{
        color:"white",
    },

    btn_seconnecter:{
        marginTop:20,
        width:200,
        backgroundColor:"white",
    },

    btn_seconnecter_texte:{
        color:"blue",
    }

})

export default HomeScreen;
import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';

import { db_addUser } from '../Class/DataBase'; 
import { NavigationEvents } from 'react-navigation';


class InscriptionScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prenom : "",
            nom : "",
            email: "",
            mdp : ""           
        }
    }

    render(){
        const { navigate} = this.props.navigation;

        const _verifForm = () => {
            console.log("dans verifForm")
            let ok_nom = false;
            let ok_prenom = false;
            let ok_email = false;
            let ok_mdp = false;
    
            const nom = this.state.nom;
            const prenom = this.state.prenom;
            const email = this.state.email;
            const mdp = this.state.mdp;
                            
            // verification
            if (nom.length === 0) 
                alert("Vous devez remplir votre nom !")
            else
                ok_nom = true;
    
            if (prenom.length === 0)
                alert("Vous devez remplir votre prenom !")
            else
                ok_prenom = true;
    
            if (email.length === 0){
                alert("Vous devez saisir un mot de email");
            }
            else{
                ok_email = true;
            }
    
            if (mdp.length <5){
                alert("Vous devez remplir un mot de passe (5 à 15 caractères) :" + mdp.length)
            }
            else{
                ok_mdp = true;
            }
    
            // traitement des données
            if (ok_nom && ok_prenom && ok_email && ok_mdp){
                console.log("ok pour traitement")
                // verification que l'utilisateur n'existe pas deja
    
                //on ajout l'utilisateur
                db_addUser(nom, prenom, email, mdp);
                //console.log("ad : " + ad);
                navigate('Home');
                //db_addUser(nom, prenom, email, mdp);
            }
            else{
                navigate('Inscription');
            }
        }
        
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Inscription</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Prénom : "
                    onChangeText={ text => this.setState({ prenom:text})}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nom : "
                    onChangeText={ text => this.setState({ nom:text})}
                    
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Email : "
                    onChangeText={ text => this.setState({ email:text})}
                    keyboardType="email-address"
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe : "
                    secureTextEntry={ true}
                    onChangeText={ text => this.setState({ mdp:text})}
                />
                
                <Button
                    title="Valider !"
                    buttonStyle={styles.btn_validation}
                    titleStyle={styles.btn_validation_texte}
                    onPress={ () => _verifForm() }
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },

    title:{
        color:"blue",
        fontSize:20,
        fontWeight:"bold",
    },
    input:{
        height:50,
        width:200,
        borderColor:"black",
        borderWidth:1,
        marginTop:10,
        paddingLeft:10,
    },
    btn_validation:{
        marginTop:20,
        width:200,
        backgroundColor:"blue",
    },

    btn_validation_texte:{
        color:"white",
    }

});

export default InscriptionScreen;
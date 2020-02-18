import React from 'react';
import { View, Text, Image, StyleSheet }  from 'react-native';
import { Button } from 'react-native-elements';

class FavorisLitesScreen extends React.Component{
    constructor(props){
        super(props)

    }

    static navigationOptions = {
        title: "Listes des favoris",
    };

    render(){
        return(
            <View style={ styles.container }>
                <Text style={ styles.title}>Liste des favoris</Text>
                <Button
                    title="Ajouter un favoris"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    title:{

    }
})
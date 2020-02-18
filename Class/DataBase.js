import * as SQLite from 'expo-sqlite';
import { normalize } from 'react-native-elements';

const db = SQLite.openDatabase("Movies.db");

var db_creation = () => {
    let tr = db.transaction( tx => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS utilisateur(id INTEGER PRIMARY KEY, nom text, prenom text, email text, mdp text);");
    //    tx.executeSql("CREATE TABLE IF NOTS EXISTS film (id INTEGER PRIMARY KEY ")
    });
    console.log("base crée");
    return tr;
}

var db_addUser = (nom, prenom,  email, mdp) => {
    console.log("email : " + email)
    console.log("mdp : " + mdp )
    let nb_existant = null;
    let tr = db.transaction( tx => {
        tx.executeSql("select count (*) as nb_deja from utilisateur where email = ?;",
            [ email],
            // succes de exe
            (
                (_, { rows} ) => {
                    nb_existant = callback_verifDoublon(rows);
                    console.log("nb existant = " + nb_existant)
                    if (nb_existant >0 )
                    {
                        alert("Un utilisateur avec cet email existe déjà")
                    }
                    else{
                        db_trt_addUser(nom, prenom, email, mdp)
                    }
                    
                }
            ),
            // erreur de exe
            ()=> { 
                console.log("erreur dans le count");
            }
        );
    })        
    return tr;
}

var db_trt_addUser = (nom, prenom, email, mdp) => {
    console.log("dans adddUser");
    console.log("partie 1 : max");
    let max = null;
    let tr = db.transaction( tx => {
        tx.executeSql("SELECT max(id) as maxi from utilisateur;", 
            [],
            // succes de execute
            ( 
                (_, {rows} ) => {
                    max = callback_max(rows) 
                    let id = max + 1;
                    trt_add(id, nom, prenom, email, mdp);
                }
            ),
            // error dans execute
            ()=>{
                console.log("Erreur dans la requete max");
            }
        );
    })       
}

var callback_max = (rows, nom, prenom, email, mdp)  => {
    let maxi = rows._array[0].maxi
    console.log("maxi dans callback_max: " + maxi)
    return maxi;
}



var trt_add = (id, nom, prenom, email, mdp) => {
    //let id = null;
    
    console.log("id = " + id);
    console.log("nom : " + nom)
    let tr = db.transaction(tx => {
        tx.executeSql("INSERT INTO utilisateur (id, nom, prenom, email, mdp) VALUES ( ?, ?, ?, ?, ?);", 
                        [ id , nom, prenom, email, mdp ], 
                        () => { 
                                console.log("utilisateur " + nom + " cré")
                                alert("Inscription réalisée avec succès :)")    
                            },
                        ()=> { console.log("Erreur lors de l'insert")}
                    ); 
        tx.executeSql("select * from utilisateur;", (_, { rows}) => console.log(JSON.stringify(rows)));
    }); 
}


var callback_verifDoublon = (rows) => {
    let nb_deja = rows._array[0].nb_deja
    console.log("maxi dans callback_max: " + nb_deja)
    return nb_deja;
}

var db_listeUsers = () => {
    console.log("dans listeUsers")
    var tr = db.transaction(tx => {
        tx.executeSql("select * from utilisateur;", [] , (_,
            { rows }) => console.log(JSON.stringify(rows)));
    })
    return tx;
}

var _db_checkUser = (username, password, nav) => {
    console.log("username : " + username)
    console.log("password : " + password)

    // check the user 
    let count = null;
    let tr = db.transaction( tx => {
        tx.executeSql("SELECT prenom, nom from utilisateur where email = ? and mdp = ?;", 
            [username, password],
            // succes de execute
            ( 
                (_, {rows} ) => {
                    console.log(rows._array)
                    callback_count(rows, nav) 
                }
            ),
            // error dans execute
            ()=>{
                console.log("Erreur dans la requete count");
            }
        );
    })       
}


var callback_count = (rows, nav) => {
    console.log(rows)
    let nb = rows.length;
    console.log("nb des utils : " + nb)
    
    if (nb > 0){
        nav('Welcome', { 'nom':rows._array[0].nom, 'prenom' : rows._array[0].prenom});
    }
    else{
        alert("Utilisateur inconnu :-(");
    }    
} 

export { db_creation, db_addUser, _db_checkUser };
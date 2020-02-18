import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screen/HomeScreen';
import InscriptionScreen from './screen/InscriptionScreen';
import ConnexionScreen from './screen/ConnexionScreen';
import WelcomeScreen from './screen/WelcomeScreen';
import FavorisListesScrean from './screen/FavorisListeScreen'
import ListMoviesScreen from './screen/ListMoviesScreen'

const MainNavigator = createStackNavigator({
    Home : { screen : HomeScreen},
    Inscription : { screen: InscriptionScreen},
    Connexion : { screen: ConnexionScreen },
    Welcome : { screen: WelcomeScreen },
    ListeMovies : {screen : ListMoviesScreen},
    
});

const App = createAppContainer(MainNavigator);
export default App;
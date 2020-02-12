import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screen/HomeScreen';
import InscriptionScreen from './screen/InscriptionScreen';
import ConnexionScreen from './screen/ConnexionScreen';

const MainNavigator = createStackNavigator({
    Home : { screen : HomeScreen},
    Inscription : { screen: InscriptionScreen},
    Connexion : { screen: ConnexionScreen },
});

const App = createAppContainer(MainNavigator);
export default App;
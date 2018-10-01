import i18n from 'ex-react-native-i18n';
import fr from './fr.json';
import en from './en.json';
import de from './de.json';

i18n.initAsync().then(() => {
    // Success
});

i18n.fallbacks    = true;
i18n.translations = {en, fr, de};

export default i18n;
import i18n from 'ex-react-native-i18n';
import fr from './fr.json';
import en from './en.json';

i18n.initAsync().then(() => {
    // Success
});

i18n.fallbacks    = true;
i18n.translations = {en, fr};

export default i18n;
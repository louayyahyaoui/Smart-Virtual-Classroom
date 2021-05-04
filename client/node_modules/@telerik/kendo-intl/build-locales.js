const likelySubtags = require("cldr-data/supplemental/likelySubtags.json");
const currencyData = require("cldr-data/supplemental/currencyData.json");
const weekData = require("cldr-data/supplemental/weekData.json");
const fs = require('fs');
const path = require('path');
const jsonNameRegex = /"([$A-Z\_a-z][$A-Z\_a-z0-9\\.]*)":/g;

const LOCALES_PATH = path.join(process.cwd(), 'node_modules', 'cldr-data', 'main');

module.exports = {};

const EXCLUDE = {
    root: true
};

const NO_CURRENCY = {
    'es-419': true // latin america. not sure what to use here
};

const toJSObject = module.exports.toJSObject = (obj) => {
    return JSON.stringify(obj, null, 4).replace(jsonNameRegex, '$1:');
};

const defaultTemplate = (data) => {
    return `const data = ${ toJSObject(data) };
export default data;

`};

const localeInfo = (info) => {
    return {
        name: info.name,
        likelySubtags: info.likelySubtags,
        identity: info.identity,
        territory: info.territory
    };
};

const loadLocale = (name, intl) => {
    const numbers = require(`cldr-data/main/${ name }/numbers.json`);
    const currencies = require(`cldr-data/main/${ name }/currencies.json`);
    const calendar = require(`cldr-data/main/${ name }/ca-gregorian.json`);
    const timeZoneNames = require(`cldr-data/main/${ name }/timeZoneNames.json`);
    const dateFields = require(`cldr-data/main/${ name }/dateFields.json`);

    intl.load(numbers, currencies, calendar, timeZoneNames, dateFields);
};

module.exports.buildLocales = (intl, { contentTemplate = defaultTemplate, extension = 'js', destFolder = 'locales' }) => {
    destFolder = path.join(process.cwd(), destFolder);
    if (!fs.existsSync(destFolder)){
        fs.mkdirSync(destFolder);
    }

    intl.load(likelySubtags, currencyData, weekData);

    const data = intl.cldr;
    const likelySubtagsData = data.supplemental.likelySubtags;
    const supplementalCurrency = data.supplemental.currencyData;

    const locales = fs.readdirSync(LOCALES_PATH);

    for (let idx = 0; idx < locales.length; idx++) {
        const name = locales[idx];
        if (!EXCLUDE[name]) {
            const localePath = path.join(destFolder, name);
            loadLocale(name, intl);

            intl.firstDay(name);
            intl.weekendRange(name);

            if (!NO_CURRENCY[name]) {
                intl.localeCurrency(name);
            }

            if (!fs.existsSync(localePath)){
                fs.mkdirSync(localePath);
            }

            const localeData = data[name];
            const language = name.split('-')[0];
            localeData.likelySubtags = {};

            const localeCurrency = localeData.numbers.localeCurrency;
            let localeCurrencyData;

            if (likelySubtagsData[language]) {
                localeData.likelySubtags[language] = likelySubtagsData[language];
            }

            if (likelySubtagsData[name]) {
                localeData.likelySubtags[name] = likelySubtagsData[name];
            }

            if (supplementalCurrency.fractions[localeCurrency]) {
                localeData.currencyData = localeCurrencyData = {
                    [localeData.numbers.localeCurrency]: supplementalCurrency.fractions[localeCurrency]
                };
            }

            delete localeData.identity.version;

            fs.writeFileSync(path.join(localePath, `all.${ extension }`), contentTemplate(localeData));

            const currencies = Object.assign(localeInfo(localeData), {
                numbers: {
                    currencies: localeData.numbers.currencies,
                    localeCurrency: localeData.numbers.localeCurrency
                }
            });

            delete localeData.numbers.currencies;
            delete localeData.numbers.localeCurrency;
            delete localeData.currencyData;

            const numbers = Object.assign(localeInfo(localeData), {
                numbers: localeData.numbers,
                currencyData: localeCurrencyData
            });

            const calendar = Object.assign(localeInfo(localeData), {
                calendar: localeData.calendar,
                firstDay: localeData.firstDay
            });

            fs.writeFileSync(path.join(localePath, `currencies.${ extension }`), contentTemplate(currencies));
            fs.writeFileSync(path.join(localePath, `numbers.${ extension }`), contentTemplate(numbers));
            fs.writeFileSync(path.join(localePath, `calendar.${ extension }`), contentTemplate(calendar));
        }
    }
};
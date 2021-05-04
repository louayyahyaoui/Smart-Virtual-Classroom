import { cldr } from './info';

function territoryFromName(name, identity) {
    const likelySubtags = cldr.supplemental.likelySubtags;
    let parts = name.split("-");
    if (likelySubtags) {
        const likelyName = likelySubtags[name] || likelySubtags[parts[0]];
        if (likelyName) {
            parts = likelyName.split("-");
        }
    }

    if (identity) {
        for (let idx = parts.length - 1; idx >= 1; idx--) {
            const part = parts[idx];
            if (part === identity.variant || part === identity.script) {
                parts.splice(idx, 1);
            }
        }
    }

    const length = parts.length;

    if (length > 1) {
        const territory = parts[length - 1];
        return territory.toUpperCase();
    }
}

export default function localeTerritory(info) {
    if (info.territory) {
        return info.territory;
    }

    const name = info.name;
    const identity = info.identity;
    let territory;

    if (identity && identity.territory) {
        territory = identity.territory;
    } else {
        territory = territoryFromName(name, identity);
    }

    info.territory = territory;

    return territory;
}

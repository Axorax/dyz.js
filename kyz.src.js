export const kyz = {
    "cleanMs": (e) => {
        return [(e / 864e5 | 0) + "d", (e % 864e5 / 36e5 | 0) + "h", (e % 36e5 / 6e4 | 0) + "m", (e % 6e4 / 1e3 | 0) + "s"].filter(e => "0" != e[0]).join(" ")
    },
    "normalize": (t) => {
        if (/^https?:\/\//i.test(t)) return t;
        /^\/\/[^/]/.test(t) && (t = `http:${t}`), /^[a-z]+:\/\//i.test(t) || (t = `http://${t}`);
        let e = new URL(t),
            r = `${e.protocol}//${e.hostname}${e.pathname}`;
        return e.search && (r += e.search), e.hash && (r += e.hash), r
    },
    "unconsole": (o) => {
        if (o != undefined && Array.isArray(o)) {
            o.forEach(e => {
                console[e] = () => {}
            })
        } else {
            const x = console = {};
            x.log = x.error = x.info = x.debug = x.warn = x.trace = x.dir = x.dirxml = x.group = x.groupEnd = x.time = x.timeEnd = x.assert = x.profile = () => {};
        }
    },
    "randomItemFrom": (collection) => {
        if (Array.isArray(collection)) {
            return collection[Math.floor(Math.random() * collection.length)];
        } else if (collection instanceof Map) {
            const keys = Array.from(collection.keys());
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return collection.get(randomKey);
        } else if (typeof collection === 'string') {
            return collection.charAt(Math.floor(Math.random() * collection.length));
        } else if (typeof collection === 'object') {
            const keys = Object.keys(collection);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            return collection[randomKey];
        } else {
            throw new Error('Invalid argument type! Received: ' + typeof collection);
        }
    },
    "quadratic": (a, b, c, arr) => {
        if (arr != undefined && Array.isArray(arr) && arr.length == 2) {
            const epsilon = 0.000001;
            return Math.abs(a * arr[0] * arr[0] + b * arr[0] + c) < epsilon && Math.abs(a * arr[1] * arr[1] + b * arr[1] + c) < epsilon;
        } else {
            const discriminant = b * b - 4 * a * c;
            if (discriminant < 0) {
                return undefined;
            }
            const sqrtDiscriminant = Math.sqrt(discriminant);
            return [(-b + sqrtDiscriminant) / (2 * a), (-b - sqrtDiscriminant) / (2 * a)];
        }
    },
    "repeat": (times = 1, input = " ") => {
        if (typeof times !== "number" || !Number.isInteger(times)) {
            throw new TypeError("The first argument must be a number.");
        }
        if (!Array.isArray(input) && typeof input !== "string") {
            throw new TypeError("The second argument must be a string or an array.");
        }
        if (Array.isArray(input)) {
            return input.map((item) => item.repeat(times));
        } else {
            return input.repeat(times);
        }
    },
    "prependProtocol": (url, protocol = "https") => {
        if (typeof url !== "string") {
            throw new Error("URL should be a string.");
        }

        const match = /^[a-z]+:\/\//i.exec(url);
        if (match) {
            const existingProtocol = match[0];
            if (existingProtocol.toLowerCase() === `${protocol.toLowerCase()}://`) {
                return url;
            } else {
                return `${protocol}://${url.slice(existingProtocol.length)}`;
            }
        }

        if (protocol === "https" && /^www\./i.test(url)) {
            return `https://${url}`;
        }

        return `${protocol}://${url}`;
    },
    "isAbsoluteUrl": (t) => {
        try {
            let r = /^https?:\/\/|ftp:\/\//i;
            if (!Array.isArray(t)) return !!t.match(r);
            {
                let e = [];
                return t.forEach(t => {
                    e.push(!!t.match(r))
                }), e
            }
        } catch (c) {
            return !1
        }
    },
    "hasEmoji": (e) => {
        return /[\p{Emoji}]/gu.test(e)
    },
    "validIPFormat": (string, ip_version = "v4") => {
        if (typeof string != "string") return false;
        if (ip_version == "v4") {
            return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(string);
        } else if (ip_version == "v6") {
            return /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/
                .test(string);
        } else {
            return false;
        }
    },
    "palindrome": {
        check: (input) => {
            const reverse = String(input).split('').reverse().join('');
            if (reverse == String(input)) {
                return true
            }
            return false
        },
        nearest: (input) => {
            if (!Number.isInteger(input)) return undefined
            input = parseFloat(input);
            if (palindroma.check(input)) {
                return input
            }
            let low = input - 1;
            while (!palindroma.check(low)) {
                low -= 1
            }
            let high = input + 1;
            while (!palindroma.check(high)) {
                high += 1
            }
            if (input - low < high - input) {
                return low
            } else {
                return high
            }
        }
    },
    "uuid": (o = 6) => {
        let [t, r] = [1e9 * Math.random() | 0, 65536 * Math.random() | 0], a = 4095 & Date.now() | 8192, n = Array.from({
            length: o
        }, () => 256 * Math.random() | 0), e = o => o.toString(16).padStart(4, 0);
        return `${e(t)}-${e(r)}-${e(a)}-${e(32768*Math.random()|32768)}-${n.map(o=>e(o)).join("")}`.replace(/^-/, "")
    }
}

export class Appembed {
    constructor() {
        this.url = '';
    }

    encode(t) {
        return encodeURIComponent(t);
    }

    setTitle(t) {
        this.url += "&t=" + this.encode(t);
        return this;
    }

    setDescription(t) {
        this.url += "&d=" + this.encode(t);
        return this;
    }

    setColor(t) {
        this.url += "&c=" + this.encode(t);
        return this;
    }

    setRedirect(t) {
        this.url += "&r=" + this.encode(t);
        return this;
    }

    setAuthor(t) {
        this.url += "&a=" + this.encode(t);
        return this;
    }

    setAuthorURL(t) {
        this.url += "&au=" + this.encode(t);
        return this;
    }

    setImage(t) {
        this.url += "&i=" + this.encode(t);
        return this;
    }

    setProvider(t) {
        this.url += "&p=" + this.encode(t);
        return this;
    }

    setProviderURL(t) {
        this.url += "&pu=" + this.encode(t);
        return this;
    }

    setURL(t) {
        this.url += "&u=" + this.encode(t);
        return this;
    }

    setYoutube(t) {
        this.url += "&yt=" + this.encode(t);
        return this;
    }

    setOembed(t) {
        this.url += "&oembed=" + this.encode(t);
        return this;
    }

    setIcon(t) {
        this.url += "&ic=" + this.encode(t);
        return this;
    }

    build() {
        return 'https://appembed.netlify.app/e?' + this.url.slice(1);
    }
}

export default kyz;
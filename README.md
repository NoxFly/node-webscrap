# node-webscrap

Use it to retrieve all metadata from a website.

|                       | /
|-----------------------|:-------------------:
| Issues open           | [![][nio]][n1]    
| Issues closed         | [![][nic]][n2]    
| Downloads             | [![][nd]][n3]     
| Bugs                  | [![][nbg]][n6]    
| Dependents            | [![][ndp]][n7]    
| Install size          | [![][nis]][n8]    
| GitHub stars          | [![][ns]][n9]     
| TypeScript support    | [![][nts]][n10]   


[n1]: https://github.com/NoxFly/node-webscrap/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
[n2]: https://github.com/NoxFly/node-webscrap/issues?q=is%3Aissue+is%3Aclosed+sort%3Aupdated-desc
[n3]: https://www.npmjs.com/package/node-webscrap
[n4]: https://coveralls.io/github/NoxFly/node-webscrap
[n5]: https://github.com/NoxFly/node-webscrap/actions/workflows/main.yml
[n6]: https://github.com/NoxFly/node-webscrap/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3Abug
[n7]: https://www.npmjs.com/package/node-webscrap?activeTab=dependents
[n8]: https://packagephobia.com/result?p=node-webscrap
[n9]: https://github.com/NoxFly/node-webscrap
[n10]: https://github.com/NoxFly/node-webscrap
[nio]: https://img.shields.io/github/issues-raw/NoxFly/node-webscrap?color=gray&label
[nic]: https://img.shields.io/github/issues-closed-raw/NoxFly/node-webscrap?color=blue&label
[nd]: https://img.shields.io/npm/dm/node-webscrap?color=darkgreen&label
[gc]: https://img.shields.io/coveralls/github/NoxFly/node-webscrap?color=0b9062&label
[gb]: https://github.com/NoxFly/node-webscrap/actions/workflows/main.yml/badge.svg
[nbg]: https://img.shields.io/github/issues-raw/NoxFly/node-webscrap/bug?color=darkred&label
[ndp]: https://badgen.net/npm/dependents/node-webscrap?color=orange&label
[nis]: https://badgen.net/packagephobia/install/node-webscrap?color=blue&label
[ns]: https://img.shields.io/github/stars/NoxFly/node-webscrap?color=white&label
[nts]: https://badgen.net/npm/types/node-webscrap?label



## Usage

Available in JS and TS.

CommonJS is not supported for now, only ESM.

```ts
import { webscrap } from 'node-webscrap';

const data = await webscrap('https://google.fr');

// result :
interface IWebsiteInfos {
    metadata: {
        title?: string;
        description?: string;
        themeColor?: string;
        author?: string;
        robots?: string;
        favicons?: string[];
    },
    openGraph: {
        // four basic og metatans
        title?: string;
        type?: string;
        url?: string;
        image?: string;
        
        // optional og metatans
        name?: string;
        description?: string;
        audio?: string;
        determiner?: string;
        locale?: string;
        localAlternate?: string[];
        video?: string;

        // Facebook image specifications og:image:*
        imageWidth?: number;
        imageHeight?: number;
        imageAlt?: string;
        imageType?: string;

        // video optional specifications
        videoType?: string;
        videoWidth?: number;
        videoHeight?: number;

        // audio optional specifications
        audioType?: string;
    },
    social: {
        twitter: {
            card?: string;
            title?: string;
            description?: string;
            site?: string;
            image?: string;
            creator?: string;
        }
    }
}
```

For fetching resources, it uses does not use any dependency. It uses the core http/https modules from NodeJS, so this package is lightweight.


# Bug report and contribution

Feel free to open [issues](https://github.com/NoxFly/node-webscrap/issues) and [pull requests](https://github.com/NoxFly/node-webscrap/pulls) if you wants to improve this package.

Issues are answered in the day.


## Licence

This package is under the [MIT licence](./LICENCE).
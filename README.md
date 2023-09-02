# node-webscrap

Use it to retrieve all metadata from a website.

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
        // four basic og metatags
        title?: string;
        type?: string;
        url?: string;
        image?: string;
        
        // optional og metatags
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
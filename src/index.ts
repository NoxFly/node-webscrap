import * as http from 'http';
import * as https from 'https';


export interface IWebsiteMetadata {
    title?: string;
    description?: string;
    themeColor?: string;
    author?: string;
    robots?: string;
    favicons?: string[];
}

export interface IOpenGraphMetadata {
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
}

export interface ITwitterMetadata {
    card?: string;
    title?: string;
    description?: string;
    site?: string;
    image?: string;
    creator?: string;
}

export interface ISocialMetadata {
    twitter: ITwitterMetadata;
}

export interface IWebsiteInfos {
    metadata: IWebsiteMetadata;
    openGraph: IOpenGraphMetadata;
    socials: ISocialMetadata;
}


const translations: Record<string, (object: IWebsiteInfos, value: string) => void> = {
    'og:image': (o, v) => o.openGraph.image = v,
    'og:image:alt': (o, v) => o.openGraph.imageAlt = v,
    'og:image:width': (o, v) => o.openGraph.imageWidth = Number(v),
    'og:image:height': (o, v) => o.openGraph.imageHeight = Number(v),
    'og:site_name': (o, v) => o.openGraph.name = v,
    'og:type': (o, v) => o.openGraph.type = v,
    'og:title': (o, v) => o.openGraph.title = v,
    'og:url': (o, v) => o.openGraph.url = v,
    'og:description': (o, v) => o.openGraph.description = v,
    'twitter:card': (o, v) => o.socials.twitter.card = v,
    'twitter:title': (o, v) => o.socials.twitter.title = v,
    'twitter:description': (o, v) => o.socials.twitter.description = v,
    'twitter:site': (o, v) => o.socials.twitter.site = v,
    'twitter:image': (o, v) => o.socials.twitter.image = v,
    'twitter:creator': (o, v) => o.socials.twitter.creator = v,
    'author': (o, v) => o.metadata.author = v,
    'description': (o, v) => o.metadata.description = v,
    'themeColor': (o, v) => o.metadata.themeColor = v,
    'robots': (o, v) => o.metadata.robots = v,
    'title': (o, v) => o.metadata.title = v,
};

type RequestResponse = {
    statusCode: number;
    statusMessage: string;
    headers: http.IncomingHttpHeaders;
    data: any;
};


const request = async (url: string): Promise<RequestResponse> => {
	return new Promise((resolve, reject) => {
		const module = (url.startsWith('https'))? https : http;

		const match = url.match(/^https?:\/\/((?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6})\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/);

        if(!match) {
            reject('Given URL is not well formed.');
            return;
        }

        const [_, hostname, path] = match;

		const options: http.RequestOptions = {
			hostname,
			path,
			headers: {
				'Content-Type': 'text/html',
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0',
				'Connection': 'keep-alive',
				'Referrer': hostname,
				'Accept': 'text/html'
			}
		};

		module.get(options, res => {
			let data = '';

			const headers = res.headers;
			const statusCode = res.statusCode || 0;
			const statusMessage = res.statusMessage || '';

			res.on('data', chunk => {
				data += chunk;
			});

			res.on('end', () => {
				resolve({
					statusCode,
					statusMessage,
					headers,
					data
				});
			});

			res.on('error', e => {
				reject(e);
			});
		});
	});
};


export async function webscrap(url: string): Promise<IWebsiteInfos> {
    const infos: IWebsiteInfos = {
        metadata: {},
        openGraph: {},
        socials: {
            twitter: {}
        }
    };

    const response = await request(url);

    if(response.statusCode >= 400) {
        throw new Error(`Failed to fetch resource at ${url} (status ${response.statusCode} : ${response.statusMessage})`);
    }

    const { data } = response;

    const headTagIndexStart = data.indexOf('<head');
    const headTagIndexEnd = data.indexOf('</head>');

    const headContent = data.slice(headTagIndexStart, headTagIndexEnd);

    const metaTags = [...headContent.matchAll(/<meta\s+property=["'](og|twitter):(.+?)["']\s*content=["'](.*?)["']\s*\/?>/g)]
        .map(match => ([ match[1] + ':' + match[2], match[3] ]))
        .reduce((prev: Record<string, string>, curr) => {
            prev[curr[0]] = curr[1];
            return prev;
        }, {});

    metaTags.author = headContent.match(/<meta\s+name=["']author["']\s*content=["'](.*?)["']\s*\/?>/)?.[1] || '';
    metaTags.description = headContent.match(/<meta\s+name=["']description["']\s*content=["'](.*?)["']\s*\/?>/)?.[1] || '';
    metaTags.themeColor = headContent.match(/<meta\s+name=["']theme-color["']\s*content=["'](.*?)["']\s*\/?>/)?.[1] || '';
    metaTags.robots = headContent.match(/<meta\s+name=["']robots["']\s*content=["'](.*?)["']\s*\/?>/)?.[1] || '';
    metaTags.title = headContent.match(/<title>\s*(.*?)\s*<\/title>/)?.[1] || '';
    
    const favicons = headContent
        .match(/<link(.*?)href=["'](.*?(png|svg|ico|jpg|jpeg|gif))["'](.*?)\/?>/g)
        ?.map((m: string) => m.match(/href=["'](.*?)["']/)?.[1] || '');

    if(favicons) {
        infos.metadata.favicons = favicons;
    }

    for(const key in translations) {
        if(metaTags[key]) {
            translations[key](infos, metaTags[key]);
        }
    }

    return infos;
}
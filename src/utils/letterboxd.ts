
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
    attributeNamePrefix: '',
    ignoreAttributes: false,
    parseAttributeValue: true,
  });

export async function getLetterboxdFeed() {
    const response = await fetch('https://letterboxd.com/cmnafi/rss/');
    const xml = await response.text();
    const data = parser.parse(xml);
    return data.rss.channel.item.map((item: any) => {
        const description = item.description;
        const posterRegex = /<img src="([^"]+)"/;
        const posterMatch = description.match(posterRegex);
        const posterUrl = posterMatch ? posterMatch[1] : null;

        const reviewRegex = /<p>(.*?)<\/p>/;
        const reviewMatch = description.match(reviewRegex);
        const review = reviewMatch ? reviewMatch[1] : null;

        return {
            title: item['letterboxd:filmTitle'],
            year: item['letterboxd:filmYear'],
            rating: item['letterboxd:memberRating'],
            review,
            posterUrl,
            link: item.link,
            watchedDate: item['letterboxd:watchedDate'],
        };
    });
}

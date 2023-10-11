const Parser = require('rss-parser');

const rssParser = new Parser({timeout: 5000});

const blogList = [
	{
		url: 'https://www.11ty.dev/blog/',
		name: 'Eleventy Blog',
		feed: 'https://www.11ty.dev/blog/feed.xml'
	},
	{
		url: 'https://www.zachleat.com/',
		name: 'Zach Leatherman',
		feed: 'https://www.zachleat.com/web/feed/'
	},
	{
		url: 'https://sia.codes/',
		name: 'Sia Karamalegos',
		feed: 'https://sia.codes/feed/feed.xml'
	},
	{
		url: 'https://11ty.rocks/',
		name: '11ty Rocks',
		feed: 'https://11ty.rocks/feed/'
	},
	{
		url: 'https://moderncss.dev/',
		name: 'Modern CSS',
		feed: 'https://moderncss.dev/feed/'
	},
	{
		url: 'https://coryd.dev/',
		name: 'Cory Dransfeldt',
		feed: 'https://feedpress.me/coryd'
	}
];

function byDate(itemA, itemB) {
	const dateA = new Date(itemA.isoDate);
	const dateB = new Date(itemB.isoDate);
	return dateB - dateA;
}

module.exports = {
	eleventyComputed: {
		async blogList() {
			return await Promise.all(
				blogList.map(async (blog) => {
					const feed = await rssParser.parseURL(blog.feed);
					if (!feed.items.length) {
						return null;
					}

					const items = [...feed.items];
					items.sort(byDate);
					const latestPost = items[0];
					return {...blog, latestPost};
				})
			)
		}
	}
};
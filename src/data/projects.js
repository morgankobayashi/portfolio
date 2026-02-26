// src/data/projects.js

export const PROJECT_TAGS = ["All", "Marketing", "Programming", "Video", "Design"];

/**
 * Blocks = a list of sections that can vary per project.
 * Each block has a `type` plus whatever data that block needs.
 *
 * This is the key to: "case studies should not all look the same".
 */
export const projects = [

  {
  title: "Highlands Music Festival",
  slug: "highlands-paid-social",
  tags: ["Marketing", "Video"],
  headline: "Paid social campaign with monthly creative iteration + A/B testing.",
  thumbnail: "/thumbnails/highlands.jpg",

  blocks: [
    {
      type: "hero",
      kicker: "Marketing Campaign",
      title: "Highlands Music Festival",
      subtitle:
        "Built a layered Meta campaign (awareness → conversion → remarketing), refreshed creative monthly, and used A/B testing to keep performance strong through the full sales cycle — ending with a sell-out.",
      badges: ["Meta Ads", "A/B Testing", "Creative Iteration", "Lead Gen"],
      bgImage: "/case-hero/highlands.jpg",
      bgPosition: "50% 30%",
    },

	{
	type: "results",
	title: "Results snapshot",
	highlights: [,
		{ label: "Total leads", value: "524" },
		{ label: "Lead CPA", value: "$7.77" },
		{ label: "Impressions", value: "1,835,438" },
		{ label: "Result", value: "Sold-Out" },

	],
	},

	{
	type: "text",
	title: "What was the project?",
	body: [
		"Highlands Music Festival needed a paid media program that could do more than generate reach. The 2024 plan focused on structured, measurable growth: maintain low-cost awareness, convert intent into leads, and use retargeting to move audiences toward ticket purchase while improving the quality and longevity of the creative asset library.",
	],
	},

	{
	type: "text",
	title: "Strategy",
	body: [
		{
		type: "p",
		text:
			"**Messaging foundation (positioning):** The strategy emphasized Highlands as a differentiated, all-inclusive festival experience (cabins, meals included, multiple stages, private lake setting), built to shift perceptions around value versus typical festival tradeoffs.",
		},
		{
		type: "p",
		text:
			"**Campaign architecture (multi-stage):** Instead of relying on reach alone, the 2024 plan used a layered structure combining:",
		},
		{
		type: "ul",
		items: [
			"Awareness activity to keep the festival top-of-mind",
			"Lead conversion activity to capture high-intent prospects",
			"Remarketing to re-engage warm audiences and increase efficiency",
		],
		},
		{
		type: "p",
		text:
			"**Testing system:** Creative and targeting decisions were based on continuous A/B testing, keeping two creatives running in parallel and shifting budget toward stronger performers month to month.",
		},
		{
		type: "p",
		text:
			"**Creative direction:** The campaign direction prioritized clearer festival communication and a “first-person” representation of the Highlands experience, avoiding generic venue imagery and highlighting intimacy, setting, accommodations, and the full weekend experience.",
		},
	],
	},

	{
	type: "videoMarquee",
	libraryId: "588259",
	aspect: 1,          // square
	height: 280,        // bigger (try 260–320)
	heading: "check out the creative I made",
	items: [
		{ id: "what-highlands-sounds-like", title: "What Highland Sounds Like", videoId: "495c6677-7c42-4246-b677-49f3268698ff" },
		{ id: "welcome-to-highlands", title: "Welcome to Highlands", videoId: "0dea6f17-b023-48f1-a7d4-6a85b0b85f92" },
		{ id: "welcome-to-highlands-2", title: "Welcome to Highlands 2", videoId: "11690af0-c2ac-4573-9033-05c54d2213e1" },

		{ id: "only-at-highlands", title: "Only at Highlands", videoId: "bd9665dd-e0aa-47f5-ae6f-8dffe278e703" },
		{ id: "only-at-highlands-2", title: "Only at Highlands 2", videoId: "7734b3c0-836f-4889-abde-883cea5590f0" },
		{ id: "only-at-highlands-3", title: "Only at Highlands 3", videoId: "d07e376f-6641-4092-b6a4-8a43f564dbb2" },

		{ id: "getblurry", title: "GetBlurry", videoId: "985dc242-95b9-402d-818f-3a9c8a2ca662" },
		{ id: "getblurry-2", title: "GetBlurry 2", videoId: "5993f350-ec9e-4eed-b68b-ec829392715c" },
		{ id: "getblurry-3", title: "GetBlurry 3", videoId: "bb9df1d7-a579-4324-97ef-7fb8d864577e" },

		{ id: "16-days", title: "16 days", videoId: "79b9a504-4852-4d0e-9990-858623850c12" },
		{ id: "21-days", title: "21 days", videoId: "1b6c110c-ee63-4502-803c-a03ba81d8274" },
		{ id: "17-days", title: "17 days", videoId: "c6be2699-57c8-4ab1-aac0-dc06a04d42ca" },

		{ id: "after-dark", title: "After Dark", videoId: "a3a6764a-6364-46f1-8fb4-554f9d9a4b8a" },
	],
	},

	{
		type: "metrics",
		title: "Results",
		sections: [
			{
			title: "Core performance (Meta)",
			items: [
				{ label: "Total spend", value: "$7,534.32", note: "Paused after sellout" },
				{ label: "Total leads", value: "524" },
				{ label: "Lead CPA", value: "$7.77", note: "Lead campaigns" },
				{ label: "Impressions", value: "1,835,438" },
				{ label: "Reach", value: "850,033" },
				{ label: "Clicks", value: "29,378" },
			],
			},
			{
			title: "Year-over-year efficiency (Meta)",
			items: [
				{ label: "CPM", value: "$5.63 → $4.15" },
				{ label: "CPC", value: "$0.44 → $0.25" },
				{ label: "CTR", value: "1.26% → 1.60%" },
				{ label: "Spend", value: "$15,246.13 → $7,080.87" },
			],
			},
		],
	},

	],
	},
	
{
  title: "Rhyan Douglas - Magic Gurl (Visualizer) ft. Lekan",
  slug: "rhyan-douglas-magic-gurl",
  tags: ["Video"],
  thumbnail: "/thumbnails/magicgurl.jpg",

  blocks: [
    {
      type: "videoCase",
      heading: "Rhyan Douglas — Magic Gurl (Visualizer) ft. Lekan",

      // YouTube or Vimeo URL:
      src: "https://www.youtube.com/watch?v=Cui24x54hus",
      // src: "https://vimeo.com/123456789",

      // Or local mp4 in /public/videos/
      // src: "/videos/launch-reel.mp4",
      poster: "/thumbnails/launch-reel.jpg",

      // Optional: keep the card a bit bigger / more “page-like”
      cardClassName: "max-w-4xl mx-auto",


      // Description underneath (string OR your structured body format)
      description: [
        {
          type: "p",
          text:
            "Did the VFX compositing for this music video. The job required me to stitch together 5 seperate performance shots to appear as one seamless video. Each clip required meticulous rotoscoping of the performances as well as reworking of the timing to sync with the female actors movements.",
        },
      ],
    },
  ],
  
},

{
  title: "Roderick Porter - NOT AGAIN (Official Visualizer)",
  slug: "rodrick-porter-not-again",
  tags: ["Video"],
  thumbnail: "/thumbnails/rodrickporter.jpg",

  blocks: [
    {
      type: "videoCase",
      heading: "Roderick Porter - NOT AGAIN (Official Visualizer)",

      // YouTube or Vimeo URL:
      src: "https://www.youtube.com/watch?v=AjwLfTJNNvU",
      // src: "https://vimeo.com/123456789",

      // Or local mp4 in /public/videos/
      // src: "/videos/launch-reel.mp4",
      poster: "/thumbnails/launch-reel.jpg",

      // Optional: keep the card a bit bigger / more “page-like”
      cardClassName: "max-w-4xl mx-auto",


      // Description underneath (string OR your structured body format)
      description: [
        {
          type: "p",
          text:
            "Did the VFX compositing and surpervising for this music video. The job required me to figure how to execute a constant blue cry effect. The effect was created by weaving a tube through his hat and attaching to his forhead, then painting out the tube in post production. Additionally the source of the liquid did not appear to be streaming from the tear duct so some simulated liquid had to be added to create the full effect.",
        },
      ],
    },
  ],
  
}

];

const item = { reservePrice: 100, name: 'Tableau Picasso' };
export const usecases: [
  {
    item: { reservePrice: number; name: string };
    bidders: { name: string; bids: number[] }[];
  },
  string | undefined,
  number
][] = [
  [
    {
      item,
      bidders: [
        { name: 'toto0', bids: [] },
        { name: 'toto1', bids: [] }
      ]
    },
    undefined,
    100
  ],
  [
    {
      item,
      bidders: [
        { name: 'toto0', bids: [0] },
        { name: 'toto1', bids: [0, 0] }
      ]
    },
    undefined,
    100
  ],
  [
    {
      item,
      bidders: [
        { name: 'toto0', bids: [10, 50] },
        { name: 'toto1', bids: [55, 15] },
        { name: 'toto3', bids: [] }
      ]
    },
    undefined,
    100
  ],
  [
    {
      item,
      bidders: [{ name: 'toto0', bids: [110, 50] }]
    },
    'toto0',
    100
  ],
  [
    {
      item,
      bidders: [
        { name: 'toto0', bids: [110, 50] },
        { name: 'toto1', bids: [10, 50] },
        { name: 'toto2', bids: [100, 50] }
      ]
    },
    'toto0',
    100
  ],
  [
    {
      item,
      bidders: [
        { name: 'toto0', bids: [11, 50] },
        { name: 'toto1', bids: [10, 50] },
        { name: 'toto2', bids: [100, 50] }
      ]
    },
    'toto2',
    100
  ],
  [
    {
      item,
      bidders: [
        { name: 'A', bids: [110, 130] },
        { name: 'B', bids: [] },
        { name: 'C', bids: [125] },
        { name: 'D', bids: [105, 115, 90] },
        { name: 'E', bids: [132, 135, 140] }
      ]
    },
    'E',
    130
  ],
  [
    {
      item,
      bidders: [
        { name: 'A', bids: [110, 130, 140] },
        { name: 'B', bids: [] },
        { name: 'C', bids: [125] },
        { name: 'D', bids: [105, 115, 90] },
        { name: 'E', bids: [132, 135, 140] }
      ]
    },
    'E',
    125
  ]
];

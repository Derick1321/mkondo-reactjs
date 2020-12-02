export const menus = [
  {
    name: 'title',
    type: 'text',
    placeholder: 'Enter Title',
    title: 'Title',
  },
  {
    name: 'genre',
    type: 'select',
    placeholder: 'Enter Genre',
    title: 'Genre',
    options: [
      { value: 'afro', label: 'Afro' },
      { value: 'hiphop', label: 'Hip Hop' },
      { value: 'rnb', label: 'R&B' },
      { value: 'reggae', label: 'Reggae' },
      { value: 'dance', label: 'Dance' },
      { value: 'country', label: 'Country' },
      { value: 'rock', label: 'Rock' },
      { value: 'jazz', label: 'Jazz' },
      { value: 'gospel', label: 'Gospel' },
      { value: 'pop', label: 'Pop' },
    ],
    multi: true,
  },
  {
    name: 'description',
    type: 'area',
    placeholder: 'Describe your track',
    title: 'Description',
  },
  {
    name: 'caption',
    type: 'area',
    placeholder: 'Add your caption',
    title: 'Caption',
  },
  {
    name: 'policy',
    type: 'checkbox',
    title: 'By uploading, you confirm that your sounds comply with our Terms of Use and you don\'t infringe anyone else\'s rights.'
  }
];

export const metamenus = [
  { name: 'artist', type: 'text', placeholder: 'Artist Name', title: 'Artist' },
  { name: 'publisher', type: 'text', placeholder: 'Publisher Name', title: 'Publisher' },
  { name: 'composer', type: 'text', placeholder: 'Composer Name', title: 'Composer' },
  { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
  { name: 'albumTitle', type: 'text', placeholder: 'Enter Album Title', title: 'Album Title' },
  { name: 'recordLabel', type: 'text', placeholder: 'Enter Record Label', title: 'Record Label' },
];

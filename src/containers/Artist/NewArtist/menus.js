export const menus = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter Artist Name',
    title: 'Artist Name',
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
    isMulti: true,
  },
  {
    name: 'description',
    type: 'area',
    placeholder: 'Biography',
    title: 'Description',
  },
  {
    name: 'phoneNumber',
    type: 'text',
    placeholder: 'Enter Phone Number',
    title: 'Phone Number',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter Email Address',
    title: 'Email Address',
  },
  {
    name: 'policy',
    type: 'checkbox',
    title: 'By uploading, you confirm that your sounds comply with our Terms of Use and you don\'t infringe anyone else\'s rights.'
  }
];

export const metamenus = [
  { name: 'publisher', type: 'text', placeholder: 'Artist Name', title: 'Artist' },
 { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
  { name: 'recordingLabel', type: 'text', placeholder: 'Recording Label', title: 'Record Label' },
  { name: 'region', type: 'text', placeholder: 'Enter Region', title: 'Region' },
  { name: 'country', type: 'text', placeholder: 'Enter Country Name', title: 'Country' },
  { name: 'fb', type: 'socials', placeholder: 'Enter Facebook Link', icon: 'fb' },
  { name: 'instagram', type: 'socials', placeholder: 'Enter Instagram Link', icon: 'instagram' },
  { name: 'yt', type: 'socials', placeholder: 'Enter Youtube Link', icon: 'yt' },
  { name: 'twitter', type: 'socials', placeholder: 'Enter Twitter Link', icon: 'twitter' },
];

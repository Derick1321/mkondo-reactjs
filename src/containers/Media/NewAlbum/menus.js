import { genres } from '$common/utils';

export const menus = [{
        name: 'artist',
        type: 'text',
        placeholder: 'Enter Artist Name',
        title: 'Artist *',
    },
    {
        name: 'album',
        type: 'text',
        placeholder: 'Enter Album Title',
        title: 'Album *',
    },
    {
        name: 'genre',
        type: 'select',
        placeholder: 'Enter Genre',
        title: 'Genre *',
        options: genres,
        isMulti: true,
    },
    {
        name: 'description',
        type: 'area',
        placeholder: 'Describe your Album',
        title: 'Description',
    },
    
];

export const metamenus = [
    { name: 'publisher', type: 'text', placeholder: 'Publisher Name', title: 'Publisher' },
    { name: 'releaseDate', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
    { name: 'recordLabel', type: 'text', placeholder: 'Enter Record Label', title: 'Record Label' },
    { name: 'location', type: 'text', placeholder: 'Enter Region', title: 'Region' },
    { name: 'country', type: 'country', placeholder: 'Enter Country', title: 'Country' },
    {
        name: 'policy',
        type: 'checkbox',
        title: 'policy_text',
        link: '/privacy',
    }
];
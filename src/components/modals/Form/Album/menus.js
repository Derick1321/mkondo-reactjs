import { genres } from '$common/utils';

export const menus = [
    // {
    //     name: 'artist',
    //     type: 'text',
    //     placeholder: 'Enter Artist Name',
    //     title: 'Artist *',
    // },
    {
        name: 'name',
        type: 'text',
        placeholder: 'Enter Album Title',
        title: 'Album *',
    },
    {
        name: 'publisher',
        type: 'text',
        placeholder: 'Publisher Name',
        title: 'Publisher'
    },
    {
        name: 'genres',
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

    { name: 'release_date', type: 'date', placeholder: 'Release Date', title: 'Release Date' },
    { name: 'record_label', type: 'text', placeholder: 'Enter Record Label', title: 'Record Label' },
    { name: 'region', type: 'text', placeholder: 'Enter Region', title: 'Region' },
    { name: 'country', type: 'country', placeholder: 'Enter Country', title: 'Country' },

];
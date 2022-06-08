import { genres } from '$common/utils';
import { routePaths } from '../../../common/routeConfig';

export const menus = [{
        name: 'title',
        type: 'text',
        placeholder: 'enter_title',
        title: 'title',
    },
    {
        name: 'genre',
        type: 'select',
        placeholder: 'enter_genre',
        title: 'genre',
        options: genres,
        isMulti: true,
    },
    {
        name: 'description',
        type: 'area',
        placeholder: 'describe_your_track',
        title: 'description',
    },
    {
        name: 'policy',
        type: 'checkbox',
        title: 'policy_text',
        link: routePaths.privacy,
    }
];

export const metamenus = [
    { name: 'publisher', type: 'text', placeholder: 'publisher_name', title: 'publisher' },
    { name: 'composer', type: 'text', placeholder: 'composer_name', title: 'composer' },
    { name: 'releaseDate', type: 'date', placeholder: 'release_date', title: 'release_date' },
    { name: 'songWriter', type: 'text', placeholder: 'enter_song_writer', title: 'song_writer(s)' },
    { name: 'recordLabel', type: 'text', placeholder: 'enter_record_label', title: 'record_label' },
];
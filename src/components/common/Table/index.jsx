import React from 'react';
import PropTypes from 'prop-types';

import DropDown from '$components/common/DropDown';
import Button from '$components/common/Button';
import Row from '$components/common/Row';
import { formatDate, capitalize } from '$common/utils';

import styles from './index.module.scss';

const headerMenus = [
  { name: 'activate', title: 'Activate', },
  { name: 'delete', title: 'Delete', style: styles.optSecondary},
];

const Table = (props) => {
  // props
  const {
    data,
  } = props;

  const handleEdit = (value) => {
    // launch edit modal
    // 
    console.log('edit! ', value);
  };

  const btn = (
    <DropDown
      options={headerMenus}
      handleSelect={handleEdit}
    >
      <span className={styles.btn}>Edit</span>
    </DropDown>
  );

  console.log('data ', data);

  // render
  return (
    <div className={`container ${styles.wrapper}`}>
      <div className={styles.header}>
        <Row
          id='super-admin-table-header'
          columns={[
            'User Type',
            'Full Name',
            'Phone Number',
            'Status',
            'Joined',
            'Last Active',
          ]}
        />
      </div>
      {
        data.map((cols) => (
          <Row
            key={`super-admin-table-${cols.user_id}`}
            id='super-admin-table'
            columns={[
              capitalize(cols.user_type),
              cols.full_name,
              cols.phone_number,
              cols.publish ? 'Active' : 'Not Published',
              new Date(cols.joined).toLocaleDateString(),
              capitalize(formatDate(cols.last_active)),
            ]}
            actionBtn={btn}
          />
        ))
      }
    </div>
  );
}

Table.defaultProps = {
  data: [],
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

export default Table;

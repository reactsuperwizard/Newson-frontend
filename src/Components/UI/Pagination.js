import React from 'react';
import { Pagination as ReactPagination } from 'react-bootstrap';

export default function Pagination({total, itemsPerPage, current, onChangePage}) {
    let items =  [];

    if (current > 1) {
        items.push(<ReactPagination.Prev key='prev' onClick={() => onChangePage(current - 1)} />);
    }

    for (let page = 1; page <= Math.ceil(total/itemsPerPage); page++) {
        items.push(
            <ReactPagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                {page}
            </ReactPagination.Item>
        )
    }

    if (current < Math.ceil(total/itemsPerPage)) {
        items.push(<ReactPagination.Next key='next' onClick={() => onChangePage(current + 1)} />)
    }

  return (
    <ReactPagination size='sm'>
        {items}
    </ReactPagination>
  )
}

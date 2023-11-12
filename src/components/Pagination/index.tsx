import React from "react";

function Pagination(props: PaginationProps) {
  const { pagination, paginate } = props;
  return (
    <div className="d-flex flex-row-reverse">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {pagination?.map((page: number) => (
            <li key={page} className="page-item">
              <a onClick={() => paginate(page)} className="page-link" href="#">
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;

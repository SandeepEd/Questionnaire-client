import ReactPaginate from 'react-paginate';

interface IPaginationProps {
  totalCount: number;
  handlePageChange: (newFilter: any) => void;
  currentPage: number;
}
export const Pagination: React.FC<IPaginationProps> = ({
  totalCount,
  handlePageChange,
  currentPage = 0
}) =>
  <div className='w-screen flex align-middle justify-center mb-10'>
    {totalCount > 0 &&
      <ReactPaginate
        containerClassName="pagination"
        activeClassName="active"
        disabledClassName="disabled"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        forcePage={currentPage}
        breakLabel="..."
        previousLabel={`< Previous`}
        nextLabel={`Next >`}
        onPageChange={({ selected }) => handlePageChange(selected)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalCount}
      />}
  </div>;
export default Pagination;

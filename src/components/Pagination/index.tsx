import { Pagination } from "react-bootstrap";
import styles from "./pagination.module.scss"

export const CustomPagination = ({ props }) => {
   const { currentPage, totalPages } = props
   return (
      <div className={styles.paginationContainer}>
         <a href={currentPage !== 1 ? "/1" : ""}>{"<"}</a>
         {currentPage !== 1 &&
            <a href={`/${currentPage - 1}`}>
               {currentPage - 1}
            </a>
         }
         <a href={`/${currentPage}`}
            className={styles.active}
         >
            {currentPage}
         </a>
         {currentPage !== totalPages &&
            <a href={`/${currentPage + 1}`}>{currentPage + 1}</a>
         }
         <a href={`/${totalPages}`}>{">"}</a>
      </div>
   )
}
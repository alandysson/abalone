import Link from "next/link";
import { Pagination } from "react-bootstrap";
import styles from "./pagination.module.scss"

export const CustomPagination = ({ props }) => {
   const { currentPage, totalPages } = props
   return (
      <div className={styles.paginationContainer}>
         <ButtonPagination
            href={currentPage !== 1 ? "/1" : ""}
            title={"<"}
            disabled={currentPage === 1}
         />
         {currentPage !== 1 &&
            <ButtonPagination
               href={`/${currentPage - 1}`}
               title={currentPage - 1}
            />
         }
         <ButtonPagination
            href={`/${currentPage}`}
            title={currentPage}
            style={styles.active}
         />
         {currentPage !== totalPages &&
            <ButtonPagination
               href={`/${currentPage + 1}`}
               title={currentPage + 1}
            />
         }
         <ButtonPagination
            href={`/${totalPages}`}
            title={">"}
            disabled={currentPage === totalPages}
         />
      </div>
   )
}

const ButtonPagination = (props) => {
   return (
      <Link href={props.href}>
         <button
            disabled={props.disabled}
            className={props.style}
         >
            {props.title}
         </button>
      </Link>
   )
}
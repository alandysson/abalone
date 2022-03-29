import { useState } from "react";
import { Toast } from "react-bootstrap";

export function MessageAlert(props) {
   const [showA, setShowA] = useState<boolean>(props.show);
   return <Toast
      show={showA}
      onClose={() => setShowA(false)}
      style={{
         position: 'absolute',
         top: 5,
         right: 50,
      }}
   >
      <Toast.Header>
         <img
            className="rounded mr-2"
            alt=""
         />
         <strong className="mr-auto">Abalone </strong>
      </Toast.Header>
      <Toast.Body>{props.Message}</Toast.Body>
   </Toast>
} 
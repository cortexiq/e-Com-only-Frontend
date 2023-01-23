// import React from "react";
// import { Spinner } from "react-bootstrap";

// const Loader = () => {
//   return (
//     <Spinner
//       animation='border'
//       role='status'
//       style={{
//         width: "100px",
//         height: "100px",
//         margin: "auto",
//         display: "block",
//       }}
//     >
//       <span className='sr-only'>Loading...</span>
//     </Spinner>
//   );
// };

// export default Loader;

import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  const loader = {
    Component: Bars,
    props: {
      color: "#FFA07A",
      height: 100,
      width: 110,
    },
    name: "Ball Triangle",
  };

  return (
    <div className='loaderWrapper'>
      <div key={loader.name} className='loaderBox'>
        <loader.Component {...loader.props} />
        <hr />
      </div>
    </div>
  );
};

export default Loader;

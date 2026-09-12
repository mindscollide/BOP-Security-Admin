import React from "react";

// Thin wrapper around this project's icon font (see assets/custom-icons) so the
// antd notification's closeIcon can use the same icon set as the rest of the app.
const IconElement = ({ iconClass, onClick }) => (
  <i className={iconClass} onClick={onClick} />
);

export default IconElement;

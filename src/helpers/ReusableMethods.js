import React from "react";

export const IndexCell = React.memo(({ value, record, CellClassName }) => {
  console.log("Rendering IndexCell:", record, value);
  return <span className={CellClassName}>{value}</span>;
});

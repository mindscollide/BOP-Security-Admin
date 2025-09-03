import React from "react";

export const IndexCell = React.memo(({ value, record, CellClassName }) => {
  console.log("Rendering IndexCell:", record, value);
  return <span className={CellClassName}>{value}</span>;
});

export const formatDate = (date) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

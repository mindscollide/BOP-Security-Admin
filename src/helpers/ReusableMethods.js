import React from "react";

export const IndexCell = React.memo(({ value, record, CellClassName }) => {
  console.log("Rendering IndexCell:", record, value);
  return <span className={CellClassName}>{value}</span>;
});

// export const formatDate = (date) =>
//   date ? new Date(date).toISOString().split("T")[0] : "";

export const formatDatetoLocal = (date) => {
  if (!date) return "";

  // If it's already in yyyy-mm-dd format, return as is
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return date;
  }

  // If it's a Date object or another format
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

function BlockedTable() {
  return (
	  <Table aria-label="Example static collection table" className="dark mx-2 w-[98%] mb-2 sm:mb-0">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default BlockedTable

// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React, { useEffect, useState } from "react";
import Loader from "components/loader";
import { getAllUsers } from "services/user";

export default function Settings() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = React.useState(false);
  const [usersWithKycs, setUsersWithKyc] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch all users
        const allUsers = await getAllUsers();
        setUsers(allUsers.data);

        // Filter users requiring KYC approval
        const usersNotVerified = allUsers.data.filter(
          (user) => !user?.isUserVerified
        );
        setUsersWithKyc(usersNotVerified);
        console.log("Users not verified:", usersNotVerified);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // const approveUserKyc = async (status, kycId) => {
  //   const confirmationMessage = `Are you sure you want to ${status} this KYC?`;

  //   if (window.confirm(confirmationMessage)) {
  //     try {
  //       if (status === "approve") {
  //         const approve = await approveKyc(status, kycId);
  //         console.log(approve);
  //       } else if (status === "reject") {
  //         const reject = await approveKyc(status, kycId);
  //         console.log(reject);
  //       }
  //     } catch (error) {
  //       console.error("Error processing KYC:", error);
  //     }
  //   }
  // };
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Loader loading={loading} />
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <DevelopmentTable
          usersData={users}
          // tableData={tableDataDevelopment}
        />
        <CheckTable usersData={users} UsersWithKycData={usersWithKycs} />
        {/* <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}
      </SimpleGrid>
    </Box>
  );
}

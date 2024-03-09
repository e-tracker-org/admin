import {
  Flex,
  Table,
  Checkbox,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React, { useMemo, useEffect, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { getAllEmployees } from "services/employee";
import {
  getAllUsers,
  createUser,
  deleteUser,
  getSingleUser,
} from "services/user";
import { getUser } from "config/common";
// Custom components
import Card from "components/card/Card";
import Menu from "components/menu/MainMenu";
import { getKycForApproval, getAllKyc, approveKyc } from "services/kyc";

export default function CheckTable(props) {
  const { usersData, UsersWithKycData } = props;
  // const [usersWithKycs, setUsersWithKyc] = useState([]);
  const [users, setUsers] = useState([]);

  // const columns = useMemo(() => columnsData, [columnsData]);
  // const data = useMemo(() => tableData, [tableData]);

  // const tableInstance = useTable(
  //   {
  //     columns,
  //     data,
  //   },
  //   useGlobalFilter,
  //   useSortBy,
  //   usePagination
  // );

  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   page,
  //   prepareRow,
  //   initialState,
  // } = tableInstance;
  // initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const approveUserKyc = async (status, kycId) => {
    const confirmationMessage = `Are you sure you want to ${status} this KYC?`;

    if (window.confirm(confirmationMessage)) {
      try {
        if (status === "approve") {
          const approve = await approveKyc(status, kycId);
          console.log(approve);
        } else if (status === "reject") {
          const reject = await approveKyc(status, kycId);
          console.log(reject);
        }
      } catch (error) {
        console.error("Error processing KYC:", error);
      }
    }
  };
  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "scroll" }}
    >
      <Flex px="25px" justify="space-between" mb="20px" align="center">
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          Users Requiring KYC Approval
        </Text>
        <Menu />
      </Flex>
      <Table
        variant="simple"
        color="gray.500"
        mb="24px"
        overflowX="auto"
        minW="full"
        maxW="full"
      >
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>KYC Status</Th>
            <Th>Address</Th>
            <Th>Phone</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {UsersWithKycData.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              <Td>
                <Flex align="center">
                  <Checkbox colorScheme="brandScheme" me="10px" />
                  {`${row.firstname} ${row.lastname}`}
                </Flex>
              </Td>
              <Td>{row.currentKyc ? row.currentKyc.status : "Not Started"}</Td>
              <Td>{row.fullAddress}</Td>
              <Td>{row.phone}</Td>
              <Td>
                <Flex align="center">
                  <Button
                    backgroundColor="green.200"
                    onClick={() =>
                      approveUserKyc("approve", row.currentKyc.kycId)
                    }
                    isDisabled={
                      (row.currentKyc &&
                        row.currentKyc.status !== "COMPLETE") ||
                      !row.currentKyc
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    backgroundColor="red.200"
                    onClick={() =>
                      approveUserKyc("reject", row.currentKyc.kycId)
                    }
                    isDisabled={
                      (row.currentKyc &&
                        row.currentKyc.status !== "COMPLETE") ||
                      !row.currentKyc
                    }
                  >
                    Reject
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
}

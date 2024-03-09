/* eslint-disable */
import {
  Button,
  Flex,
  Text,
  useColorModeValue,
  Table,
  Th,
  Thead,
  Tr,
  Checkbox,
  Tbody,
  Td,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Menu from "components/menu/MainMenu";
import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { getAllUsers } from "services/user";
import Loader from "components/loader";

export default function DevelopmentTable(props) {
  const { usersData } = props;
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [loading, setLoading] = useState();

  const users = useMemo(() => usersData, [usersData]);
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
  // const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
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
          Users List
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
            <Th>Phone</Th>
            <Th>Address</Th>
            <Th>User Approved</Th>
            <Th>Email</Th>
            <Th>State</Th>
            <Th>Gender</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              <Td>
                <Flex align="center">
                  <Checkbox colorScheme="brandScheme" me="10px" />
                  {`${row.firstname} ${row.lastname}`}
                </Flex>
              </Td>
              <Td>{row.phone}</Td>
              <Td>{row.fullAddress}</Td>
              <Td>{row.isUserVerified ? "Yes" : "No"}</Td>
              <Td>{row.email}</Td>
              <Td>{row.state}</Td>
              <Td>{row.gender}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Card>
  );
}

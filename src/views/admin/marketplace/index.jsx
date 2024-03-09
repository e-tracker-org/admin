import React, { useState, useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { getAllProperty } from "services/property";
import { isAfter, subDays } from "date-fns";
import { formatMoney } from "config/common";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import NFT from "components/card/NFT";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";
import Loader from "components/loader";
import { getAllUsers, getSingleUser } from "services/user";

export default function Marketplace() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const sevenDaysAgo = subDays(new Date(), 7);

  const recentlyAddedProperties = properties.filter((property) =>
    isAfter(new Date(property.createdAt), sevenDaysAgo)
  );

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers.data);

        const allProperties = await getAllProperty();
        const updatedProperties = await Promise.all(
          allProperties.data.map(async (property) => {
            const userId = property.current_owner;
            try {
              const userData = await getSingleUser(userId);

              const updatedProperty = {
                ...property,
                firstName: userData.data?.firstname,
                lastName: userData.data?.lastname,
              };

              return updatedProperty;
            } catch (userError) {
              console.error(
                "Error fetching user data for ID",
                userId,
                ":",
                userError
              );
              return property;
            }
          })
        );

        setProperties(updatedProperties);
        console.log("All properties:", updatedProperties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      <Loader loading={loading} />
      {/* Main Fields */}
      <Grid
        mb="20px"
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}
      >
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
        >
          <Banner />
          <Flex direction="column">
            <Flex
              mt="45px"
              mb="20px"
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}
            >
              <Text color={textColor} fontSize="2xl" ms="24px" fontWeight="700">
                All Properties
              </Text>
              <Flex
                align="center"
                me="20px"
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}
              >
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#art"
                >
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#music"
                >
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight="500"
                  me={{ base: "34px", md: "44px" }}
                  to="#collectibles"
                >
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight="500" to="#sports">
                  Sports
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
              {Array.isArray(properties) &&
                properties.map((property, index) => (
                  <NFT
                    key={index}
                    name={property.name}
                    author={`Owner: ${property.firstName} ${property.lastName}`}
                    bidders={[
                      Avatar1,
                      Avatar2,
                      Avatar3,
                      Avatar4,
                      Avatar1,
                      Avatar1,
                      Avatar1,
                      Avatar1,
                    ]}
                    image={property.image_list[0].urls}
                    currentbid={formatMoney(property.price)}
                    download="#"
                  />
                ))}
            </SimpleGrid>
            <Text
              mt="45px"
              mb="36px"
              color={textColor}
              fontSize="2xl"
              ms="24px"
              fontWeight="700"
            >
              Recently Added
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap="20px"
              mb={{ base: "20px", xl: "0px" }}
            >
              {Array.isArray(recentlyAddedProperties) &&
                recentlyAddedProperties.map((property, index) => (
                  <NFT
                    key={index}
                    name={property.name}
                    author={`Owner: ${property.firstName} ${property.lastName}`}
                    bidders={[
                      Avatar1,
                      Avatar2,
                      Avatar3,
                      Avatar4,
                      Avatar1,
                      Avatar1,
                      Avatar1,
                      Avatar1,
                    ]}
                    image={property.image_list[0].urls}
                    currentbid={formatMoney(property.price)}
                    download="#"
                  />
                ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        <Flex
          flexDirection="column"
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          <Card px="0px" mb="20px">
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p="0px">
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify="space-between"
              w="100%"
              px="22px"
              py="18px"
            >
              <Text color={textColor} fontSize="xl" fontWeight="600">
                History
              </Text>
              <Button variant="action">See all</Button>
            </Flex>

            <HistoryItem
              name="Colorful Heaven"
              author="By Mark Benjamin"
              date="30s ago"
              image={Nft5}
              price="0.91 ETH"
            />
            <HistoryItem
              name="Abstract Colors"
              author="By Esthera Jackson"
              date="58s ago"
              image={Nft1}
              price="0.91 ETH"
            />
            <HistoryItem
              name="ETH AI Brain"
              author="By Nick Wilson"
              date="1m ago"
              image={Nft2}
              price="0.91 ETH"
            />
            <HistoryItem
              name="Swipe Circles"
              author="By Peter Will"
              date="1m ago"
              image={Nft4}
              price="0.91 ETH"
            />
            <HistoryItem
              name="Mesh Gradients "
              author="By Will Smith"
              date="2m ago"
              image={Nft3}
              price="0.91 ETH"
            />
            <HistoryItem
              name="3D Cubes Art"
              author="By Manny Gates"
              date="3m ago"
              image={Nft6}
              price="0.91 ETH"
            />
          </Card>
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
